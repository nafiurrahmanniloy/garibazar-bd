"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  onBrowseClick: () => void;
  onSellClick: () => void;
};

export default function CTA({ onBrowseClick, onSellClick }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 px-6" id="sell" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Ambient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.04] via-transparent to-emerald-500/[0.02]" />
          <div className="absolute inset-0 border border-white/[0.04] rounded-3xl" />

          <div className="relative z-10 py-20 px-12 max-md:py-14 max-md:px-8">
            {/* Two column CTA */}
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-16 max-md:gap-14">
              {/* Buy side */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
                  For Buyers
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-[800] tracking-[-0.03em] leading-[1.1] mt-3 mb-5">
                  Find your<br />next car.
                </h3>
                <p className="text-[13px] text-white/25 leading-relaxed mb-8 max-w-[320px]">
                  Browse thousands of verified listings across Bangladesh. Your perfect car is waiting.
                </p>
                <button
                  onClick={onBrowseClick}
                  className="inline-flex items-center gap-2.5 px-7 py-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.06] hover:border-white/[0.1] text-white/80 hover:text-white rounded-xl text-[13px] font-medium cursor-pointer transition-all duration-300 group"
                >
                  Browse Cars
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </button>
              </div>

              {/* Sell side */}
              <div className="max-md:pt-14 max-md:border-t border-white/[0.04]">
                <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/70 font-medium">
                  For Sellers
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-[800] tracking-[-0.03em] leading-[1.1] mt-3 mb-5">
                  Sell your<br />car fast.
                </h3>
                <p className="text-[13px] text-white/25 leading-relaxed mb-8 max-w-[320px]">
                  List for free. Reach thousands of verified buyers. Get the best price — no middleman.
                </p>
                <button
                  onClick={onSellClick}
                  className="inline-flex items-center gap-2.5 px-7 py-3 bg-transparent border border-white/[0.06] hover:border-emerald-500/30 text-white/50 hover:text-emerald-400/80 rounded-xl text-[13px] font-medium cursor-pointer transition-all duration-300 group"
                >
                  গাড়ি বিক্রি করুন
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
