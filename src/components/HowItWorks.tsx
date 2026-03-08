"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Browse & Search",
    desc: "Find cars by brand, budget, and location. Filter from thousands of verified listings across all 64 districts.",
  },
  {
    num: "02",
    title: "Inspect & Verify",
    desc: "Book a professional inspection. Get a full history report — registration, mileage, import papers, and condition.",
  },
  {
    num: "03",
    title: "Deal & Drive",
    desc: "Secure payment via bKash, Nagad, or bank transfer. Complete ownership transfer and drive home.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 px-6" id="how-it-works" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        {/* Asymmetric header */}
        <div className="flex items-end justify-between mb-20 max-md:flex-col max-md:items-start max-md:gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
              Process
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.5rem)] font-[800] tracking-[-0.03em] leading-[1.05] mt-2">
              Three steps.<br />
              <span className="text-white/30">That&apos;s it.</span>
            </h2>
          </div>
          <p className="text-sm text-white/25 max-w-[280px] leading-relaxed text-right max-md:text-left">
            From browsing to driving — we&apos;ve made it effortless.
          </p>
        </div>

        {/* Steps — horizontal editorial layout */}
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`py-10 px-8 max-md:px-0 ${i < steps.length - 1 ? "border-r max-md:border-r-0 max-md:border-b" : ""} border-white/[0.04] group`}
            >
              {/* Large faded number */}
              <span className="font-[family-name:var(--font-display)] text-[4.5rem] font-[800] leading-none text-white/[0.03] block mb-6 tracking-[-0.06em]">
                {step.num}
              </span>

              <h4 className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold tracking-tight mb-3">
                {step.title}
              </h4>

              <p className="text-[13px] text-white/25 leading-relaxed max-w-[280px]">
                {step.desc}
              </p>

              {/* Subtle accent line on hover */}
              <div className="w-8 h-px bg-white/[0.06] mt-8 group-hover:w-16 group-hover:bg-[var(--accent)]/40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
