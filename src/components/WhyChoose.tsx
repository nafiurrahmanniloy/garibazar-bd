"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 5000, suffix: "+", label: "Cars Sold" },
  { target: 12000, suffix: "+", label: "Happy Customers" },
  { target: 64, suffix: "", label: "Districts Covered" },
  { target: 350, suffix: "+", label: "Verified Dealers" },
];

const features = [
  {
    title: "Verified Inspections",
    desc: "Every car goes through a 150-point inspection by certified mechanics before listing.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Secure Transactions",
    desc: "Safe payment with escrow protection. Your money is secured until you confirm delivery.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Nationwide Coverage",
    desc: "Find cars across all 8 divisions — Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, and more.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Best Prices",
    desc: "No middleman markup. Direct buyer-seller deals with transparent pricing in BDT.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function WhyChoose() {
  useEffect(() => {
    // Stats counter
    document.querySelectorAll<HTMLElement>(".stat-number").forEach((stat) => {
      const target = parseInt(stat.dataset.target || "0");
      const suffix = stat.dataset.suffix || "";

      ScrollTrigger.create({
        trigger: stat,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate() {
              stat.textContent = Math.floor(this.targets()[0].val).toLocaleString("en-IN") + suffix;
            },
          });
          const gauge = stat.closest(".stat-item")?.querySelector(".stat-gauge");
          if (gauge) gsap.to(gauge, { strokeDashoffset: 0, duration: 2, ease: "power2.out" });
        },
      });
    });

    ScrollTrigger.create({
      trigger: ".stats-row",
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.from(".stat-item", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" });
      },
    });

    ScrollTrigger.create({
      trigger: ".features-grid",
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.from(".feature-card", { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" });
      },
    });
  }, []);

  return (
    <section className="why-section py-[120px] px-6 bg-[var(--bg-secondary)] overflow-hidden relative showroom-spot carbon-bg" id="about">
      <div className="max-w-[1280px] mx-auto relative z-[1]">
        <div className="section-header text-center mb-16">
          <div className="glow-line mb-6" />
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-3">
            Why GariBazar
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight mb-4">
            The Trusted Way to Buy & Sell Cars
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[560px] mx-auto leading-relaxed">
            We make second-hand car deals safe, transparent, and hassle-free across Bangladesh.
          </p>
        </div>

        {/* Stats */}
        <div className="stats-row grid grid-cols-4 max-lg:grid-cols-2 gap-6 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="stat-item text-center p-8 bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl relative transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]">
              {/* Gauge arc */}
              <svg className="mx-auto mb-2 w-20 h-10 overflow-visible" viewBox="0 0 80 40">
                <path d="M 5 40 A 35 35 0 0 1 75 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" strokeLinecap="round" />
                <path className="stat-gauge" d="M 5 40 A 35 35 0 0 1 75 40" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray="110" strokeDashoffset="110" />
              </svg>
              <div
                className="stat-number text-[clamp(2rem,4vw,3rem)] font-black text-[var(--accent)] leading-none mb-2 font-dashboard"
                data-target={s.target}
                data-suffix={s.suffix}
              >
                0
              </div>
              <div className="text-sm text-[var(--text-secondary)] font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="features-grid grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card p-9 bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12] hover:-translate-y-1 relative overflow-hidden group"
            >
              {/* Top chrome edge */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="w-14 h-14 bg-[var(--accent-subtle)] border border-[var(--accent)]/20 rounded-xl flex items-center justify-center mb-5 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
                {f.icon}
              </div>
              <h4 className="text-[1.1rem] font-bold mb-2.5">{f.title}</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
