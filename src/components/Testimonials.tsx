"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Rafiq Ahmed",
    location: "Dhaka",
    text: "GariBazar helped me find a verified Toyota Allion at a great price. The inspection report gave me full confidence.",
  },
  {
    name: "Fatema Akter",
    location: "Chittagong",
    text: "I sold my Honda within a week. No haggling with middlemen. The escrow payment made me feel completely secure.",
  },
  {
    name: "Kamal Hossain",
    location: "Sylhet",
    text: "As a first-time buyer, I was nervous about reconditioned cars. GariBazar verified everything — papers, mileage, engine.",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        {/* Asymmetric header */}
        <div className="flex items-end justify-between mb-20 max-md:flex-col max-md:items-start max-md:gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
              Testimonials
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.5rem)] font-[800] tracking-[-0.03em] leading-[1.05] mt-2">
              Real stories.<br />
              <span className="text-white/30">Real people.</span>
            </h2>
          </div>
          <p className="text-sm text-white/25 max-w-[280px] leading-relaxed text-right max-md:text-left">
            From buyers and sellers across Bangladesh.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="p-8 bg-[var(--bg-card)] border border-white/[0.04] rounded-2xl group-hover:border-white/[0.06] transition-all duration-500">
                {/* Large quote mark */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white/[0.06] mb-6">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor" />
                </svg>

                <p className="text-[14px] text-white/35 leading-[1.8] mb-8">
                  {t.text}
                </p>

                <div className="flex items-center gap-3 pt-6 border-t border-white/[0.04]">
                  {/* Initial circle */}
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center text-[11px] font-semibold text-white/30 shrink-0">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-white/60">{t.name}</div>
                    <div className="text-[11px] text-white/20">{t.location}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
