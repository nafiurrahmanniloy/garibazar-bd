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
    const ctx = gsap.context(() => {
      gsap.set(".cta-card", { y: 40, opacity: 0 });

      ScrollTrigger.create({
        trigger: ".cta-grid",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(".cta-card", {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power3.out", clearProps: "transform,opacity",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-[5%] bg-[var(--bg-primary)]" id="sell" aria-label="Call to action">
      <div className="max-w-[1100px] mx-auto">
        <div className="cta-grid grid grid-cols-2 max-md:grid-cols-1 gap-6">
          {/* Buy Card */}
          <div className="cta-card glass-bg border border-white/[0.06] rounded-2xl p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(59,130,246,0.3)]">
            <div className="text-5xl mb-5">🚗</div>
            <h3
              className="gradient-text text-xl font-extrabold mb-3"
              lang="bn"
            >
              আপনার স্বপ্নের গাড়ি খুঁজুন
            </h3>
            <p className="text-[0.9rem] text-[var(--text-secondary)] leading-relaxed mb-7">
              Browse 5,000+ verified used cars across Bangladesh. Filter by brand, budget, location, and condition.
            </p>
            <button
              onClick={onBrowseClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[var(--accent)] to-[#2872e5] hover:from-[#2872e5] hover:to-[var(--accent)] text-white rounded-lg font-semibold text-[0.95rem] cursor-pointer transition-all hover:shadow-[0_8px_30px_var(--accent-glow)]"
            >
              Browse All Cars →
            </button>
          </div>

          {/* Sell Card */}
          <div className="cta-card glass-bg border border-white/[0.06] rounded-2xl p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(16,185,129,0.3)]">
            <div className="text-5xl mb-5">💰</div>
            <h3
              className="gradient-text text-xl font-extrabold mb-3"
              lang="bn"
            >
              আপনার গাড়ি বিক্রি করুন
            </h3>
            <p className="text-[0.9rem] text-[var(--text-secondary)] leading-relaxed mb-7">
              List your car for free in minutes. Reach thousands of serious buyers across Bangladesh &mdash; no middleman fees.
            </p>
            <button
              onClick={onSellClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[rgba(16,185,129,0.3)] text-white hover:text-emerald-400 rounded-lg font-semibold text-[0.95rem] cursor-pointer transition-all hover:bg-emerald-500/[0.06] hover:border-emerald-500"
            >
              List Your Car Free →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
