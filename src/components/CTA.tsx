"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onBrowseClick: () => void;
  onSellClick: () => void;
};

export default function CTA({ onBrowseClick, onSellClick }: Props) {
  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".cta-grid",
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.from(".cta-card", { y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" });
      },
    });
  }, []);

  return (
    <section className="py-[120px] px-6 relative overflow-hidden showroom-spot carbon-bg" id="sell">
      <div className="max-w-[1280px] mx-auto relative z-[1]">
        <div className="section-header text-center mb-14">
          <div className="glow-line mb-6" />
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-3">
            Get Started
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight">
            Ready to Make a Move?
          </h2>
        </div>

        <div className="cta-grid grid grid-cols-2 max-md:grid-cols-1 gap-8">
          {/* Buy Card */}
          <div className="cta-card group relative bg-white/[0.02] backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-[var(--accent)]/40 via-transparent to-[var(--accent)]/10 [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude] pointer-events-none" />
            {/* Headlight glow on hover */}
            <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[radial-gradient(ellipse,rgba(61,139,253,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-[1] p-12 max-md:p-8">
              <div className="w-14 h-14 bg-[var(--accent-subtle)] border border-[var(--accent)]/20 rounded-xl flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold mb-3">
                Ready to Find Your Next Car?
              </h3>
              <p className="text-[var(--text-secondary)] mb-7 leading-relaxed">
                Browse thousands of verified listings across Bangladesh. Your perfect car is waiting.
              </p>
              <button
                onClick={onBrowseClick}
                className="group/btn inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[var(--accent)] to-[#2872e5] hover:from-[#2872e5] hover:to-[var(--accent)] text-white rounded-xl font-semibold text-[0.95rem] cursor-pointer transition-all hover:shadow-[0_8px_30px_var(--accent-glow)] border-none relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                <span className="relative z-[1]">Browse Cars</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-[1] transition-transform group-hover/btn:translate-x-0.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sell Card */}
          <div className="cta-card group relative bg-white/[0.02] backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-emerald-500/40 via-transparent to-emerald-500/10 [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude] pointer-events-none" />
            {/* Headlight glow on hover */}
            <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-[1] p-12 max-md:p-8">
              <div className="w-14 h-14 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" x2="12" y1="2" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold mb-3">
                Want to Sell Your Car?
              </h3>
              <p className="text-[var(--text-secondary)] mb-7 leading-relaxed">
                List your car for free. Reach thousands of verified buyers. Get the best price &mdash; no middleman.
              </p>
              <button
                onClick={onSellClick}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-emerald-500/30 hover:border-emerald-500 text-white hover:text-emerald-400 rounded-xl font-semibold text-[0.95rem] cursor-pointer transition-all hover:bg-emerald-500/[0.06] hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]"
              >
                গাড়ি বিক্রি করুন
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
