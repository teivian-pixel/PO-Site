import { useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { CoachingHero } from "@/components/site/CoachingHero";
import { Methodology } from "@/components/site/Methodology";
import { Testimonials } from "@/components/site/Testimonials";
import { About } from "@/components/site/About";
import { EchoSection } from "@/components/site/EchoSection";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export default function Landing({ initialHash }) {
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "") || initialHash;
    if (hash) {
      const scroll = () => {
        const el = document.querySelector(`#${hash}`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      };
      setTimeout(scroll, 400);
    }
  }, [initialHash]);

  return (
    <main data-testid="landing-page">
      <Navbar />
      <CoachingHero />
      <Methodology />
      <Testimonials />
      <About />
      <EchoSection />
      <Contact />
      <Footer />
    </main>
  );
}
