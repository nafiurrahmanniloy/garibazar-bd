"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What is the difference between Reconditioned and Used cars in Bangladesh?",
    a: `<strong>Reconditioned</strong> cars are imported from Japan, Korea, or Singapore. They have low mileage (usually under 70,000 km) and are refurbished before sale. They come with original import papers.<br><br><strong>Used (local)</strong> cars have been driven in Bangladesh since they were first registered here. Always verify both types with a mechanic inspection and check BRTA registration records.`,
  },
  {
    q: "What papers should I check before buying a car?",
    a: `Always verify: <strong>Registration Card (RC Book)</strong> from BRTA, <strong>Tax Token</strong> (must be current year), <strong>Fitness Certificate</strong>, <strong>Insurance</strong>, and for reconditioned cars — the <strong>Import Certificate (LC)</strong> and <strong>Bill of Entry</strong>. Cross-check the chassis number on the car with all documents.`,
  },
  {
    q: "How does GariBazar verify sellers and listings?",
    a: `Every listing goes through our 3-step verification: (1) <strong>Seller NID verification</strong>, (2) <strong>Document authenticity check</strong> — RC, tax token, fitness, (3) <strong>150-point physical inspection</strong> by our certified mechanics. Listings with a "Verified" badge have passed all three steps.`,
  },
  {
    q: "Is the price negotiable? Can I make an offer?",
    a: `Most sellers on GariBazar are open to negotiation. Listings marked <strong>"Negotiable"</strong> have sellers who explicitly welcome offers. You can use the "Make an Offer" button on any listing to send a formal offer. We recommend offering 5–10% below the listed price as a starting point.`,
  },
  {
    q: "How does the escrow payment system work?",
    a: `GariBazar's escrow system holds your payment securely until you confirm receipt of the car and papers. You pay into the escrow (via bKash, Nagad, or bank transfer). The seller receives the money only after you confirm the car matches the listing. If there's a discrepancy, the funds are returned within 3 business days.`,
  },
  {
    q: "How do I sell my car on GariBazar?",
    a: `Click <strong>"Sell Your Car"</strong> in the top navigation or CTA section. Submit your car details — model, year, mileage, condition, and asking price. Our team will call you within 24 hours to arrange a free inspection. After verification, your listing goes live. No listing fees, no commissions on the sale.`,
  },
  {
    q: "Can I buy a car from another city?",
    a: `Yes! GariBazar covers all 8 divisions of Bangladesh. For out-of-city purchases, we can arrange a <strong>certified inspector</strong> to visit the seller on your behalf (fee: ৳500–৳1,500 depending on distance). We also assist with <strong>vehicle transport</strong> to your city after purchase. Use the "Schedule Test Drive" feature to coordinate.`,
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".faq-item", { y: 18, opacity: 0 });
      ScrollTrigger.create({
        trigger: ".faq-list",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".faq-item", {
            y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power2.out", clearProps: "transform,opacity",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-[5%] bg-[var(--bg-secondary)] relative" id="faq" aria-label="Frequently asked questions">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse_400px_100px_at_50%_0%,rgba(61,139,253,0.03),transparent)] pointer-events-none" />
      <div className="max-w-[800px] mx-auto relative z-[1]">
        <div className="text-center mb-14">
          <div className="glow-line mb-6" />
          <div className="section-label" style={{ justifyContent: "center" }}>Got Questions?</div>
          <h2
            className="gradient-text"
            style={{ fontSize: "clamp(1.85rem, 4.5vw, 3rem)", fontWeight: 900, fontStyle: "italic" }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="faq-list flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item glass-card rounded-2xl overflow-hidden hover:border-white/[0.1]"
              style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
              >
                <span className="font-bold text-[0.95rem] text-white leading-snug">{faq.q}</span>
                <span
                  className="text-[1.4rem] text-[var(--accent)] font-light flex-shrink-0 transition-transform duration-300"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "500px" : "0px" }}
              >
                <div
                  className="px-5 pb-5 text-[0.88rem] text-[var(--text-secondary)] leading-[1.7]"
                  dangerouslySetInnerHTML={{ __html: faq.a }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
