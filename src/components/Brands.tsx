"use client";

const brandNames = [
  "Toyota", "Honda", "Nissan", "Mitsubishi", "Suzuki",
  "Hyundai", "BMW", "Mercedes", "Mazda", "Subaru",
];

export default function Brands({ onBrandClick }: { onBrandClick: (brand: string) => void }) {
  const row = [...brandNames, ...brandNames];

  return (
    <section className="py-20 overflow-hidden" id="brands">
      {/* Minimal section label */}
      <div className="flex items-center gap-3 mb-12 px-6 max-w-[1200px] mx-auto">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-medium">Trusted Brands</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="absolute top-0 left-0 w-[160px] h-full bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-[2] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[160px] h-full bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-[2] pointer-events-none" />

        <div className="flex gap-[80px] animate-[marquee_35s_linear_infinite] w-max items-center">
          {row.map((brand, i) => (
            <button
              key={i}
              onClick={() => onBrandClick(brand)}
              className="font-[family-name:var(--font-display)] text-[clamp(1.4rem,3vw,2.2rem)] font-[700] tracking-[-0.02em] text-white/[0.07] hover:text-white/25 transition-colors duration-500 cursor-pointer bg-transparent border-none whitespace-nowrap uppercase"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
