"use client";

import { useEffect, Fragment } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "1",
    emoji: "\u{1F50D}",
    title: "Browse & Search",
    desc: "Find cars by brand, budget, location or condition. Filter 5,000+ verified listings.",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    num: "2",
    emoji: "\u{1F527}",
    title: "Inspect & Verify",
    desc: "Book a certified mechanic inspection and review the full history report before buying.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    num: "3",
    emoji: "\u{1F697}",
    title: "Deal & Drive",
    desc: "Secure payment, transfer ownership, get the papers \u2014 and drive home in your new car.",
    accent: "from-amber-500 to-orange-500",
  },
];

export default function HowItWorks() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hiw-step", { y: 25, opacity: 0 });

      ScrollTrigger.create({
        trigger: ".hiw-steps",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".hiw-step", {
            y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out", clearProps: "transform,opacity",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-28 px-[5%] bg-[var(--bg-primary)] relative showroom-spot" id="how-it-works" aria-label="How GariBazar works">
      <div className="max-w-[1300px] mx-auto relative z-[1]">
        <div className="text-center mb-16">
          <div className="glow-line mb-6" />
          <div className="section-label" style={{ justifyContent: "center" }}>Simple Process</div>
          <h2
            className="gradient-text"
            style={{ fontSize: "clamp(1.85rem, 4.5vw, 3rem)", fontWeight: 900, fontStyle: "italic" }}
          >
            How It Works
          </h2>
        </div>

        {/* Steps with arrow connectors */}
        <div className="hiw-steps grid max-md:grid-cols-1 gap-0 items-start" style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr" }}>
          {steps.map((step, i) => (
            <Fragment key={i}>
              <div className="hiw-step text-center glass-card p-8 rounded-2xl hover:border-[rgba(61,139,253,0.2)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]" style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                {/* Number badge */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${step.accent} text-white text-lg font-black mb-5 shadow-lg`}>
                  {step.num}
                </div>
                {/* Emoji icon */}
                <div className="text-4xl mb-4">{step.emoji}</div>
                <h3 className="text-[1.1rem] font-extrabold mb-3">{step.title}</h3>
                <p className="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed max-w-[280px] mx-auto">
                  {step.desc}
                </p>
              </div>

              {/* Arrow connector (between steps, not after last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center self-center pt-4">
                  <div className="flex items-center gap-0">
                    <div className="w-12 h-px bg-gradient-to-r from-black/[0.06] to-black/[0.1]" />
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-black/[0.12] bg-transparent" />
                    <div className="w-12 h-px bg-gradient-to-r from-black/[0.1] to-black/[0.06]" />
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
