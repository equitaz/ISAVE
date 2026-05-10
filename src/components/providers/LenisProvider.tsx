"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Wraps the app in a Lenis smooth-scroll instance. Lenis hijacks the wheel
 * and writes a transformed scroll position; we keep native scrollbars but the
 * page glides with controlled inertia. Disabled when reduced-motion is on.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Smooth-scroll for anchor links
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const a = t.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!;
      if (id.length < 2) return;
      const el = document.querySelector(id) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -90, duration: 1.4 });
    };
    document.addEventListener("click", handler);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", handler);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
