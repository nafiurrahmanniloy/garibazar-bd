"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SearchFilters } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const brands = ["Toyota", "Honda", "Nissan", "Mitsubishi", "Suzuki", "Hyundai", "BMW", "Mercedes", "Kia", "Lexus"];
const divisions = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

type Props = {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onSearch: () => void;
  onBrandChipClick: (brand: string) => void;
};

const selectClass = "w-full px-4 py-3 bg-white/5 border border-white/[0.06] rounded-lg text-white text-sm outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-subtle)] transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%237a8b9e%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] pr-10";

const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/[0.06] rounded-lg text-white text-sm outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-subtle)] transition-all placeholder:text-[var(--text-muted)]";

export default function SearchBar({ filters, setFilters, onSearch, onBrandChipClick }: Props) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".search-card", { y: 30, opacity: 0 });

      ScrollTrigger.create({
        trigger: ".search-section",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".search-card", {
            y: 0, opacity: 1, duration: 0.45, ease: "power2.out", clearProps: "transform,opacity",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const set = (field: keyof SearchFilters) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    setFilters(f => ({ ...f, [field]: e.target.value }));

  return (
    <section className="search-section relative z-50 -mt-16 pb-16 pt-20 px-6">
      {/* Headlight glow beams */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none z-0">
        <div className="absolute top-[60%] left-[20%] w-[300px] h-[180px] bg-[radial-gradient(ellipse_at_center,rgba(61,139,253,0.06),transparent_70%)] blur-sm" />
        <div className="absolute top-[60%] right-[20%] w-[300px] h-[180px] bg-[radial-gradient(ellipse_at_center,rgba(61,139,253,0.06),transparent_70%)] blur-sm" />
      </div>

      {/* Section header */}
      <div className="text-center mb-10 relative z-[1]">
        <div className="section-label" style={{ justifyContent: "center" }}>
          Bangladesh&apos;s #1 Used Car Marketplace
        </div>
        <h2
          className="gradient-text"
          style={{ fontSize: "clamp(1.85rem, 4.5vw, 3rem)", fontWeight: 900, fontStyle: "italic" }}
        >
          Find Your Perfect Car
        </h2>
        <p className="text-[var(--text-secondary)] mt-3 text-[0.95rem]">5,000+ verified listings across 64 districts</p>
      </div>

      <div className="search-card max-w-[960px] mx-auto bg-gradient-to-b from-[rgba(14,26,46,0.92)] to-[rgba(8,14,28,0.95)] backdrop-blur-[28px] rounded-3xl p-10 max-md:p-6 relative shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        {/* Chrome gradient border — brighter top (overhead showroom light) */}
        <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-b from-white/[0.15] via-white/[0.04] to-white/[0.06] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude] pointer-events-none" />
        {/* Inner accent glow at top */}
        <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent pointer-events-none" />

        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 mb-6">
          {/* Brand */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">
              Brand / <span lang="bn">ব্র্যান্ড</span>
            </label>
            <select className={selectClass} value={filters.brand} onChange={set("brand")}>
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">
              Model / <span lang="bn">মডেল</span>
            </label>
            <input
              type="text"
              className={inputClass}
              placeholder="e.g. Allion, Vezel…"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">
              Budget / <span lang="bn">বাজেট (৳)</span>
            </label>
            <select className={selectClass} value={filters.price} onChange={set("price")}>
              <option value="">Any Price</option>
              <option value="1000000">Under ৳10 Lakh</option>
              <option value="2000000">৳10L – ৳20L</option>
              <option value="3500000">৳20L – ৳35L</option>
              <option value="6000000">৳35L – ৳60L</option>
              <option value="10000000">৳60L – ৳1 Crore</option>
              <option value="99999999">Above ৳1 Crore</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">
              Location / <span lang="bn">অবস্থান</span>
            </label>
            <select className={selectClass} value={filters.location} onChange={set("location")}>
              <option value="">All Bangladesh</option>
              {divisions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick brand chips */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {["Toyota", "Honda", "Nissan", "Suzuki", "Mitsubishi", "BMW"].map((brand) => (
            <button
              key={brand}
              onClick={() => onBrandChipClick(brand)}
              className={`px-3.5 py-1.5 border rounded-full text-[0.8rem] font-medium cursor-pointer transition-all ${
                filters.brand === brand
                  ? "bg-[var(--accent-subtle)] border-[var(--accent)] text-[var(--accent)]"
                  : "bg-white/[0.04] border-white/[0.06] text-[var(--text-secondary)] hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {brand}
            </button>
          ))}
          {filters.brand && (
            <button
              onClick={() => setFilters(f => ({ ...f, brand: "" }))}
              className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full text-[0.75rem] font-medium text-[var(--text-muted)] cursor-pointer hover:text-white transition-all"
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Budget + condition chips */}
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <button
            onClick={() => setFilters(f => ({ ...f, price: "1000000" }))}
            className={`px-3.5 py-1.5 border rounded-full text-[0.78rem] font-medium cursor-pointer transition-all ${
              filters.price === "1000000"
                ? "bg-[var(--accent-subtle)] border-[var(--accent)] text-[var(--accent)]"
                : "bg-white/[0.04] border-white/[0.06] text-[var(--text-secondary)] hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            Under ৳10L
          </button>
          <button
            onClick={() => setFilters(f => ({ ...f, price: "2000000" }))}
            className={`px-3.5 py-1.5 border rounded-full text-[0.78rem] font-medium cursor-pointer transition-all ${
              filters.price === "2000000"
                ? "bg-[var(--accent-subtle)] border-[var(--accent)] text-[var(--accent)]"
                : "bg-white/[0.04] border-white/[0.06] text-[var(--text-secondary)] hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            ৳10L–20L
          </button>
          <button
            onClick={() => setFilters(f => ({ ...f, price: "3500000" }))}
            className={`px-3.5 py-1.5 border rounded-full text-[0.78rem] font-medium cursor-pointer transition-all ${
              filters.price === "3500000"
                ? "bg-[var(--accent-subtle)] border-[var(--accent)] text-[var(--accent)]"
                : "bg-white/[0.04] border-white/[0.06] text-[var(--text-secondary)] hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            ৳20L–35L
          </button>

          <div className="w-px h-5 bg-white/[0.08]" />

          <button className="px-3.5 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full text-[0.78rem] font-medium text-[var(--text-secondary)] cursor-pointer transition-all hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
            Reconditioned
          </button>
          <button className="px-3.5 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full text-[0.78rem] font-medium text-[var(--text-secondary)] cursor-pointer transition-all hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
            Local Used
          </button>
          <button className="px-3.5 py-1.5 bg-amber-500/[0.08] border border-amber-500/[0.2] rounded-full text-[0.78rem] font-medium text-amber-400 cursor-pointer transition-all hover:bg-amber-500/[0.15]">
            🔔 Get Alerts
          </button>
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="group/btn w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[var(--accent)] to-[#2872e5] hover:from-[#2872e5] hover:to-[var(--accent)] text-white rounded-lg font-semibold text-base cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_var(--accent-glow)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          <span className="relative z-[1]">🔍 Search Cars</span>
        </button>
      </div>
    </section>
  );
}
