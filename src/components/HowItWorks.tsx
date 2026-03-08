"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Browse & Search",
    desc: "Find cars by brand, budget, and location. Filter from thousands of verified listings across all 64 districts.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Inspect & Verify",
    desc: "Book a professional inspection. Get a full history report — registration, mileage, import papers, and condition.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Deal & Drive",
    desc: "Secure payment via bKash, Nagad, or bank transfer. Complete ownership transfer and drive your new car home.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10l-3.3.5A2 2 0 0 0 5 8.4V10" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M5 17H3c-.6 0-1-.4-1-1v-4.5" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".steps-grid",
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.from(".step-card", { y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" });
      },
    });
  }, []);

  return (
    <section className="py-[120px] px-6 relative overflow-hidden showroom-spot carbon-bg" id="how-it-works">
      {/* Ambient side glows */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-[200px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(61,139,253,0.04),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-[200px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(61,139,253,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-[1]">
        <div className="section-header text-center mb-16">
          <div className="glow-line mb-6" />
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-3">
            How It Works
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight mb-4">
            Three Simple Steps
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[560px] mx-auto leading-relaxed">
            From browsing to driving &mdash; we&apos;ve made it effortless.
          </p>
        </div>

        <div className="steps-grid grid grid-cols-3 max-md:grid-cols-1 gap-8 relative">
          {/* Road line connecting steps (desktop) */}
          <div className="hidden md:block absolute top-[48px] left-[16%] right-[16%] z-0">
            <div className="tire-track" />
          </div>

          {steps.map((step, i) => (
            <div key={i} className="step-card text-center relative z-[1]">
              {/* Step number circle with glow */}
              <div className="relative inline-flex items-center justify-center mb-7">
                <div className="absolute inset-0 w-[96px] h-[96px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full bg-[var(--accent)] opacity-[0.08] blur-2xl" />
                <div className="w-[72px] h-[72px] bg-gradient-to-br from-[var(--accent)] to-[#1a5fd4] rounded-2xl flex items-center justify-center text-xl font-black font-dashboard shadow-[0_0_40px_var(--accent-glow),0_8px_32px_rgba(0,0,0,0.4)] relative">
                  <span className="relative z-[1]">{step.num}</span>
                  {/* Chrome edge highlight */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-50" style={{ maskImage: "linear-gradient(to bottom, black 0%, transparent 50%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 50%)" }} />
                </div>
              </div>

              {/* Card content */}
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1] hover:-translate-y-1">
                {/* Icon */}
                <div className="w-12 h-12 bg-[var(--accent-subtle)] border border-[var(--accent)]/20 rounded-xl flex items-center justify-center mx-auto mb-5 text-[var(--accent)]">
                  {step.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
