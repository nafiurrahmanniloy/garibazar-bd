"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", target: "home" },
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
  const pillRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Animate the sliding pill indicator
  const animatePill = useCallback((target: string) => {
    if (!linksContainerRef.current || !pillRef.current) return;
    const container = linksContainerRef.current;
    const btn = container.querySelector(`[data-nav="${target}"]`) as HTMLElement;
    if (!btn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    gsap.to(pillRef.current, {
      x: btnRect.left - containerRect.left - 4,
      width: btnRect.width + 8,
      duration: 0.35,
      ease: "power3.out",
    });
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = navItems.map((item) => item.target);
    const triggers: ScrollTrigger[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Move pill when active section or hover changes
  useEffect(() => {
    const target = hoveredItem || activeSection;
    animatePill(target);
  }, [activeSection, hoveredItem, animatePill, visible]);

  // Show/hide navbar based on hero scroll
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ".hero-section",
      start: "bottom 80%",
      onEnter: () => {
        setVisible(true);
        if (navRef.current) {
          gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
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

  // Initial pill position after mount
  useEffect(() => {
    if (visible) {
      setTimeout(() => animatePill(activeSection), 100);
    }
  }, [visible, activeSection, animatePill]);

  const handleNavClick = (target: string) => {
    setMobileOpen(false);
    setActiveSection(target);
    scrollTo(target);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[1000] px-4 transition-all duration-500
          ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
        style={{ paddingTop: scrolled ? "8px" : "14px" }}
      >
        <div
          className={`max-w-[920px] mx-auto flex items-center justify-between rounded-2xl px-3 py-2 transition-all duration-500 relative overflow-hidden
            ${scrolled
              ? "bg-[rgba(5,7,9,0.85)] backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)_inset]"
              : "bg-[rgba(5,7,9,0.6)] backdrop-blur-xl border border-white/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            }`}
        >
          {/* Chrome top edge */}
          <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />

          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />

          {/* Logo */}
          <button
            onClick={() => { scrollTo("home"); setActiveSection("home"); }}
            className="flex items-center gap-2 text-lg font-extrabold tracking-tight bg-transparent border-none cursor-pointer relative z-10 group pl-1"
          >
            <span className="w-8 h-8 bg-gradient-to-br from-[var(--accent)] to-blue-600 rounded-lg flex items-center justify-center shadow-[0_2px_10px_var(--accent-glow)] group-hover:shadow-[0_2px_20px_var(--accent-glow)] transition-shadow">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10l-3.3.5A2 2 0 0 0 5 8.4V10" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
                <path d="M5 17H3c-.6 0-1-.4-1-1v-4.5" />
              </svg>
            </span>
            <span className="text-white hidden sm:inline">
              Gari<span className="text-[var(--accent)]">Bazar</span>
            </span>
          </button>

          {/* Desktop Navigation — Centered pill nav */}
          <div className="hidden md:flex items-center relative" ref={linksContainerRef}>
            {/* Sliding pill indicator */}
            <div
              ref={pillRef}
              className="absolute top-0 h-full rounded-xl bg-white/[0.07] border border-white/[0.06] pointer-events-none transition-opacity duration-200"
              style={{ opacity: visible ? 1 : 0 }}
            />

            {navItems.map((item) => (
              <button
                key={item.target}
                data-nav={item.target}
                onClick={() => handleNavClick(item.target)}
                onMouseEnter={() => setHoveredItem(item.target)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative z-10 px-4 py-2 text-[0.82rem] font-medium bg-transparent border-none cursor-pointer transition-colors duration-200
                  ${activeSection === item.target
                    ? "text-white"
                    : "text-[var(--text-secondary)] hover:text-white"
                  }`}
              >
                {item.label}
                {/* Active dot */}
                {activeSection === item.target && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent-glow)]" />
                )}
              </button>
            ))}
          </div>

          {/* Sell CTA Button */}
          <button
            onClick={() => { setMobileOpen(false); onSellClick(); }}
            className="hidden md:inline-flex relative z-10 items-center gap-1.5 px-5 py-2 rounded-xl text-[0.82rem] font-bold cursor-pointer border-none transition-all duration-300 bg-gradient-to-r from-[var(--accent)] to-blue-600 text-white hover:shadow-[0_4px_25px_var(--accent-glow)] hover:-translate-y-px group/sell overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -translate-x-full group-hover/sell:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative z-[1]">গাড়ি বিক্রি করুন</span>
          </button>

          {/* Mobile Toggle */}
          <button
            className="flex md:hidden flex-col gap-[5px] z-[1001] bg-transparent border-none p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <div
        className={`fixed top-0 right-0 w-[280px] h-screen bg-[rgba(5,7,9,0.97)] backdrop-blur-2xl border-l border-white/[0.06] z-[999] md:hidden flex flex-col justify-center gap-2 p-8 transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] transition-all"
          aria-label="Close menu"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>

        {navItems.map((item) => (
          <button
            key={item.target}
            onClick={() => handleNavClick(item.target)}
            className={`w-full text-left px-4 py-3 rounded-xl text-[0.95rem] font-medium bg-transparent border-none cursor-pointer transition-all duration-200
              ${activeSection === item.target
                ? "text-white bg-white/[0.06] border border-white/[0.08]"
                : "text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.03]"
              }`}
          >
            {item.label}
          </button>
        ))}

        <div className="h-px bg-white/[0.06] my-3" />

        <button
          onClick={() => { setMobileOpen(false); onSellClick(); }}
          className="w-full px-5 py-3 rounded-xl text-[0.9rem] font-bold cursor-pointer border-none transition-all bg-gradient-to-r from-[var(--accent)] to-blue-600 text-white hover:shadow-[0_4px_25px_var(--accent-glow)]"
        >
          গাড়ি বিক্রি করুন
        </button>
      </div>
    </>
  );
}
