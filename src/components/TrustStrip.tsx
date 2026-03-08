"use client";

const signals = [
  {
    text: "150-Point Inspection",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    text: "Papers Verified",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
  },
  {
    text: "BRTA Reg. Check",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
  {
    text: "bKash & Nagad",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    text: "Escrow Protection",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

export default function TrustStrip() {
  return (
    <section className="py-5 px-6 border-y border-black/[0.06] bg-gradient-to-r from-transparent via-[rgba(61,139,253,0.02)] to-transparent relative z-40">
      <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-8 max-lg:gap-5 flex-wrap">
        {signals.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 text-[var(--text-secondary)] group">
            <span className="text-emerald-600 flex-shrink-0 drop-shadow-[0_0_4px_rgba(16,185,129,0.2)] group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all">{s.icon}</span>
            <span className="text-[0.78rem] font-semibold whitespace-nowrap tracking-wide">{s.text}</span>
            {i < signals.length - 1 && <span className="hidden lg:block w-px h-4 bg-black/[0.08] ml-4" />}
          </div>
        ))}
      </div>
    </section>
  );
}
