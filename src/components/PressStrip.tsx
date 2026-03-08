"use client";

export default function PressStrip() {
  return (
    <div
      className="flex items-center justify-center gap-6 flex-wrap py-5 px-[5%] border-t border-b border-white/[0.06] bg-[var(--bg-primary)]"
      aria-label="Media mentions"
    >
      <span className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)]">
        As featured in
      </span>
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-[0.88rem] font-bold text-white/40 tracking-wide">Prothom Alo</span>
        <span className="text-white/15">&middot;</span>
        <span className="text-[0.88rem] font-bold text-white/40 tracking-wide">Daily Star</span>
        <span className="text-white/15">&middot;</span>
        <span className="text-[0.88rem] font-bold text-white/40 tracking-wide">Channel i</span>
        <span className="text-white/15">&middot;</span>
        <span className="text-[0.88rem] font-bold text-white/40 tracking-wide">Bangla Tribune</span>
        <span className="text-white/15">&middot;</span>
        <span className="text-[0.88rem] font-bold text-white/40 tracking-wide">Jugantor</span>
      </div>
    </div>
  );
}
