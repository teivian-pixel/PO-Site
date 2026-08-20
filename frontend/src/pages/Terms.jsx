import { Link } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import { TERMS, LOGO_WHITE } from "@/data/content";

const LAST_UPDATED = new Date().toLocaleDateString("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function Terms() {
  return (
    <main data-testid="terms-page" className="min-h-screen bg-black text-zinc-300 echo-scope print:bg-white print:text-black">
      <header className="border-b border-zinc-900 print:hidden">
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-8 flex items-center justify-between">
          <img src={LOGO_WHITE} alt="Primal Origins" className="h-24 w-auto" />
          <div className="flex items-center gap-5">
            <button
              onClick={() => window.print()}
              data-testid="terms-print-btn"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-echo-cyan transition-colors"
            >
              <Printer size={16} /> Print
            </button>
            <Link
              to="/"
              data-testid="terms-back-link"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-echo-cyan transition-colors"
            >
              <ArrowLeft size={16} /> Back to site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 print:py-6">
        <h1 className="font-display text-3xl md:text-4xl text-white mb-2 print:text-black">
          Terms and Conditions
        </h1>
        <p
          data-testid="terms-last-updated"
          className="text-xs uppercase tracking-[0.2em] text-echo-amber mb-8 print:text-black"
        >
          Last updated: {LAST_UPDATED}
        </p>
        <div className="space-y-6 text-sm md:text-base leading-relaxed print:text-black">
          {TERMS.map((s, i) => (
            <div key={i} data-testid={`terms-section-${i}`}>
              <p className="font-semibold text-white print:text-black">{s.h}</p>
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
      </div>
    </main>
  );
}
