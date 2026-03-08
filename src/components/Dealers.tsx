"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dealers = [
  {
    emoji: "\u{1F3EA}",
    name: "AutoPrime BD",
    location: "Gulshan, Dhaka",
    cars: "127 cars",
    rating: "4.9",
    desc: "Premium Japanese reconditioned cars. Toyota & Honda specialists since 2014.",
  },
  {
    emoji: "\u{1F697}",
    name: "GreenCity Motors",
    location: "Agrabad, Chittagong",
    cars: "84 cars",
    rating: "4.8",
    desc: "Chittagong's top used car dealer. All papers verified. Test drives available daily.",
  },
  {
    emoji: "\u{1F3CE}\uFE0F",
    name: "RajMotors",
    location: "Shaheb Bazar, Rajshahi",
    cars: "56 cars",
    rating: "4.7",
    desc: "Serving Rajshahi division for 10+ years. Nissan & Mitsubishi experts.",
  },
  {
    emoji: "\u2B50",
    name: "SylhetAuto Hub",
    location: "Zindabazar, Sylhet",
    cars: "43 cars",
    rating: "4.8",
    desc: "Sylhet's most trusted dealer. UK & Japan import specialists with full inspection.",
  },
];

export default function Dealers() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".dealer-card", { y: 40, opacity: 0, filter: "blur(8px)" });
      ScrollTrigger.create({
        trigger: ".dealers-grid",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".dealer-card", {
            y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.07, ease: "power3.out", clearProps: "transform,opacity,filter",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-[5%] bg-[var(--bg-secondary)] relative" aria-label="Featured dealers">
      {/* Showroom overhead */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-[radial-gradient(ellipse_600px_150px_at_50%_0%,rgba(61,139,253,0.04),transparent)] pointer-events-none" />
      <div className="max-w-[1300px] mx-auto relative z-[1]">
        <div className="text-center mb-14">
          <div className="glow-line mb-6" />
          <div className="section-label" style={{ justifyContent: "center" }}>Verified Partners</div>
          <h2
            className="gradient-text"
            style={{ fontSize: "clamp(1.85rem, 4.5vw, 3rem)", fontWeight: 900, fontStyle: "italic" }}
          >
            Featured Dealers
          </h2>
          <p className="text-[var(--text-secondary)] mt-3 text-[0.95rem]">
            Trusted dealerships verified by GariBazar across Bangladesh
          </p>
        </div>

        <div className="dealers-grid grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5">
          {dealers.map((d, i) => (
            <div
              key={i}
              className="dealer-card glass-card rounded-2xl p-6 hover:-translate-y-1 hover:border-[rgba(61,139,253,0.25)] hover:shadow-[0_20px_60px_rgba(61,139,253,0.08)]"
              style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
            >
              <div className="text-3xl mb-4 relative z-[1]">{d.emoji}</div>
              <div className="font-extrabold text-[1.05rem] mb-1 relative z-[1]">{d.name}</div>
              <div className="text-[0.82rem] text-[var(--text-secondary)] mb-3 flex items-center gap-1 relative z-[1]">
                <span className="text-[var(--text-muted)]">📍</span> {d.location}
              </div>
              <div className="flex items-center gap-2 flex-wrap mb-3 relative z-[1]">
                <span className="text-[0.75rem] font-semibold text-[var(--text-secondary)] bg-black/[0.05] border border-black/[0.08] rounded-full px-2.5 py-1">
                  {d.cars}
                </span>
                <span className="text-[0.75rem] font-semibold text-amber-600 bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-full px-2.5 py-1">
                  ★ {d.rating}
                </span>
                <span className="text-[0.68rem] font-bold text-emerald-600 bg-emerald-500/[0.08] border border-emerald-500/[0.2] rounded-full px-2.5 py-1">
                  ✓ Verified
                </span>
              </div>
              <p className="text-[0.82rem] text-[var(--text-secondary)] leading-relaxed relative z-[1]">{d.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="group/btn relative inline-flex items-center gap-2 px-7 py-3.5 border border-[rgba(61,139,253,0.25)] text-[var(--accent)] font-bold text-[0.9rem] rounded-xl transition-all hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_var(--accent-glow)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/[0.05] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600" />
            <span className="relative z-[1]">View All Dealers →</span>
          </button>
        </div>
      </div>
    </section>
  );
}
