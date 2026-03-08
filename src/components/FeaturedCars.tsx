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
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1555626906-fcf10d6851b4?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop&q=80",
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

type Props = {
  filters: SearchFilters;
  onCarClick: (car: Car) => void;
};

export default function FeaturedCars({ filters, onCarClick }: Props) {
  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".cars-grid",
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.from(".car-card", { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" });
      },
    });
  }, []);

  const filtered = filterCars(cars, filters);
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <section className="cars-section py-20 px-6 relative overflow-hidden" id="browse-cars">
      {/* Showroom overhead glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_600px_200px_at_50%_0%,rgba(61,139,253,0.05),transparent)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-[1]">
        <div className="section-header text-center mb-16">
          <div className="glow-line mb-6" />
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
                className="car-card group bg-[var(--bg-card)]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:border-white/[0.15] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(59,130,246,0.1)]"
              >
                {/* Car image */}
                <div className={`relative w-full h-[220px] overflow-hidden bg-gradient-to-br ${car.gradient}`}>
                  <img
                    src={car.image}
                    alt={car.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  {/* Showroom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60 pointer-events-none" />
                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/15 rounded-full">
                    <div className={`w-1.5 h-1.5 rounded-full ${car.badge === "Verified" ? "bg-emerald-400" : car.badge === "Featured" ? "bg-amber-400" : "bg-blue-400"}`} />
                    <span className="text-[0.68rem] font-bold uppercase tracking-wide text-white">
                      {car.badge}
                    </span>
                  </div>
                  {/* View Details overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-sm font-semibold px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 relative">
                  {/* Chrome separator line */}
                  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
                    <span className="text-[1.25rem] font-extrabold text-amber-400 font-[var(--font-rajdhani)] drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
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
