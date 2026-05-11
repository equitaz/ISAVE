"use client";

import React, { useEffect, useRef, ReactNode } from "react";

/**
 * SpotlightCard — wraps any card with a cursor-following spotlight border glow.
 * Tracks the global pointer position and renders the glow via CSS custom props
 * + ::before/::after pseudo-elements. Does NOT touch sizing, background colour
 * or any other visual property — the wrapped card keeps all its existing styles.
 *
 * Adapted from easemize/spotlight-card on 21st.dev for the ISAVE brand.
 * Uses the site's primary blue (hue ~210) with a subtle fill opacity so the
 * card's own glass background remains the dominant visual.
 */

const STYLES = `
  [data-spotlight]::before,
  [data-spotlight]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size, 1px) * -1);
    border: var(--border-size, 1px) solid transparent;
    border-radius: inherit;
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size, 1px))) calc(100% + (2 * var(--border-size, 1px)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }

  /* Coloured glow on the border */
  [data-spotlight]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size, 280px) * 0.75) calc(var(--spotlight-size, 280px) * 0.75) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) 100% 55% / 0.85),
      transparent 100%
    );
    filter: brightness(1.8);
  }

  /* White hot-spot on the border */
  [data-spotlight]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size, 280px) * 0.45) calc(var(--spotlight-size, 280px) * 0.45) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(0 0% 100% / 0.7),
      transparent 100%
    );
  }
`;

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject styles once into <head>
    const id = "spotlight-card-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = STYLES;
      document.head.appendChild(tag);
    }

    const el = ref.current;
    if (!el) return;

    const onPointer = (e: PointerEvent) => {
      el.style.setProperty("--x", e.clientX.toFixed(1));
      el.style.setProperty("--y", e.clientY.toFixed(1));
    };

    document.addEventListener("pointermove", onPointer, { passive: true });
    return () => document.removeEventListener("pointermove", onPointer);
  }, []);

  return (
    <div
      ref={ref}
      data-spotlight
      className={`relative ${className}`}
      style={{
        // Border-size for the pseudo-element mask
        "--border-size": "1px",
        // Spotlight radius
        "--spotlight-size": "320px",
        // Blue hue matching --primary #2a9ffa ≈ hsl(210)
        "--hue": "210",
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
