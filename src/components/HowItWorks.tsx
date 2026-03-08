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
  },
  {
    num: "2",
    emoji: "\u{1F527}",
    title: "Inspect & Verify",
    desc: "Book a certified mechanic inspection and review the full history report before buying.",
  },
  {
    num: "3",
    emoji: "\u{1F697}",
    title: "Deal & Drive",
    desc: "Secure payment, transfer ownership, get the papers \u2014 and drive home in your new car.",
  },
];

export default function HowItWorks() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hiw-step", { y: 40, opacity: 0 });

      ScrollTrigger.create({
        trigger: ".hiw-steps",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(".hiw-step", {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power3.out", clearProps: "transform,opacity",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-28 px-[5%] bg-[var(--bg-primary)]" id="how-it-works" aria-label="How GariBazar works">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center mb-14">
          <div className="section-label" style={{ justifyContent: "center" }}>Simple Process</div>
          <h2
            className="gradient-text"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 900, fontStyle: "italic" }}
          >
            How It Works
          </h2>
        </div>

        {/* Steps with arrow connectors */}
        <div className="hiw-steps grid max-md:grid-cols-1 gap-0 items-start" style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr" }}>
          {steps.map((step, i) => (
            <Fragment key={i}>
              <div className="hiw-step text-center">
                {/* Number badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--accent)] text-white text-lg font-black mb-5">
                  {step.num}
                </div>
                {/* Emoji icon */}
                <div className="text-4xl mb-4">{step.emoji}</div>
                <h3 className="text-[1.1rem] font-extrabold mb-2">{step.title}</h3>
                <p className="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed max-w-[280px] mx-auto">
                  {step.desc}
                </p>
              </div>

              {/* Arrow connector (between steps, not after last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center self-center pt-4">
                  <div className="flex items-center gap-0">
                    <div className="w-16 h-px bg-white/[0.12]" />
                    <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-white/[0.2]" />
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
