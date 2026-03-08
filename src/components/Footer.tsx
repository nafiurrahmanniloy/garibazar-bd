"use client";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

type Props = {
  onSellClick: () => void;
  onLocationClick: (location: string) => void;
};

const locations = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

export default function Footer({ onSellClick, onLocationClick }: Props) {
  return (
    <footer className="pt-24 pb-8 px-6 border-t border-white/[0.04]" id="contact">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] max-lg:grid-cols-2 max-md:grid-cols-1 gap-12 mb-16">
          {/* Brand */}
          <div>
            <button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2 bg-transparent border-none cursor-pointer group mb-5"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent)] to-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10l-3.3.5A2 2 0 0 0 5 8.4V10" />
                  <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-white/80">
                gari<span className="text-[var(--accent)]">bazar</span>
              </span>
            </button>
            <p className="text-[13px] text-white/20 leading-relaxed max-w-[280px]">
              Bangladesh&apos;s trusted marketplace for pre-owned cars. Find verified cars, sell with confidence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30 mb-6">Navigate</h4>
            <ul className="space-y-3">
              {[
                { label: "Browse Cars", action: () => scrollTo("browse-cars") },
                { label: "How It Works", action: () => scrollTo("how-it-works") },
                { label: "About", action: () => scrollTo("about") },
                { label: "Sell Your Car", action: onSellClick },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-[13px] text-white/20 hover:text-white/50 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30 mb-6">Locations</h4>
            <ul className="space-y-3">
              {locations.map((city) => (
                <li key={city}>
                  <button
                    onClick={() => onLocationClick(city)}
                    className="text-[13px] text-white/20 hover:text-white/50 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30 mb-6">Contact</h4>
            <div className="space-y-4">
              <a href="tel:+8801700000000" className="block text-[13px] text-white/20 hover:text-white/50 transition-colors duration-200">
                +880 1700-000000
              </a>
              <a href="mailto:hello@garibazar.com.bd" className="block text-[13px] text-white/20 hover:text-white/50 transition-colors duration-200">
                hello@garibazar.com.bd
              </a>
              <p className="text-[13px] text-white/20 leading-relaxed">
                Gulshan-2, Dhaka 1212<br />Bangladesh
              </p>
            </div>

            {/* Minimal social row */}
            <div className="flex gap-4 mt-8">
              {["Facebook", "Instagram", "YouTube"].map((s) => (
                <span key={s} className="text-[10px] uppercase tracking-[0.15em] text-white/10 hover:text-white/30 transition-colors duration-200 cursor-pointer">
                  {s.slice(0, 2)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex items-center justify-between max-md:flex-col max-md:gap-4 max-md:text-center">
          <span className="text-[11px] text-white/10">
            &copy; 2026 GariBazar BD. Made in Bangladesh.
          </span>
          <div className="flex gap-6">
            <button className="text-[11px] text-white/10 hover:text-white/25 transition-colors bg-transparent border-none cursor-pointer">
              Privacy
            </button>
            <button className="text-[11px] text-white/10 hover:text-white/25 transition-colors bg-transparent border-none cursor-pointer">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
