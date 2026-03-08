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
      gsap.set(".cta-card", { y: 40, opacity: 0, filter: "blur(8px)" });

      ScrollTrigger.create({
        trigger: ".cta-grid",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".cta-card", {
            y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.12, ease: "power3.out", clearProps: "transform,opacity,filter",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-28 px-[5%] bg-[var(--bg-primary)] relative showroom-spot" id="sell" aria-label="Call to action">
      <div className="max-w-[1100px] mx-auto relative z-[1]">
        <div className="cta-grid grid grid-cols-2 max-md:grid-cols-1 gap-6">
          {/* Buy Card */}
          <div className="cta-card glass-card rounded-2xl p-10 text-center hover:-translate-y-1 hover:border-[rgba(61,139,253,0.3)] hover:shadow-[0_25px_70px_rgba(61,139,253,0.1)]" style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
            {/* Accent gradient orb */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-[radial-gradient(ellipse_at_top,rgba(61,139,253,0.08),transparent)] pointer-events-none" />
            <div className="text-5xl mb-6 relative z-[1]">🚗</div>
            <h3
              className="gradient-text text-xl font-extrabold mb-3 relative z-[1]"
              lang="bn"
            >
              আপনার স্বপ্নের গাড়ি খুঁজুন
            </h3>
            <p className="text-[0.9rem] text-[var(--text-secondary)] leading-relaxed mb-8 relative z-[1]">
              Browse 5,000+ verified used cars across Bangladesh. Filter by brand, budget, location, and condition.
            </p>
            <button
              onClick={onBrowseClick}
              className="group/btn relative inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[var(--accent)] to-[#2872e5] hover:from-[#2872e5] hover:to-[var(--accent)] text-white rounded-xl font-semibold text-[0.95rem] cursor-pointer transition-all hover:shadow-[0_8px_30px_var(--accent-glow)] hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600" />
              <span className="relative z-[1]">Browse All Cars →</span>
            </button>
          </div>

          {/* Sell Card */}
          <div className="cta-card glass-card rounded-2xl p-10 text-center hover:-translate-y-1 hover:border-[rgba(16,185,129,0.3)] hover:shadow-[0_25px_70px_rgba(16,185,129,0.08)]" style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
            {/* Accent gradient orb */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent)] pointer-events-none" />
            <div className="text-5xl mb-6 relative z-[1]">💰</div>
            <h3
              className="gradient-text text-xl font-extrabold mb-3 relative z-[1]"
              lang="bn"
            >
              আপনার গাড়ি বিক্রি করুন
            </h3>
            <p className="text-[0.9rem] text-[var(--text-secondary)] leading-relaxed mb-8 relative z-[1]">
              List your car for free in minutes. Reach thousands of serious buyers across Bangladesh &mdash; no middleman fees.
            </p>
            <button
              onClick={onSellClick}
              className="relative inline-flex items-center gap-2 px-8 py-3.5 border border-[rgba(16,185,129,0.3)] text-[var(--text-primary)] hover:text-emerald-600 rounded-xl font-semibold text-[0.95rem] cursor-pointer transition-all hover:bg-emerald-500/[0.08] hover:border-emerald-500 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]"
            >
              List Your Car Free →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
