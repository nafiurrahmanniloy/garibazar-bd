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
    gsap.from(".cta-card", {
      y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
      scrollTrigger: { trigger: ".cta-grid", start: "top 80%" },
    });
  }, []);

  return (
    <section className="py-[120px] px-6 bg-[var(--bg-secondary)]" id="sell">
      <div className="max-w-[1280px] mx-auto">
        <div className="cta-grid grid grid-cols-2 max-md:grid-cols-1 gap-8">
          {/* Buy */}
          <div className="cta-card p-12 max-md:p-8 rounded-3xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:p-px before:bg-gradient-to-br before:from-[var(--accent)] before:to-transparent before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]">
            <div className="relative z-[1]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-6">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <h3 className="text-2xl font-extrabold mb-3">
                Ready to Find Your Next Car?
              </h3>
              <p className="text-[var(--text-secondary)] mb-7 leading-relaxed">
                Browse thousands of verified listings across Bangladesh. Your perfect car is waiting.
              </p>
              <button
                onClick={onBrowseClick}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-semibold text-[0.95rem] cursor-pointer transition-all hover:shadow-[0_8px_30px_var(--accent-glow)] border-none"
              >
                Browse Cars
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sell */}
          <div className="cta-card p-12 max-md:p-8 rounded-3xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:p-px before:bg-gradient-to-br before:from-emerald-500 before:to-transparent before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]">
            <div className="relative z-[1]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-6">
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <h3 className="text-2xl font-extrabold mb-3">
                Want to Sell Your Car?
              </h3>
              <p className="text-[var(--text-secondary)] mb-7 leading-relaxed">
                List your car for free. Reach thousands of verified buyers. Get the best price — no middleman.
              </p>
              <button
                onClick={onSellClick}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-white/[0.06] hover:border-emerald-500 text-white hover:text-emerald-400 rounded-lg font-semibold text-[0.95rem] cursor-pointer transition-all"
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
