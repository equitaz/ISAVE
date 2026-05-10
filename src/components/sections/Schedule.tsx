"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";

const SERVICES = [
  "Event Production",
  "Livestreaming",
  "AV Equipment Rental",
  "Studio Production",
  "Technical Support",
  "Not Sure Yet",
] as const;

type FormState = {
  name: string;
  email: string;
  eventDate: string;
  services: string[];
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

const view = { once: true, amount: 0.2 } as const;

export default function Schedule() {
  const uid = useId();
  const [form, setForm] = useState<FormState>({
    name: "", email: "", eventDate: "", services: [], message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // ── Helpers ────────────────────────────────────────────────────────────────
  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name.trim())        e.name  = "Please enter your name.";
    if (!form.email.trim())       e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                  e.email = "Please enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section id="schedule" className="relative py-28 md:py-40 overflow-hidden">
      {/* Ambient glow — clipped by overflow-hidden to prevent horizontal scroll */}
      <div className="pointer-events-none absolute -top-1/3 left-1/4 w-[700px] h-[700px] rounded-full -z-10"
           style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(42,159,250,0.12), transparent 70%)" }} />

      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="eyebrow mb-4 block">◇  GET IN TOUCH</span>
          <h2 className="display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.04] tracking-tightest text-white">
            Plan Your Event
          </h2>
          <p className="mt-4 text-[15px] text-white/60 leading-relaxed max-w-lg">
            Tell us what you&apos;re planning and we&apos;ll help you choose
            the right AV setup, production and technical support.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Subtle inner glow */}
          <div className="pointer-events-none absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* ── Success state ─────────────────────────────────────────── */}
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center py-12 text-center gap-5"
            >
              <span
                className="inline-flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "rgba(42,159,250,0.15)", boxShadow: "0 0 40px rgba(42,159,250,0.3)" }}
              >
                <CheckIcon />
              </span>
              <h3 className="display text-[1.5rem] text-white">You&apos;re all set</h3>
              <p className="text-white/70 max-w-sm leading-relaxed text-[15px]">
                Thank you — your request has been sent successfully. Our team
                will contact you shortly.
              </p>
              <button
                onClick={() => { setStatus("idle"); setForm({ name:"", email:"", eventDate:"", services:[], message:"" }); }}
                className="btn-secondary mt-2 !px-5 !h-10 !text-[13px]"
              >
                Send another request
              </button>
            </motion.div>
          ) : (
            /* ── Form ──────────────────────────────────────────────── */
            <form onSubmit={handleSubmit} noValidate className="space-y-8">

              {/* Row 1 — Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  id={`${uid}-name`}
                  label="Your Name"
                  required
                  error={errors.name}
                >
                  <input
                    id={`${uid}-name`}
                    type="text"
                    placeholder="Mulham Katayah"
                    value={form.name}
                    onChange={set("name")}
                    className={inputCls(!!errors.name)}
                    autoComplete="name"
                  />
                </Field>

                <Field
                  id={`${uid}-email`}
                  label="Email Address"
                  required
                  error={errors.email}
                >
                  <input
                    id={`${uid}-email`}
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set("email")}
                    className={inputCls(!!errors.email)}
                    autoComplete="email"
                  />
                </Field>
              </div>

              {/* Row 2 — Event date */}
              <Field id={`${uid}-date`} label="Event Date" hint="Optional">
                <input
                  id={`${uid}-date`}
                  type="date"
                  value={form.eventDate}
                  onChange={set("eventDate")}
                  className={inputCls(false) + " [color-scheme:dark]"}
                  min={new Date().toISOString().split("T")[0]}
                />
              </Field>

              {/* Services — pill checkboxes */}
              <div className="space-y-3">
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1">
                  <span className="text-[13px] font-medium text-white/85">
                    What do you need help with?
                  </span>
                  <span className="text-[12px] text-white/40">Select all that apply</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {SERVICES.map((s) => {
                    const checked = form.services.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        aria-pressed={checked}
                        className={[
                          "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] transition-all duration-200 border",
                          checked
                            ? "bg-brand-500 text-[#051221] border-brand-500 shadow-[0_0_20px_rgba(42,159,250,0.4)]"
                            : "bg-white/[0.03] text-white/75 border-white/10 hover:border-white/25 hover:text-white",
                        ].join(" ")}
                      >
                        {checked && <CheckSmall />}
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <Field id={`${uid}-msg`} label="Tell us about your event">
                <textarea
                  id={`${uid}-msg`}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Example: We're hosting a conference for 150 guests and need sound, stage screens and livestream support."
                  rows={5}
                  className={inputCls(false) + " resize-none"}
                />
              </Field>

              {/* Error banner */}
              {status === "error" && (
                <p className="text-[13px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                  {errorMsg}
                </p>
              )}

              {/* Submit */}
              <div className="flex flex-col items-start gap-3">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {status === "loading" ? (
                    <>
                      <Spinner />
                      Sending…
                    </>
                  ) : (
                    <>
                      Plan My Event
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </>
                  )}
                </button>
                <span className="text-[12px] text-white/40">
                  We usually respond within 1 business day.
                </span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ── Small sub-components ────────────────────────────────────────────────────

function Field({
  id, label, hint, required, error, children,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-[13px] font-medium text-white/85">
          {label}
          {required && <span className="text-brand-500 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-[11px] text-white/40">{hint}</span>}
      </div>
      {children}
      {error && (
        <span role="alert" className="text-[12px] text-red-400 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-xl bg-white/[0.04] border text-white text-[14px] px-4 py-3",
    "placeholder:text-white/30 outline-none transition-all duration-200",
    "focus:bg-white/[0.06] focus:ring-2 focus:ring-brand-500/50",
    hasError
      ? "border-red-400/50 focus:ring-red-400/30"
      : "border-white/10 focus:border-brand-500/60",
  ].join(" ");
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-brand-500">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckSmall() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
    </svg>
  );
}
