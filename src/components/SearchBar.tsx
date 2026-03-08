"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brands = ["Toyota", "Honda", "Nissan", "Suzuki", "Mitsubishi", "BMW", "Hyundai"];

const divisions = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

export default function SearchBar() {
  useEffect(() => {
    gsap.from(".search-card", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".search-section", start: "top 80%" },
    });
  }, []);

  return (
    <section className="search-section relative z-50 -mt-16 pb-16 pt-20 px-6">
      <div className="search-card max-w-[960px] mx-auto bg-[rgba(13,27,42,0.8)] backdrop-blur-[24px] border border-white/[0.06] rounded-3xl p-10 max-md:p-6">
        <h3 className="text-xl font-bold text-center mb-6">
          Find Your Perfect Car
        </h3>

        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 mb-6">
          {/* Brand */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">
              Brand
            </label>
            <select className="w-full px-4 py-3 bg-white/5 border border-white/[0.06] rounded-lg text-white text-sm outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-subtle)] transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%237a8b9e%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] pr-10">
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">
              Max Price (BDT)
            </label>
            <select className="w-full px-4 py-3 bg-white/5 border border-white/[0.06] rounded-lg text-white text-sm outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-subtle)] transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%237a8b9e%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] pr-10">
              <option value="">Any Price</option>
              <option value="500000">Under ৳5 Lakh</option>
              <option value="1000000">Under ৳10 Lakh</option>
              <option value="2000000">Under ৳20 Lakh</option>
              <option value="3500000">Under ৳35 Lakh</option>
              <option value="5000000">Under ৳50 Lakh</option>
              <option value="8000000">Under ৳80 Lakh</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">
              Location
            </label>
            <select className="w-full px-4 py-3 bg-white/5 border border-white/[0.06] rounded-lg text-white text-sm outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-subtle)] transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%237a8b9e%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] pr-10">
              <option value="">All Divisions</option>
              {divisions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">
              Year
            </label>
            <select className="w-full px-4 py-3 bg-white/5 border border-white/[0.06] rounded-lg text-white text-sm outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-subtle)] transition-all appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%237a8b9e%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] pr-10">
              <option value="">Any Year</option>
              {Array.from({ length: 15 }, (_, i) => 2026 - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-semibold text-base cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_var(--accent-glow)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Search Cars
        </button>

        {/* Quick brand chips */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center mt-6 pt-6 border-t border-white/[0.06]">
          <span className="text-xs text-[var(--text-muted)]">Popular:</span>
          {brands.map((brand) => (
            <button
              key={brand}
              className="px-4 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full text-[0.82rem] font-medium text-[var(--text-secondary)] cursor-pointer transition-all hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
