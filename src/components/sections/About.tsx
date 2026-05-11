"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const STATS = [
  { num: "15+", label: "Years in production" },
  { num: "100%", label: "Client recommend rate" },
  { num: "500+", label: "Events delivered" },
  { num: "24/7", label: "Production support" },
];

const view = { once: true, amount: 0.2 } as const;

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] max-w-[320px] sm:max-w-md mx-auto lg:mx-0">
              <div className="absolute -inset-4 rounded-[28px] border border-white/10" />
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 rounded-[24px]"
                   style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(42,159,250,0.45), transparent 70%)", filter: "blur(40px)" }} />
              <div className="relative h-full w-full rounded-[24px] overflow-hidden glass">
                <Image
                  src="/brand/ceo.jpeg"
                  alt="Mulham Katayah, founder of ISAVE Production"
                  width={800} height={1000}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="mono text-[10px] tracking-[0.22em] text-white/60">FOUNDER · DIRECTOR</div>
                  <div className="display text-white text-[18px] mt-1">Mulham Katayah</div>
                </div>
              </div>
              <CornerMark className="-top-2 -left-2" />
              <CornerMark className="-top-2 -right-2" />
              <CornerMark className="-bottom-2 -left-2" />
              <CornerMark className="-bottom-2 -right-2" />
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.7 }}
              className="eyebrow"
            >
              ◇  ABOUT ISAVE
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="display mt-4 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-tightest text-white"
            >
              Built by a producer<br />
              who lives behind the camera.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 1, delay: 0.15 }}
              className="mt-7 space-y-5 text-[15.5px] text-white/70 leading-relaxed max-w-xl"
            >
              <p>
                ISAVE Production began with a simple idea: every event deserves
                broadcast-grade audio and video, delivered by people who actually
                care about the room. Our founder Mulham Katayah has spent more
                than a decade engineering live productions, hybrid streams and
                studio shoots — and that obsession with quality runs through
                every job we ship.
              </p>
              <p>
                Today we&apos;re a tight crew of AV technicians, camera operators,
                editors and event producers. We bring the gear, the redundancy
                and the calm presence that turns a venue into a stage —
                conference rooms, ballrooms, places of worship, corporate
                campuses, content studios, weddings.
              </p>
              <p className="text-white/55">
                When clients say <span className="text-white">&ldquo;they go above and beyond expectations&rdquo;</span>,
                that&apos;s the bar. That&apos;s what we ship.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={view}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="rounded-2xl glass p-5"
                >
                  <div className="display text-[clamp(1.6rem,3vw,2.1rem)] text-white">{s.num}</div>
                  <div className="text-[12px] text-white/55 mt-1 leading-snug">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerMark({ className = "" }: { className?: string }) {
  return (
    <span className={`absolute h-3 w-3 ${className}`}>
      <span className="absolute inset-0 border-l border-t border-white/30" />
    </span>
  );
}
