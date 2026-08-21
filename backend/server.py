from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone
import requests
from html import escape
from email_utils import send_email

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

WEBHOOK_URL = os.environ.get('GOOGLE_SHEET_WEBHOOK_URL', '').strip()
CONTACT_NOTIFY_EMAIL = os.environ.get('CONTACT_NOTIFY_EMAIL', '').strip()
TURNSTILE_SECRET_KEY = os.environ.get('TURNSTILE_SECRET_KEY', '').strip()

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------- Models ----------
class ClaimCreate(BaseModel):
    name: str
    email: EmailStr
    referral_code: Optional[str] = None
    turnstile_token: Optional[str] = None


class ClaimResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: EmailStr
    referral_code: str
    referred_by: Optional[str] = None
    created_at: str


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    topic: Optional[str] = "General Enquiry"
    message: str


# ---------- Helpers ----------
def generate_referral_code(name: str) -> str:
    prefix = ''.join([c for c in name.upper() if c.isalpha()])[:3] or "ECO"
    token = secrets.token_hex(3).upper()
    return f"ECHO-{prefix}-{token}"


async def verify_turnstile(token: str) -> bool:
    if not TURNSTILE_SECRET_KEY:
        # Not configured yet; don't block signups, just skip the check.
        return True
    if not token:
        return False
    try:
        def _post():
            return requests.post(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                data={"secret": TURNSTILE_SECRET_KEY, "response": token},
                timeout=10,
            )
        resp = await asyncio.to_thread(_post)
        return bool(resp.json().get("success"))
    except Exception as e:
        logger.error(f"Turnstile verification failed: {e}")
        return False


async def forward_to_webhook(payload: dict):
    if not WEBHOOK_URL:
        logger.info("No webhook configured; skipping forward.")
        return
    try:
        def _post():
            return requests.post(WEBHOOK_URL, json=payload, timeout=10)
        resp = await asyncio.to_thread(_post)
        logger.info(f"Webhook forward status: {resp.status_code}")
    except Exception as e:
        logger.error(f"Webhook forward failed: {e}")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Primal Origins API"}


@api_router.post("/claim-spot", response_model=ClaimResponse)
async def claim_spot(input: ClaimCreate):
    if not await verify_turnstile(input.turnstile_token):
        raise HTTPException(status_code=400, detail="Verification failed. Please try again.")

    existing = await db.beta_signups.find_one({"email": input.email.lower()})
    if existing:
        return ClaimResponse(
            id=existing["id"],
            name=existing["name"],
            email=existing["email"],
            referral_code=existing["referral_code"],
            referred_by=existing.get("referred_by"),
            created_at=existing["created_at"],
        )

    referred_by = None
    if input.referral_code:
        ref = await db.beta_signups.find_one({"referral_code": input.referral_code.strip().upper()})
        referred_by = ref["referral_code"] if ref else input.referral_code.strip().upper()

    # ensure unique code
    for _ in range(5):
        code = generate_referral_code(input.name)
        if not await db.beta_signups.find_one({"referral_code": code}):
            break

    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "id": secrets.token_hex(8),
        "name": input.name.strip(),
        "email": input.email.lower(),
        "referral_code": code,
        "referred_by": referred_by,
        "created_at": now,
    }
    await db.beta_signups.insert_one(doc)

    await forward_to_webhook({
        "type": "beta_signup",
        "full_name": doc["name"],
        "referred_by": (doc["referred_by"] or ""),
        "email": doc["email"],
        "date": now,
        "referral_code": doc["referral_code"],
    })

    return ClaimResponse(**{k: doc[k] for k in ["id", "name", "email", "referral_code", "referred_by", "created_at"]})


@api_router.get("/referral/{code}")
async def validate_referral(code: str):
    ref = await db.beta_signups.find_one({"referral_code": code.strip().upper()})
    return {"valid": bool(ref), "code": code.strip().upper()}


@api_router.post("/contact")
async def contact(input: ContactCreate):
    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "id": secrets.token_hex(8),
        "name": input.name.strip(),
        "email": input.email.lower(),
        "topic": input.topic,
        "message": input.message.strip(),
        "created_at": now,
    }
    await db.contact_messages.insert_one(doc)

    email_sent = False
    if CONTACT_NOTIFY_EMAIL:
        subject = f"New contact enquiry - {doc['topic']}"
        html = (
            '<table role="presentation" width="100%" style="max-width:600px">'
            '<tr><td style="padding:24px;font-family:Arial,sans-serif;color:#1c1917">'
            '<h2 style="margin:0 0 16px;font-size:20px">New enquiry from the Primal Origins website</h2>'
            f'<p style="margin:6px 0"><strong>Name:</strong> {escape(doc["name"])}</p>'
            f'<p style="margin:6px 0"><strong>Email:</strong> {escape(doc["email"])}</p>'
            f'<p style="margin:6px 0"><strong>Topic:</strong> {escape(str(doc["topic"]))}</p>'
            '<p style="margin:16px 0 6px"><strong>Message:</strong></p>'
            f'<p style="margin:0;white-space:pre-wrap;background:#f5f5f4;padding:14px;border-radius:8px">{escape(doc["message"])}</p>'
            '<p style="font-size:12px;color:#888;margin-top:24px">Sent by Primal Origins. '
            'We never ask for your password or card details by email.</p>'
            '</td></tr></table>'
        )
        try:
            await send_email(
                to=CONTACT_NOTIFY_EMAIL,
                subject=subject,
                html=html,
                reply_to=doc["email"],
            )
            email_sent = True
        except Exception as e:
            logger.error(f"Contact notification email failed: {e}")

    return {"success": True, "id": doc["id"], "email_sent": email_sent}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
