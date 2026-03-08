"use client";

import { useEffect, useState } from "react";
import type { Car } from "@/types";

// Rich static data keyed by car name
const CAR_DETAILS: Record<string, {
  desc: string;
  inspectorNote: string;
  accidentClean: boolean;
  owners: { label: string; period: string; note: string }[];
  service: { date: string; type: string; km: string }[];
  specs: { label: string; value: string }[];
  features: string[];
  photos: string[];
  ref: string;
  views: number;
  listed: string;
  sellerName: string;
  sellerType: string;
  sellerRating: number;
  negotiable: boolean;
}> = {
  "Toyota Allion A15": {
    desc: "Exceptionally clean reconditioned Allion A15 imported directly from Japan. Full inspection report available. Original paint, no resprays. Excellent fuel economy for Dhaka city driving.",
    inspectorNote: "Inspected by GariBazar Certified Mechanic · March 2025. Engine, transmission, brakes, AC all in excellent condition. No rust, no accident marks.",
    accidentClean: true,
    owners: [
      { label: "Original Owner (Japan)", period: "2019–2021", note: "Low mileage corporate use" },
      { label: "Current Owner (BD)", period: "2021–Present", note: "Purchased through licensed importer, Dhaka" },
    ],
    service: [
      { date: "Feb 2025", type: "Oil & Filter Change", km: "32,000 km" },
      { date: "Nov 2024", type: "Tyre Rotation", km: "28,500 km" },
      { date: "Jul 2024", type: "AC Service & Coolant Flush", km: "24,000 km" },
    ],
    specs: [
      { label: "Engine", value: "1.5L 1NZ-FE DOHC" },
      { label: "Transmission", value: "CVT Automatic" },
      { label: "Fuel", value: "Petrol" },
      { label: "Drive", value: "Front-Wheel Drive" },
      { label: "Colour", value: "Pearl White" },
      { label: "Seats", value: "5" },
      { label: "Doors", value: "4" },
      { label: "Body Type", value: "Sedan" },
    ],
    features: ["Push-start Button", "Keyless Entry", "Reverse Camera", "LED Headlights", "Dual Airbags", "ABS", "Climate Control", "Touchscreen Audio"],
    photos: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&auto=format",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&auto=format",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&auto=format",
    ],
    ref: "GB-2025-041", views: 512, listed: "15 Jan 2025",
    sellerName: "AutoPrime BD", sellerType: "Verified Dealer", sellerRating: 4.9,
    negotiable: true,
  },
  "Honda Grace Hybrid": {
    desc: "Sporty Honda Grace Hybrid with excellent fuel economy — averaging 22–25 km/L in city driving. Full hybrid system in perfect working condition. Ideal for budget-conscious buyers.",
    inspectorNote: "GariBazar Certified Inspection · Feb 2025. Hybrid battery health: 97%. Engine smooth, no oil leaks. AC cold.",
    accidentClean: true,
    owners: [
      { label: "Original Owner (Japan)", period: "2018–2022", note: "Private use, well maintained" },
      { label: "Current Owner (BD)", period: "2022–Present", note: "Chittagong — all papers clear" },
    ],
    service: [
      { date: "Jan 2025", type: "Oil Change + Hybrid Battery Check", km: "45,000 km" },
      { date: "Sep 2024", type: "Brake Pads Replacement", km: "41,200 km" },
    ],
    specs: [
      { label: "Engine", value: "1.5L i-VTEC + Electric" },
      { label: "Transmission", value: "7-Speed DCT" },
      { label: "Fuel", value: "Hybrid (Petrol + Electric)" },
      { label: "Drive", value: "Front-Wheel Drive" },
      { label: "Colour", value: "Premium Silver" },
      { label: "Seats", value: "5" },
      { label: "Body Type", value: "Sedan" },
      { label: "Avg Fuel Economy", value: "22–25 km/L" },
    ],
    features: ["Hybrid System", "Honda Sensing", "Lane Keep Assist", "Rear Camera", "Apple CarPlay", "Keyless Entry", "LED DRL", "ABS + EBD"],
    photos: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=900&auto=format",
      "https://images.unsplash.com/photo-1561789241-aba1b89547f1?w=900&auto=format",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&auto=format",
    ],
    ref: "GB-2025-052", views: 341, listed: "20 Jan 2025",
    sellerName: "Rahman Motors", sellerType: "Verified Seller", sellerRating: 4.8,
    negotiable: true,
  },
  "Nissan X-Trail": {
    desc: "Powerful and spacious Nissan X-Trail SUV. Perfect for Dhaka roads and family trips across Bangladesh. 4WD mode available for rough terrain.",
    inspectorNote: "GariBazar Certified Inspection · Jan 2025. 4WD system fully functional. No suspension issues. Engine bay clean.",
    accidentClean: false,
    owners: [
      { label: "First Owner (BD)", period: "2020–2022", note: "Minor front bumper repair, fully repainted — documented" },
      { label: "Current Owner (BD)", period: "2022–Present", note: "Dhaka — post-repair in excellent condition" },
    ],
    service: [
      { date: "Mar 2025", type: "Full Service + Transmission Fluid", km: "28,000 km" },
      { date: "Oct 2024", type: "Tyre Replacement (All 4)", km: "24,000 km" },
    ],
    specs: [
      { label: "Engine", value: "2.0L MR20DD DOHC" },
      { label: "Transmission", value: "CVT Automatic" },
      { label: "Fuel", value: "Petrol" },
      { label: "Drive", value: "4WD (Selectable)" },
      { label: "Colour", value: "Gun Metallic" },
      { label: "Seats", value: "7" },
      { label: "Body Type", value: "SUV" },
      { label: "Boot Space", value: "565L (seats up)" },
    ],
    features: ["4WD Mode", "7 Seats", "360° Camera", "Sunroof", "Cruise Control", "Heated Seats", "BOSE Audio", "Dual Zone Climate"],
    photos: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&auto=format",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&auto=format",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=900&auto=format",
    ],
    ref: "GB-2025-018", views: 723, listed: "8 Jan 2025",
    sellerName: "Dhaka Auto Gallery", sellerType: "Verified Dealer", sellerRating: 4.7,
    negotiable: false,
  },
  "Mitsubishi Pajero Sport": {
    desc: "Premium Mitsubishi Pajero Sport — the most capable mid-size SUV available in Bangladesh. Super Select 4WD system handles any terrain. Ideal for long road trips and off-road adventures.",
    inspectorNote: "GariBazar Premium Inspection · Feb 2025. 4WD system and transfer case fully operational. Chassis solid. All electronics working.",
    accidentClean: true,
    owners: [
      { label: "Original Owner (Japan)", period: "2017–2020", note: "Low usage, well maintained" },
      { label: "Importer / Dealer (BD)", period: "2020–2021", note: "Reconditioned and re-registered" },
      { label: "Current Owner (BD)", period: "2021–Present", note: "Sylhet — occasional off-road use" },
    ],
    service: [
      { date: "Feb 2025", type: "Full Service + Diff Oil", km: "58,000 km" },
      { date: "Aug 2024", type: "Engine Air Filter + Cabin Filter", km: "53,000 km" },
      { date: "Jan 2024", type: "4WD System Check", km: "47,000 km" },
    ],
    specs: [
      { label: "Engine", value: "2.4L 4N15 MIVEC Turbo Diesel" },
      { label: "Transmission", value: "8-Speed Automatic" },
      { label: "Fuel", value: "Diesel" },
      { label: "Drive", value: "Super Select 4WD" },
      { label: "Colour", value: "Titanium Grey" },
      { label: "Seats", value: "7" },
      { label: "Body Type", value: "SUV" },
      { label: "Ground Clearance", value: "218mm" },
    ],
    features: ["Super Select 4WD", "Electronically Locking Rear Diff", "Sunroof", "360° Camera", "Adaptive Cruise", "Apple CarPlay", "Android Auto", "9 Airbags"],
    photos: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&auto=format",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&auto=format",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format",
    ],
    ref: "GB-2025-007", views: 1204, listed: "3 Jan 2025",
    sellerName: "Sylhet Premium Cars", sellerType: "Verified Dealer", sellerRating: 4.9,
    negotiable: true,
  },
  "Suzuki Swift GL": {
    desc: "Brand new almost — 2021 Suzuki Swift GL with just 15,000 km. Perfect first car or city runabout. Great fuel economy and easy to park in Dhaka traffic.",
    inspectorNote: "GariBazar Inspection · Mar 2025. Near new condition. All panels original. Under warranty period items checked — all good.",
    accidentClean: true,
    owners: [
      { label: "First & Only Owner (BD)", period: "2021–Present", note: "Rajshahi — light city use" },
    ],
    service: [
      { date: "Feb 2025", type: "Oil Change + Air Filter", km: "15,000 km" },
      { date: "Jun 2024", type: "First Scheduled Service", km: "10,000 km" },
    ],
    specs: [
      { label: "Engine", value: "1.2L K12C DualJet" },
      { label: "Transmission", value: "5-Speed Manual" },
      { label: "Fuel", value: "Petrol" },
      { label: "Drive", value: "Front-Wheel Drive" },
      { label: "Colour", value: "Burning Red" },
      { label: "Seats", value: "5" },
      { label: "Body Type", value: "Hatchback" },
      { label: "Fuel Economy", value: "18–22 km/L" },
    ],
    features: ["Touchscreen Infotainment", "Reverse Camera", "Rear Parking Sensors", "LED Headlights", "Dual Airbags", "ABS", "Hill Hold Control", "Bluetooth"],
    photos: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&auto=format",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&auto=format",
      "https://images.unsplash.com/photo-1596828710994-5b0e5b7d6cd7?w=900&auto=format",
    ],
    ref: "GB-2025-089", views: 287, listed: "1 Feb 2025",
    sellerName: "Hossain (Private)", sellerType: "Verified Seller", sellerRating: 4.6,
    negotiable: false,
  },
  "Toyota Land Cruiser Prado": {
    desc: "Iconic Toyota Land Cruiser Prado — the gold standard of SUVs in Bangladesh. Immaculate condition, fully loaded with every possible feature. A true statement vehicle.",
    inspectorNote: "GariBazar Premium Inspection · Jan 2025. KDSS suspension fully functional. All 4WD modes tested. Leather interior pristine.",
    accidentClean: true,
    owners: [
      { label: "Original Owner (Japan)", period: "2016–2019", note: "Corporate use — Toyota Japan" },
      { label: "Importer (BD)", period: "2019–2020", note: "Official import, all papers" },
      { label: "Current Owner (BD)", period: "2020–Present", note: "Dhaka Gulshan — premium maintained" },
    ],
    service: [
      { date: "Mar 2025", type: "Full Premium Service", km: "72,000 km" },
      { date: "Sep 2024", type: "Suspension & Brake Overhaul", km: "66,000 km" },
      { date: "Feb 2024", type: "KDSS System Check", km: "60,000 km" },
    ],
    specs: [
      { label: "Engine", value: "2.8L 1GD-FTV Turbo Diesel" },
      { label: "Transmission", value: "6-Speed Automatic" },
      { label: "Fuel", value: "Diesel" },
      { label: "Drive", value: "Part-Time 4WD + KDSS" },
      { label: "Colour", value: "Premium Black" },
      { label: "Seats", value: "7" },
      { label: "Body Type", value: "Premium SUV" },
      { label: "Ground Clearance", value: "230mm" },
    ],
    features: ["KDSS Suspension", "Multi-Terrain Select", "Crawl Control", "Multi-View Monitor", "Premium JBL Audio", "Power Tailgate", "Head-Up Display", "10 Airbags"],
    photos: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&auto=format",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&auto=format",
    ],
    ref: "GB-2025-003", views: 2104, listed: "2 Jan 2025",
    sellerName: "Premium Auto Gulshan", sellerType: "Verified Dealer", sellerRating: 5.0,
    negotiable: true,
  },
};

const DEFAULT_DETAIL = {
  desc: "Well-maintained vehicle in excellent condition. All papers verified by GariBazar. Contact seller for more details.",
  inspectorNote: "GariBazar Certified Inspection completed. Vehicle in good condition.",
  accidentClean: true,
  owners: [{ label: "Current Owner (BD)", period: "–Present", note: "Verified seller" }],
  service: [{ date: "2025", type: "General Service", km: "–" }],
  specs: [] as { label: string; value: string }[],
  features: [] as string[],
  photos: [] as string[],
  ref: "GB-2025-XXX", views: 0, listed: "2025",
  sellerName: "Verified Seller", sellerType: "Verified", sellerRating: 4.5,
  negotiable: true,
};

export default function CarModal({ car, onClose }: { car: Car; onClose: () => void }) {
  const d = CAR_DETAILS[car.name] ?? DEFAULT_DETAIL;
  const [photo, setPhoto] = useState(0);
  const photos = d.photos.length > 0 ? d.photos : [`https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&auto=format`];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setPhoto(p => (p + 1) % photos.length);
      if (e.key === "ArrowLeft") setPhoto(p => (p - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, photos.length]);

  const waMsg = encodeURIComponent(`Hi, I'm interested in the ${car.name} (${car.year}) listed on GariBazar BD at ${car.price}. Please share more details.`);

  return (
    <div className="fixed inset-0 z-[2000] bg-[#03060a] flex flex-col animate-[cdp-slide-in_.35s_cubic-bezier(.22,1,.36,1)]"
      style={{ animation: "cdp-slide-in .35s cubic-bezier(.22,1,.36,1)" }}>
      <style>{`@keyframes cdp-slide-in { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[rgba(3,6,10,.92)] backdrop-blur-xl border-b border-white/[0.06] flex-shrink-0 z-10">
        <button onClick={onClose} className="flex items-center gap-2 text-[var(--accent)] font-semibold text-sm hover:bg-[rgba(59,130,246,.1)] px-2.5 py-1.5 rounded-lg transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
          Back
        </button>
        <span className="text-sm font-bold text-white truncate max-w-[50%]">{car.name} · {car.year}</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/30">Ref: {d.ref}</span>
          <button onClick={onClose} className="w-8 h-8 bg-white/[0.07] hover:bg-white/[0.13] rounded-full flex items-center justify-center transition-colors text-sm">✕</button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1280px] mx-auto px-4 py-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-6">

          {/* ── LEFT COLUMN ─────────────────────────── */}
          <div>
            {/* Hero photo */}
            <div className="relative rounded-2xl overflow-hidden mb-3 bg-[#050d18]" style={{ height: "min(55vw, 420px)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photos[photo]} alt={car.name} className="w-full h-full object-cover transition-opacity duration-300" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(3,6,10,.6)_100%)]" />
              {/* Nav arrows */}
              {photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <button onClick={() => setPhoto(p => (p - 1 + photos.length) % photos.length)} className="w-9 h-9 bg-black/60 hover:bg-[rgba(59,130,246,.8)] rounded-full flex items-center justify-center text-white text-xl transition-colors">‹</button>
                  <span className="bg-black/60 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full">{photo + 1} / {photos.length}</span>
                  <button onClick={() => setPhoto(p => (p + 1) % photos.length)} className="w-9 h-9 bg-black/60 hover:bg-[rgba(59,130,246,.8)] rounded-full flex items-center justify-center text-white text-xl transition-colors">›</button>
                </div>
              )}
              {/* Badge */}
              <span className={`absolute top-3 left-3 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white ${car.badgeClass}`}>{car.badge}</span>
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {photos.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt="" onClick={() => setPhoto(i)}
                    className={`flex-shrink-0 w-16 h-11 object-cover rounded-md cursor-pointer transition-all ${i === photo ? "border-2 border-[var(--accent)] opacity-100" : "opacity-50 border-2 border-transparent hover:opacity-80"}`} />
                ))}
              </div>
            )}

            {/* Zone divider */}
            <div className="flex items-center gap-3 mb-4 px-1 py-2 bg-[rgba(59,130,246,.08)] rounded-lg border-l-[3px] border-[var(--accent)]">
              <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)]">📋 Listing Details</span>
              <span className="text-[11px] text-white/25">·</span>
              <span className="text-[11px] text-white/30">{d.views} views · Listed {d.listed}</span>
            </div>

            {/* Overview chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { icon: "📅", val: car.year.toString() },
                { icon: "🛣", val: car.mileage },
                { icon: "📍", val: car.location },
                { icon: "⚙️", val: car.condition },
              ].map(c => (
                <span key={c.val} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full text-sm text-white/70">
                  <span>{c.icon}</span>{c.val}
                </span>
              ))}
              {d.negotiable && <span className="flex items-center gap-1 px-3 py-1.5 bg-[rgba(16,185,129,.1)] border border-[rgba(16,185,129,.25)] rounded-full text-xs font-bold text-[#10b981]">✓ Negotiable</span>}
            </div>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed mb-6">{d.desc}</p>

            {/* Inspector banner */}
            <div className="flex items-start gap-3 p-4 bg-[rgba(16,185,129,.07)] border border-[rgba(16,185,129,.2)] rounded-xl mb-6">
              <span className="text-lg flex-shrink-0">🔍</span>
              <p className="text-xs text-[rgba(16,185,129,.9)] leading-relaxed">{d.inspectorNote}</p>
            </div>

            {/* ── VEHICLE HISTORY ── */}
            <div className="flex items-center gap-3 mb-4 py-2 border-t-2 border-[rgba(59,130,246,.25)] bg-[rgba(59,130,246,.06)] px-3 rounded">
              <span>📋</span><span className="text-[10px] font-black uppercase tracking-[.15em] text-[var(--accent)]">Vehicle History</span>
            </div>

            {/* Accident */}
            <div className="mb-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <h4 className="text-sm font-bold mb-2">Accident Record</h4>
              {d.accidentClean ? (
                <div className="flex items-center gap-2 text-[#10b981] text-sm font-semibold">
                  <span>✅</span> No accidents recorded · Clean history
                </div>
              ) : (
                <div className="flex items-start gap-2 text-amber-400 text-sm">
                  <span className="flex-shrink-0">⚠️</span>
                  <span>Minor incident recorded — fully repaired and documented. Inspector verified no structural damage.</span>
                </div>
              )}
            </div>

            {/* Ownership */}
            <div className="mb-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <h4 className="text-sm font-bold mb-3">Ownership History</h4>
              <div className="flex flex-col gap-3">
                {d.owners.map((o, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5">{i + 1}</div>
                    <div>
                      <div className="text-sm font-semibold">{o.label}</div>
                      <div className="text-xs text-white/30">{o.period} · {o.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service */}
            <div className="mb-6 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <h4 className="text-sm font-bold mb-3">Service History</h4>
              <div className="flex flex-col gap-2.5">
                {d.service.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-[var(--accent)] text-xs font-bold w-20 flex-shrink-0">{s.date}</span>
                    <span className="text-white/70">{s.type}</span>
                    <span className="ml-auto text-white/30 text-xs">{s.km}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── SPECS ── */}
            {d.specs.length > 0 && (
              <>
                <div className="flex items-center gap-3 mb-4 py-2 border-t-2 border-[rgba(245,158,11,.25)] bg-[rgba(245,158,11,.06)] px-3 rounded">
                  <span>⚙️</span><span className="text-[10px] font-black uppercase tracking-[.15em] text-amber-400">Specifications</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {d.specs.map(s => (
                    <div key={s.label} className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl text-center">
                      <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{s.label}</div>
                      <div className="text-sm font-bold">{s.value}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Features */}
            {d.features.length > 0 && (
              <div className="mb-6 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                <h4 className="text-sm font-bold mb-3">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {d.features.map(f => (
                    <span key={f} className="text-xs px-2.5 py-1 bg-[rgba(59,130,246,.08)] border border-[rgba(59,130,246,.15)] text-[var(--accent)] rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* ── HOW TO BUY ── */}
            <div className="flex items-center gap-3 mb-4 py-2 border-t-2 border-[rgba(251,191,36,.25)] bg-[rgba(251,191,36,.06)] px-3 rounded">
              <span>🛒</span><span className="text-[10px] font-black uppercase tracking-[.15em] text-amber-300">How to Buy</span>
            </div>
            <div className="flex flex-col gap-3 mb-8">
              {[
                { n: 1, title: "Contact Seller", desc: "Call or WhatsApp to confirm availability and schedule a visit." },
                { n: 2, title: "Inspect the Car", desc: "Visit with a mechanic or book a GariBazar certified inspector for ৳500." },
                { n: 3, title: "Verify Papers", desc: "Check RC Book, Tax Token, Fitness Certificate, Insurance, and import docs." },
                { n: 4, title: "Secure Payment", desc: "Use escrow via GariBazar or bKash/Nagad/bank. Never pay cash upfront." },
                { n: 5, title: "Transfer Ownership", desc: "Complete BRTA transfer. GariBazar assists with paperwork." },
              ].map(s => (
                <div key={s.n} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[rgba(59,130,246,.15)] border border-[rgba(59,130,246,.3)] text-[var(--accent)] text-xs font-black flex items-center justify-center flex-shrink-0">{s.n}</div>
                  <div><div className="text-sm font-semibold">{s.title}</div><div className="text-xs text-white/30 mt-0.5">{s.desc}</div></div>
                </div>
              ))}
            </div>

            {/* Bottom CTAs */}
            <div className="flex gap-3 flex-wrap mb-8">
              <button className="flex-1 min-w-[150px] py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl font-semibold text-sm transition-all"
                onClick={() => window.alert(`📞 Contact Seller\n${d.sellerName}\nPhone: +880 1700-000000`)}>
                📞 Contact Seller
              </button>
              <a href={`https://wa.me/8801700000000?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                className="flex-1 min-w-[150px] py-3.5 flex items-center justify-center gap-2 bg-[rgba(37,211,102,.1)] hover:bg-[rgba(37,211,102,.18)] border border-[rgba(37,211,102,.3)] text-[#25d366] rounded-xl font-semibold text-sm transition-all">
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR (desktop sticky) ─────── */}
          <div className="hidden lg:block">
            <div className="sticky top-0 bg-[#0a111c] border border-white/[0.07] rounded-2xl overflow-hidden">
              {/* Price */}
              <div className="p-5 border-b border-white/[0.06]">
                <div className="text-[10px] uppercase tracking-wider text-white/30 font-bold mb-1">Listing Price</div>
                <div className="text-3xl font-black text-amber-400 leading-none mb-2">{car.price}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-white/35">📍 {car.location}</span>
                  {d.negotiable && <span className="text-[10px] px-2 py-0.5 bg-[rgba(16,185,129,.1)] border border-[rgba(16,185,129,.25)] text-[#10b981] rounded-full font-bold">Negotiable</span>}
                </div>
              </div>

              {/* Stat chips */}
              <div className="flex flex-wrap gap-1.5 p-4 border-b border-white/[0.06]">
                {[car.year.toString(), car.mileage, car.condition].map(v => (
                  <span key={v} className="text-xs px-2.5 py-1 bg-white/[0.05] border border-white/[0.07] rounded-full text-white/60">{v}</span>
                ))}
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col gap-2 p-4 border-b border-white/[0.06]">
                <button className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-semibold text-sm transition-all"
                  onClick={() => window.alert(`📞 Contact Seller\n${d.sellerName}\nPhone: +880 1700-000000`)}>
                  📞 Contact Seller
                </button>
                <a href={`https://wa.me/8801700000000?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                  className="w-full py-3 flex items-center justify-center gap-2 bg-[rgba(37,211,102,.1)] border border-[rgba(37,211,102,.25)] text-[#25d366] rounded-lg font-semibold text-sm transition-all hover:bg-[rgba(37,211,102,.18)]">
                  💬 WhatsApp Seller
                </a>
              </div>

              {/* Seller info */}
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-wider text-white/25 font-bold mb-3">Seller</div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[rgba(59,130,246,.15)] flex items-center justify-center text-lg">🏪</div>
                  <div>
                    <div className="text-sm font-bold">{d.sellerName}</div>
                    <div className="text-xs text-white/30">{d.sellerType}</div>
                    <div className="text-xs text-amber-400 mt-0.5">★ {d.sellerRating.toFixed(1)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
