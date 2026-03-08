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
      gsap.set(".dealer-card", { y: 30, opacity: 0 });
      ScrollTrigger.create({
        trigger: ".dealers-grid",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(".dealer-card", {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out", clearProps: "transform,opacity",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-[5%] bg-[var(--bg-secondary)]" aria-label="Featured dealers">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center mb-12">
          <div className="section-label" style={{ justifyContent: "center" }}>Verified Partners</div>
          <h2
            className="gradient-text"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 900, fontStyle: "italic" }}
          >
            Featured Dealers
          </h2>
          <p className="text-[var(--text-secondary)] mt-3">
            Trusted dealerships verified by GariBazar across Bangladesh
          </p>
        </div>

        <div className="dealers-grid grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5">
          {dealers.map((d, i) => (
            <div
              key={i}
              className="dealer-card glass-bg border border-white/[0.06] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)]"
            >
              <div className="text-3xl mb-4">{d.emoji}</div>
              <div className="font-extrabold text-[1.05rem] mb-1">{d.name}</div>
              <div className="text-[0.82rem] text-[var(--text-secondary)] mb-3 flex items-center gap-1">
                <span>📍</span> {d.location}
              </div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="text-[0.75rem] font-semibold text-[var(--text-secondary)] bg-white/[0.05] border border-white/[0.08] rounded-full px-2.5 py-1">
                  {d.cars}
                </span>
                <span className="text-[0.75rem] font-semibold text-[var(--warning)] bg-white/[0.05] border border-white/[0.08] rounded-full px-2.5 py-1">
                  ★ {d.rating}
                </span>
                <span className="text-[0.68rem] font-bold text-[var(--success)] bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.25)] rounded-full px-2.5 py-1">
                  ✓ Verified
                </span>
              </div>
              <p className="text-[0.82rem] text-[var(--text-secondary)] leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 px-7 py-3.5 border border-[rgba(59,130,246,0.3)] text-[var(--accent)] font-bold text-[0.9rem] rounded-lg transition-all hover:bg-[var(--accent-glow)] hover:-translate-y-0.5">
            View All Dealers →
          </button>
        </div>
      </div>
    </section>
  );
}
