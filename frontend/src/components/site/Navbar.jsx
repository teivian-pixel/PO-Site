import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, CONSULT_URL } from "@/data/content";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-10 h-20 flex items-center justify-between">
        <button
          onClick={() => go("#home")}
          data-testid="nav-logo"
          className="flex items-center gap-2 text-white"
        >
          <span className="font-display text-lg font-800 tracking-tight">
            PRIMAL<span className="text-echo-cyan">.</span>ORIGINS
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-sm text-white/70 hover:text-white transition-colors tracking-wide"
            >
              {l.label}
            </button>
          ))}
          <a
            href={CONSULT_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="nav-book-btn"
            className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-white hover:bg-terracotta/90 transition-colors"
          >
            Book a Call
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div
          className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4"
          data-testid="nav-mobile-menu"
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="text-left text-white/80 hover:text-white py-1"
            >
              {l.label}
            </button>
          ))}
          <a
            href={CONSULT_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-terracotta px-5 py-3 text-center text-white"
          >
            Book a Call
          </a>
        </div>
      )}
    </motion.header>
  );
};
