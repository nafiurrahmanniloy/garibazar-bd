"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 5000, suffix: "+", label: "Cars Sold" },
  { target: 12000, suffix: "+", label: "Happy Customers" },
  { target: 64, suffix: "", label: "Districts Covered" },
];

const features = [
  {
    emoji: "\u{1F50D}",
    title: "Verified Inspections",
    desc: "Every car inspected by certified mechanics before listing.",
    bangla: "\u09B8\u09BE\u09B0\u09CD\u099F\u09BF\u09AB\u09BE\u0987\u09A1 \u09AE\u09C7\u0995\u09BE\u09A8\u09BF\u0995 \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BF\u09A4\u0964",
  },
  {
    emoji: "\u{1F512}",
    title: "Secure Transactions",
    desc: "Safe payment with escrow protection built in.",
    bangla: "\u098F\u09B8\u0995\u09CD\u09B0\u09CB \u09B8\u09C1\u09B0\u0995\u09CD\u09B7\u09BE \u09B8\u09B9 \u09A8\u09BF\u09B0\u09BE\u09AA\u09A6 \u09AA\u09C7\u09AE\u09C7\u09A8\u09CD\u099F\u0964",
  },
  {
    emoji: "\u{1F5FA}\uFE0F",
    title: "Nationwide Coverage",
    desc: "Dhaka, Chittagong, Sylhet, Rajshahi, Khulna & all 64 districts.",
    bangla: "\u09B8\u09BE\u09B0\u09BE \u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6 \u099C\u09C1\u09DC\u09C7 \u09B8\u09C7\u09AC\u09BE\u0964",
  },
  {
    emoji: "\u{1F4B0}",
    title: "Best Prices",
    desc: "No middleman markup. Direct buyer\u2013seller deals only.",
    bangla: "\u0995\u09CB\u09A8\u09CB \u09AE\u09BF\u09A1\u09B2\u09AE\u09CD\u09AF\u09BE\u09A8 \u09A8\u09C7\u0987, \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u0995\u09CD\u09B0\u09C7\u09A4\u09BE-\u09AC\u09BF\u0995\u09CD\u09B0\u09C7\u09A4\u09BE\u0964",
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
            duration: 2.2,
            ease: "power2.out",
            onUpdate() {
              stat.textContent = Math.round(this.targets()[0].val).toLocaleString("en-IN") + suffix;
            },
          });
        },
      });
    });

    gsap.set(".stat-card", { y: 25, opacity: 0 });
    gsap.set(".feature-card", { y: 30, opacity: 0 });

    ScrollTrigger.create({
      trigger: ".stats-row",
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(".stat-card", {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", clearProps: "transform,opacity",
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".features-grid",
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(".feature-card", {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out", clearProps: "transform,opacity",
        });
      },
    });
  }, []);

  return (
    <section className="py-32 px-[5%] bg-[var(--bg-primary)]" id="about" aria-label="Why choose GariBazar">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center mb-12">
          <div className="section-label" style={{ justifyContent: "center" }}>Trusted by Thousands</div>
          <h2
            className="gradient-text"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 900, fontStyle: "italic" }}
          >
            Why Choose GariBazar BD?
          </h2>
        </div>

        {/* Stats */}
        <div className="stats-row grid grid-cols-3 max-md:grid-cols-1 gap-4 mb-20">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-card text-center p-8 glass-bg border border-white/[0.06] rounded-2xl transition-all duration-300 hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_var(--accent-glow)]"
            >
              <div
                className="stat-number text-[clamp(2.5rem,5vw,3.5rem)] font-black italic text-[var(--accent)] leading-none mb-2"
                data-target={s.target}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </div>
              <div className="text-[0.85rem] text-[var(--text-secondary)] font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="features-grid grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card p-8 glass-bg border border-white/[0.06] rounded-2xl transition-all duration-350 hover:-translate-y-1.5 hover:border-[rgba(59,130,246,0.3)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]"
            >
              <div className="w-[52px] h-[52px] bg-[var(--accent-glow)] border border-[rgba(59,130,246,0.3)] rounded-lg flex items-center justify-center text-[1.4rem] mb-5">
                {f.emoji}
              </div>
              <h3 className="text-[1rem] font-extrabold mb-2">{f.title}</h3>
              <p className="text-[0.82rem] text-[var(--text-secondary)] leading-relaxed">
                {f.desc}
                <span className="block text-[0.78rem] text-white/30 mt-0.5" lang="bn">{f.bangla}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
