"use client";

import { motion } from "framer-motion";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";

const PROJECTS: FocusRailItem[] = [
  {
    id: "muna-2025",
    title: "MUNA Convention 2025",
    meta: "EVENT PRODUCTION · PHILADELPHIA",
    description:
      "Muslim Ummah of North America Convention — August 8–10 at the Pennsylvania Convention Center. Over 20,000 attendees. Full multi-camera production, video switching and live broadcast.",
    imageSrc: "/brand/muna-2025.jpeg",
  },
  {
    id: "placeholder-2",
    title: "More cases coming",
    imageSrc: "",
    placeholder: true,
  },
  {
    id: "placeholder-3",
    title: "More cases coming",
    imageSrc: "",
    placeholder: true,
  },
];

const view = { once: true, amount: 0.2 } as const;

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36 overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10"
           style={{ background: "radial-gradient(55% 40% at 50% 0%, rgba(42,159,250,0.08), transparent 70%)" }} />

      {/* Hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12 md:mb-16"
        >
          <div>
            <span className="eyebrow">◇  OUR WORK</span>
            <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.04] tracking-tightest text-white">
              Events we&apos;ve been part of.
            </h2>
          </div>
          <p className="text-[15px] text-white/55 max-w-sm leading-relaxed">
            A selection of conferences, productions and live events where
            ISAVE handled the AV — end to end.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={view}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <FocusRail items={PROJECTS} loop={true} />
      </motion.div>
    </section>
  );
}
