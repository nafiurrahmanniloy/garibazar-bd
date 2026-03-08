# GariBazar BD — গাড়িবাজার

> Bangladesh's trusted marketplace for pre-owned cars. Find your next ride, sell with confidence.

---

## Overview

GariBazar BD is a modern, cinematic web platform for buying and selling **second-hand cars in Bangladesh**. The website targets the Bangladeshi automotive market — from reconditioned Japanese imports (Toyota, Honda, Nissan, Mitsubishi) to locally used vehicles across Dhaka, Chittagong, Sylhet, Rajshahi, and beyond.

The design is **dark, cinematic, and premium** — inspired by a scroll-to-expand drift video hero that sets the tone for a high-end car browsing experience.

---

## Tech Stack

| Layer        | Technology                                          |
| ------------ | --------------------------------------------------- |
| Framework    | Next.js 16 (App Router, TypeScript)                 |
| UI           | React 19 + Tailwind CSS 4                           |
| Animations   | GSAP 3 + ScrollTrigger + Lenis smooth scroll        |
| Icons        | Lucide Icons (inline SVG)                           |
| Fonts        | Inter (next/font/google)                            |
| Backend      | *Coming later*                                      |
| Deployment   | *TBD*                                               |

---

## Landing Page Sections

### 1. Hero — Scroll-to-Expand Video
- Full cinematic drift video (`drift.mp4`) inside a rounded container
- On scroll: container expands to fullscreen, title text flies outward
- Brand name "GARI" + "BAZAR" split across the video with `mix-blend-mode: difference`
- Tagline fades in: "আপনার স্বপ্নের গাড়ি, আপনার বাজেটে" *(Your dream car, within your budget)*

### 2. Navbar (Sticky after scroll)
- Logo: GariBazar BD
- Links: Home, Browse Cars, How It Works, About, Contact
- CTA button: "গাড়ি বিক্রি করুন" *(Sell Your Car)*
- Appears with a slide-down animation after hero section

### 3. Quick Search Bar
- Search by: Brand, Model, Price Range (৳), Location (Division)
- Dark glassmorphism card floating above the section
- Popular brands as quick-filter chips (Toyota, Honda, Nissan, Suzuki, Mitsubishi, BMW)

### 4. Featured Cars Grid
- 6 car cards in a responsive grid (3×2 on desktop, 2×3 on tablet, 1×6 on mobile)
- Each card: Car image, name, year, mileage, price in ৳, location badge, condition tag
- Hover: subtle lift + glow effect
- Cards animate in with staggered scroll reveal

### 5. Why Choose GariBazar
- 4 feature cards with icons:
  - Verified Inspections — Every car inspected by certified mechanics
  - Secure Transactions — Safe payment with escrow protection
  - Nationwide Coverage — Dhaka, Chittagong, Sylhet, Rajshahi, Khulna & more
  - Best Prices — No middleman markup, direct buyer-seller deals
- Animated counter stats above: 5,000+ Cars Sold | 12,000+ Happy Customers | 64 Districts

### 6. Popular Brands Carousel
- Logo strip of popular car brands in Bangladesh
- Toyota, Honda, Nissan, Mitsubishi, Suzuki, Hyundai, BMW, Mercedes-Benz
- Infinite horizontal scroll animation
- Click a brand to go to filtered browse page

### 7. How It Works
- 3-step visual process:
  1. **Browse & Search** — Find cars by brand, budget, location
  2. **Inspect & Verify** — Book an inspection, check history report
  3. **Deal & Drive** — Secure payment, transfer ownership, drive home
- Connected by an animated path/line
- Each step reveals on scroll

### 8. Customer Testimonials
- 3 testimonial cards with:
  - Customer photo (avatar), name, location
  - Star rating
  - Quote text
- Auto-sliding carousel with manual navigation dots
- Subtle parallax background

### 9. Call to Action
- Split section:
  - Left: "Ready to find your next car?" with search CTA
  - Right: "Want to sell your car?" with listing CTA
- Gradient accent borders
- Animated on scroll

### 10. Footer
- 4-column layout:
  - **GariBazar BD** — About blurb + social links
  - **Quick Links** — Browse, Sell, How It Works, FAQ
  - **Popular Locations** — Dhaka, Chittagong, Sylhet, Rajshahi, Khulna
  - **Contact** — Phone, Email, Office Address (Dhaka)
- Bottom bar: 2026 GariBazar BD | Made in Bangladesh

---

## Design System

| Token              | Value                              |
| ------------------ | ---------------------------------- |
| `--bg-primary`     | `#03060a` (near black)             |
| `--bg-secondary`   | `#0a1628` (dark navy)              |
| `--bg-card`        | `#0d1b2a` (card surface)           |
| `--text-primary`   | `#ffffff`                          |
| `--text-secondary` | `#7a8b9e` (muted blue-gray)        |
| `--accent`         | `#3b82f6` (blue)                   |
| `--accent-glow`    | `rgba(59,130,246,0.3)`             |
| `--success`        | `#10b981` (verified green)         |
| `--warning`        | `#f59e0b` (price gold)             |
| `--border`         | `rgba(255,255,255,0.06)`           |
| `--radius-sm`      | `8px`                              |
| `--radius-md`      | `16px`                             |
| `--radius-lg`      | `24px`                             |
| `--font-family`    | `'Inter', sans-serif`              |

---

## Bangladesh Market Context

- **Currency**: BDT (Taka) — Bangladeshi Taka
- **Popular Brands**: Toyota (dominant), Honda, Nissan, Mitsubishi, Suzuki — mostly reconditioned imports from Japan
- **Price Range**: 3,00,000 – 80,00,000+ BDT (South Asian numbering: lakhs/crores)
- **Key Cities**: Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, Mymensingh
- **Buyer Concerns**: Registration status, reconditioned vs used, import papers, mileage verification, tax/duty paid
- **Language**: Bengali primary, English secondary — UI uses both

---

## Project Structure

```
Car project/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout + metadata
│   │   ├── page.tsx         # Landing page (assembles all sections)
│   │   └── globals.css      # Tailwind + design tokens
│   ├── components/
│   │   ├── SmoothScroll.tsx  # Lenis smooth scroll provider
│   │   ├── Navbar.tsx        # Sticky navbar (appears after hero)
│   │   ├── Hero.tsx          # Scroll-to-expand video hero
│   │   ├── SearchBar.tsx     # Quick search with filters
│   │   ├── FeaturedCars.tsx  # 6 car listing cards
│   │   ├── WhyChoose.tsx     # Stats + feature cards
│   │   ├── Brands.tsx        # Infinite scroll brand carousel
│   │   ├── HowItWorks.tsx    # 3-step process
│   │   ├── Testimonials.tsx  # Customer reviews
│   │   ├── CTA.tsx           # Buy/Sell call to action
│   │   └── Footer.tsx        # 4-column footer
│   └── lib/                  # Utilities (future)
├── public/
│   └── videos/
│       └── drift.mp4         # Hero video
├── README.md                 # This file
└── CLAUDE.md                 # AI assistant instructions (coming later)
```

---

## Roadmap

- [x] Landing page with hero animation
- [ ] Car browse/listing page with filters
- [ ] Individual car detail page
- [ ] Seller dashboard — list a car
- [ ] User auth (login/register)
- [ ] Backend API (Node.js / Django TBD)
- [ ] Database (car listings, users, transactions)
- [ ] Payment integration (bKash, Nagad, bank transfer)
- [ ] Admin panel
- [ ] Mobile responsive optimization
- [ ] SEO + Open Graph meta tags
- [ ] Bangla language toggle

---

## Getting Started

```bash
# Clone the repo
git clone <your-repo-url>
cd Car\ project

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

*Built for the Bangladesh automotive community.*
