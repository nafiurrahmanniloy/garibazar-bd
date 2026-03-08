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

    gsap.set(".stat-card", { y: 20, opacity: 0 });
    gsap.set(".feature-card", { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: ".stats-row",
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(".stat-card", {
          y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: "power2.out", clearProps: "transform,opacity",
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".features-grid",
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(".feature-card", {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out", clearProps: "transform,opacity",
        });
      },
    });
  }, []);

  return (
    <section className="py-32 px-[5%] bg-[var(--bg-primary)] relative showroom-spot" id="about" aria-label="Why choose GariBazar">
      <div className="max-w-[1300px] mx-auto relative z-[1]">
        <div className="text-center mb-14">
          <div className="glow-line mb-6" />
          <div className="section-label" style={{ justifyContent: "center" }}>Trusted by Thousands</div>
          <h2
            className="gradient-text"
            style={{ fontSize: "clamp(1.85rem, 4.5vw, 3rem)", fontWeight: 900, fontStyle: "italic" }}
          >
            Why Choose GariBazar BD?
          </h2>
        </div>

        {/* Stats */}
        <div className="stats-row grid grid-cols-3 max-md:grid-cols-1 gap-5 mb-20">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-card glass-card text-center p-8 rounded-2xl"
              style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
            >
              <div
                className="stat-number text-[clamp(2.5rem,5vw,3.5rem)] font-black italic text-[var(--accent)] leading-none mb-2 font-dashboard drop-shadow-[0_0_20px_var(--accent-glow)]"
                data-target={s.target}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </div>
              <div className="text-[0.88rem] text-[var(--text-secondary)] font-semibold tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="features-grid grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card glass-card p-7 rounded-2xl hover:-translate-y-1 hover:border-[rgba(61,139,253,0.25)] hover:shadow-[0_20px_60px_rgba(61,139,253,0.1)]"
              style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
            >
              <div className="w-[52px] h-[52px] bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 border border-[rgba(61,139,253,0.25)] rounded-xl flex items-center justify-center text-[1.4rem] mb-5 shadow-[0_4px_16px_rgba(61,139,253,0.1)]">
                {f.emoji}
              </div>
              <h3 className="text-[1rem] font-extrabold mb-2">{f.title}</h3>
              <p className="text-[0.82rem] text-[var(--text-secondary)] leading-relaxed">
                {f.desc}
                <span className="block text-[0.75rem] text-black/20 mt-1" lang="bn">{f.bangla}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
