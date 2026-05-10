type Kind = "event" | "stream" | "rental" | "studio" | "support";

/**
 * Tiny inline SVG iconset — single-stroke, neutral weight so it sits
 * comfortably next to display type without competing.
 */
export default function ServiceIcon({ kind, className = "" }: { kind: Kind; className?: string }) {
  const common = {
    width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "event":
      return (
        <svg {...common} className={className}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 6V3M16 6V3" />
        </svg>
      );
    case "stream":
      return (
        <svg {...common} className={className}>
          <circle cx="12" cy="12" r="2.2" />
          <path d="M7.4 7.4a6.5 6.5 0 0 0 0 9.2M16.6 7.4a6.5 6.5 0 0 1 0 9.2" />
          <path d="M4.5 4.5a10.5 10.5 0 0 0 0 15M19.5 4.5a10.5 10.5 0 0 1 0 15" />
        </svg>
      );
    case "rental":
      return (
        <svg {...common} className={className}>
          <rect x="3" y="7" width="18" height="11" rx="2" />
          <circle cx="9" cy="12.5" r="2" />
          <circle cx="15" cy="12.5" r="2" />
          <path d="M3 18l-1 3M21 18l1 3" />
        </svg>
      );
    case "studio":
      return (
        <svg {...common} className={className}>
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M5 12a7 7 0 0 0 14 0" />
          <path d="M12 19v3M9 22h6" />
        </svg>
      );
    case "support":
      return (
        <svg {...common} className={className}>
          <path d="M5 19l5-5 3 3 6-6" />
          <path d="M14 11h5v5" />
          <circle cx="5" cy="19" r="1" />
        </svg>
      );
  }
}
