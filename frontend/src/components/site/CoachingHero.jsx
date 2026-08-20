import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { IMAGES, CONSULT_URL } from "@/data/content";

export const CoachingHero = () => {
  return (
    <section
      id="coaching"
      data-testid="coaching-hero"
      className="relative bg-sand pt-36 pb-24 overflow-hidden"
    >
      {/* dark bar behind navbar for contrast */}
      <div className="absolute top-0 inset-x-0 h-24 bg-black" aria-hidden />
      <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-terracotta">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Rated 5 stars by mentees
            </span>
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-terracotta mb-4">
            Live on your own terms
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-stone-900 tracking-tight">
            It's time to{" "}
            <span className="italic text-terracotta">rediscover</span> your
            drive.
          </h1>

          <p className="mt-6 text-base text-stone-600 max-w-md leading-relaxed">
            The only life coaching programme you'll ever need. Primal Origins
            empowers leaders to forge authentic paths of growth through
            holistic, human-first frameworks.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={CONSULT_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="coaching-hero-cta"
              className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-white font-medium hover:bg-stone-900 transition-colors"
            >
              Book a Free Consultation
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <button
              onClick={() =>
                document
                  .querySelector("#methodology")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm font-medium text-stone-700 underline underline-offset-4 hover:text-terracotta"
            >
              Explore our methodology
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-stone-300/60">
            <img
              src={IMAGES.coachingHero}
              alt="Coaching session"
              className="w-full h-[420px] lg:h-[560px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 max-w-[220px] hidden sm:block">
            <p className="font-serif text-2xl text-stone-900">Holistic</p>
            <p className="text-sm text-stone-500 mt-1">
              frameworks for human-centric growth.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
