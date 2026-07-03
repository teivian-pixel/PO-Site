import { motion } from "framer-motion";
import { IMAGES } from "@/data/content";

const PILLARS = [
  {
    title: "Primal Methodology",
    body: "A sophisticated, evidence-based framework inspired by humanistic psychology for personal and organisational growth.",
  },
  {
    title: "Echo App",
    body: "A flagship high-accountability platform empowering meaningful, transparent, and intentional connections.",
  },
  {
    title: "Tech & Human Experience",
    body: "We unite technology and applied psychology to drive responsible solutions in human connectivity.",
  },
];

export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="bg-sand py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta mb-4">
              Rooted in human nature
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight tracking-tight">
              Visionary methods for authentic connection.
            </h2>
            <p className="mt-5 text-stone-600 leading-relaxed max-w-lg">
              Founded in 2020, Primal Origins was built on the fundamental
              principles of Maslow's Humanistic Approach. We created a grounded
              method — the Primal Methodology — combining psychological rigour
              with technological clarity to elevate human connection.
            </p>

            <div className="mt-10 space-y-4">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  data-testid={`about-pillar-${i}`}
                  className="border-l-2 border-terracotta/40 pl-5 py-1"
                >
                  <h3 className="font-serif text-xl text-stone-900">
                    {p.title}
                  </h3>
                  <p className="text-sm text-stone-600 mt-1">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src={IMAGES.about}
              alt="Authentic connection"
              className="w-full h-[420px] lg:h-[540px] object-cover rounded-[2rem] shadow-xl shadow-stone-200"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
