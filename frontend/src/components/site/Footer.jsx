import { Link } from "react-router-dom";
import { CONSULT_URL, NAV_LINKS, COMPANY, LOGO_WHITE } from "@/data/content";

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
              <Link
                to="/terms"
                data-testid="footer-terms-link"
                className="hover:text-echo-cyan transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                data-testid="footer-privacy-link"
                className="hover:text-echo-cyan transition-colors"
              >
                Privacy Policy
              </Link>
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
