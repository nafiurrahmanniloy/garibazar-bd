"use client";

const brandNames = [
  "TOYOTA", "HONDA", "NISSAN", "MITSUBISHI", "SUZUKI",
  "HYUNDAI", "BMW", "MERCEDES", "MAZDA", "SUBARU",
];

export default function Brands({ onBrandClick }: { onBrandClick: (brand: string) => void }) {
  const allBrands = [...brandNames, ...brandNames];

  return (
    <section className="py-20 px-6 overflow-hidden relative" id="brands">
      {/* Showroom overhead */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[radial-gradient(ellipse_600px_150px_at_50%_0%,rgba(61,139,253,0.04),transparent)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-[1]">
        <div className="section-header text-center mb-12">
          <div className="glow-line mb-6" />
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

        <div className="flex gap-5 animate-[brandScroll_30s_linear_infinite] w-max">
          {allBrands.map((brand, i) => (
            <button
              key={i}
              onClick={() => onBrandClick(brand.charAt(0) + brand.slice(1).toLowerCase())}
              className="group relative flex items-center justify-center min-w-[160px] h-[80px] px-8 py-4 bg-black/[0.02] backdrop-blur-sm border border-black/[0.06] rounded-xl text-[1.1rem] font-bold text-[var(--text-secondary)] tracking-wider whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06),0_0_20px_var(--accent-glow)] overflow-hidden"
            >
              {/* Chrome top edge */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent group-hover:via-[var(--accent)]/30 transition-all" />
              <span className="relative z-[1] font-dashboard">{brand}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
