"use client";

import { useEffect, useState } from "react";

/**
 * Thin gradient bar pinned to the very top of the viewport that fills as the
 * user scrolls through the document. Sits above everything (z-100), pure CSS
 * scroll listener with no React rerender thrash — the bar's width is updated
 * via inline style on a single element.
 */
export default function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? window.scrollY / total : 0;
      setW(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none"
    >
      <div
        className="h-full origin-left"
        style={{
          width: "100%",
          transform: `scaleX(${w})`,
          background:
            "linear-gradient(90deg, rgba(42,159,250,0) 0%, #2a9ffa 30%, #ff9a0c 100%)",
          boxShadow: "0 0 18px rgba(42,159,250,0.45)",
        }}
      />
    </div>
  );
}
