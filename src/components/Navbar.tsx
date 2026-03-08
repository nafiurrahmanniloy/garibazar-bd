"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Browse", target: "browse-cars" },
  { label: "How It Works", target: "how-it-works" },
  { label: "About", target: "about" },
  { label: "Contact", target: "contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar({ onSellClick }: { onSellClick: () => void }) {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ".hero-section",
      start: "bottom 80%",
      onEnter: () => {
        setVisible(true);
        if (navRef.current) {
          gsap.fromTo(navRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
        }
      },
      onLeaveBack: () => setVisible(false),
    });
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => { trigger.kill(); window.removeEventListener("scroll", handleScroll); };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className={`max-w-[1200px] mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "bg-[rgba(3,6,10,0.7)] backdrop-blur-2xl border border-white/[0.04] rounded-2xl py-3 px-6 mx-4" : ""
      }`}>
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2 bg-transparent border-none cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10l-3.3.5A2 2 0 0 0 5 8.4V10" />
              <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
            </svg>
          </div>
          <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white/90">
            gari<span className="text-[var(--accent)]">bazar</span>
          </span>
        </button>

        {/* Links */}
        <div className={`flex items-center gap-1 max-md:fixed max-md:inset-0 max-md:bg-[var(--bg-primary)]/95 max-md:backdrop-blur-xl max-md:flex-col max-md:justify-center max-md:gap-8 max-md:z-[999] transition-all duration-300 ${mobileOpen ? "max-md:opacity-100 max-md:visible" : "max-md:opacity-0 max-md:invisible"}`}>
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => { setMobileOpen(false); scrollTo(item.target); }}
              className="px-4 py-2 text-[13px] font-medium text-white/40 hover:text-white/90 transition-colors duration-200 bg-transparent border-none cursor-pointer rounded-lg hover:bg-white/[0.04] max-md:text-lg"
            >
              {item.label}
            </button>
          ))}
          <div className="w-px h-4 bg-white/[0.08] mx-1 max-md:hidden" />
          <button
            onClick={() => { setMobileOpen(false); onSellClick(); }}
            className="ml-1 px-5 py-2 text-[13px] font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.06] rounded-lg transition-all duration-200 cursor-pointer hover:border-white/[0.12] max-md:text-base max-md:px-8 max-md:py-3"
          >
            Sell Your Car
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="hidden max-md:flex flex-col gap-[5px] z-[1001] bg-transparent border-none p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-[1.5px] bg-white/70 rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-5 h-[1.5px] bg-white/70 rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-[1.5px] bg-white/70 rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>
    </nav>
  );
}
