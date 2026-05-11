"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroCards } from "@/lib/services";

/**
 * Hero — looping video background with 60fps-driven overlays.
 *
 * Animation architecture:
 *   - A requestAnimationFrame loop runs the entire label / overlay system.
 *     This gives 60fps updates vs timeupdate's ~4-25Hz, eliminating the
 *     choppy "lag" on mobile.
 *   - opacity is calculated with smoothstep() per-frame so the fade curve
 *     is visually identical whether the browser fires RAF at 30 or 60fps.
 *   - CSS transitions are only used for: intro box, hint, dim overlay,
 *     and the final reveal elements (all fire ≤ once).
 *
 * Mobile label layout:
 *   - 3 "frames" shown in sequence: pair 0+1, pair 2+3, solo 4.
 *   - Strictly non-overlapping windows with 0.8s gap between pairs.
 *   - Each pair is stacked vertically (title only, no desc to save space).
 *
 * Desktop label layout: unchanged — left/right alternating.
 */

const VIDEO_DURATION = 15.04;

// ── Desktop label windows (left/right) ──────────────────────────────────────
const DESKTOP_WINDOWS = [
  { enter: 1.2, exit: 4.2 },
  { enter: 3.8, exit: 6.8 },
  { enter: 6.4, exit: 9.4 },
  { enter: 9.0, exit: 12.0 },
  { enter: 11.5, exit: 14.0 },
] as const;

// ── Mobile label frames (pairs / solo) ──────────────────────────────────────
// Each frame contains 1–2 service indices and has non-overlapping windows.
// A 0.8 s "silence" gap between frames lets the previous pair fully fade.
const MOBILE_FRAMES = [
  { indices: [0, 1], enter: 1.0,  exit: 5.6  },
  { indices: [2, 3], enter: 6.4,  exit: 11.0 },
  { indices: [4],    enter: 11.5, exit: 13.6 },
] as const;

const SIDES: ("left" | "right")[] = ["left", "right", "left", "right", "left"];

const REVEAL_START   = 13.6;
const HEADLINE_START = 14.3;
const CTA_START      = 14.9;

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

/** Smooth ease-in / ease-out curve — gives the silky fade feel. */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export default function Hero() {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const introRef    = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);
  const labelRefs   = useRef<(HTMLDivElement | null)[]>([]);   // desktop
  const mframeRefs  = useRef<(HTMLDivElement | null)[]>([]);   // mobile frames
  const colorRef    = useRef<HTMLDivElement>(null);
  const dimRef      = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);
  const rafRef      = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // ── Helpers ──────────────────────────────────────────────────────────
    const FADE_DUR = 0.55; // seconds for each fade-in or fade-out curve

    const hideTransientEls = () => {
      if (introRef.current)  introRef.current.style.opacity  = "0";
      if (hintRef.current)   hintRef.current.style.opacity   = "0";
      labelRefs.current.forEach(el => { if (el) { el.style.opacity = "0"; el.style.transform = "translateY(calc(-50% + 22px))"; } });
      mframeRefs.current.forEach(el => { if (el) { el.style.opacity = "0"; el.style.transform = "translateX(-50%) translateY(calc(-50% + 14px))"; } });
    };

    const lockReveal = () => {
      if (logoRef.current)     { logoRef.current.style.opacity = "1";     logoRef.current.style.transform = "translateY(0)";     logoRef.current.style.pointerEvents = "auto"; }
      if (headlineRef.current) { headlineRef.current.style.opacity = "1"; headlineRef.current.style.transform = "translateY(0)"; }
      if (ctaRef.current)      { ctaRef.current.style.opacity = "1";      ctaRef.current.style.transform = "translateY(0)";      ctaRef.current.style.pointerEvents = "auto"; }
      if (dimRef.current)      { dimRef.current.style.opacity = "1"; }
    };

    // ── 60fps RAF loop ───────────────────────────────────────────────────
    const tick = () => {
      if (revealedRef.current) {
        // Keep transients hidden every frame so they don't flash on loop
        hideTransientEls();
        lockReveal();
        return; // stop loop — will be restarted by onEnded if needed
      }

      const t = video.currentTime;

      // Intro text
      if (introRef.current) {
        introRef.current.style.opacity = String(
          smoothstep(0.3, 1.0, t) * (1 - smoothstep(1.0, 1.8, t))
        );
      }

      // Scroll hint
      if (hintRef.current) {
        hintRef.current.style.opacity = String(
          smoothstep(0.3, 1.0, t) * (1 - smoothstep(1.2, 2.0, t))
        );
      }

      // Desktop service labels (lg+)
      DESKTOP_WINDOWS.forEach((w, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        const fadeIn  = smoothstep(w.enter, w.enter + FADE_DUR, t);
        const fadeOut = smoothstep(w.exit - FADE_DUR, w.exit, t);
        const op = fadeIn * (1 - fadeOut);
        const yPx = (1 - op) * 22;
        el.style.opacity   = String(op);
        el.style.transform = `translateY(calc(-50% + ${yPx}px))`;
      });

      // Mobile label frames (<lg) — one frame at a time, smooth in/out
      MOBILE_FRAMES.forEach((frame, fi) => {
        const el = mframeRefs.current[fi];
        if (!el) return;
        const fadeIn  = smoothstep(frame.enter, frame.enter + FADE_DUR, t);
        const fadeOut = smoothstep(frame.exit - FADE_DUR, frame.exit, t);
        const op = fadeIn * (1 - fadeOut);
        // Slight upward drift on exit, slight upward approach on enter
        const yPx = fadeIn < 1 ? (1 - fadeIn) * 14 : fadeOut > 0 ? -fadeOut * 14 : 0;
        el.style.opacity   = String(op);
        el.style.transform = `translateX(-50%) translateY(calc(-50% + ${yPx}px))`;
      });

      // Blue color grade
      if (colorRef.current) {
        const mild    = (t / VIDEO_DURATION) * 0.35;
        const endFrac = smoothstep(13, 14, t);
        colorRef.current.style.opacity = String(t < 13 ? mild : 0.35 + endFrac * 0.65);
      }

      // Dim overlay
      if (dimRef.current) {
        dimRef.current.style.opacity = String(smoothstep(REVEAL_START, REVEAL_START + 0.8, t));
      }

      // Staggered final reveal
      if (logoRef.current && t >= REVEAL_START) {
        const op = smoothstep(REVEAL_START, REVEAL_START + 0.9, t);
        const y  = (1 - op) * 18;
        logoRef.current.style.opacity      = String(op);
        logoRef.current.style.transform    = `translateY(${y}px)`;
        logoRef.current.style.pointerEvents = op > 0.5 ? "auto" : "none";
      }
      if (headlineRef.current && t >= HEADLINE_START) {
        const op = smoothstep(HEADLINE_START, HEADLINE_START + 0.9, t);
        headlineRef.current.style.opacity   = String(op);
        headlineRef.current.style.transform = `translateY(${(1 - op) * 24}px)`;
      }
      if (ctaRef.current && t >= CTA_START) {
        const op = smoothstep(CTA_START, CTA_START + 0.7, t);
        ctaRef.current.style.opacity      = String(op);
        ctaRef.current.style.transform    = `translateY(${(1 - op) * 16}px)`;
        ctaRef.current.style.pointerEvents = op > 0.5 ? "auto" : "none";
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      revealedRef.current = true;
      lockReveal();
      hideTransientEls();
      if (colorRef.current) colorRef.current.style.opacity = "1";
      if (dimRef.current)   dimRef.current.style.opacity   = "1";
      video.loop = true;
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", onEnded);
    rafRef.current = requestAnimationFrame(tick);
    video.play().catch(() => {});

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden" aria-label="ISAVE — hero">

      <video ref={videoRef} src="/brand/hero-video.mp4"
             className="absolute inset-0 h-full w-full object-cover"
             autoPlay muted playsInline preload="auto" aria-hidden />

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

      {/* Reveal dim — CSS transition used (fires once) */}
      <div ref={dimRef} className="absolute inset-0 pointer-events-none"
           style={{ opacity: 0, background: "rgba(8,8,14,0.60)" }} />

      {/* Intro text box */}
      <div ref={introRef} className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center pointer-events-none"
           style={{ opacity: 0, willChange: "opacity" }}>
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
          <h1 className="display text-white leading-[1.03] mt-4"
              style={{ fontSize: "clamp(2rem,5vw,4.5rem)", letterSpacing: "-0.03em" }}>
            Behind Every<br />Exceptional Event
          </h1>
          <div className="mx-auto mt-5 mb-5 h-px w-14"
               style={{ background: "linear-gradient(90deg,transparent,rgba(42,159,250,0.7),transparent)" }} />
          <p className="text-white/70 leading-relaxed"
             style={{ fontSize: "clamp(0.9rem,1.2vw,1.1rem)", maxWidth: "480px", margin: "0 auto" }}>
            Professional AV execution with precision, reliability and technical expertise.
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={hintRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
           style={{ opacity: 0, willChange: "opacity" }}>
        <span className="eyebrow text-[10px] text-white/50">Scroll</span>
        <span className="relative h-9 w-[18px] rounded-full border border-white/20">
          <motion.span className="absolute left-1/2 -translate-x-1/2 top-1.5 h-1.5 w-1 rounded-full bg-white/80"
                       animate={{ y: [0, 12, 0] }}
                       transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </div>

      {/* Desktop labels (lg+) — left/right alternating */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
        {heroCards.map((card, i) => {
          const isLeft = SIDES[i] === "left";
          return (
            <div key={card.title} ref={el => { labelRefs.current[i] = el; }}
                 className="absolute top-1/2"
                 style={{ ...(isLeft ? { left: "7%" } : { right: "7%" }), maxWidth: "28vw",
                   textAlign: isLeft ? "left" : "right", opacity: 0, willChange: "opacity, transform",
                   transform: "translateY(calc(-50% + 22px))" }}>
              <div style={{ marginBottom: "0.9rem", height: "2px", width: "2.5rem",
                background: "linear-gradient(90deg,#2a9ffa,#ff9a0c)", marginLeft: isLeft ? 0 : "auto" }} />
              <h2 className="display text-white"
                  style={{ fontSize: "clamp(1.7rem,2.4vw,2.8rem)", lineHeight: 1.05,
                    textShadow: "0 2px 40px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.95)" }}>
                {card.title}
              </h2>
              <p className="text-white/80"
                 style={{ marginTop: "0.65rem", fontSize: "clamp(0.9rem,1vw,1.05rem)", lineHeight: 1.6,
                   textShadow: "0 2px 20px rgba(0,0,0,1)" }}>
                {card.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile / tablet labels (<lg) — 3 frames, pairs stacked vertically */}
      <div className="absolute inset-0 pointer-events-none lg:hidden" aria-hidden>
        {MOBILE_FRAMES.map((frame, fi) => (
          <div key={fi} ref={el => { mframeRefs.current[fi] = el; }}
               className="absolute text-center"
               style={{ top: "50%", left: "50%",
                 transform: "translateX(-50%) translateY(-50%)",
                 width: "min(100%, 440px)", opacity: 0, willChange: "opacity, transform" }}>
            {frame.indices.map((idx, pos) => (
              <div key={idx}
                   style={{ paddingBottom: pos < frame.indices.length - 1 ? "clamp(1.2rem, 4vw, 2rem)" : 0 }}>
                {/* Accent line — only on first item of pair */}
                {pos === 0 && (
                  <div style={{ margin: "0 auto 0.8rem", height: "2px", width: "2.5rem",
                    background: "linear-gradient(90deg,#2a9ffa,#ff9a0c)" }} />
                )}
                <h2 className="display text-white px-6"
                    style={{ fontSize: "clamp(1.5rem,5.5vw,2.2rem)", lineHeight: 1.05,
                      textShadow: "0 2px 30px rgba(0,0,0,0.95), 0 0 50px rgba(0,0,0,0.85)",
                      opacity: pos === 0 ? 1 : 0.8 }}>
                  {heroCards[idx].title}
                </h2>
                {/* Description only on second item of pair (or solo) for breathing room */}
                {(frame.indices.length === 1 || pos === 1) && (
                  <p className="text-white/70 px-8"
                     style={{ marginTop: "0.5rem", fontSize: "clamp(0.82rem,3.2vw,0.95rem)", lineHeight: 1.6,
                       textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}>
                    {heroCards[idx].desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── Final reveal — CSS transitions, fires once ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none">

        <div ref={logoRef} className="mb-5 md:mb-7 relative"
             style={{ opacity: 0, transform: "translateY(18px)", willChange: "opacity, transform", pointerEvents: "none" }}>
          <div className="absolute -inset-12 bg-radial-spot blur-2xl opacity-80" />
          <Image src="/brand/logotype.png" alt="ISAVE Production" width={420} height={420} priority
                 className="relative w-[150px] sm:w-[210px] md:w-[320px] lg:w-[400px] h-auto select-none drop-shadow-[0_18px_40px_rgba(42,159,250,0.25)]" />
        </div>

        <div ref={headlineRef}
             style={{ opacity: 0, transform: "translateY(28px)", willChange: "opacity, transform" }}>
          <h1 className="display max-w-4xl text-[clamp(1.45rem,5vw,3.75rem)] leading-[1.06] tracking-tightest text-white">
            Professional AV experiences
            <br className="hidden md:block" />
            {" "}for <span className="text-brand-500">modern events</span>.
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-[clamp(0.85rem,2.5vw,1.05rem)] text-white/65 leading-relaxed px-2">
            From live productions and hybrid events to studio services and
            technical support — ISAVE delivers seamless audio visual experiences.
          </p>
        </div>

        <div ref={ctaRef}
             style={{ opacity: 0, transform: "translateY(18px)", willChange: "opacity, transform",
               pointerEvents: "none", marginTop: "1.75rem" }}
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
