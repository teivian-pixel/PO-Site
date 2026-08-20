import { CONSULT_URL, NAV_LINKS, COMPANY, LOGO_WHITE, TERMS, PRIVACY } from "@/data/content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const LegalDialog = ({ label, title, sections, testid }) => (
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
        <DialogDescription className="sr-only">
          {title} for Primal Origins and Echo.
        </DialogDescription>
      </DialogHeader>
      <div className="mt-2 space-y-5 text-sm leading-relaxed">
        {sections.map((s, i) => (
          <div key={i}>
            <p className="font-semibold text-white">{s.h}</p>
            {s.p && <p className="mt-1.5">{s.p}</p>}
            {s.li && (
              <ul className="mt-2 list-disc pl-5 space-y-1.5">
                {s.li.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
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
          <img
            src={LOGO_WHITE}
            alt="Primal Origins"
            className="h-20 w-auto"
          />
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
                title="Terms and Conditions"
                sections={TERMS}
                testid="footer-terms-link"
              />
            </li>
            <li>
              <LegalDialog
                label="Privacy Policy"
                title="Privacy Policy"
                sections={PRIVACY}
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
                href={`mailto:${COMPANY.email}`}
                className="hover:text-echo-cyan transition-colors"
              >
                {COMPANY.email}
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
