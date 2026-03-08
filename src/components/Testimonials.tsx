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
    text: "GariBazar helped me find a verified Toyota Allion at a great price. The inspection report gave me full confidence. Best car buying experience in Bangladesh!",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    name: "Fatema Akter",
    location: "Chittagong",
    initials: "FA",
    text: "I sold my Honda within a week. The process was so smooth — no haggling with middlemen. The escrow payment made me feel secure throughout.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Kamal Hossain",
    location: "Sylhet",
    initials: "KH",
    text: "As a first-time buyer, I was nervous about reconditioned cars. GariBazar's verification team checked everything — papers, mileage, engine. Totally worth it.",
    gradient: "from-amber-500 to-orange-600",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
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
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--accent-subtle),transparent_70%)] pointer-events-none opacity-30" />

      <div className="max-w-[1280px] mx-auto relative z-[1]">
        <div className="section-header text-center mb-16">
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
              className="testimonial-card bg-[var(--bg-card)] border border-white/[0.06] rounded-2xl p-8 transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-1"
            >
              <Stars />
              <p className="text-[0.95rem] text-[var(--text-secondary)] leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center font-bold text-base flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <h5 className="text-[0.95rem] font-semibold">{t.name}</h5>
                  <span className="text-[0.8rem] text-[var(--text-muted)]">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
