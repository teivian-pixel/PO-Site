import { TESTIMONIALS } from "@/data/content";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section
      data-testid="testimonials-section"
      className="bg-stone-900 py-24 md:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 mb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-echo-amber mb-4">
          Here's what some of our mentees have to say
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white max-w-2xl leading-tight">
          Growth that leaves a mark.
        </h2>
      </div>

      <div className="relative">
        <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <div
              key={i}
              data-testid={`testimonial-${i}`}
              className="w-[340px] shrink-0 bg-stone-800/60 border border-white/5 rounded-3xl p-8"
            >
              <Quote className="text-terracotta mb-4" size={28} />
              <p className="font-serif text-lg text-stone-100 leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-stone-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
