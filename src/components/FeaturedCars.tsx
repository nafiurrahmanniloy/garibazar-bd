"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Car, SearchFilters } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const cars: Car[] = [
  {
    name: "Toyota Allion",
    year: 2019,
    mileage: "58,000 km",
    price: "৳26,50,000",
    location: "Dhaka",
    badge: "Verified",
    badgeClass: "bg-emerald-500",
    condition: "Reconditioned",
    gradient: "from-blue-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#3b82f6",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&auto=format&fit=crop&q=80",
  },
  {
    name: "Honda Vezel",
    year: 2018,
    mileage: "72,000 km",
    price: "৳22,80,000",
    location: "Chittagong",
    badge: "Hot",
    badgeClass: "bg-rose-500",
    condition: "Reconditioned",
    gradient: "from-emerald-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#10b981",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=700&auto=format&fit=crop&q=80",
  },
  {
    name: "Nissan X-Trail",
    year: 2017,
    mileage: "89,000 km",
    price: "৳31,00,000",
    location: "Dhaka",
    badge: "Imported",
    badgeClass: "bg-blue-500",
    condition: "Imported",
    gradient: "from-violet-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=700&auto=format&fit=crop&q=80",
  },
  {
    name: "Toyota Axio",
    year: 2020,
    mileage: "41,000 km",
    price: "৳18,50,000",
    location: "Sylhet",
    badge: "Verified",
    badgeClass: "bg-emerald-500",
    condition: "Reconditioned",
    gradient: "from-cyan-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#06b6d4",
    image: "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=700&auto=format&fit=crop&q=80",
  },
  {
    name: "Mitsubishi Outlander",
    year: 2016,
    mileage: "95,000 km",
    price: "৳28,00,000",
    location: "Rajshahi",
    badge: "Verified",
    badgeClass: "bg-emerald-500",
    condition: "Used",
    gradient: "from-amber-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#f59e0b",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&auto=format&fit=crop&q=80",
  },
  {
    name: "BMW 3 Series",
    year: 2021,
    mileage: "28,000 km",
    price: "৳62,00,000",
    location: "Dhaka",
    badge: "Premium",
    badgeClass: "bg-amber-500 text-black",
    condition: "Used",
    gradient: "from-rose-900/80 via-slate-800/60 to-slate-900/90",
    accent: "#f43f5e",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=700&auto=format&fit=crop&q=80",
  },
];

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
  const [sortMode, setSortMode] = useState("default");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide cards immediately so there's no visible flash before animation
      gsap.set(".car-card", { y: 40, opacity: 0 });

      ScrollTrigger.create({
        trigger: ".cars-grid",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".car-card", {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
            clearProps: "transform,opacity",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const toggleWishlist = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  let filtered = filterCars(cars, filters);

  // Sort
  if (sortMode === "price-asc") {
    filtered = [...filtered].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (sortMode === "price-desc") {
    filtered = [...filtered].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  } else if (sortMode === "newest") {
    filtered = [...filtered].sort((a, b) => b.year - a.year);
  }

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <section className="cars-section py-20 px-6 relative overflow-hidden" id="browse-cars">
      <div className="max-w-[1280px] mx-auto relative z-[1]">
        {/* Sort bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-4 border-b border-white/[0.05]">
          <div>
            <span className="text-[0.8rem] text-[var(--text-secondary)] font-semibold">
              🔵 {filtered.length > 0 ? `${filtered.length === cars.length ? "247" : filtered.length}` : "0"} verified listings
            </span>
            {hasFilters && (
              <button
                onClick={() => {}}
                className="ml-3 text-[0.75rem] text-[var(--text-muted)] bg-white/[0.05] border border-white/[0.08] rounded-lg px-2.5 py-1 cursor-pointer hover:text-white transition-all"
              >
                ✕ Clear Filters
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[0.75rem] text-[var(--text-muted)] font-medium">Sort by:</span>
            {[
              { key: "default", label: "Featured" },
              { key: "price-asc", label: "Price ↑" },
              { key: "price-desc", label: "Price ↓" },
              { key: "newest", label: "Newest" },
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setSortMode(s.key)}
                className={`px-3 py-1.5 rounded-lg text-[0.75rem] font-semibold cursor-pointer transition-all ${
                  sortMode === s.key
                    ? "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/30"
                    : "bg-white/[0.04] text-[var(--text-secondary)] border border-white/[0.06] hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="cars-grid grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 items-stretch">
            {filtered.map((car, i) => (
              <div
                key={i}
                onClick={() => onCarClick(car)}
                className="car-card group flex flex-col bg-[var(--bg-card)]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:border-white/[0.15] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(59,130,246,0.1)]"
              >
                {/* Car image */}
                <div className={`relative w-full h-[220px] overflow-hidden bg-gradient-to-br ${car.gradient}`}>
                  <img
                    src={car.image}
                    alt={`${car.name} ${car.year}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60 pointer-events-none" />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-emerald-500/90 backdrop-blur text-white text-[0.65rem] font-bold uppercase rounded-full">
                      Verified
                    </span>
                    {car.badge !== "Verified" && (
                      <span className={`px-2.5 py-1 backdrop-blur text-white text-[0.65rem] font-bold uppercase rounded-full ${
                        car.badge === "Hot" ? "bg-rose-500/90" :
                        car.badge === "Premium" ? "bg-amber-500/90 text-black" :
                        "bg-blue-500/90"
                      }`}>
                        {car.badge}
                      </span>
                    )}
                  </div>
                  {/* Wishlist button */}
                  <button
                    onClick={(e) => toggleWishlist(car.name, e)}
                    className="absolute top-3 right-3 w-9 h-9 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-lg transition-all hover:bg-black/60 hover:scale-110"
                    aria-label="Add to wishlist"
                  >
                    {wishlist.has(car.name) ? "❤️" : "🤍"}
                  </button>
                  {/* View Details overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-sm font-semibold px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[1.1rem] font-bold mb-1">{car.name}</h3>
                  <div className="flex items-center gap-3 text-[0.82rem] text-[var(--text-secondary)] mb-4">
                    <span>📅 {car.year}</span>
                    <span>🛣 {car.mileage}</span>
                  </div>
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] mt-auto">
                    <span className="text-[1.25rem] font-extrabold text-amber-400 font-dashboard drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                      {car.price}
                    </span>
                    <span className="text-[0.8rem] text-[var(--text-secondary)]">
                      📍 {car.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-[var(--text-secondary)] mb-2">No cars match your filters.</p>
            <p className="text-xs text-[var(--text-muted)]">Try changing your search criteria.</p>
          </div>
        )}

        {/* View All */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/[0.06] text-white font-semibold text-[0.95rem] rounded-lg cursor-pointer transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)]">
            View All Cars →
          </button>
        </div>
      </div>
    </section>
  );
}
