import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 92% black background ≈ #141414 (rgb 20,20,20)
        ink: {
          950: "#0a0a0a",
          900: "#141414",
          800: "#1c1c1c",
          700: "#2a2a2a",
          600: "#3a3a3a",
        },
        brand: {
          // Primary cyan-blue
          500: "#2a9ffa",
          400: "#5fb5fb",
          600: "#1a8cdf",
          // Secondary amber
          accent: "#ff9a0c",
          accent2: "#ffb547",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        wider2: "0.18em",
      },
      animation: {
        "float-slow": "float 12s ease-in-out infinite",
        "pulse-slow": "pulse 6s cubic-bezier(0.4,0,0.6,1) infinite",
        marquee: "marquee 60s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-18px,0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-spot":
          "radial-gradient(60% 60% at 50% 40%, rgba(42,159,250,0.18), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
