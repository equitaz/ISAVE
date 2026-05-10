"use client";

import { motion } from "framer-motion";
import {
  TestimonialsColumn,
  type Testimonial,
} from "@/components/ui/testimonials-columns";
import { testimonials } from "@/lib/testimonials";

/**
 * Testimonials — 3 vertical columns scrolling at slightly different speeds.
 * Real, verbatim recommendations from the client's Facebook reviews.
 * Top + bottom of the rail are masked into the background for a clean
 * floating-cards effect, and each column moves on its own loop duration
 * so columns desync visually.
 */

// Map our review schema → component schema (date becomes the "role" line)
const items: Testimonial[] = testimonials.map((t) => ({
  text: t.quote,
  name: t.name,
  role: t.date,
}));

const firstColumn = items.slice(0, 3);
const secondColumn = items.slice(3, 6);
const thirdColumn = items.slice(6, 9);

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(42,159,250,0.10), transparent 70%)",
        }}
      />

      <div className="container z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
        >
          <span className="eyebrow">◇  CLIENT VOICES</span>
          <h2 className="display mt-5 text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] tracking-tightest text-white">
            What clients say.
          </h2>
          <p className="mt-5 text-white/60 max-w-md text-[15px] leading-relaxed">
            100% recommended across 15 verified reviews. Every quote below is a
            real recommendation from a real client.
          </p>
        </motion.div>

        {/* Three columns of vertical-scrolling cards.
            Mask gradient blends top + bottom into the section background. */}
        <div
          className="flex justify-center gap-6 mt-14 md:mt-20 max-h-[740px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={22} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={28}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={25}
          />
        </div>

        {/* Footer strip — verified badge + count */}
        <div className="mt-12 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <span className="text-sm text-white/65">
              100% recommend · 15 reviews
            </span>
          </div>
          <span className="mono text-[11px] tracking-widest text-white/40">
            VERIFIED · FACEBOOK
          </span>
        </div>
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      className="text-brand-accent"
      fill="currentColor"
    >
      <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
    </svg>
  );
}
