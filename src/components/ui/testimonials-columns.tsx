"use client";

import React from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/**
 * Vertical infinite-scroll testimonial column. Adapted from the
 * 21st.dev `testimonials-columns-1` primitive — restyled to match
 * the ISAVE dark-glass design system.
 *
 * Animation technique: the inner column duplicates its children twice
 * and animates `translateY` from 0 → -50% on a linear loop. Because the
 * second half is an identical copy of the first, when the animation
 * reaches -50% the visible content is at the same position it started
 * at — so the loop is seamless with no jump.
 */

export type Testimonial = {
  text: string;
  name: string;
  role: string; // we use dates here ("Nov 2019")
  initials?: string;
};

export function TestimonialsColumn(props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={props.className}>
      <motion.div
        // Keyframe array (0% → -50%) is what makes the loop seamless with
        // Framer Motion. A bare `animate={{ translateY: '-50%' }}` with
        // repeat:Infinity completes once and settles at -50% rather than
        // jumping back; the array forces it to truly loop.
        animate={{ translateY: ["0%", "-50%"] }}
        transition={{
          duration: props.duration || 14,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, dupIndex) => (
            <React.Fragment key={dupIndex}>
              {props.testimonials.map((t, i) => (
                <TestimonialCard key={`${dupIndex}-${i}`} t={t} />
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
}

function Avatar({ name, initials }: { name: string; initials?: string }) {
  const ini =
    initials ||
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  return (
    <span
      aria-hidden
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-brand-500/30 to-brand-accent/20 mono text-[12px] text-white"
    >
      {ini}
    </span>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <SpotlightCard className="rounded-3xl max-w-xs w-full">
      <article className="glass rounded-3xl p-7 w-full shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
        <Stars />
        <p className="mt-4 text-[14.5px] leading-relaxed text-white/80">{t.text}</p>
        <footer className="flex items-center gap-3 mt-6">
          <Avatar name={t.name} initials={t.initials} />
          <div className="flex flex-col">
            <span className="display text-[14px] tracking-tight leading-5 text-white">{t.name}</span>
            <span className="mono text-[10.5px] tracking-wider opacity-50 leading-5 text-white">{t.role}</span>
          </div>
        </footer>
      </article>
    </SpotlightCard>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          className="text-brand-accent"
          fill="currentColor"
        >
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
        </svg>
      ))}
    </div>
  );
}
