"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Review {
  name: string;
  location: string;
  initials: string;
  tag: string;
  text: string;
  rating: number;
  gradient: string;
}

const row1Reviews: Review[] = [
  {
    name: "রাহুল আহমেদ",
    location: "Dhaka",
    initials: "রা",
    tag: "Toyota Axio",
    text: "গাড়িবাজার থেকে Toyota Axio কিনেছি। গাড়ির কন্ডিশন যেমন দেখানো হয়েছিল, ঠিক তেমনই পেয়েছি। ইন্সপেকশন রিপোর্ট দেখে আমি পুরোপুরি নিশ্চিত ছিলাম।",
    rating: 5,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    name: "Nadia Islam",
    location: "Chittagong",
    initials: "NI",
    tag: "Honda Vezel",
    text: "Bought a Honda Vezel through GariBazar and I'm extremely satisfied. The escrow payment system gave me complete peace of mind. The car was exactly as described in the listing.",
    rating: 5,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "সালমান রশিদ",
    location: "Dhaka",
    initials: "সা",
    tag: "Nissan X-Trail",
    text: "Nissan X-Trail এর পেপার ভেরিফিকেশন থেকে শুরু করে ইঞ্জিন চেকআপ পর্যন্ত সব কিছু গাড়িবাজার টিম করে দিয়েছে। রিকন্ডিশন গাড়ি কেনা এখন অনেক সহজ।",
    rating: 5,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Tanvir Hossain",
    location: "Rajshahi",
    initials: "TH",
    tag: "Toyota Allion",
    text: "Found my dream Toyota Allion on GariBazar. The price was fair, verification was thorough, and the whole process was completed within a week. Highly recommended!",
    rating: 5,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "মিনা বেগম",
    location: "Sylhet",
    initials: "মি",
    tag: "Toyota Premio",
    text: "এসক্রো পেমেন্ট সিস্টেম থাকায় টাকা নিয়ে কোনো চিন্তা ছিল না। গাড়ি হাতে পাওয়ার পরই পেমেন্ট রিলিজ হয়েছে। নিরাপদ লেনদেন।",
    rating: 4,
    gradient: "from-rose-500 to-red-600",
  },
  {
    name: "Arif Rahman",
    location: "Khulna",
    initials: "AR",
    tag: "Seller ✓",
    text: "Sold my Suzuki Swift in just 3 days on GariBazar. The listing process was simple, and I got a better price than what local dealers were offering. Great platform for sellers too!",
    rating: 5,
    gradient: "from-sky-500 to-indigo-600",
  },
];

const row2Reviews: Review[] = [
  {
    name: "করিম সাহেব",
    location: "Sylhet",
    initials: "কা",
    tag: "Mitsubishi Outlander",
    text: "Mitsubishi Outlander এর ইঞ্জিন কন্ডিশন নিয়ে চিন্তিত ছিলাম। গাড়িবাজারের ইন্সপেকশন টিম সব কিছু ভালোভাবে চেক করে রিপোর্ট দিয়েছে।",
    rating: 5,
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    name: "Sumaiya Faruk",
    location: "Barishal",
    initials: "SF",
    tag: "Honda Fit",
    text: "The verification process is what sets GariBazar apart. Every document was checked, the mileage was verified, and I received a full condition report before making my decision on the Honda Fit.",
    rating: 5,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "মোস্তফা কামাল",
    location: "Mymensingh",
    initials: "মো",
    tag: "Seller ✓",
    text: "আমার গাড়িটা মাত্র ৫ দিনে বিক্রি হয়ে গেছে। লোকাল ডিলারদের থেকে অনেক ভালো দাম পেয়েছি। গাড়িবাজার সেলারদের জন্যও দারুণ প্ল্যাটফর্ম।",
    rating: 5,
    gradient: "from-orange-500 to-amber-600",
  },
  {
    name: "Zafar Ahmed",
    location: "Dhaka",
    initials: "ZA",
    tag: "BMW 3 Series",
    text: "Best car marketplace in Bangladesh, hands down. Bought a BMW 3 Series and the entire experience from search to delivery was premium. The team really knows their cars.",
    rating: 5,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "রিনা আক্তার",
    location: "Rajshahi",
    initials: "রি",
    tag: "Hyundai Tucson",
    text: "রাজশাহী থেকে Hyundai Tucson কিনেছি। ঢাকার বাইরে থেকেও গাড়ি কেনা এত সহজ হবে ভাবিনি। ডেলিভারিও সময়মতো পেয়েছি।",
    rating: 4,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "Mehedi Rahman",
    location: "Rangpur",
    initials: "MR",
    tag: "Nissan Note",
    text: "Even from Rangpur, GariBazar made buying a Nissan Note seamless. Their nationwide coverage and delivery service is impressive. Finally, a car platform that serves all of Bangladesh.",
    rating: 5,
    gradient: "from-indigo-500 to-violet-600",
  },
];

function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < count ? "#f59e0b" : "rgba(255,255,255,0.1)"}
          stroke={i < count ? "#f59e0b" : "rgba(255,255,255,0.1)"}
          strokeWidth="1"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass-bg border border-white/[0.06] rounded-2xl p-6 w-[320px] flex-shrink-0 flex flex-col gap-4 hover:border-white/[0.12] transition-colors duration-300">
      {/* Stars */}
      <Stars count={review.rating} />

      {/* Review text */}
      <p
        className="text-[0.875rem] text-[var(--text-secondary)] leading-relaxed"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${review.gradient} flex items-center justify-center font-bold text-xs flex-shrink-0`}
          >
            {review.initials}
          </div>
          <div>
            <h5 className="text-[0.85rem] font-semibold text-white leading-tight">
              {review.name}
            </h5>
            <span className="text-[0.7rem] text-[var(--text-muted)]">
              {review.location}
            </span>
          </div>
        </div>

        {/* Car tag */}
        <span className="text-[0.65rem] font-medium text-[var(--text-muted)] bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1 inline-flex items-center gap-1 whitespace-nowrap">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-50"
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10l-3.3.5A2 2 0 0 0 5 8.4V10" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
          </svg>
          {review.tag}
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".testi-header", { y: 25, opacity: 0 });
      gsap.set(".testi-row", { opacity: 0 });

      ScrollTrigger.create({
        trigger: "#testimonials",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(".testi-header", {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out", clearProps: "transform,opacity",
          });
          gsap.to(".testi-row", {
            opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out", clearProps: "opacity",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      className="py-[100px] bg-[var(--bg-secondary)] overflow-hidden relative"
    >
      {/* Header */}
      <div className="testi-header max-w-[1280px] mx-auto px-6 text-center mb-14">
        <span className="section-label">Real Stories from Real Buyers</span>
        <h2
          className="gradient-text text-[clamp(2rem,4vw,3rem)] leading-tight mb-6"
          style={{ fontWeight: 900, fontStyle: "italic" }}
        >
          Trusted by Thousands
          <br />
          Across Bangladesh
        </h2>

        {/* Rating row */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Overall score */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-white">4.9</span>
            <div className="flex flex-col items-start">
              <Stars count={5} size={14} />
              <span className="text-[0.7rem] text-[var(--text-muted)]">
                1,240+ verified reviews
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-white/[0.08] hidden sm:block" />

          {/* Platform ratings */}
          <div className="flex items-center gap-3 text-[0.7rem] text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#1877F2"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>5</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="#f59e0b"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            <div className="w-px h-4 bg-white/[0.08]" />

            <div className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>5</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="#f59e0b"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            <div className="w-px h-4 bg-white/[0.08]" />

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white text-[0.7rem]">
                Bikroy
              </span>
              <span>4</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="#f59e0b"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee rows with edge fade masks */}
      <div className="relative">
        {/* Left fade mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none" />
        {/* Right fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <div
          className="testi-row mb-5 overflow-hidden"
          style={{ maskImage: "none" }}
        >
          <div
            className="flex gap-5 w-max"
            style={{
              animation: "testiLeft 50s linear infinite",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.animationPlayState =
                "paused";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.animationPlayState =
                "running";
            }}
          >
            {/* Original cards */}
            {row1Reviews.map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} />
            ))}
            {/* Duplicated cards for seamless loop */}
            {row1Reviews.map((review, i) => (
              <ReviewCard key={`r1-dup-${i}`} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="testi-row overflow-hidden">
          <div
            className="flex gap-5 w-max"
            style={{
              animation: "testiRight 55s linear infinite",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.animationPlayState =
                "paused";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.animationPlayState =
                "running";
            }}
          >
            {/* Original cards */}
            {row2Reviews.map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} />
            ))}
            {/* Duplicated cards for seamless loop */}
            {row2Reviews.map((review, i) => (
              <ReviewCard key={`r2-dup-${i}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
