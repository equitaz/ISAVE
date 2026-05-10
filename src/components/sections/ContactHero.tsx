"use client";

import { motion } from "framer-motion";

const view = { once: true, amount: 0.2 } as const;

export default function ContactHero() {
  return (
    <section
      className="relative pt-16 pb-28 md:pt-28 md:pb-44"
      style={{
        backgroundImage: "url('/brand/stage-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark scrim for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(6,8,16,0.65)", zIndex: 0 }}
      />

      {/* Amber color grade from bottom upward */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "linear-gradient(to top, rgba(255,154,12,0.82) 0%, rgba(200,100,6,0.60) 18%, rgba(130,60,4,0.36) 38%, rgba(40,15,2,0.14) 58%, transparent 75%)",
        }}
      />

      {/* Top hairline */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", zIndex: 1 }}
      />

      {/* Content — z-index above overlays */}
      <div className="relative mx-auto max-w-7xl px-6 text-center" style={{ zIndex: 2 }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.7 }}
          className="eyebrow"
        >
          ◇  LET&apos;S BUILD SOMETHING
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="display mt-6 text-[clamp(2.4rem,7vw,6rem)] leading-[0.98] tracking-tightest text-white"
        >
          Sound, light, picture<br className="hidden sm:block" />
          {" "}— delivered.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.9, delay: 0.18 }}
          className="mt-8 mx-auto max-w-xl text-[16px] text-white/70 leading-relaxed"
        >
          Tell us about your event, your venue and your audience.
          We&apos;ll bring the gear, the calm and the crew.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.9, delay: 0.28 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 w-full max-w-sm mx-auto sm:max-w-none sm:flex-row"
        >
          <a href="#schedule" className="btn-primary w-full sm:w-auto">
            Plan Your Event <span>→</span>
          </a>
          <a href="mailto:hello@isaveproduction.com" className="btn-secondary w-full sm:w-auto text-sm truncate">
            hello@isaveproduction.com
          </a>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={view}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 md:mt-16 mx-auto max-w-3xl grid grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Cell label="Response" value="< 24 h" />
          <Cell label="Coverage" value="National" />
          <Cell label="Crew" value="On-call" />
        </motion.div>
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="px-6 py-5 text-center"
      style={{ background: "rgba(6,8,16,0.50)" }}
    >
      <div className="display text-white text-[18px] md:text-[20px]">{value}</div>
      <div className="mono text-[10px] tracking-widest text-white/45 mt-1">
        {label.toUpperCase()}
      </div>
    </div>
  );
}
