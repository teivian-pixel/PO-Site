import { CONSULT_URL, NAV_LINKS, COMPANY } from "@/data/content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TERMS = `By accessing and using the Primal Origins website, coaching services, and the Echo platform, you agree to be bound by these Terms and Conditions. Our coaching services are provided for personal and organisational development purposes and do not constitute medical, legal, or financial advice.

Echo is a high-accountability connection platform currently operating in a beta phase. Access is subject to identity verification and adherence to our community protocols. Accounts found to be fraudulent, automated, or in breach of our accountability standards may be suspended or removed.

All content, frameworks, and the proprietary Primal Methodology remain the intellectual property of PRIMAL ORIGINS PTY LTD. Unauthorised reproduction is prohibited. These terms are governed by the laws of Victoria, Australia.`;

const PRIVACY = `PRIMAL ORIGINS PTY LTD is committed to protecting your privacy. We collect personal information such as your name and email address when you book a consultation, submit an enquiry, or join the Echo beta.

For Echo, we may collect additional verification data (identity and biometric information) solely for the purpose of multi-layered identity verification and to maintain the integrity of our community. This data is handled with government-grade security standards and is never sold to third parties.

You may request access to, correction of, or deletion of your personal data at any time by contacting us. We retain data only as long as necessary to provide our services and comply with legal obligations, in accordance with the Australian Privacy Principles.`;

const LegalDialog = ({ label, title, body, testid }) => (
  <Dialog>
    <DialogTrigger asChild>
      <button
        data-testid={testid}
        className="text-left text-zinc-400 hover:text-echo-cyan transition-colors"
      >
        {label}
      </button>
    </DialogTrigger>
    <DialogContent className="max-w-2xl bg-zinc-950 border-zinc-800 text-zinc-300 max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl text-white">
          {title}
        </DialogTitle>
      </DialogHeader>
      <div className="whitespace-pre-line text-sm leading-relaxed mt-2">
        {body}
      </div>
    </DialogContent>
  </Dialog>
);

export const Footer = () => {
  const go = (href) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      data-testid="site-footer"
      className="bg-black text-zinc-400 border-t border-zinc-900 echo-scope"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-lg text-white tracking-tight">
            PRIMAL<span className="text-echo-cyan">.</span>ORIGINS
          </p>
          <p className="mt-4 text-sm leading-relaxed max-w-xs">
            Bridging operational efficiency and human resonance through the
            Primal Methodology and the Echo application.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-600 mb-4">
            Navigation
          </p>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  data-testid={`footer-nav-${l.label.toLowerCase()}`}
                  className="hover:text-echo-cyan transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-600 mb-4">
            Company
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <LegalDialog
                label="Terms & Conditions"
                title="Terms & Conditions"
                body={TERMS}
                testid="footer-terms-link"
              />
            </li>
            <li>
              <LegalDialog
                label="Privacy Policy"
                title="Privacy Policy"
                body={PRIVACY}
                testid="footer-privacy-link"
              />
            </li>
            <li>
              <a
                href={CONSULT_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-echo-cyan transition-colors"
              >
                Consulting
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-600 mb-4">
            Connect
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <button
                onClick={() => go("#contact")}
                data-testid="footer-contact-link"
                className="hover:text-echo-cyan transition-colors"
              >
                Contact Us
              </button>
            </li>
            <li>
              <a
                href="mailto:hello@primal-origins.com"
                className="hover:text-echo-cyan transition-colors"
              >
                hello@primal-origins.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
          <p data-testid="footer-company-registration">
            {COMPANY.legalName} · ACN: {COMPANY.acn}
          </p>
          <p>© {new Date().getFullYear()} Primal Origins. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
