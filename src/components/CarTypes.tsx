"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const carTypes = [
  {
    type: "Sedan",
    count: "2,100+",
    examples: "Allion, Axio, Premio",
    icon: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 38h48v4a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-4z" fill="currentColor" opacity="0.1" />
        <path d="M12 38l4-12h32l4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 38h52v4a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-4z" stroke="currentColor" strokeWidth="2" />
        <path d="M20 26l2-6h20l2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="42" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="48" cy="42" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    type: "SUV",
    count: "890+",
    examples: "X-Trail, CR-V, RAV4",
    icon: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 36h48v6a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-6z" fill="currentColor" opacity="0.1" />
        <path d="M10 36l5-14h34l5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 36h52v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-6z" stroke="currentColor" strokeWidth="2" />
        <path d="M19 22l2-6h22l2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="42" r="4.5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="48" cy="42" r="4.5" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    type: "Hatchback",
    count: "720+",
    examples: "Swift, Vitz, Aqua",
    icon: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 38h44v4a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2v-4z" fill="currentColor" opacity="0.1" />
        <path d="M14 38l4-10h24l8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 38h48v4a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3v-4z" stroke="currentColor" strokeWidth="2" />
        <path d="M22 28l2-5h16l3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="42" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="47" cy="42" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    type: "Pickup",
    count: "340+",
    examples: "Hilux, Navara, Triton",
    icon: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 36h26v8H8a2 2 0 0 1-2-2v-6z" fill="currentColor" opacity="0.1" />
        <path d="M12 36l4-12h16v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 30h22v6a3 3 0 0 1-3 3H32V30z" stroke="currentColor" strokeWidth="2" />
        <path d="M6 36h52v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-6z" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="42" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="48" cy="42" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    type: "Microbus",
    count: "280+",
    examples: "Noah, Hiace, Voxy",
    icon: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20h38a4 4 0 0 1 4 4v16H6V24a4 4 0 0 1 4-4z" fill="currentColor" opacity="0.1" />
        <path d="M10 18h38a4 4 0 0 1 4 4v18H6V22a4 4 0 0 1 4-4z" stroke="currentColor" strokeWidth="2" />
        <path d="M6 40h52v2a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-2z" stroke="currentColor" strokeWidth="2" />
        <line x1="28" y1="18" x2="28" y2="40" stroke="currentColor" strokeWidth="1.5" />
        <line x1="44" y1="18" x2="44" y2="40" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="43" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="43" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    type: "Luxury",
    count: "160+",
    examples: "BMW, Mercedes, Lexus",
    icon: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 38h48v4a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-4z" fill="currentColor" opacity="0.1" />
        <path d="M10 38l5-12h34l5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 38h52v4a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-4z" stroke="currentColor" strokeWidth="2" />
        <path d="M19 26l3-7h20l3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="42" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="48" cy="42" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M28 32h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 35h12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
];

type Props = {
  onTypeClick: (type: string) => void;
};

export default function CarTypes({ onTypeClick }: Props) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".type-card", { y: 40, opacity: 0, filter: "blur(8px)" });

      ScrollTrigger.create({
        trigger: ".types-grid",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".type-card", {
            y: 0, opacity: 1, filter: "blur(0px)",
            duration: 0.5, stagger: 0.06, ease: "power3.out",
            clearProps: "transform,opacity,filter",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 px-6 bg-[var(--bg-secondary)] relative">
      <div className="max-w-[1280px] mx-auto relative z-[1]">
        <div className="text-center mb-10">
          <div className="section-label" style={{ justifyContent: "center" }}>
            Browse by Category
          </div>
          <h2
            className="gradient-text"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 900, fontStyle: "italic" }}
          >
            Popular Car Types
          </h2>
        </div>

        <div className="types-grid grid grid-cols-6 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4">
          {carTypes.map((ct) => (
            <button
              key={ct.type}
              onClick={() => onTypeClick(ct.type)}
              className="type-card group glass-card rounded-2xl p-6 text-center cursor-pointer border-none hover:-translate-y-1.5 hover:border-[rgba(61,139,253,0.25)] hover:shadow-[0_20px_50px_rgba(61,139,253,0.1)]"
              style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
            >
              {/* Car silhouette icon */}
              <div className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-3 flex justify-center">
                {ct.icon}
              </div>
              <div className="text-[0.95rem] font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                {ct.type}
              </div>
              <div className="text-[0.72rem] text-[var(--text-muted)] mb-2">{ct.examples}</div>
              <div className="text-[0.82rem] font-bold text-[var(--accent)] font-dashboard">
                {ct.count}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
