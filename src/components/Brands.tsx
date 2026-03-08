"use client";

const brandNames = [
  "TOYOTA", "HONDA", "NISSAN", "MITSUBISHI", "SUZUKI",
  "HYUNDAI", "BMW", "MERCEDES", "MAZDA", "SUBARU",
];

export default function Brands() {
  // Duplicate for seamless infinite scroll
  const allBrands = [...brandNames, ...brandNames];

  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="section-header text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-3">
            Popular Brands
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight">
            Browse by Brand
          </h2>
        </div>
      </div>

      {/* Infinite scrolling track */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute top-0 left-0 w-[120px] h-full bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-[2] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[120px] h-full bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-[2] pointer-events-none" />

        <div className="flex gap-[60px] animate-[brandScroll_30s_linear_infinite] w-max">
          {allBrands.map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-[140px] h-[70px] px-8 py-4 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[1.1rem] font-bold text-[var(--text-secondary)] tracking-wider whitespace-nowrap cursor-pointer transition-all hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
