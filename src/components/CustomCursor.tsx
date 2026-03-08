"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop with fine pointer
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Show cursor elements
    dot.style.display = "block";
    ring.style.display = "block";

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.06, ease: "none" });
    };
    window.addEventListener("mousemove", onMove);

    // Ring lags behind
    const tickerCb = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      gsap.set(ring, { x: rx, y: ry });
    };
    gsap.ticker.add(tickerCb);

    // Expand on hover
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.matches?.("a, button, [role=button], .car-card, .brand-chip, select")) {
        document.body.classList.add("cursor-hover");
      }
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.matches?.("a, button, [role=button], .car-card, .brand-chip, select")) {
        document.body.classList.remove("cursor-hover");
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tickerCb);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.style.cursor = "";
      document.body.classList.remove("cursor-hover");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-[7px] h-[7px] rounded-full bg-white z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed w-[38px] h-[38px] rounded-full border-[1.5px] border-white/45 z-[9997] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-[width,height,border-color] duration-300 hidden"
        aria-hidden="true"
      />
    </>
  );
}
