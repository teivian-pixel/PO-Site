import { motion } from "framer-motion";
import { ScanFace, Sparkles, ShieldAlert } from "lucide-react";
import { IMAGES, ECHO_FEATURES } from "@/data/content";
import { ClaimForm } from "@/components/site/ClaimForm";

const ICONS = {
  verification: ScanFace,
  resonance: Sparkles,
  accountability: ShieldAlert,
};

export const EchoSection = () => {
  return (
    <section
      id="echo"
      data-testid="echo-section"
      className="echo-scope relative bg-obsidian text-white overflow-hidden"
    >
      {/* radial glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-echo-cyan/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-echo-amber/10 blur-[120px]" />
      <div className="grain-overlay absolute inset-0 opacity-70 pointer-events-none" />

      {/* Hero */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-28 md:pt-36 pb-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-echo-cyan mb-5">
              Echo by Primal Origins
            </p>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-900 tracking-tighter leading-[0.95] echo-glow-text">
              Integrity in
              <br />
              connection.
            </h2>
            <p className="mt-7 text-zinc-400 max-w-md leading-relaxed">
              A high-accountability platform where technology meets human
              resonance. Every member is vetted through multi-layered identity
              verification to ensure a community of total authenticity.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#joinbeta"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#joinbeta")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="echo-join-beta-btn"
                className="rounded-md bg-echo-cyan px-7 py-3.5 font-semibold text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-shadow"
              >
                Find Real Connection
              </a>
              <span className="inline-flex items-center rounded-md border border-zinc-800 px-5 py-3.5 text-sm text-zinc-400">
                No bots. No fakes. Verified only.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[380px] w-[380px] rounded-full border border-echo-cyan/20 animate-pulse-glow" />
            </div>
            <div className="relative animate-float">
              <img
                src={IMAGES.echoDevice}
                alt="Echo app login screen"
                className="w-[300px] sm:w-[360px] rounded-[2rem] shadow-2xl shadow-echo-cyan/20"
              />
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 font-display text-2xl sm:text-3xl lg:text-4xl text-white max-w-3xl leading-tight tracking-tight"
        >
          Beyond the profile.{" "}
          <span className="text-zinc-500">
            We use proprietary computational logic to identify the natural
            resonance that exists before a single word is spoken.
          </span>
        </motion.p>
      </div>

      {/* Feature cards */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {ECHO_FEATURES.map((f, i) => {
            const Icon = ICONS[f.key];
            return (
              <motion.div
                key={f.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-testid={`echo-feature-${f.key}`}
                className="group rounded-md border border-zinc-800 bg-zinc-900/60 p-8 hover:border-echo-cyan/50 hover:shadow-[0_0_40px_rgba(0,229,255,0.08)] transition-all"
              >
                <div className="w-12 h-12 rounded-md border border-zinc-800 bg-black flex items-center justify-center text-echo-cyan group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 font-display text-xl text-white tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Claim form */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pb-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-echo-amber mb-4">
              Limited Access
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-tighter leading-tight">
              Claim your spot now.
            </h2>
            <p className="mt-5 text-zinc-400 max-w-md leading-relaxed">
              By removing anonymity and implementing strict entry protocols,
              we've created a space where digital connections have real-world
              integrity. Reserve your place and receive a personal referral
              code to invite others.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <ClaimForm />
          </div>
        </div>
      </div>
    </section>
  );
};
