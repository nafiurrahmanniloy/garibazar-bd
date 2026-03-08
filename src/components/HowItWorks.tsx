"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "1",
    title: "Browse & Search",
    desc: "Find cars by brand, budget, and location. Filter from thousands of verified listings across all 64 districts.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "Inspect & Verify",
    desc: "Book a professional inspection. Get a full history report — registration status, mileage, import papers, and condition.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Deal & Drive",
    desc: "Secure payment via bKash, Nagad, or bank transfer. Complete ownership transfer and drive your new car home.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    gsap.from(".step-card", {
      y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
      scrollTrigger: { trigger: ".steps-grid", start: "top 80%" },
    });
  }, []);

  return (
    <section className="py-[120px] px-6 bg-[var(--bg-secondary)]" id="how-it-works">
      <div className="max-w-[1280px] mx-auto">
        <div className="section-header text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-3">
            How It Works
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight mb-4">
            Three Simple Steps
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[560px] mx-auto leading-relaxed">
            From browsing to driving — we&apos;ve made it effortless.
          </p>
        </div>

        <div className="steps-grid grid grid-cols-3 max-md:grid-cols-1 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30" />

          {steps.map((step, i) => (
            <div key={i} className="step-card text-center px-7 py-10 relative">
              {/* Step number */}
              <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 relative z-[2] shadow-[0_0_40px_var(--accent-glow)]">
                {step.num}
              </div>
              {/* Icon */}
              <div className="w-12 h-12 bg-[var(--accent-subtle)] rounded-lg flex items-center justify-center mx-auto mb-5 text-[var(--accent)]">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
