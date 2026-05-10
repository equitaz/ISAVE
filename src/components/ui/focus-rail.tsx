"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  meta?: string;
  placeholder?: boolean;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * Shortest circular distance from `itemIdx` to `activeIdx` in a ring of `count`.
 * Returns a value in (-count/2, count/2].
 */
function circularOffset(itemIdx: number, activeIdx: number, count: number): number {
  const raw = itemIdx - activeIdx;
  if (count <= 1) return 0;
  // Wrap to the half-range so we get the shortest path
  let off = ((raw % count) + count) % count;
  if (off > count / 2) off -= count;
  return off;
}

const BASE_SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 1 } as const;
const TAP_SPRING  = { type: "spring", stiffness: 450, damping: 18, mass: 1 } as const;

const MAX_VISIBLE = 2; // show items within ±2 slots of centre

export function FocusRail({ items, initialIndex = 0, loop = true, className }: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lastWheelTime = React.useRef(0);

  const count       = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem  = items[activeIndex];

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // ── Non-passive wheel listener so we can preventDefault ────────────
  // React's synthetic onWheel is always passive in modern browsers,
  // meaning e.preventDefault() is a no-op and the page still scrolls.
  // We attach a native listener with { passive: false } instead.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return;

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 20) {
        // Block the native page scroll while inside the carousel
        e.preventDefault();
        e.stopPropagation();
        if (delta > 0) handleNext();
        else           handlePrev();
        lastWheelTime.current = now;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [handleNext, handlePrev]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const onDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const power = Math.abs(offset.x) * velocity.x;
    if (power < -10000) handleNext();
    else if (power > 10000) handlePrev();
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex h-[640px] md:h-[760px] w-full flex-col overflow-hidden select-none outline-none ${className ?? ""}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Ambient blurred background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeItem.placeholder ? 0 : 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {!activeItem.placeholder && (
              <>
                <img src={activeItem.imageSrc} alt="" className="h-full w-full object-cover blur-3xl saturate-150" />
                <div className="absolute inset-0"
                     style={{ background: "linear-gradient(to top, #141414 20%, rgba(20,20,20,0.55) 60%, transparent)" }} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3-D card rail */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <motion.div
          className="relative mx-auto flex h-[400px] md:h-[500px] w-full max-w-6xl items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {items.map((item, index) => {
            // Each item is rendered exactly once → no duplicate keys.
            // We compute how far it sits from the active slot circularly.
            const offset   = circularOffset(index, activeIndex, count);
            const isCenter = offset === 0;
            const dist     = Math.abs(offset);

            // Hide items outside the visible window
            if (dist > MAX_VISIBLE) return null;

            return (
              <motion.div
                key={index}
                className="absolute rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  width: "min(380px, 70vw)",
                  aspectRatio: "3/4",
                  transformStyle: "preserve-3d",
                  zIndex: isCenter ? 20 : 10,
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
                animate={{
                  x:       offset * 420,
                  z:       -dist * 180,
                  scale:   isCenter ? 1 : 0.82,
                  rotateY: offset * -18,
                  opacity: isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5),
                  filter:  `blur(${isCenter ? 0 : dist * 5}px) brightness(${isCenter ? 1 : 0.45})`,
                }}
                transition={(key) => key === "scale" ? TAP_SPRING : BASE_SPRING}
                onClick={() => { if (offset !== 0) setActive((p) => p + offset); }}
              >
                {item.placeholder ? (
                  <div className="h-full w-full flex flex-col items-center justify-center"
                       style={{ background: "linear-gradient(135deg, rgba(42,159,250,0.08), rgba(255,154,12,0.06))" }}>
                    <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center mb-4">
                      <span className="text-white/25 text-2xl">+</span>
                    </div>
                    <span className="mono text-[11px] tracking-[0.2em] text-white/25">COMING SOON</span>
                  </div>
                ) : (
                  <>
                    <img src={item.imageSrc} alt={item.title}
                         className="h-full w-full object-cover pointer-events-none" />
                    <div className="absolute inset-0"
                         style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info + controls */}
        <div className="mx-auto mt-10 md:mt-12 flex w-full max-w-4xl flex-col items-center justify-between gap-5 px-6 md:flex-row pointer-events-auto">
          <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left" style={{ minHeight: "90px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                exit={{   opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.28 }}
                className="space-y-1.5"
              >
                {activeItem.placeholder ? (
                  <p className="mono text-[12px] tracking-widest text-white/30">CASE STUDY COMING SOON</p>
                ) : (
                  <>
                    {activeItem.meta && (
                      <span className="mono text-[11px] tracking-widest text-brand-500">{activeItem.meta}</span>
                    )}
                    <h3 className="display text-[1.35rem] md:text-[1.65rem] leading-tight tracking-tightest text-white">
                      {activeItem.title}
                    </h3>
                    {activeItem.description && (
                      <p className="text-[14px] text-white/60 leading-relaxed max-w-md">{activeItem.description}</p>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full p-1"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
              <button onClick={handlePrev} aria-label="Previous"
                      className="rounded-full p-2.5 text-white/50 transition hover:bg-white/10 hover:text-white active:scale-95">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="mono text-[11px] text-white/40 min-w-[36px] text-center">
                {activeIndex + 1} / {count}
              </span>
              <button onClick={handleNext} aria-label="Next"
                      className="rounded-full p-2.5 text-white/50 transition hover:bg-white/10 hover:text-white active:scale-95">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
