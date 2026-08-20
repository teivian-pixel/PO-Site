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
- **P0 (blocked on user)**: Google Sheet sync — user must deploy a `doPost` Apps Script Web App and provide the URL for `GOOGLE_SHEET_WEBHOOK_URL`. doPost appends [Date, full_name, referred_by, email, '', '', ''] to Sheet1.
- **P1**: Inline consultation booking embed; waitlist position counter.

## Outstanding (as of iteration 3)
- Done: enlarged logos, reverted hero + methodology images, Echo login screen (Welcome 1.png) in phone frame, 7 real Drive reviews (compressed to webp + tap-to-enlarge lightbox), reduced hero spacing.
- Waiting on user: Apps Script doPost Web App deployment URL to activate Google Sheet sync; user confirmation of Echo phone + review layout.
- Review images stored at /app/frontend/public/reviews/1..7.webp (source Drive folder 17WGYsiGzo48a9qL5lXSIiexdIkmHua27).
