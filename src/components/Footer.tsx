"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

type Props = {
  onSellClick: () => void;
  onLocationClick: (location: string) => void;
};

const quickLinks = [
  { label: "Browse Cars", action: () => scrollTo("browse-cars") },
  { label: "How It Works", action: () => scrollTo("how-it-works") },
  { label: "About Us", action: () => scrollTo("about") },
  { label: "Contact", action: () => scrollTo("contact") },
];

const locations = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

export default function Footer({ onSellClick, onLocationClick }: Props) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".footer-col", { y: 40, opacity: 0, filter: "blur(8px)" });
      ScrollTrigger.create({
        trigger: ".footer-section",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(".footer-col", {
            y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.07, ease: "power3.out", clearProps: "transform,opacity,filter",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-section pt-20 pb-8 px-6 border-t border-black/[0.06] relative bg-[var(--bg-primary)]" id="contact">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse_400px_100px_at_50%_0%,rgba(61,139,253,0.04),transparent)] pointer-events-none" />
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] max-lg:grid-cols-2 max-md:grid-cols-1 gap-12 mb-12">
          {/* Brand */}
          <div className="footer-col">
            <button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight mb-4 bg-transparent border-none cursor-pointer"
            >
              <span className="w-9 h-9 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10l-3.3.5A2 2 0 0 0 5 8.4V10" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                  <path d="M5 17H3c-.6 0-1-.4-1-1v-4.5" />
                </svg>
              </span>
              <span className="text-[var(--text-primary)]">Gari<span className="text-[var(--accent)]">Bazar</span></span>
            </button>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[300px]">
              Bangladesh&apos;s trusted marketplace for pre-owned cars.
              Find verified cars, sell with confidence, and drive your dreams.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {[
                {
                  label: "Facebook",
                  href: "https://facebook.com",
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com",
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>,
                },
                {
                  label: "YouTube",
                  href: "https://youtube.com",
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>,
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-black/[0.04] border border-black/[0.06] rounded-xl flex items-center justify-center text-[var(--text-secondary)] transition-all hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_var(--accent-glow)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-5 text-[var(--text-primary)]">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo("browse-cars")}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors bg-transparent border-none cursor-pointer"
                >
                  Browse Cars
                </button>
              </li>
              <li>
                <button
                  onClick={onSellClick}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors bg-transparent border-none cursor-pointer"
                >
                  Sell Your Car
                </button>
              </li>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="footer-col">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-5 text-[var(--text-primary)]">Popular Locations</h4>
            <ul className="space-y-3">
              {locations.map((city) => (
                <li key={city}>
                  <button
                    onClick={() => onLocationClick(city)}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-5 text-[var(--text-primary)]">Contact Us</h4>
            <div className="space-y-4">
              <a
                href="tel:+8801700000000"
                className="flex items-start gap-3 group"
              >
                <span className="flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors leading-relaxed">
                  +880 1700-000000
                </span>
              </a>
              <a
                href="mailto:hello@garibazar.com.bd"
                className="flex items-start gap-3 group"
              >
                <span className="flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors leading-relaxed">
                  hello@garibazar.com.bd
                </span>
              </a>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Gulshan-2, Dhaka 1212, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-black/[0.06] flex items-center justify-between max-md:flex-col max-md:gap-4 max-md:text-center text-xs text-[var(--text-muted)]">
          <span>&copy; 2026 GariBazar BD. All rights reserved. Made in Bangladesh.</span>
          <div className="flex gap-6">
            <button
              onClick={() => window.alert("Privacy Policy coming soon!")}
              className="hover:text-[var(--text-secondary)] transition-colors bg-transparent border-none cursor-pointer text-xs text-[var(--text-muted)]"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => window.alert("Terms of Service coming soon!")}
              className="hover:text-[var(--text-secondary)] transition-colors bg-transparent border-none cursor-pointer text-xs text-[var(--text-muted)]"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
