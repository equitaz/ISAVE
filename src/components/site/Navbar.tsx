"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Home-page section anchors
const HOME_LINKS = [
  { id: "home",         label: "Home" },
  { id: "services",     label: "Services" },
  { id: "projects",     label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "about",        label: "About" },
  { id: "schedule",     label: "Schedule" },
  { id: "contact",      label: "Contact" },
];

// Standalone pages (none currently)
const PAGE_LINKS: { href: string; label: string }[] = [];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section highlight — only on homepage
  useEffect(() => {
    if (!isHome) return;
    const sections = HOME_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [isHome]);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={clsx(
          "mx-auto flex items-center justify-between transition-all duration-500",
          "px-5 md:px-8",
          scrolled
            ? "max-w-5xl rounded-full glass-strong h-14"
            : "max-w-7xl h-16"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group" aria-label="ISAVE home">
          <Image
            src="/brand/logotype.png"
            alt="ISAVE Production"
            width={400}
            height={400}
            className="h-9 md:h-11 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Home section anchors */}
          {HOME_LINKS.map((l) => {
            const isActive = isHome && active === l.id;
            return (
              <a
                key={l.id}
                href={isHome ? `#${l.id}` : `/#${l.id}`}
                className={clsx(
                  "relative px-3.5 py-1.5 text-[13px] tracking-wide rounded-full transition",
                  isActive ? "text-white" : "text-white/55 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            );
          })}

          {/* Page links (rendered only when PAGE_LINKS is non-empty) */}
          {PAGE_LINKS.length > 0 && <span className="mx-1 h-4 w-px bg-white/15" />}
          {PAGE_LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "relative px-3.5 py-1.5 text-[13px] tracking-wide rounded-full transition",
                  isActive ? "text-white" : "text-white/55 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA + mobile burger */}
        <div className="flex items-center gap-2">
          <Link href="/#schedule" className="hidden sm:inline-flex btn-primary !h-10 !px-5 !text-[13px]">
            Plan Your Event
            <ArrowRight />
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass"
          >
            <Burger open={open} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mx-4 mt-3 rounded-3xl glass-strong overflow-hidden"
          >
            <ul className="py-3">
              {HOME_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={isHome ? `#${l.id}` : `/#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "flex items-center justify-between px-6 py-3 text-[15px] transition",
                      isHome && active === l.id ? "text-white" : "text-white/65"
                    )}
                  >
                    <span>{l.label}</span>
                    <ArrowRight className="opacity-40" />
                  </a>
                </li>
              ))}
              {PAGE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "flex items-center justify-between px-6 py-3 text-[15px] transition",
                      pathname === l.href ? "text-white" : "text-white/65"
                    )}
                  >
                    <span>{l.label}</span>
                    <ArrowRight className="opacity-40" />
                  </Link>
                </li>
              ))}
              <li className="px-4 pt-2 pb-4">
                <Link href="/#schedule" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Plan Your Event <ArrowRight />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <div className="relative h-3.5 w-4">
      <span className={clsx("absolute left-0 right-0 h-px bg-white transition-all duration-300", open ? "top-1.5 rotate-45" : "top-0")} />
      <span className={clsx("absolute left-0 right-0 h-px bg-white transition-all duration-300", open ? "top-1.5 -rotate-45" : "top-3")} />
    </div>
  );
}
