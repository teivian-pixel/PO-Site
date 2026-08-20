"""Backend API tests for Primal Origins / Echo."""
import os
import uuid
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL") or open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].split("\n")[0].strip()
API = f"{BASE_URL.rstrip('/')}/api"


@pytest.fixture(scope="module")
def s():
    return requests.Session()


def _unique_email(prefix="test"):
    return f"TEST_{prefix}_{uuid.uuid4().hex[:8]}@example.com"


# ---------- claim-spot ----------
class TestClaimSpot:
    def test_create_returns_referral_code(self, s):
        email = _unique_email("claim")
        r = s.post(f"{API}/claim-spot", json={"name": "Alice", "email": email})
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["referred_by"] is None
        assert d["email"] == email.lower()
        assert d["referral_code"].startswith("ECHO-")
        parts = d["referral_code"].split("-")
        assert len(parts) == 3 and len(parts[2]) == 6

    def test_idempotent_by_email(self, s):
        email = _unique_email("idem")
        r1 = s.post(f"{API}/claim-spot", json={"name": "Bob", "email": email})
        r2 = s.post(f"{API}/claim-spot", json={"name": "Bob2", "email": email.upper()})
        assert r1.status_code == 200 and r2.status_code == 200
        assert r1.json()["referral_code"] == r2.json()["referral_code"]

    def test_referral_sets_referred_by(self, s):
        email1 = _unique_email("ref1")
        r1 = s.post(f"{API}/claim-spot", json={"name": "Carol", "email": email1})
        code = r1.json()["referral_code"]
        email2 = _unique_email("ref2")
        r2 = s.post(f"{API}/claim-spot", json={"name": "Dan", "email": email2, "referral_code": code})
        assert r2.status_code == 200
        assert r2.json()["referred_by"] == code

    def test_invalid_email_422(self, s):
        r = s.post(f"{API}/claim-spot", json={"name": "X", "email": "not-an-email"})
        assert r.status_code == 422


# ---------- referral validate ----------
class TestReferral:
    def test_valid_code(self, s):
        r1 = s.post(f"{API}/claim-spot", json={"name": "Eve", "email": _unique_email("val")})
        code = r1.json()["referral_code"]
        r = s.get(f"{API}/referral/{code}")
        assert r.status_code == 200
        assert r.json()["valid"] is True

    def test_invalid_code(self, s):
        r = s.get(f"{API}/referral/ECHO-XXX-DEADBEEF")
        assert r.status_code == 200
        assert r.json()["valid"] is False


# ---------- contact ----------
class TestContact:
    def test_contact_success(self, s):
        r = s.post(f"{API}/contact", json={
            "name": "Frank",
            "email": _unique_email("ct"),
            "topic": "General Enquiry",
            "message": "Hello there",
        })
        assert r.status_code == 200
        assert r.json()["success"] is True

    # Iteration 4: contact must dispatch owner notification email via Resend
    def test_contact_email_sent_true(self, s):
        r = s.post(f"{API}/contact", json={
            "name": "TEST_QA Iter4",
            "email": _unique_email("ct_email"),
            "topic": "Coaching",
            "message": "TEST_ iteration4 contact email dispatch check",
        })
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["success"] is True
        assert isinstance(d.get("id"), str) and len(d["id"]) > 0
        assert d.get("email_sent") is True, f"email_sent not true: {d}"

    def test_contact_default_topic_and_validation(self, s):
        r = s.post(f"{API}/contact", json={
            "name": "TEST_NoTopic",
            "email": _unique_email("ct_notopic"),
            "message": "TEST_ no topic supplied",
        })
        assert r.status_code == 200, r.text
        assert r.json()["success"] is True

        bad = s.post(f"{API}/contact", json={"name": "X", "email": "nope", "message": "hi"})
        assert bad.status_code == 422

        missing = s.post(f"{API}/contact", json={"name": "X", "email": _unique_email("m")})
        assert missing.status_code == 422

    def test_contact_html_injection_escaped(self, s):
        r = s.post(f"{API}/contact", json={
            "name": "TEST_<script>alert(1)</script>",
            "email": _unique_email("ct_xss"),
            "topic": "General Enquiry",
            "message": "<b>bold</b> & <img src=x>",
        })
        assert r.status_code == 200, r.text
        assert r.json()["success"] is True


# ---------- persistence / db ----------
class TestPersistence:
    def test_contact_persisted_in_mongo(self, s):
        import asyncio
        from motor.motor_asyncio import AsyncIOMotorClient
        from dotenv import dotenv_values

        env = dotenv_values("/app/backend/.env")
        email = _unique_email("persist")
        r = s.post(f"{API}/contact", json={
            "name": "TEST_Persist",
            "email": email,
            "topic": "Echo App",
            "message": "TEST_ persistence check",
        })
        assert r.status_code == 200
        doc_id = r.json()["id"]

        async def _fetch():
            cl = AsyncIOMotorClient(env["MONGO_URL"])
            try:
                return await cl[env["DB_NAME"]].contact_messages.find_one({"id": doc_id})
            finally:
                cl.close()

        doc = asyncio.run(_fetch())
        assert doc is not None, "contact message not stored"
        assert doc["email"] == email.lower()
        assert doc["topic"] == "Echo App"
        assert doc["message"] == "TEST_ persistence check"

    def test_claim_persisted_in_mongo(self, s):
        import asyncio
        from motor.motor_asyncio import AsyncIOMotorClient
        from dotenv import dotenv_values

        env = dotenv_values("/app/backend/.env")
        email = _unique_email("claimpersist")
        r = s.post(f"{API}/claim-spot", json={"name": "TEST_Claim", "email": email})
        assert r.status_code == 200
        code = r.json()["referral_code"]

        async def _fetch():
            cl = AsyncIOMotorClient(env["MONGO_URL"])
            try:
                return await cl[env["DB_NAME"]].beta_signups.find_one({"email": email.lower()})
            finally:
                cl.close()

        doc = asyncio.run(_fetch())
        assert doc is not None
        assert doc["referral_code"] == code
