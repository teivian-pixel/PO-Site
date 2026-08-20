# Primal Origins — Product Requirements (PRD)

## Original Problem Statement
Redesign primal-origins.com into a single-page site with a top navigation bar (jump-to-section) and a rich footer (company registration, full company name, T&C, Privacy Policy, Contact). Two equally-prominent offerings:
- **Primal Origins** — life/relationship/career coaching (warm, premium, editorial aesthetic).
- **Echo by Primal Origins** — high-accountability dating/connection app (dark, clicksphone.com/communicator-inspired aesthetic).
Content reused from the live site. "Claim Your Spot" form captures Name + Email + optional Referral Code and generates a referral code; should eventually push signups to a Google Sheet via webhook.

## User Choices
- Balanced prominence for both brands.
- Echo section uses the dark clicksphone tech aesthetic; rest of page warm/premium.
- Form fields: Name, Email, Referral Code (optional); referral code generated on signup.
- Google Sheet webhook: user provided a Sheet URL (not yet a webhook endpoint).

## Architecture
- **Frontend**: React (CRA + craco, @ alias), Tailwind, Shadcn UI, Framer Motion. Single page (`/` and `/echo`) composed in `src/pages/Landing.jsx` with section components under `src/components/site/`.
- **Backend**: FastAPI + Motor/MongoDB. Routes: `/api/claim-spot`, `/api/referral/{code}`, `/api/contact`. Referral code format `ECHO-<PREFIX>-<HEX>`. Optional webhook forward via `GOOGLE_SHEET_WEBHOOK_URL`.
- **DB collections**: `beta_signups`, `contact_messages`.

## Personas
- Prospective coaching client seeking clarity/direction.
- Prospective Echo beta user valuing verified, high-accountability connection.

## Implemented (2026-07-03)
- Single-page redesign: sticky glass navbar, coaching hero, methodology, testimonials marquee, about, dark Echo section (3 feature cards + floating device), contact form, rich footer with ACN + legal dialogs.
- Working Claim Your Spot form → generates & displays referral code (copy-to-clipboard), idempotent by email, referral linkage.
- Working Contact form with topic select. All flows tested 100% (backend + frontend).

## Backlog
- **P1**: Inline consultation booking embed; waitlist position counter.

## Live integrations (as of iteration 4)
- Google Sheet sync: LIVE. `GOOGLE_SHEET_WEBHOOK_URL` set to the user's Apps Script exec URL; claim-spot signups append (Date, full_name, referred_by, email) → 200 verified. Apps Script trigger generates codes + reward emails.
- Contact email: LIVE via Emergent-managed Resend. `/api/contact` emails `CONTACT_NOTIFY_EMAIL` (info@primal-origins.com) with the submission (reply-to = submitter). email_sent:true verified (provider 202). Contact no longer forwarded to the signup sheet.
- Review spotlight: Donna Yip's review pinned as a large featured quote above the review marquee.

## Session Update (2026-08-20)
- Nav reordered to Methodology, Testimonials, About, Echo, Contact; "Coaching" link removed (only scrolled to top, redundant with logo click).
- Added `id="testimonials"` anchor to Testimonials.jsx so nav can jump directly to it.
- Terms & Privacy Policy converted from footer modal dialogs to standalone routed pages (`/terms`, `/privacy`) so the Echo mobile app can deep-link to them directly. New files: `pages/Terms.jsx`, `pages/Privacy.jsx`; routes registered in `App.js`; Footer.jsx now links via react-router `Link` instead of Dialog triggers.
- Verified via screenshot_tool: nav order/labels, testimonials scroll-to, and both new legal page URLs render correctly.

## Outstanding
- Optional: inline consultation booking; waitlist position counter; admin list endpoint for stored contact_messages.
