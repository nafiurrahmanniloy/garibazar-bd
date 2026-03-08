"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useEffect(() => {
    gsap.set(".hero-media-container", {
      scale: 0.75,
      borderRadius: "24px",
      transformOrigin: "center center",
    });

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "+=2500",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    heroTl
      .to(".hero-bg-layer", { opacity: 0, ease: "none" }, 0)
      .to(".hero-media-container", {
        scale: 1,
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        ease: "power2.inOut",
      }, 0)
      .to(".hero-media-overlay", { opacity: 0.2, ease: "power1.inOut" }, 0.2)
      .to(".title-left", { xPercent: -180, skewX: -20, opacity: 0, ease: "power2.in" }, 0)
      .to(".title-right", { xPercent: 180, skewX: 20, opacity: 0, ease: "power2.in" }, 0)
      .to(".hero-media-container video", { scale: 1.15, ease: "none" }, 0)
      .to(".hero-tagline", { opacity: 1, y: 0, ease: "power2.out" }, 0.5)
      .to(".hero-scroll-hint", { opacity: 0, ease: "power1.in" }, 0)
      .to(".hero-corner-tl", { opacity: 0, x: -20, ease: "power1.in" }, 0)
      .to(".hero-corner-br", { opacity: 0, x: 20, ease: "power1.in" }, 0);

    return () => {
      heroTl.scrollTrigger?.kill();
      heroTl.kill();
    };
  }, []);

  return (
    <section className="hero-section relative w-full h-screen overflow-hidden" id="home">
      <div className="hero-bg-layer absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      </div>

      <div className="hero-pinned relative z-10 w-full h-screen flex items-center justify-center">
        <div className="hero-media-container relative w-[75vw] h-[55vh] flex items-center justify-center overflow-hidden z-5 shadow-[0_60px_120px_rgba(0,0,0,0.9)]">
          <div className="w-full h-full relative">
            <video src="/videos/drift.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover object-center" />
            <div className="hero-media-overlay absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_20%,rgba(3,6,10,0.8)_100%)] z-[1]" />
          </div>
        </div>

        <div className="hero-text-layer absolute z-20 flex gap-[6vw] max-md:gap-4 mix-blend-difference pointer-events-none">
          <h1 className="title-left text-white font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,10rem)] font-[900] italic tracking-[-0.06em] uppercase leading-[0.85]">
            GARI
          </h1>
          <h1 className="title-right text-white font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,10rem)] font-[900] italic tracking-[-0.06em] uppercase leading-[0.85]">
            BAZAR
          </h1>
        </div>

        {/* Editorial corner details */}
        <div className="hero-corner-tl absolute top-8 left-8 z-20 flex flex-col gap-0.5 opacity-40">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium">Est. 2026</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Dhaka, BD</span>
        </div>
        <div className="hero-corner-br absolute bottom-[20%] right-8 z-20 text-right opacity-40 max-md:hidden">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 block">Pre-owned</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 block">Automotive</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 block">Marketplace</span>
        </div>

        <div className="hero-tagline absolute bottom-[14%] left-1/2 -translate-x-1/2 z-[25] text-center opacity-0">
          <p className="font-[family-name:var(--font-display)] text-[clamp(1.1rem,2.2vw,1.6rem)] text-white/90 font-light tracking-wide leading-snug">
            Your dream car, within your budget.
          </p>
          <p className="text-[clamp(0.75rem,1.2vw,0.95rem)] text-white/25 mt-3 tracking-[0.05em]">
            আপনার স্বপ্নের গাড়ি, আপনার বাজেটে
          </p>
        </div>

        <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-[scrollPulse_2s_ease_infinite]" />
        </div>
      </div>
    </section>
  );
}
