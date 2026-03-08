"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Car, SearchFilters } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const cars: Car[] = [
  {
    name: "Toyota Allion A15",
    year: 2019,
    mileage: "32,000 km",
    price: "৳28,50,000",
    location: "Dhaka",
    badge: "Verified",
    badgeClass: "bg-emerald-500",
    condition: "Reconditioned",
    gradient: "from-blue-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#3b82f6",
  },
  {
    name: "Honda Grace Hybrid",
    year: 2018,
    mileage: "45,000 km",
    price: "৳24,00,000",
    location: "Chittagong",
    badge: "Featured",
    badgeClass: "bg-amber-500 text-black",
    condition: "Reconditioned",
    gradient: "from-emerald-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#10b981",
  },
  {
    name: "Nissan X-Trail",
    year: 2020,
    mileage: "28,000 km",
    price: "৳42,00,000",
    location: "Dhaka",
    badge: "Verified",
    badgeClass: "bg-emerald-500",
    condition: "Used",
    gradient: "from-violet-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#8b5cf6",
  },
  {
    name: "Mitsubishi Pajero Sport",
    year: 2017,
    mileage: "58,000 km",
    price: "৳55,00,000",
    location: "Sylhet",
    badge: "Reconditioned",
    badgeClass: "bg-blue-500",
    condition: "Reconditioned",
    gradient: "from-amber-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#f59e0b",
  },
  {
    name: "Suzuki Swift GL",
    year: 2021,
    mileage: "15,000 km",
    price: "৳18,50,000",
    location: "Rajshahi",
    badge: "Verified",
    badgeClass: "bg-emerald-500",
    condition: "Used",
    gradient: "from-cyan-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#06b6d4",
  },
  {
    name: "Toyota Land Cruiser Prado",
    year: 2016,
    mileage: "72,000 km",
    price: "৳78,00,000",
    location: "Dhaka",
    badge: "Featured",
    badgeClass: "bg-amber-500 text-black",
    condition: "Used",
    gradient: "from-rose-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#f43f5e",
  },
];

// Parse price string like "৳28,50,000" → number
function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[৳,]/g, "")) || 0;
}

function filterCars(cars: Car[], filters: SearchFilters): Car[] {
  return cars.filter(car => {
    if (filters.brand && !car.name.toLowerCase().includes(filters.brand.toLowerCase())) return false;
    if (filters.location && car.location !== filters.location) return false;
    if (filters.year && car.year !== parseInt(filters.year)) return false;
    if (filters.price && parsePrice(car.price) > parseInt(filters.price)) return false;
    return true;
  });
}

function CarPlaceholder({ name, accent }: { name: string; accent: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10l-3.3.5A2 2 0 0 0 5 8.4V10" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M5 17H3c-.6 0-1-.4-1-1v-4.5" />
        <path d="M2 10h20" />
      </svg>
      <span className="text-xs font-medium opacity-40 text-white">{name}</span>
    </div>
  );
}

type Props = {
  filters: SearchFilters;
  onCarClick: (car: Car) => void;
};

export default function FeaturedCars({ filters, onCarClick }: Props) {
  useEffect(() => {
    gsap.from(".car-card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cars-grid", start: "top 80%" },
    });
  }, []);

  const filtered = filterCars(cars, filters);
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <section className="cars-section py-20 px-6" id="browse-cars">
      <div className="max-w-[1280px] mx-auto">
        <div className="section-header text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-3">
            Featured Listings
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight mb-4">
            Handpicked Cars For You
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[560px] mx-auto leading-relaxed">
            Every car is inspected and verified. Browse the best deals across Bangladesh.
          </p>
          {hasFilters && (
            <p className="mt-3 text-sm text-[var(--accent)]">
              Showing {filtered.length} of {cars.length} cars
            </p>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="cars-grid grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6">
            {filtered.map((car, i) => (
              <div
                key={i}
                onClick={() => onCarClick(car)}
                className="car-card bg-[var(--bg-card)] border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:border-white/[0.12] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_var(--accent-glow)]"
              >
                {/* Image placeholder */}
                <div className={`relative w-full h-[220px] overflow-hidden bg-gradient-to-br ${car.gradient}`}>
                  <CarPlaceholder name={car.name} accent={car.accent} />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wide text-white ${car.badgeClass}`}>
                    {car.badge}
                  </span>
                  {/* View Details overlay */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <span className="text-white text-sm font-semibold px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-[1.1rem] font-bold mb-1">{car.name}</h3>
                  <div className="flex items-center gap-3 text-[0.82rem] text-[var(--text-secondary)] mb-4">
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      {car.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                      </svg>
                      {car.mileage}
                    </span>
                    <span className="px-2 py-0.5 bg-white/[0.05] rounded text-[0.72rem]">
                      {car.condition}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <span className="text-[1.25rem] font-extrabold text-amber-400">
                      {car.price}
                    </span>
                    <span className="flex items-center gap-1 text-[0.8rem] text-[var(--text-secondary)]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {car.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <p className="text-[var(--text-secondary)] mb-2">No cars match your filters.</p>
            <p className="text-xs text-[var(--text-muted)]">Try adjusting your search criteria.</p>
          </div>
        )}

        {/* View All */}
        <button
          onClick={() => document.getElementById("browse-cars")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center justify-center gap-2 mx-auto mt-12 px-10 py-3.5 bg-transparent border border-white/[0.06] rounded-lg text-white font-semibold text-[0.95rem] cursor-pointer transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] group"
        >
          View All Cars
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
