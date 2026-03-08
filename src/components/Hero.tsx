"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useEffect(() => {
    gsap.set(".hero-media-container", {
      scale: 0.8,
      borderRadius: "30px",
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
      .to(".hero-media-overlay", { opacity: 0.3, ease: "power1.inOut" }, 0.2)
      .to(".title-left", { xPercent: -150, skewX: -15, opacity: 0, ease: "power2.in" }, 0)
      .to(".title-right", { xPercent: 150, skewX: 15, opacity: 0, ease: "power2.in" }, 0)
      .to(".hero-media-container video", { scale: 1.1, ease: "none" }, 0)
      .to(".hero-tagline", { opacity: 1, y: 0, ease: "power2.out" }, 0.5)
      .to(".hero-scroll-hint", { opacity: 0, ease: "power1.in" }, 0)
      .to(".hero-speed-lines", { opacity: 1, duration: 0.3, ease: "power1.in" }, 0.3)
      .to(".hero-speed-lines", { opacity: 0, duration: 0.5, ease: "power1.out" }, 0.6);

    return () => {
      heroTl.scrollTrigger?.kill();
      heroTl.kill();
    };
  }, []);

  return (
    <section className="hero-section relative w-full h-screen overflow-hidden" id="home">
      {/* Background gradient */}
      <div className="hero-bg-layer absolute inset-0 bg-[radial-gradient(circle_at_center,#e2e8f0_0%,#f1f5f9_100%)] z-0" />

      {/* Pinned content */}
      <div className="hero-pinned relative z-10 w-full h-screen flex items-center justify-center">
        {/* Video container */}
        <div className="hero-media-container relative w-[80vw] h-[60vh] flex items-center justify-center overflow-hidden z-5 shadow-[0_40px_100px_rgba(0,0,0,0.15)]">
          <div className="w-full h-full relative">
            <video
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/videos/drift.mp4`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
            />
            <div className="hero-media-overlay absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_30%,rgba(0,0,0,0.7)_100%)] z-[1]" />
            {/* Grain overlay */}
            <div
              className="absolute -inset-1/2 w-[200%] h-[200%] z-[4] pointer-events-none opacity-[0.055]"
              style={{
                animation: "grainAnim 0.25s steps(1) infinite",
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundSize: "256px 256px",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Speed lines — flash during scroll expansion */}
        <div className="hero-speed-lines absolute inset-0 z-[15] pointer-events-none opacity-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: "-100%",
                width: "200%",
                transform: `rotate(${-2 + i * 1}deg)`,
              }}
            />
          ))}
        </div>

        {/* Split title */}
        <div className="hero-text-layer absolute z-20 flex gap-16 max-md:gap-6 mix-blend-difference pointer-events-none text-center">
          <h2 className="title-left text-white text-[clamp(3rem,10vw,8rem)] font-black italic tracking-tighter uppercase leading-none">
            GARI
          </h2>
          <h2 className="title-right text-white text-[clamp(3rem,10vw,8rem)] font-black italic tracking-tighter uppercase leading-none">
            BAZAR
          </h2>
        </div>

        {/* Tagline — fades in on scroll */}
        <div className="hero-tagline absolute bottom-[9vh] left-0 right-0 z-[22] text-center pointer-events-none opacity-0 translate-y-7">
          <span className="text-[clamp(1.1rem,2.8vw,1.9rem)] font-bold text-white/[0.92] tracking-wide block mb-1" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9)" }} lang="bn">
            আপনার স্বপ্নের গাড়ি, আপনার বাজেটে
          </span>
          <span className="text-[clamp(0.75rem,1.5vw,1rem)] font-medium text-white/40 tracking-[0.12em] uppercase block" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}>
            Bangladesh&apos;s Trusted Used Car Marketplace
          </span>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--accent)] to-transparent animate-[scrollPulse_2s_ease_infinite]" />
        </div>
      </div>
    </section>
  );
}
