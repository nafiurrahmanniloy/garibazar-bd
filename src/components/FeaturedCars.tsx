"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Car, SearchFilters } from "@/types";

const cars: Car[] = [
  { name: "Toyota Allion A15", year: 2019, mileage: "32,000 km", price: "৳28,50,000", location: "Dhaka", badge: "Verified", badgeClass: "bg-emerald-500/90", condition: "Reconditioned", gradient: "from-blue-950/90 via-slate-900/70 to-slate-950", accent: "#3b82f6" },
  { name: "Honda Grace Hybrid", year: 2018, mileage: "45,000 km", price: "৳24,00,000", location: "Chittagong", badge: "Featured", badgeClass: "bg-amber-500/90 text-black", condition: "Reconditioned", gradient: "from-emerald-950/90 via-slate-900/70 to-slate-950", accent: "#10b981" },
  { name: "Nissan X-Trail", year: 2020, mileage: "28,000 km", price: "৳42,00,000", location: "Dhaka", badge: "Verified", badgeClass: "bg-emerald-500/90", condition: "Used", gradient: "from-violet-950/90 via-slate-900/70 to-slate-950", accent: "#8b5cf6" },
  { name: "Mitsubishi Pajero Sport", year: 2017, mileage: "58,000 km", price: "৳55,00,000", location: "Sylhet", badge: "Reconditioned", badgeClass: "bg-blue-500/90", condition: "Reconditioned", gradient: "from-amber-950/90 via-slate-900/70 to-slate-950", accent: "#f59e0b" },
  { name: "Suzuki Swift GL", year: 2021, mileage: "15,000 km", price: "৳18,50,000", location: "Rajshahi", badge: "Verified", badgeClass: "bg-emerald-500/90", condition: "Used", gradient: "from-cyan-950/90 via-slate-900/70 to-slate-950", accent: "#06b6d4" },
  { name: "Toyota Land Cruiser Prado", year: 2016, mileage: "72,000 km", price: "৳78,00,000", location: "Dhaka", badge: "Featured", badgeClass: "bg-amber-500/90 text-black", condition: "Used", gradient: "from-rose-950/90 via-slate-900/70 to-slate-950", accent: "#f43f5e" },
];

function parsePrice(s: string) { return parseInt(s.replace(/[৳,]/g, "")) || 0; }

function filterCars(c: Car[], f: SearchFilters) {
  return c.filter(car => {
    if (f.brand && !car.name.toLowerCase().includes(f.brand.toLowerCase())) return false;
    if (f.location && car.location !== f.location) return false;
    if (f.year && car.year !== parseInt(f.year)) return false;
    if (f.price && parsePrice(car.price) > parseInt(f.price)) return false;
    return true;
  });
}

function GlowCard({ children, accent, onClick }: { children: React.ReactNode; accent: string; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={e => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Glow follow cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-500"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, ${accent}15, transparent 50%)`,
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${accent}25, transparent 50%)`,
          maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative z-10 bg-[var(--bg-card)] rounded-2xl border border-white/[0.04] group-hover:border-white/[0.06] transition-all duration-500">
        {children}
      </div>
    </div>
  );
}

type Props = { filters: SearchFilters; onCarClick: (car: Car) => void };

export default function FeaturedCars({ filters, onCarClick }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const filtered = filterCars(cars, filters);
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <section className="py-28 px-6" id="browse-cars" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section header — editorial style */}
        <div className="flex items-end justify-between mb-16 max-md:flex-col max-md:items-start max-md:gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
              Featured
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.5rem)] font-[800] tracking-[-0.03em] leading-[1.05] mt-2">
              Handpicked<br />
              <span className="text-white/30">for you.</span>
            </h2>
          </div>
          <div className="text-right max-md:text-left">
            <p className="text-sm text-white/25 max-w-[280px] leading-relaxed">
              Every car inspected. Every deal verified.{" "}
              {hasFilters && <span className="text-[var(--accent)]">{filtered.length} results</span>}
            </p>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5">
            {filtered.map((car, i) => (
              <motion.div
                key={car.name + car.year}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlowCard accent={car.accent} onClick={() => onCarClick(car)}>
                  <div className={`relative w-full h-[200px] bg-gradient-to-br ${car.gradient} flex items-center justify-center overflow-hidden`}>
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={car.accent} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20 group-hover:opacity-35 transition-opacity duration-500 group-hover:scale-110 transform">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10l-3.3.5A2 2 0 0 0 5 8.4V10" />
                      <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
                      <path d="M5 17H3c-.6 0-1-.4-1-1v-4.5" /><path d="M2 10h20" />
                    </svg>
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider text-white ${car.badgeClass}`}>
                      {car.badge}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-semibold tracking-tight">{car.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-white/25">{car.year}</span>
                          <span className="w-0.5 h-0.5 rounded-full bg-white/15" />
                          <span className="text-[11px] text-white/25">{car.mileage}</span>
                          <span className="w-0.5 h-0.5 rounded-full bg-white/15" />
                          <span className="text-[11px] text-white/25">{car.condition}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.04]">
                      <span className="font-[family-name:var(--font-display)] text-lg font-bold text-amber-400/90">{car.price}</span>
                      <span className="flex items-center gap-1 text-[11px] text-white/20">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                        {car.location}
                      </span>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-white/20 text-sm">No cars match your filters.</p>
          </div>
        )}

        <div className="flex justify-center mt-14">
          <button
            onClick={() => document.getElementById("browse-cars")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 text-[13px] font-medium text-white/30 hover:text-white/60 bg-transparent border border-white/[0.04] hover:border-white/[0.08] rounded-xl cursor-pointer transition-all duration-300 group flex items-center gap-2"
          >
            View all listings
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
