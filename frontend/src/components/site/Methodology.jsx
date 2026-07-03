import { motion } from "framer-motion";
import { Compass, Layers, MessageCircle } from "lucide-react";
import { IMAGES, METHODOLOGY } from "@/data/content";

const ICONS = [Compass, Layers, MessageCircle];

export const Methodology = () => {
  return (
    <section
      id="methodology"
      data-testid="methodology-section"
      className="relative bg-sand py-24 md:py-32"
    >
      <div id="coaching" className="absolute -top-24" aria-hidden />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={IMAGES.methodology}
              alt="Mentorship in progress"
              className="w-full h-[380px] lg:h-[520px] object-cover rounded-[2rem] shadow-xl shadow-stone-200"
            />
            <div className="absolute -top-6 -right-6 bg-terracotta text-white rounded-2xl px-6 py-4 shadow-lg hidden sm:block">
              <p className="font-serif text-3xl leading-none">2020</p>
              <p className="text-xs mt-1 opacity-80">Founded on Maslow's approach</p>
            </div>
          </motion.div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta mb-4">
              The Primal Methodology
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-tight">
              Holistic frameworks. Human-centric growth.
            </h2>
            <p className="mt-5 text-stone-600 leading-relaxed max-w-lg">
              A sophisticated, evidence-based framework inspired by humanistic
              psychology for personal and organisational growth — combining
              psychological rigour with technological clarity.
            </p>

            <div className="mt-10 space-y-6">
              {METHODOLOGY.map((m, i) => {
                const Icon = ICONS[i];
                return (
                  <motion.div
                    key={m.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    data-testid={`methodology-card-${i}`}
                    className="flex gap-5 bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center text-terracotta">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-stone-900">
                        {m.title}
                      </h3>
                      <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                        {m.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
