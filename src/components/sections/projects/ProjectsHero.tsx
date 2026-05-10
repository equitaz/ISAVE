"use client";

import { motion } from "framer-motion";

export default function ProjectsHero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-52 md:pb-28 overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10"
           style={{ background: "radial-gradient(55% 45% at 50% 0%, rgba(42,159,250,0.14), transparent 70%)" }} />

      <div className="mx-auto max-w-7xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="eyebrow"
        >
          ◇  OUR WORK
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
          className="display mt-5 text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] tracking-tightest text-white max-w-3xl"
        >
          Events we&apos;ve<br />been part of.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.16 }}
          className="mt-7 max-w-xl text-[16px] text-white/60 leading-relaxed"
        >
          A selection of conferences, weddings, livestreams, studio productions
          and live events where we handled the AV — end to end.
        </motion.p>
      </div>
    </section>
  );
}
