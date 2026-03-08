"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", target: "home" },
  { label: "Browse Cars", target: "browse-cars" },
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
          gsap.fromTo(navRef.current, { y: -60 }, { y: 0, duration: 0.5, ease: "power2.out" });
        }
      },
      onLeaveBack: () => setVisible(false),
    });

    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    return () => {
      trigger.kill();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (target: string) => {
    setMobileOpen(false);
    scrollTo(target);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[1000] px-6 py-4 transition-all duration-300
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        ${scrolled ? "bg-[#03060adb] backdrop-blur-xl border-b border-white/[0.06]" : ""}`}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight bg-transparent border-none cursor-pointer"
        >
          <span className="w-9 h-9 bg-[var(--accent)] rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10l-3.3.5A2 2 0 0 0 5 8.4V10" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
              <path d="M5 17H3c-.6 0-1-.4-1-1v-4.5" />
            </svg>
          </span>
          <span className="text-white">Gari<span className="text-[var(--accent)]">Bazar</span></span>
        </button>

        {/* Desktop Links */}
        <div className={`nav-links flex items-center gap-8 max-md:fixed max-md:top-0 max-md:right-0 max-md:w-[280px] max-md:h-screen max-md:bg-[var(--bg-secondary)] max-md:flex-col max-md:justify-center max-md:gap-6 max-md:p-10 max-md:border-l max-md:border-white/[0.06] max-md:z-[999] max-md:transition-transform max-md:duration-300 ${mobileOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"}`}>
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full bg-transparent border-none cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { setMobileOpen(false); onSellClick(); }}
            className="px-6 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_var(--accent-glow)] border-none cursor-pointer"
          >
            গাড়ি বিক্রি করুন
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="hidden max-md:flex flex-col gap-[5px] z-[1001] bg-transparent border-none p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>
    </nav>
  );
}
