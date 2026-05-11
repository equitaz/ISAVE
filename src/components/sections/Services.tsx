"use client";

import { motion } from "framer-motion";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { services } from "@/lib/services";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const PARTNERS = [
  "Event planners",
  "Corporate teams",
  "Hotels",
  "Venues",
  "Wedding planners",
  "Non-profits",
  "Trade shows",
  "Private events",
];

const view = { once: true, amount: 0.2 } as const;

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.7 }}
              className="eyebrow"
            >
              ◇  SERVICES · 05 CAPABILITIES
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="display mt-4 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] tracking-tightest text-white max-w-3xl"
            >
              Full-service AV production.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-white/60 max-w-md text-[15px] leading-relaxed"
          >
            From event production and livestreaming to equipment rental, studio
            services and technical support — ISAVE helps clients create
            professional AV experiences for events, conferences, productions and
            private gatherings.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <SpotlightCard key={s.num} className="rounded-3xl h-full">
            <motion.article
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              className="group relative glass rounded-3xl p-7 md:p-8 flex flex-col h-full overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                   style={{ background: "radial-gradient(50% 60% at 30% 0%, rgba(42,159,250,0.15), transparent 70%)" }} />

              <header className="relative flex items-start justify-between mb-8">
                <span className="mono text-[11px] tracking-[0.22em] text-white/40">
                  {s.num} / 05
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-brand-500 group-hover:text-white group-hover:bg-brand-500 group-hover:border-brand-500 transition-all duration-500">
                  <ServiceIcon kind={s.icon} />
                </span>
              </header>

              <h3 className="display text-[22px] md:text-[24px] leading-tight text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] text-white/60 leading-relaxed">{s.desc}</p>

              <ul className="mt-7 space-y-2.5 flex-1">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[14px] text-white/75">
                    <span className="mt-[7px] h-1 w-1 rounded-full bg-brand-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <footer className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
                <span className="text-[12px] text-white/45">Available now</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 group-hover:text-white group-hover:border-white/30 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </footer>
            </motion.article>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Who we work with */}
      <div className="mx-auto max-w-7xl px-6 mt-32 md:mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.7 }}
              className="eyebrow"
            >
              ◇  PARTNERS
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.9, delay: 0.05 }}
              className="display mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight tracking-tightest text-white"
            >
              Who we work with.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.9, delay: 0.12 }}
              className="mt-5 text-[15px] text-white/60 leading-relaxed max-w-md"
            >
              We support businesses, event professionals, venues and private
              clients with reliable AV production and technical event services.
            </motion.p>
          </div>
          <div className="lg:col-span-8 flex flex-wrap gap-3">
            {PARTNERS.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={view}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                className="chip text-white/75 hover:text-white hover:border-white/30 transition cursor-default"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                {p}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Services CTA */}
      <div className="mx-auto max-w-7xl px-6 mt-32 md:mt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 1 }}
          className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16 noise"
        >
          <div className="pointer-events-none absolute -top-1/2 -right-1/3 w-[600px] h-[600px] rounded-full"
               style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(42,159,250,0.3), transparent 70%)" }} />
          <div className="pointer-events-none absolute -bottom-1/2 -left-1/3 w-[500px] h-[500px] rounded-full"
               style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(255,154,12,0.18), transparent 70%)" }} />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow">◇  GET STARTED</span>
              <h3 className="display mt-4 text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.08] tracking-tightest text-white max-w-xl">
                Need help choosing the right setup?
              </h3>
              <p className="mt-5 text-[15px] text-white/65 max-w-lg leading-relaxed">
                Tell us about your event and we&apos;ll help you choose the right
                AV services, equipment and technical support.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
              <a href="#schedule" className="btn-primary">
                Plan Your Event <span>→</span>
              </a>
              <a href="#schedule" className="btn-secondary">
                Book a Consultation
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
