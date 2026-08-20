import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { TERMS, LOGO_WHITE } from "@/data/content";

export default function Terms() {
  return (
    <main data-testid="terms-page" className="min-h-screen bg-black text-zinc-300 echo-scope">
      <header className="border-b border-zinc-900">
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-8 flex items-center justify-between">
          <img src={LOGO_WHITE} alt="Primal Origins" className="h-12 w-auto" />
          <Link
            to="/"
            data-testid="terms-back-link"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-echo-cyan transition-colors"
          >
            <ArrowLeft size={16} /> Back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 md:px-10 py-16">
        <h1 className="font-display text-3xl md:text-4xl text-white mb-8">
          Terms and Conditions
        </h1>
        <div className="space-y-6 text-sm md:text-base leading-relaxed">
          {TERMS.map((s, i) => (
            <div key={i} data-testid={`terms-section-${i}`}>
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
      </div>
    </main>
  );
}
