"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const preRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    // Words slide up
    tl.to(["#pw1", "#pw2"], {
      y: 0,
      stagger: 0.18,
      duration: 0.85,
      ease: "power3.out",
      delay: 0.15,
    }).to("#pw3", { y: 0, duration: 0.7, ease: "power3.out" }, "-=0.45");

    // Counter + bar
    const counterEl = document.getElementById("pre-counter-num");
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2.4,
      ease: "power1.inOut",
      onUpdate() {
        if (counterEl) counterEl.textContent = String(Math.round(obj.val));
      },
    });
    gsap.to("#pre-bar-fill", { width: "100%", duration: 2.4, ease: "power1.inOut" });

    // Wipe up after 2.5s
    gsap.to(pre, {
      yPercent: -102,
      duration: 0.9,
      ease: "power3.inOut",
      delay: 2.5,
      onComplete: () => {
        pre.style.display = "none";
        document.body.style.overflow = "";
      },
    });
  }, []);

  return (
    <div
      ref={preRef}
      id="preloader"
      className="fixed inset-0 z-[10000] bg-[var(--bg-primary)] flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      {/* Top logo */}
      <div className="absolute top-8 left-[5%] text-[0.72rem] font-bold tracking-[0.25em] uppercase text-[var(--text-muted)]">
        GariBazar BD &middot; গাড়িবাজার
      </div>

      {/* Animated words */}
      <div className="text-center">
        <div className="overflow-hidden leading-[1.05]">
          <span
            id="pw1"
            className="block text-[clamp(2.8rem,8vw,6.5rem)] font-black italic tracking-[-0.04em] uppercase text-[var(--text-primary)] translate-y-[110%]"
          >
            Find Your
          </span>
        </div>
        <div className="overflow-hidden leading-[1.05]">
          <span
            id="pw2"
            className="block text-[clamp(2.8rem,8vw,6.5rem)] font-black italic tracking-[-0.04em] uppercase text-[var(--accent)] translate-y-[110%]"
          >
            Dream Car.
          </span>
        </div>
        <div className="overflow-hidden">
          <span
            id="pw3"
            className="block text-[clamp(0.75rem,1.5vw,1rem)] font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)] mt-6 translate-y-[110%]"
            lang="bn"
          >
            বাংলাদেশের বিশ্বস্ত গাড়ির মার্কেটপ্লেস
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-10 left-[5%] right-[5%] flex items-center gap-8">
        <div className="flex-1 h-px bg-black/[0.08] overflow-hidden">
          <div id="pre-bar-fill" className="h-full w-0 bg-gradient-to-r from-transparent via-[var(--accent)] to-[rgba(59,130,246,0.3)]" />
        </div>
        <span id="pre-counter-num" className="text-[0.8rem] font-bold tabular-nums text-[var(--text-muted)] tracking-[0.05em] min-w-[3ch] text-right">
          0
        </span>
      </div>
    </div>
  );
}
