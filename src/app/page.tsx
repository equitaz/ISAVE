import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import Schedule from "@/components/sections/Schedule";
import Projects from "@/components/sections/Projects";
import ContactHero from "@/components/sections/ContactHero";

export default function Page() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <About />
      <Schedule />
      <Projects />
      <ContactHero />
    </>
  );
}
