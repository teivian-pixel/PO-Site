import { useState } from "react";
import { REVIEWS, SPOTLIGHT } from "@/data/content";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Expand, Quote, Star } from "lucide-react";

export const Testimonials = () => {
  const items = [...REVIEWS, ...REVIEWS];
  const [active, setActive] = useState(null);

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
        <p className="text-sm text-stone-400 mt-3">Tap any review to read it in full.</p>
      </div>

      <div className="mx-auto max-w-4xl px-6 md:px-10 mb-16">
        <figure
          data-testid="review-spotlight"
          className="relative rounded-3xl border border-white/10 bg-stone-800/50 p-8 md:p-12"
        >
          <Quote className="text-echo-amber mb-5" size={40} />
          <div className="flex text-echo-amber mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>
          <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-stone-100 italic">
            "{SPOTLIGHT.quote}"
          </blockquote>
          <figcaption className="mt-6 font-serif text-lg text-echo-amber">
            — {SPOTLIGHT.name}
          </figcaption>
        </figure>
      </div>

      <div className="relative">
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap">
          {items.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(src)}
              data-testid={`review-${i}`}
              className="group relative w-[300px] sm:w-[340px] shrink-0 rounded-3xl overflow-hidden border border-white/5 shadow-2xl focus:outline-none focus:ring-2 focus:ring-echo-cyan"
            >
              <img
                src={src}
                alt={`Client review ${(i % REVIEWS.length) + 1}`}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand size={15} />
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-md bg-transparent border-0 p-0 shadow-none">
          <DialogTitle className="sr-only">Client review</DialogTitle>
          {active && (
            <img
              src={active}
              alt="Client review"
              data-testid="review-lightbox-image"
              className="w-full rounded-3xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
