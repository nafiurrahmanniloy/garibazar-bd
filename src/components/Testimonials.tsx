"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Rafiq Ahmed",
    location: "Dhaka",
    initials: "RA",
    car: "Toyota Allion 2019",
    text: "GariBazar helped me find a verified Toyota Allion at a great price. The inspection report gave me full confidence. Best car buying experience in Bangladesh!",
    gradient: "from-blue-500 to-cyan-600",
    rating: 5,
  },
  {
    name: "Fatema Akter",
    location: "Chittagong",
    initials: "FA",
    car: "Honda Grace 2018",
    text: "I sold my Honda within a week. The process was so smooth — no haggling with middlemen. The escrow payment made me feel secure throughout.",
    gradient: "from-emerald-500 to-teal-600",
    rating: 5,
  },
  {
    name: "Kamal Hossain",
    location: "Sylhet",
    initials: "KH",
    car: "Nissan X-Trail 2020",
    text: "As a first-time buyer, I was nervous about reconditioned cars. GariBazar's verification team checked everything — papers, mileage, engine. Totally worth it.",
    gradient: "from-amber-500 to-orange-600",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".testimonials-grid",
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.from(".testimonial-card", { y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" });
      },
    });
  }, []);

  return (
    <section className="py-[120px] px-6 relative overflow-hidden">
      {/* Showroom overhead glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_600px_200px_at_50%_0%,rgba(61,139,253,0.05),transparent)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-[1]">
        <div className="section-header text-center mb-16">
          <div className="glow-line mb-6" />
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-3">
            Testimonials
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[560px] mx-auto leading-relaxed">
            Real stories from real buyers and sellers across Bangladesh.
          </p>
        </div>

        <div className="testimonials-grid grid grid-cols-3 max-lg:grid-cols-1 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card group bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12] hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle top chrome edge */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <Stars count={t.rating} />
              <p className="text-[0.95rem] text-[var(--text-secondary)] leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-lg`}>
                    {t.initials}
                  </div>
                  <div>
                    <h5 className="text-[0.95rem] font-semibold">{t.name}</h5>
                    <span className="text-[0.75rem] text-[var(--text-muted)]">{t.location}</span>
                  </div>
                </div>
                {/* Car tag */}
                <span className="text-[0.68rem] font-medium text-[var(--text-muted)] bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1 hidden sm:inline-flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10l-3.3.5A2 2 0 0 0 5 8.4V10" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                  {t.car}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
