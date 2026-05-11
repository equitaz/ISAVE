"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroCards } from "@/lib/services";

/**
 * Hero — looping video background with time-driven overlays.
 *
 * ALL animated elements (labels, intro, color grade, dim, AND the final
 * reveal) are driven imperatively via refs + CSS transitions.
 * Zero React state after mount = zero re-render lag during reveal.
 *
 * CSS transition is set on each element's style.transition; the timeupdate
 * handler simply sets opacity/transform and the GPU does the rest.
 */

const VIDEO_DURATION = 15.04;

const LABEL_WINDOWS = [
  { enter: 1.5,  exit: 4.5  },
  { enter: 4.0,  exit: 7.0  },
  { enter: 6.5,  exit: 9.5  },
  { enter: 9.0,  exit: 12.0 },
  { enter: 11.5, exit: 14.0 },
] as const;

const REVEAL_START   = 13.5;
const HEADLINE_START = 14.2;
const CTA_START      = 14.8;

const SIDES: ("left" | "right")[] = ["left", "right", "left", "right", "left"];

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export default function Hero() {
  const videoRef      = useRef<HTMLVideoElement>(null);
  const introRef      = useRef<HTMLDivElement>(null);
  const hintRef       = useRef<HTMLDivElement>(null);
  const labelRefs     = useRef<(HTMLDivElement | null)[]>([]); // desktop (lg+)
  const mlabelRefs    = useRef<(HTMLDivElement | null)[]>([]); // mobile/tablet (<lg)
  const colorRef      = useRef<HTMLDivElement>(null);
  const dimRef        = useRef<HTMLDivElement>(null);
  // Final reveal refs — imperative, no React state
  const logoRef       = useRef<HTMLDivElement>(null);
  const headlineRef   = useRef<HTMLDivElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const revealedRef   = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hideTransientEls = () => {
      if (introRef.current)  { introRef.current.style.opacity  = "0"; }
      if (hintRef.current)   { hintRef.current.style.opacity   = "0"; }
      labelRefs.current.forEach(el => {
        if (!el) return;
        el.style.opacity   = "0";
        el.style.transform = "translateY(calc(-50% + 22px))";
      });
      // Mobile labels
      mlabelRefs.current.forEach(el => {
        if (!el) return;
        el.style.opacity   = "0";
        el.style.transform = "translateY(10px)";
      });
    };

    const showReveal = () => {
      // Logo
      if (logoRef.current) {
        logoRef.current.style.opacity   = "1";
        logoRef.current.style.transform = "translateY(0)";
        logoRef.current.style.pointerEvents = "auto";
      }
      // Headline + body (slight delay via transition-delay)
      if (headlineRef.current) {
        headlineRef.current.style.opacity   = "1";
        headlineRef.current.style.transform = "translateY(0)";
      }
      // CTA (longer delay)
      if (ctaRef.current) {
        ctaRef.current.style.opacity   = "1";
        ctaRef.current.style.transform = "translateY(0)";
        ctaRef.current.style.pointerEvents = "auto";
      }
      // Dim
      if (dimRef.current) {
        dimRef.current.style.opacity = "1";
      }
    };

    const onTime = () => {
      const t = video.currentTime;

      if (revealedRef.current) {
        hideTransientEls();
        return;
      }

      // Intro text
      if (introRef.current) {
        introRef.current.style.opacity = String(clamp(1 - (t - 1.2) / 0.8, 0, 1));
      }
      // Scroll hint
      if (hintRef.current) {
        hintRef.current.style.opacity = String(clamp(1 - (t - 1.5) / 0.8, 0, 1));
      }
      // Desktop service labels (lg+)
      LABEL_WINDOWS.forEach((w, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        const fadeIn  = clamp((t - w.enter) / 0.4, 0, 1);
        const fadeOut = clamp((t - w.exit)  / 0.4, 0, 1);
        const op = fadeIn * (1 - fadeOut);
        const y  = (1 - fadeIn) * 22 - fadeOut * 22;
        el.style.opacity   = String(op);
        el.style.transform = `translateY(calc(-50% + ${y}px))`;
      });
      // Mobile/tablet labels — centred, same timing windows
      LABEL_WINDOWS.forEach((w, i) => {
        const el = mlabelRefs.current[i];
        if (!el) return;
        const fadeIn  = clamp((t - w.enter) / 0.5, 0, 1);
        const fadeOut = clamp((t - w.exit)  / 0.5, 0, 1);
        const op = fadeIn * (1 - fadeOut);
        const yPx = (1 - op) * 12;
        el.style.opacity   = String(op);
        el.style.transform = `translateX(-50%) translateY(calc(-50% + ${yPx}px))`;
      });
      // Color grade
      if (colorRef.current) {
        const mild    = (t / VIDEO_DURATION) * 0.35;
        const endFrac = clamp((t - 13) / 1.5, 0, 1);
        const strong  = 0.35 + endFrac * 0.65;
        colorRef.current.style.opacity = String(t < 13 ? mild : strong);
      }
      // Dim overlay (starts from REVEAL_START)
      if (dimRef.current) {
        dimRef.current.style.opacity = String(clamp((t - REVEAL_START) / 0.8, 0, 1));
      }
      // Staggered reveal — set imperatively, CSS transition smooths it
      if (t >= REVEAL_START && logoRef.current) {
        logoRef.current.style.opacity   = "1";
        logoRef.current.style.transform = "translateY(0)";
        logoRef.current.style.pointerEvents = "auto";
      }
      if (t >= HEADLINE_START && headlineRef.current) {
        headlineRef.current.style.opacity   = "1";
        headlineRef.current.style.transform = "translateY(0)";
      }
      if (t >= CTA_START && ctaRef.current) {
        ctaRef.current.style.opacity   = "1";
        ctaRef.current.style.transform = "translateY(0)";
        ctaRef.current.style.pointerEvents = "auto";
      }
    };

    const onEnded = () => {
      revealedRef.current = true;
      hideTransientEls();
      showReveal();
      if (colorRef.current) colorRef.current.style.opacity = "1";
      if (dimRef.current)   dimRef.current.style.opacity   = "1";
      video.loop = true;
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended",      onEnded);
    video.play().catch(() => {});
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended",      onEnded);
    };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden" aria-label="ISAVE — hero">

      <video
        ref={videoRef}
        src="/brand/hero-video.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay muted playsInline preload="auto" aria-hidden
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(80% 70% at 50% 50%, rgba(0,0,0,0) 30%, rgba(10,10,10,0.65) 75%, #0a0a0a 100%)" }} />
      <div className="absolute inset-0 pointer-events-none bg-grid-faint opacity-[0.18]"
           style={{ backgroundSize: "56px 56px" }} />
      <div className="absolute -inset-[10%] pointer-events-none"
           style={{ background: "radial-gradient(40% 35% at 20% 30%, rgba(42,159,250,0.18), transparent 60%), radial-gradient(35% 30% at 80% 70%, rgba(255,154,12,0.12), transparent 60%)" }} />

      {/* Blue color grade */}
      <div ref={colorRef} className="absolute inset-0 pointer-events-none"
           style={{ opacity: 0, willChange: "opacity",
             background: "linear-gradient(to top, rgba(42,159,250,0.90) 0%, rgba(6,25,80,0.85) 22%, rgba(10,12,30,0.80) 45%, rgba(10,10,20,0.55) 65%, transparent 85%)" }} />

      {/* Reveal dim */}
      <div ref={dimRef} className="absolute inset-0 pointer-events-none"
           style={{ opacity: 0, willChange: "opacity", background: "rgba(8,8,14,0.60)",
             transition: "opacity 0.8s ease" }} />

      {/* Intro text */}
      <div ref={introRef} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
           style={{ willChange: "opacity", transition: "opacity 0.5s ease" }}>
        <div style={{
          padding: "clamp(1.25rem,4vw,3rem) clamp(1.25rem,5vw,4rem)",
          borderRadius: "24px",
          background: "rgba(6,8,16,0.52)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
          maxWidth: "min(92vw,780px)", width: "100%",
        }}>
          <span className="eyebrow text-white/55" style={{ letterSpacing: "0.28em", fontSize: "11px" }}>ISAVE PRODUCTION</span>
          <h1 className="display text-white leading-[1.03] mt-4" style={{ fontSize: "clamp(2rem,5vw,4.5rem)", letterSpacing: "-0.03em" }}>
            Behind Every<br />Exceptional Event
          </h1>
          <div className="mx-auto mt-6 mb-6 h-px w-14"
               style={{ background: "linear-gradient(90deg,transparent,rgba(42,159,250,0.7),transparent)" }} />
          <p className="text-white/70 leading-relaxed"
             style={{ fontSize: "clamp(0.95rem,1.2vw,1.1rem)", maxWidth: "480px", margin: "0 auto" }}>
            Professional AV execution with precision, reliability and technical expertise.
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={hintRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
           style={{ willChange: "opacity", transition: "opacity 0.5s ease" }}>
        <span className="eyebrow text-[10px] text-white/50">Scroll</span>
        <span className="relative h-9 w-[18px] rounded-full border border-white/20">
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 top-1.5 h-1.5 w-1 rounded-full bg-white/80"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>

      {/* Service labels — desktop (lg+): left/right alternating */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
        {heroCards.map((card, i) => {
          const isLeft = SIDES[i] === "left";
          return (
            <div key={card.title} ref={el => { labelRefs.current[i] = el; }}
                 className="absolute top-1/2"
                 style={{ ...(isLeft ? { left: "7%" } : { right: "7%" }), maxWidth: "28vw",
                   textAlign: isLeft ? "left" : "right", opacity: 0,
                   transform: "translateY(calc(-50% + 22px))", willChange: "opacity, transform" }}>
              <div style={{ marginBottom: "1rem", height: "2px", width: "2.5rem",
                background: "linear-gradient(90deg,#2a9ffa,#ff9a0c)", marginLeft: isLeft ? 0 : "auto" }} />
              <h2 className="display text-white"
                  style={{ fontSize: "clamp(1.7rem,2.4vw,2.8rem)", lineHeight: 1.05,
                    textShadow: "0 2px 40px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.95)" }}>
                {card.title}
              </h2>
              <p className="text-white/80"
                 style={{ marginTop: "0.75rem", fontSize: "clamp(0.9rem,1vw,1.05rem)", lineHeight: 1.6,
                   textShadow: "0 2px 20px rgba(0,0,0,1)" }}>
                {card.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Service labels — mobile/tablet (<lg): centered, one at a time */}
      <div className="absolute inset-0 pointer-events-none lg:hidden" aria-hidden>
        {heroCards.map((card, i) => (
          <div key={card.title}
               ref={el => { mlabelRefs.current[i] = el; }}
               className="absolute text-center px-8"
               style={{
                 top: "50%", left: "50%",
                 transform: "translateX(-50%) translateY(-50%)",
                 width: "min(100%, 420px)",
                 opacity: 0,
                 willChange: "opacity, transform",
               }}>
            <div style={{ margin: "0 auto 1rem", height: "2px", width: "2.5rem",
              background: "linear-gradient(90deg,#2a9ffa,#ff9a0c)" }} />
            <h2 className="display text-white"
                style={{ fontSize: "clamp(1.6rem,6vw,2.4rem)", lineHeight: 1.05,
                  textShadow: "0 2px 40px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.8)" }}>
              {card.title}
            </h2>
            <p className="text-white/75"
               style={{ marginTop: "0.75rem", fontSize: "clamp(0.85rem,3.5vw,1rem)", lineHeight: 1.6,
                 textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Final reveal — CSS transitions, zero React rerenders ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none">

        {/* Logo */}
        <div ref={logoRef} className="mb-6 md:mb-8 relative"
             style={{ opacity: 0, transform: "translateY(18px)", willChange: "opacity, transform",
               transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)",
               pointerEvents: "none" }}>
          <div className="absolute -inset-12 bg-radial-spot blur-2xl opacity-80" />
          <Image src="/brand/logotype.png" alt="ISAVE Production" width={420} height={420} priority
                 className="relative w-[160px] sm:w-[220px] md:w-[340px] lg:w-[420px] h-auto select-none drop-shadow-[0_18px_40px_rgba(42,159,250,0.25)]" />
        </div>

        {/* Headline + body in one block so they animate together */}
        <div ref={headlineRef}
             style={{ opacity: 0, transform: "translateY(28px)", willChange: "opacity, transform",
               transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.18s" }}>
          <h1 className="display max-w-4xl text-[clamp(1.5rem,5vw,3.75rem)] leading-[1.06] tracking-tightest text-white">
            Professional AV experiences
            <br className="hidden md:block" />
            {" "}for <span className="text-brand-500">modern events</span>.
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-base md:text-[17px] text-white/65 leading-relaxed">
            From live productions and hybrid events to studio services and
            technical support — ISAVE delivers seamless audio visual experiences.
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef}
             style={{ opacity: 0, transform: "translateY(18px)", willChange: "opacity, transform",
               transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.36s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.36s",
               pointerEvents: "none", marginTop: "2rem" }}
             className="flex flex-col sm:flex-row items-center gap-3">
          <a href="#schedule" className="btn-primary group">
            Plan Your Event
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a href="#services" className="btn-secondary">Explore Services</a>
        </div>
      </div>
    </section>
  );
}
