"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import ServiceIcon from "@/components/ui/ServiceIcon";

const CATEGORIES = ["All", "Corporate Event", "Conference", "Wedding", "Hybrid Event", "Studio Production", "Product Launch", "Non-Profit", "Trade Show"];

const view = { once: true, amount: 0.15 } as const;

export default function ProjectsGrid() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projects
    : projects.filter(p => p.category === active);

  return (
    <section className="pb-28 md:pb-40">
      <div className="mx-auto max-w-7xl px-6">

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap gap-2 mb-12 md:mb-16"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={[
                "px-4 py-2 rounded-full text-[13px] border transition-all duration-200",
                active === cat
                  ? "bg-brand-500 text-[#051221] border-brand-500"
                  : "bg-white/[0.03] text-white/65 border-white/10 hover:border-white/25 hover:text-white",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
              className="group glass rounded-3xl overflow-hidden flex flex-col hover:border-white/20 transition-all duration-500"
            >
              {/* Card header — accent gradient */}
              <div
                className="relative h-[140px] md:h-[160px] flex items-end p-6"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}22 0%, ${project.accent}0a 60%, transparent 100%)`,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Large faint icon */}
                <span
                  className="absolute right-5 top-5 opacity-[0.12]"
                  style={{ color: project.accent }}
                >
                  <ServiceIcon kind={project.icon} className="!w-16 !h-16" />
                </span>

                {/* Category + year */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                      style={{ background: project.accent + "22", color: project.accent }}
                    >
                      <ServiceIcon kind={project.icon} className="!w-3.5 !h-3.5" />
                    </span>
                    <span className="eyebrow text-[10px] text-white/50">{project.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="mono text-[11px] tracking-widest text-white/35">{project.location}</span>
                    <span className="text-white/20">·</span>
                    <span className="mono text-[11px] tracking-widest text-white/35">{project.year}</span>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="display text-[19px] md:text-[21px] leading-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-[14px] text-white/60 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Service tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.services.map(s => (
                    <span
                      key={s}
                      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] border"
                      style={{
                        background: project.accent + "0f",
                        borderColor: project.accent + "30",
                        color: project.accent,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-white/40 text-[15px]">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
