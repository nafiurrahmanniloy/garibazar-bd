"use client";

const outlets = ["Prothom Alo", "Daily Star", "Channel i", "Bangla Tribune", "Jugantor"];

export default function PressStrip() {
  return (
    <div
      className="flex items-center justify-center gap-8 flex-wrap py-6 px-[5%] border-t border-b border-black/[0.05] bg-[var(--bg-primary)] relative"
      aria-label="Media mentions"
    >
      {/* Subtle center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_400px_60px_at_50%_50%,rgba(61,139,253,0.03),transparent)] pointer-events-none" />
      <span className="text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[var(--text-muted)] relative z-[1]">
        As featured in
      </span>
      <div className="flex items-center gap-6 flex-wrap relative z-[1]">
        {outlets.map((name, i) => (
          <span key={name} className="flex items-center gap-6">
            <span className="text-[0.92rem] font-bold text-black/30 tracking-wider hover:text-black/50 transition-colors cursor-default">
              {name}
            </span>
            {i < outlets.length - 1 && (
              <span className="w-1 h-1 rounded-full bg-black/[0.12]" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
