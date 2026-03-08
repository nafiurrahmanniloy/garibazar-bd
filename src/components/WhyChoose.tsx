"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "5,000", suffix: "+", label: "Cars Sold" },
  { value: "12,000", suffix: "+", label: "Happy Customers" },
  { value: "64", suffix: "", label: "Districts" },
  { value: "350", suffix: "+", label: "Verified Dealers" },
];

const features = [
  {
    title: "150-point inspection",
    desc: "Every car goes through a certified mechanic inspection before it ever gets listed.",
    num: "01",
  },
  {
    title: "Escrow protection",
    desc: "Your money stays secured until you confirm delivery. Zero risk transactions.",
    num: "02",
  },
  {
    title: "All 8 divisions",
    desc: "Dhaka to Rangpur — find verified cars across every corner of Bangladesh.",
    num: "03",
  },
  {
    title: "No middleman markup",
    desc: "Direct buyer-seller deals. Transparent pricing in BDT, always.",
    num: "04",
  },
];

export default function WhyChoose() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section className="py-32 px-6" id="about" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        {/* Stats strip — editorial number row */}
        <div ref={statsRef} className="grid grid-cols-4 max-md:grid-cols-2 gap-px mb-28 max-md:mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-8"
            >
              <div className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.5vw,3.8rem)] font-[800] tracking-[-0.04em] leading-none text-white/90">
                {s.value}<span className="text-[var(--accent)]">{s.suffix}</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/20 mt-3 font-medium">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section header — asymmetric like FeaturedCars */}
        <div className="flex items-end justify-between mb-20 max-md:flex-col max-md:items-start max-md:gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
              Why GariBazar
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.5rem)] font-[800] tracking-[-0.03em] leading-[1.05] mt-2">
              Trust, built into<br />
              <span className="text-white/30">every deal.</span>
            </h2>
          </div>
          <p className="text-sm text-white/25 max-w-[300px] leading-relaxed text-right max-md:text-left">
            We make second-hand car transactions safe, transparent, and completely hassle-free.
          </p>
        </div>

        {/* Feature grid — minimal numbered items */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-16 gap-y-0">
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="py-8 border-t border-white/[0.04] group"
            >
              <div className="flex items-start gap-6">
                <span className="font-[family-name:var(--font-display)] text-[2rem] font-[300] text-white/[0.07] leading-none shrink-0 mt-0.5 tracking-tight">
                  {f.num}
                </span>
                <div>
                  <h4 className="font-[family-name:var(--font-display)] text-[1.15rem] font-semibold tracking-tight mb-2 group-hover:text-white/90 transition-colors duration-300">
                    {f.title}
                  </h4>
                  <p className="text-[13px] text-white/25 leading-relaxed max-w-[360px]">
                    {f.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
