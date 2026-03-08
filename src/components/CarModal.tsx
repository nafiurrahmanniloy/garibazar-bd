"use client";

import { useEffect } from "react";
import type { Car } from "@/types";

export default function CarModal({ car, onClose }: { car: Car; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in the ${car.name} (${car.year}) listed on GariBazar BD. Price: ${car.price}. Please share details.`
  );

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[#0d1b2a] border border-white/[0.08] rounded-3xl w-full max-w-[560px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image / gradient area */}
        <div className={`w-full h-[200px] bg-gradient-to-br ${car.gradient} flex items-center justify-center relative`}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke={car.accent}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.45"
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10l-3.3.5A2 2 0 0 0 5 8.4V10" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
            <path d="M5 17H3c-.6 0-1-.4-1-1v-4.5" />
            <path d="M2 10h20" />
          </svg>
          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wide text-white ${car.badgeClass}`}>
            {car.badge}
          </span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Details */}
        <div className="p-8">
          <h2 className="text-2xl font-extrabold mb-1">{car.name}</h2>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            {car.condition} &middot; {car.location}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Year", value: car.year.toString() },
              { label: "Mileage", value: car.mileage },
              { label: "Condition", value: car.condition },
            ].map((item) => (
              <div key={item.label} className="bg-white/[0.04] rounded-xl p-4 text-center">
                <p className="text-xs text-[var(--text-secondary)] mb-1">{item.label}</p>
                <p className="text-sm font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6 py-4 border-y border-white/[0.06]">
            <span className="text-[var(--text-secondary)] text-sm">Asking Price</span>
            <span className="text-2xl font-extrabold text-amber-400">{car.price}</span>
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-semibold text-sm transition-all hover:shadow-[0_8px_30px_var(--accent-glow)]"
              onClick={() => window.alert(`📞 Contact Seller\nPhone: +880 1700-000000\nbKash / Nagad: 01700-000000`)}
            >
              Contact Seller
            </button>
            <a
              href={`https://wa.me/8801700000000?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/30 hover:border-[#25d366]/60 text-[#25d366] rounded-lg font-semibold text-sm transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.563 4.14 1.543 5.876L.057 23.979l6.253-1.459A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.779a9.763 9.763 0 0 1-5.022-1.384l-.36-.214-3.716.867.943-3.617-.235-.374A9.751 9.751 0 0 1 2.221 12C2.221 6.609 6.609 2.221 12 2.221S21.779 6.609 21.779 12 17.391 21.779 12 21.779z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
