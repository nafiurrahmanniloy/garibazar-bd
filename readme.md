# GariBazar BD — গাড়িবাজার

> Bangladesh's trusted marketplace for pre-owned cars. Find your next ride, sell with confidence.

**Live:** [nafiurrahmanniloy.github.io/garibazar-bd](https://nafiurrahmanniloy.github.io/garibazar-bd/)

---

## Overview

GariBazar BD is a modern, animated web platform for buying and selling **second-hand cars in Bangladesh**. The website targets the Bangladeshi automotive market — from reconditioned Japanese imports (Toyota, Honda, Nissan, Mitsubishi) to locally used vehicles across Dhaka, Chittagong, Sylhet, Rajshahi, and beyond.

The design is a **clean white automotive showroom** with frosted glass cards, blur-reveal scroll animations, and a cinematic drift video hero.

---

## Tech Stack

| Layer        | Technology                                          |
| ------------ | --------------------------------------------------- |
| Framework    | Next.js 16 (App Router, TypeScript)                 |
| UI           | React 19 + Tailwind CSS 4                           |
| Animations   | GSAP 3 + ScrollTrigger + Lenis smooth scroll        |
| Icons        | Inline SVG                                          |
| Fonts        | Inter (body) + Rajdhani (dashboard prices/stats)    |
| Deployment   | GitHub Pages (static export)                        |

---

## Landing Page Sections

### 1. Hero — Scroll-to-Expand Video
- Full cinematic drift video (`drift.mp4`) inside a rounded container on a light slate background
- On scroll: container expands to fullscreen, title text flies outward
- Brand name "GARI" + "BAZAR" split across the video with `mix-blend-mode: difference`
- Tagline fades in: "আপনার স্বপ্নের গাড়ি, আপনার বাজেটে" *(Your dream car, within your budget)*

### 2. Navbar (Floating Glass Pill)
- Floating frosted glass pill that appears on scroll
- Links: Home, Browse, How It Works, About, Contact
- CTA button: "গাড়ি বিক্রি করুন" *(Sell Your Car)*
- Sliding active indicator pill
- Mobile hamburger with full-screen drawer

### 3. Quick Search Bar
- Search by: Brand, Price Range (৳), Location (Division), Year
- White frosted glass card with subtle shadows
- Popular brands as quick-filter chips (Toyota, Honda, Nissan, Suzuki, Mitsubishi, BMW)

### 4. Car Types — Browse by Category
- 6 car type cards: Sedan, SUV, Hatchback, Pickup, Microbus, Luxury
- SVG car silhouette icons for each type
- Example models and listing counts
- Click to scroll to browse section

### 5. Featured Cars Grid
- Car cards in a responsive grid with sort/filter bar
- Each card: Car image, name, year, mileage, price in ৳, location badge, condition tag
- Hover: lift + shadow effect with View Details overlay
- Blur+slide scroll reveal animations

### 6. Why Choose GariBazar
- 4 feature cards: Verified Inspections, Secure Transactions, Nationwide Coverage, Best Prices
- Animated counter stats: 5,000+ Cars Sold | 12,000+ Happy Customers | 64 Districts
- Gauge arc animations on stat counters

### 7. Press Strip
- Credibility strip with press/media outlet mentions
- Dot separators between outlets

### 8. Popular Brands
- Brand buttons for popular car brands in Bangladesh
- Toyota, Honda, Nissan, Mitsubishi, Suzuki, Hyundai, BMW, Mercedes-Benz
- Click to filter browse section by brand

### 9. Featured Dealers
- 4 dealer cards: AutoPrime BD, GreenCity Motors, RajMotors, SylhetAuto Hub
- Location, car count, rating, verified badge

### 10. How It Works
- 3-step visual process with arrow connectors:
  1. Browse & Search
  2. Inspect & Verify
  3. Deal & Drive

### 11. Customer Testimonials
- Dual-row infinite marquee of review cards
- Star ratings, reviewer avatars, car tags
- Pause on hover
- Platform ratings (Facebook, Google, Bikroy)

### 12. Call to Action
- Split card: Buy (browse CTA) + Sell (list your car)
- Glass-card styling with gradient accent orbs

### 13. FAQ
- Expandable accordion questions
- Common buyer/seller questions

### 14. Footer
- 4-column layout: Brand, Quick Links, Popular Locations, Contact
- Social links (Facebook, Instagram, YouTube)
- Bottom bar with copyright and legal links

### Utilities
- **Preloader** — Animated loading screen with counter
- **Custom Cursor** — Dark dot + ring cursor (desktop only)
- **Car Detail Modal** — Full photo gallery, specs, video walkthrough, seller info
- **Sell Modal** — Multi-step car listing form

---

## Design System

| Token              | Value                              |
| ------------------ | ---------------------------------- |
| `--bg-primary`     | `#ffffff` (white)                  |
| `--bg-secondary`   | `#f3f6fa` (light gray)             |
| `--text-primary`   | `#0f172a` (slate 900)              |
| `--text-secondary` | `#64748b` (slate 500)              |
| `--text-muted`     | `#94a3b8` (slate 400)              |
| `--accent`         | `#3d8bfd` (blue)                   |
| `--accent-glow`    | `rgba(61,139,253,0.25)`            |
| `--accent-subtle`  | `rgba(61,139,253,0.06)`            |
| `.glass-card`      | White frosted glass + subtle border + shadow |
| `.gradient-text`   | Slate 900 → Slate 500 gradient     |

### Animation Pattern
All scroll-triggered animations use **blur + slide-up reveal**:
```js
gsap.set(".el", { y: 40, opacity: 0, filter: "blur(8px)" });
gsap.to(".el", { y: 0, opacity: 1, filter: "blur(0px)", ease: "power3.out", clearProps: "..." });
```

---

## Bangladesh Market Context

- **Currency**: BDT (Taka) — pricing in lakhs/crores (South Asian numbering)
- **Popular Brands**: Toyota (dominant), Honda, Nissan, Mitsubishi, Suzuki — mostly reconditioned imports from Japan
- **Price Range**: ৳3,00,000 – ৳80,00,000+
- **Key Cities**: Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, Mymensingh
- **Trust Signals**: 150-point inspection, BRTA registration check, papers verified, bKash/Nagad, escrow
- **Language**: Bengali primary, English secondary — UI uses both

---

## Project Structure

```
Car project/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Landing page (assembles all sections)
│   │   └── globals.css         # Tailwind + design tokens + animations
│   ├── components/
│   │   ├── SmoothScroll.tsx    # Lenis smooth scroll + ScrollTrigger refresh
│   │   ├── Preloader.tsx       # Loading screen with counter
│   │   ├── CustomCursor.tsx    # Custom dark cursor (desktop)
│   │   ├── Navbar.tsx          # Floating glass pill navbar
│   │   ├── Hero.tsx            # Scroll-to-expand video hero
│   │   ├── SearchBar.tsx       # Quick search with filters + brand chips
│   │   ├── CarTypes.tsx        # Browse by category (6 types)
│   │   ├── FeaturedCars.tsx    # Car listing grid with sort bar
│   │   ├── WhyChoose.tsx       # Stats + feature cards
│   │   ├── PressStrip.tsx      # Press/media credibility strip
│   │   ├── Brands.tsx          # Brand selection buttons
│   │   ├── Dealers.tsx         # Featured dealer cards
│   │   ├── HowItWorks.tsx      # 3-step process with connectors
│   │   ├── Testimonials.tsx    # Dual-row marquee reviews
│   │   ├── CTA.tsx             # Buy/Sell call to action
│   │   ├── FAQ.tsx             # Expandable FAQ accordion
│   │   ├── Footer.tsx          # 4-column footer
│   │   ├── CarModal.tsx        # Car detail modal (gallery + specs)
│   │   ├── SellModal.tsx       # Sell your car form modal
│   │   └── TrustStrip.tsx      # Trust signals strip
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── public/
│   └── videos/
│       └── drift.mp4           # Hero video
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment
├── next.config.ts              # Static export + basePath config
├── README.md                   # This file
└── package.json
```

---

## Roadmap

- [x] Landing page with hero animation
- [x] All landing page sections (15+ components)
- [x] Car detail modal with photo gallery
- [x] Sell your car modal form
- [x] Light/white theme with glass-card design system
- [x] Blur+slide scroll animations
- [x] GitHub Pages deployment
- [x] Mobile responsive layout
- [ ] Car browse/listing page with filters
- [ ] Individual car detail page (full page)
- [ ] Seller dashboard — list a car
- [ ] User auth (login/register)
- [ ] Backend API (Node.js / Django TBD)
- [ ] Database (car listings, users, transactions)
- [ ] Payment integration (bKash, Nagad, bank transfer)
- [ ] Admin panel
- [ ] SEO + Open Graph meta tags
- [ ] Bangla language toggle

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/nafiurrahmanniloy/garibazar-bd.git
cd garibazar-bd

# Install dependencies
npm install

# Run dev server (access at localhost:3000/garibazar-bd)
npm run dev

# Build for production
npm run build
```

---

*Built for the Bangladesh automotive community.*
