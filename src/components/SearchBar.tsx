"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SearchFilters } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const brands = ["Toyota", "Honda", "Nissan", "Suzuki", "Mitsubishi", "BMW", "Hyundai"];
const divisions = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

type Props = {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onSearch: () => void;
  onBrandChipClick: (brand: string) => void;
};

const selectCls = "w-full px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-xl text-white/90 text-sm outline-none focus:border-[var(--accent)]/40 focus:bg-white/[0.05] transition-all duration-300 appearance-none cursor-pointer bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234a5568%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] pr-10";

export default function SearchBar({ filters, setFilters, onSearch, onBrandChipClick }: Props) {
  useEffect(() => {
    gsap.from(".search-card", {
      y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".search-section", start: "top 85%" },
    });
  }, []);

  const set = (field: keyof SearchFilters) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters(f => ({ ...f, [field]: e.target.value }));

  return (
    <section className="search-section relative z-50 -mt-12 pb-12 pt-16 px-6">
      <div className="search-card max-w-[880px] mx-auto bg-[rgba(10,18,32,0.75)] backdrop-blur-2xl border border-white/[0.06] rounded-2xl p-8 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
        {/* Minimal label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/25 font-medium">Quick Search</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-3 mb-4">
          <div>
            <label className="block text-[10px] font-medium text-white/20 uppercase tracking-[0.15em] mb-2 pl-1">Brand</label>
            <select className={selectCls} value={filters.brand} onChange={set("brand")}>
              <option value="">All Brands</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-medium text-white/20 uppercase tracking-[0.15em] mb-2 pl-1">Max Price</label>
            <select className={selectCls} value={filters.price} onChange={set("price")}>
              <option value="">Any Price</option>
              <option value="500000">Under ৳5 Lakh</option>
              <option value="1000000">Under ৳10 Lakh</option>
              <option value="2000000">Under ৳20 Lakh</option>
              <option value="3500000">Under ৳35 Lakh</option>
              <option value="5000000">Under ৳50 Lakh</option>
              <option value="8000000">Under ৳80 Lakh</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-medium text-white/20 uppercase tracking-[0.15em] mb-2 pl-1">Division</label>
            <select className={selectCls} value={filters.location} onChange={set("location")}>
              <option value="">Anywhere</option>
              {divisions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-medium text-white/20 uppercase tracking-[0.15em] mb-2 pl-1">Year</label>
            <select className={selectCls} value={filters.year} onChange={set("year")}>
              <option value="">Any Year</option>
              {Array.from({ length: 15 }, (_, i) => 2026 - i).map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={onSearch}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.06] hover:border-white/[0.1] text-white/80 hover:text-white rounded-xl font-medium text-sm cursor-pointer transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          Search Cars
        </button>

        {/* Brand chips */}
        <div className="flex items-center gap-2 flex-wrap justify-center mt-8">
          <span className="text-[10px] text-white/15 uppercase tracking-[0.2em] mr-1">Popular</span>
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => onBrandChipClick(brand)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium cursor-pointer transition-all duration-200 border ${
                filters.brand === brand
                  ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--accent)]"
                  : "bg-transparent border-white/[0.04] text-white/25 hover:text-white/50 hover:border-white/[0.08]"
              }`}
            >
              {brand}
            </button>
          ))}
          {filters.brand && (
            <button
              onClick={() => setFilters(f => ({ ...f, brand: "" }))}
              className="px-2.5 py-1.5 text-[10px] text-white/20 hover:text-white/50 cursor-pointer transition-colors bg-transparent border-none"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
