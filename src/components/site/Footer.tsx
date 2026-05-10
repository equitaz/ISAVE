import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-24 pb-12 mt-12 border-t border-white/5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-12 pb-16 border-b border-white/5">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-5">
            <div className="flex items-center gap-3">
              <Image src="/brand/logotype.png" alt="ISAVE" width={140} height={140} className="w-[72px] h-auto" />
              <div className="display text-[18px] tracking-[0.22em] text-white">
                ISAVE<span className="text-brand-500">.</span>
              </div>
            </div>
            <p className="mt-6 text-[15px] text-white/55 max-w-sm leading-relaxed">
              Information System &amp; Audio Visual experts. Production. Studio. Livestream.
              We make events sound and look the way they deserve.
            </p>
            <div className="mt-7 flex gap-3">
              <SocialIcon href="#" label="LinkedIn" path="M5 9V20h-3V9H5zm-1.5-4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM8 9h3v1.5C11.6 9.6 12.7 9 14.2 9 17.4 9 18 11 18 14v6h-3v-5.5c0-1.4-.5-2.5-2-2.5s-2 1.1-2 2.5V20H8V9z" />
              <SocialIcon href="#" label="Instagram" path="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-2.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              <SocialIcon href="#" label="X (Twitter)" path="M18.9 3H22l-7.4 8.5L23 21h-6.8l-5.3-6.6L4.7 21H1.6l8-9.1L1 3h6.9l4.8 6.3L18.9 3z" />
              <SocialIcon href="#" label="Facebook" path="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V9z" />
              <SocialIcon href="#" label="YouTube" path="M22 8s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-.9C16 5 12 5 12 5s-4 0-7.2.1c-.4.1-1.3.1-2 .9C2.2 6.6 2 8 2 8S1.8 9.6 1.8 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9 1.6.1 6.9.1 6.9.1s4 0 7.2-.1c.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2zM10 14.5v-5l4.5 2.5L10 14.5z" />
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-3">
            <h4 className="eyebrow mb-5">Navigate</h4>
            <ul className="space-y-3 text-[14px]">
              {["Home", "Testimonials", "Services", "About", "Schedule"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-white/65 hover:text-white transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="eyebrow mb-5">Contact</h4>
            <ul className="space-y-3 text-[14px] text-white/65">
              <li>
                <a href="mailto:hello@isaveproduction.com" className="hover:text-white transition">
                  hello@isaveproduction.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-white transition">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="text-white/50">Studio · Chicago Metropolitan Area</li>
              <li className="text-white/50">By appointment · Mon–Sat · 9–7</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="mono text-[11px] tracking-[0.2em] text-white/40">
            © {new Date().getFullYear()} ISAVE PRODUCTION · ALL RIGHTS RESERVED
          </span>
          <span className="mono text-[11px] tracking-[0.2em] text-white/40">
            INFORMATION SYSTEM &amp; AUDIO VISUAL EXPERTS
          </span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, path }: { href: string; label: string; path: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-white/10 text-white/65 hover:text-white hover:border-white/30 hover:bg-white/[0.04] transition"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}
