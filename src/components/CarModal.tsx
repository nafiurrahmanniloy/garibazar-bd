"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import type { Car } from "@/types";

/* ─── Rich detail data per car (from original HTML CARS_DATA) ─── */
type Photo = { src: string; label: string };
type Paper = { icon: string; name: string; status: "verified" | "confidential" };
type OwnerEntry = { num: number; label: string; period: string; location?: string; note: string };
type ServiceEntry = { icon: string; date: string; km: string; type: string; note: string };
type Incident = { date: string; type: string; severity: string; desc: string };

type CarDetail = {
  fuel: string; transmission: string; color: string; engine: string;
  bodyType: string; seats: string; doors: string; drive: string; importedFrom: string;
  registrationYear: string; fitnessExpiry: string; taxToken: string;
  seller: string; sellerRating: string; sellerDeals: string; phone: string;
  description: string; photos: Photo[];
  specs: [string, string][];
  features: string[];
  papers: Paper[];
  negotiable: boolean;
  inspectorNote: string;
  listingMeta: { ref: string; views: number; listed: string };
  accidentHistory: { clean?: boolean; incidents?: Incident[] };
  ownershipHistory: OwnerEntry[];
  serviceHistory: ServiceEntry[];
};

const DETAIL: Record<string, CarDetail> = {
  "Toyota Allion": {
    fuel: "Petrol", transmission: "Automatic", color: "Pearl White", engine: "1500cc (A15 3NZ-FE)",
    bodyType: "Sedan", seats: "5", doors: "4", drive: "FWD", importedFrom: "Japan",
    registrationYear: "2020 (BD)", fitnessExpiry: "Dec 2025", taxToken: "Valid",
    seller: "Premium Motors BD", sellerRating: "4.8 ★", sellerDeals: "47 deals", phone: "+880 1700-123456",
    description: "Well-maintained Toyota Allion A15 imported directly from Japan. Single owner since import in 2020. Interior in near-mint condition with original factory mats. No major repairs or accidents. Engine bay clean. All AC vents functional. Tyres 60% life remaining. Ideal for daily Dhaka commute.",
    photos: [
      { src: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&q=80", label: "Front Exterior" },
      { src: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=80", label: "Side Profile" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", label: "Interior / Seats" },
      { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80", label: "Dashboard" },
      { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80", label: "Engine Bay" },
      { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80", label: "Rear Exterior" },
    ],
    specs: [
      ["Engine", "1500cc (3NZ-FE)"], ["Horsepower", "109 hp"], ["Torque", "141 Nm"],
      ["Transmission", "CVT Automatic"], ["Drive", "Front-Wheel Drive"], ["Fuel Type", "Petrol"],
      ["Fuel Economy", "~14 km/L"], ["Body Type", "Sedan"], ["Seats", "5"],
      ["Doors", "4"], ["Color", "Pearl White"], ["Kerb Weight", "1,070 kg"],
      ["Length", "4,400 mm"], ["Width", "1,695 mm"], ["Height", "1,460 mm"],
      ["Wheelbase", "2,600 mm"], ["Tyres", "185/65 R15"], ["A/C", "Dual Zone Auto A/C"],
    ],
    features: ["Push Button Start", "Dual Airbags", "ABS + EBD", "Rear Parking Sensor", "Rear Camera", "Keyless Entry", "Climate Control A/C", "Power Mirrors", "Power Windows", "Multi-Function Steering", "Cruise Control", "Automatic Headlights", "Rain Sensor Wipers", "Alloy Wheels"],
    papers: [
      { icon: "📋", name: "Registration Card", status: "verified" },
      { icon: "🚢", name: "Import Certificate", status: "verified" },
      { icon: "🔧", name: "Inspection Report", status: "verified" },
      { icon: "🛡️", name: "Fitness Certificate", status: "verified" },
      { icon: "🔒", name: "Previous Owner Records", status: "confidential" },
      { icon: "💳", name: "Insurance", status: "verified" },
    ],
    negotiable: true,
    inspectorNote: "Inspected by GariBazar Certified Mechanic (March 2025). Engine and drivetrain in excellent condition. Interior scoring 9/10. Minor tyre wear — recommend replacing front pair within 12,000 km. No hidden issues found.",
    listingMeta: { ref: "GB-2025-041", views: 487, listed: "15 Jan 2025" },
    accidentHistory: { clean: true },
    ownershipHistory: [
      { num: 1, label: "Original Owner (Japan)", period: "2019 – 2020", note: "Company lease vehicle, dealer-maintained throughout." },
      { num: 2, label: "Current Owner (BD)", period: "2020 – Present", location: "Dhaka", note: "Single individual owner. No accidents reported. Selling to upgrade." },
    ],
    serviceHistory: [
      { icon: "🔧", date: "Feb 2025", km: "57,200 km", type: "Oil & Filter Change", note: "Fully synthetic 5W-30, OEM filter replaced." },
      { icon: "⚙️", date: "Oct 2024", km: "52,000 km", type: "Air Filter + Brake Fluid", note: "Routine service, all within spec." },
      { icon: "🛞", date: "Mar 2024", km: "47,500 km", type: "Rear Tyre Replacement", note: "Both rear tyres replaced — Bridgestone Ecopia." },
      { icon: "🔧", date: "Jul 2023", km: "40,000 km", type: "Major 40k Service", note: "Spark plugs, coolant flush, transmission fluid changed." },
    ],
  },
  "Honda Vezel": {
    fuel: "Petrol/Hybrid", transmission: "CVT Automatic", color: "Taffeta White", engine: "1500cc Hybrid (LEB)",
    bodyType: "Compact SUV", seats: "5", doors: "4", drive: "FWD / i-DCD", importedFrom: "Japan",
    registrationYear: "2019 (BD)", fitnessExpiry: "Mar 2026", taxToken: "Valid",
    seller: "Chittagong Auto Hub", sellerRating: "4.6 ★", sellerDeals: "31 deals", phone: "+880 1800-654321",
    description: "Honda Vezel RS Hybrid imported from Japan. The RS trim includes sport interior with red accents and Honda Sensing safety suite. Hybrid battery tested and healthy (85% capacity). Very fuel efficient — averaging 18 km/L in city. Used primarily for weekend trips, hence moderate mileage for the year.",
    photos: [
      { src: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=900&q=80", label: "Front Exterior" },
      { src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=80", label: "Side View" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", label: "Interior" },
      { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80", label: "Dashboard" },
      { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80", label: "Engine Bay" },
      { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80", label: "Rear" },
    ],
    specs: [
      ["Engine", "1497cc i-VTEC + Motor"], ["System Power", "135 hp (combined)"], ["Battery", "Li-ion 1.3 kWh"],
      ["Transmission", "7-Speed DCT"], ["Drive", "FWD i-DCD"], ["Fuel Type", "Petrol Hybrid"],
      ["Fuel Economy", "~18 km/L city"], ["Body Type", "Compact SUV"], ["Seats", "5"],
      ["Color", "Taffeta White"], ["Ground Clearance", "160 mm"], ["Boot Space", "393 L"],
      ["Length", "4,295 mm"], ["Width", "1,770 mm"], ["Tyres", "215/55 R17"], ["A/C", "Auto A/C"],
    ],
    features: ["Honda Sensing", "Collision Mitigation Braking", "Lane Keep Assist", "Adaptive Cruise", "Auto High Beam", "Push Start", "Sunroof / Moonroof", "Wireless Charging", "Apple CarPlay", "8\" Touchscreen", "360° Camera", "Heated Seats", "Keyless Entry", "Alloy Wheels"],
    papers: [
      { icon: "📋", name: "Registration Card", status: "verified" },
      { icon: "🚢", name: "Import Certificate", status: "verified" },
      { icon: "⚡", name: "Hybrid Battery Report", status: "verified" },
      { icon: "🔧", name: "150-pt Inspection", status: "verified" },
      { icon: "🔒", name: "Insurance Records", status: "confidential" },
      { icon: "🛡️", name: "Fitness Certificate", status: "verified" },
    ],
    negotiable: false,
    inspectorNote: "GariBazar inspection (Jan 2025): Hybrid battery at 85% capacity — healthy range. Honda Sensing suite calibrated correctly. Minor stone chips on front bumper. Undercarriage clean with no rust. Recommend full service before purchase.",
    listingMeta: { ref: "GB-2025-038", views: 612, listed: "10 Jan 2025" },
    accidentHistory: { incidents: [
      { date: "Sep 2022", type: "Minor Rear Fender Scratch", severity: "minor", desc: "Light contact in parking lot. Repaired and repainted by authorized workshop. No structural damage or airbag deployment." },
    ]},
    ownershipHistory: [
      { num: 1, label: "Original Owner (Japan)", period: "2018 – 2019", note: "Private owner, one year use, dealer-serviced." },
      { num: 2, label: "Current Owner (BD)", period: "2019 – Present", location: "Chittagong", note: "Imported and used for personal commute. One minor incident in 2022, properly repaired." },
    ],
    serviceHistory: [
      { icon: "⚡", date: "Jan 2025", km: "71,500 km", type: "Hybrid Battery Check", note: "Capacity: 85%. Cells balanced and tested. Estimated 2+ years remaining." },
      { icon: "🔧", date: "Aug 2024", km: "66,000 km", type: "Oil Change + Brake Pads", note: "Front brake pads replaced. Rear at 60% life." },
      { icon: "⚙️", date: "Dec 2023", km: "60,000 km", type: "60k Major Service", note: "Transmission fluid, air filter, cabin filter, spark plugs replaced." },
    ],
  },
  "Nissan X-Trail": {
    fuel: "Petrol", transmission: "CVT Automatic", color: "Brilliant Silver", engine: "2000cc (MR20DD)",
    bodyType: "SUV", seats: "7", doors: "4", drive: "AWD 4WD", importedFrom: "Japan",
    registrationYear: "2022 (BD)", fitnessExpiry: "Jun 2025", taxToken: "Pending Renewal",
    seller: "Capital Auto Traders", sellerRating: "4.5 ★", sellerDeals: "62 deals", phone: "+880 1900-987654",
    description: "Nissan X-Trail 20X 7-seater variant with AWD system. Third row seats fold flat for extra cargo. Perfect for families and long road trips. Strong 2.0L engine handles Dhaka traffic comfortably. All four doors and sunroof mechanism working perfectly. Minor surface scratch on rear bumper (noted in inspection report). Tax token renewal in progress — will be completed before handover.",
    photos: [
      { src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&q=80", label: "Front Exterior" },
      { src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=80", label: "Side Profile" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", label: "7-Seat Interior" },
      { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80", label: "Dashboard" },
      { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80", label: "Engine Bay" },
      { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=80", label: "Rear View" },
    ],
    specs: [
      ["Engine", "1997cc MR20DD"], ["Horsepower", "144 hp"], ["Torque", "200 Nm"],
      ["Transmission", "CVT Automatic"], ["Drive", "4WD / AWD"], ["Fuel Type", "Petrol"],
      ["Fuel Economy", "~11 km/L city"], ["Body Type", "SUV"], ["Seats", "7"],
      ["Color", "Brilliant Silver"], ["Ground Clearance", "210 mm"], ["Boot Space", "445 L (5-seat)"],
      ["Length", "4,640 mm"], ["Width", "1,820 mm"], ["Tyres", "225/60 R17"], ["A/C", "Front & Rear Dual Zone"],
    ],
    features: ["Around View Monitor", "Intelligent 4WD", "7 Seats", "Panoramic Sunroof", "Push Start", "Keyless Entry", "Power Rear Gate", "8\" Display Audio", "Bose Sound System", "Heated Front Seats", "Auto Parking Assist", "Blind Spot Warning", "Rear Cross Traffic Alert", "LED Headlights"],
    papers: [
      { icon: "📋", name: "Registration Card", status: "verified" },
      { icon: "🚢", name: "Import Certificate", status: "verified" },
      { icon: "🔧", name: "Inspection Report", status: "verified" },
      { icon: "📄", name: "Tax Token", status: "confidential" },
      { icon: "🛡️", name: "Fitness Certificate", status: "verified" },
      { icon: "🔒", name: "Full Service History", status: "confidential" },
    ],
    negotiable: true,
    inspectorNote: "GariBazar inspection (Feb 2025): AWD system fully functional, tested on incline. Minor surface scratch on rear bumper noted — not structural. Tax token renewal in progress, seller confirmed completion before handover. Interior 7/10. Highly capable 7-seater.",
    listingMeta: { ref: "GB-2025-052", views: 341, listed: "20 Jan 2025" },
    accidentHistory: { incidents: [
      { date: "Mar 2023", type: "Rear Bumper Surface Scratch", severity: "minor", desc: "Surface-level contact in car park. Professionally touched up. No sensors or structural damage." },
    ]},
    ownershipHistory: [
      { num: 1, label: "Original Owner (Japan)", period: "2017 – 2022", note: "Family vehicle, dealer-maintained throughout ownership." },
      { num: 2, label: "Current Owner (BD)", period: "2022 – Present", location: "Dhaka", note: "Imported via authorized agent. Tax token renewal currently in progress." },
    ],
    serviceHistory: [
      { icon: "🔧", date: "Jan 2025", km: "88,500 km", type: "Oil & Filter + Air Filter", note: "Routine service completed at Capital Auto workshop." },
      { icon: "🛞", date: "Jul 2024", km: "82,000 km", type: "All-Season Tyre Set", note: "All four Yokohama tyres replaced — new set installed." },
      { icon: "⚙️", date: "Nov 2023", km: "75,000 km", type: "CVT Fluid + Transfer Case", note: "AWD transfer case fluid and CVT fluid replaced." },
      { icon: "🔧", date: "Mar 2023", km: "68,000 km", type: "Brake Fluid + Coolant Flush", note: "Standard fluid maintenance completed." },
    ],
  },
  "Toyota Axio": {
    fuel: "Petrol/Hybrid", transmission: "CVT Automatic", color: "Super White", engine: "1500cc Hybrid (1NZ-FXE)",
    bodyType: "Sedan", seats: "5", doors: "4", drive: "FWD", importedFrom: "Japan",
    registrationYear: "2021 (BD)", fitnessExpiry: "Nov 2026", taxToken: "Valid",
    seller: "Sylhet Car Point", sellerRating: "4.9 ★", sellerDeals: "18 deals", phone: "+880 1700-111222",
    description: "Practically new Toyota Axio G Hybrid with only 41,000 km. One careful owner — used primarily for airport runs and long distances. Interior spotless with seat covers maintained from day one. Hybrid system in excellent condition. Extremely fuel efficient at 20+ km/L on highways. First owner selling due to upgrade. No accidents, no major repairs.",
    photos: [
      { src: "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=900&q=80", label: "Front Exterior" },
      { src: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&q=80", label: "Side View" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", label: "Interior" },
      { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80", label: "Dashboard" },
      { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80", label: "Engine Bay" },
      { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80", label: "Rear Exterior" },
    ],
    specs: [
      ["Engine", "1496cc 1NZ-FXE + Motor"], ["System Power", "75 hp"], ["Battery", "NiMH Hybrid"],
      ["Transmission", "CVT Automatic"], ["Drive", "FWD"], ["Fuel Type", "Petrol Hybrid"],
      ["Fuel Economy", "~20 km/L highway"], ["Body Type", "Sedan"], ["Seats", "5"],
      ["Color", "Super White"], ["Length", "4,400 mm"], ["Width", "1,695 mm"],
      ["Tyres", "185/65 R15"], ["Boot Space", "340 L"], ["A/C", "Auto A/C"], ["Airbags", "SRS Dual"],
    ],
    features: ["Hybrid System", "Push Start", "Keyless Entry", "Auto A/C", "Rear Camera", "Parking Sensor", "Bluetooth Audio", "USB Charging Ports", "Power Windows", "Power Mirrors", "Auto Lights", "Alloy Wheels", "Dual Airbags", "ABS"],
    papers: [
      { icon: "📋", name: "Registration Card", status: "verified" },
      { icon: "🚢", name: "Import Certificate", status: "verified" },
      { icon: "⚡", name: "Hybrid Battery Test", status: "verified" },
      { icon: "🔧", name: "Inspection Report", status: "verified" },
      { icon: "🛡️", name: "Fitness Certificate", status: "verified" },
      { icon: "💳", name: "Insurance", status: "verified" },
    ],
    negotiable: false,
    inspectorNote: "GariBazar inspection (Mar 2025): Exceptional condition for a 2020 model. Interior 10/10 — seat covers maintained from day one. Hybrid system health check: 92% battery capacity. Engine bay spotless. No repairs or incidents recorded. Highly recommended listing.",
    listingMeta: { ref: "GB-2025-067", views: 293, listed: "25 Feb 2025" },
    accidentHistory: { clean: true },
    ownershipHistory: [
      { num: 1, label: "First & Only Owner (BD)", period: "2021 – Present", location: "Sylhet", note: "Imported new, single careful owner. Selling only to upgrade to a larger vehicle." },
    ],
    serviceHistory: [
      { icon: "⚡", date: "Feb 2025", km: "40,500 km", type: "Hybrid Battery Health Check", note: "Capacity: 92%. System excellent — no cell replacement needed." },
      { icon: "🔧", date: "Sep 2024", km: "35,000 km", type: "Oil Change + Cabin Filter", note: "Genuine Toyota parts used throughout." },
      { icon: "⚙️", date: "Feb 2024", km: "28,000 km", type: "30k Service", note: "Brake fluid, air filter, spark plugs — all within spec." },
    ],
  },
  "Mitsubishi Outlander": {
    fuel: "Petrol", transmission: "CVT Automatic", color: "Titanium Gray", engine: "2400cc (4B12 MIVEC)",
    bodyType: "SUV", seats: "7", doors: "4", drive: "4WD S-AWC", importedFrom: "Japan",
    registrationYear: "2019 (BD)", fitnessExpiry: "Aug 2025", taxToken: "Valid",
    seller: "Rajshahi Motor Co.", sellerRating: "4.4 ★", sellerDeals: "29 deals", phone: "+880 1600-445566",
    description: "Mitsubishi Outlander 24G with S-AWC all-wheel control — perfect for Bangladesh road conditions. 7-seater with comfortable 3rd row. All four shock absorbers recently replaced. Timing belt changed at 80,000 km. Engine running smoothly. Body is well-maintained with minor age-related blemishes. Selling due to owner relocating abroad.",
    photos: [
      { src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=80", label: "Front Exterior" },
      { src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&q=80", label: "Side View" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", label: "Interior" },
      { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80", label: "Dashboard" },
      { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80", label: "Engine (2400cc)" },
      { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80", label: "Rear / 3rd Row" },
    ],
    specs: [
      ["Engine", "2360cc 4B12 MIVEC"], ["Horsepower", "167 hp"], ["Torque", "226 Nm"],
      ["Transmission", "CVT Automatic"], ["Drive", "4WD S-AWC"], ["Fuel Type", "Petrol"],
      ["Fuel Economy", "~9 km/L city"], ["Body Type", "SUV"], ["Seats", "7"],
      ["Color", "Titanium Gray"], ["Ground Clearance", "210 mm"], ["Length", "4,655 mm"],
      ["Width", "1,800 mm"], ["Tyres", "225/55 R18"], ["A/C", "Dual Zone"], ["Airbags", "7 SRS"],
    ],
    features: ["S-AWC All-Wheel Control", "7 Seats", "Rockford Fosgate Audio", "Rear Camera", "Auto A/C", "Seat Heaters", "Steering Heater", "Push Start", "Keyless Entry", "Power Tailgate", "Roof Rails", "LED Headlights", "Blind Spot Monitor", "Lane Departure Warning"],
    papers: [
      { icon: "📋", name: "Registration Card", status: "verified" },
      { icon: "🚢", name: "Import Certificate", status: "verified" },
      { icon: "🔧", name: "Service Records", status: "verified" },
      { icon: "🛡️", name: "Fitness Certificate", status: "verified" },
      { icon: "🔒", name: "Accident History", status: "confidential" },
      { icon: "💳", name: "Insurance", status: "verified" },
    ],
    negotiable: true,
    inspectorNote: "GariBazar inspection (Dec 2024): High-mileage vehicle in solid mechanical condition. All four shock absorbers recently replaced. Timing belt changed at 80k. S-AWC system tested and functional on test drive. Body shows age-appropriate wear. Engine oil clean, no leaks. Recommended for value-focused buyers.",
    listingMeta: { ref: "GB-2024-198", views: 218, listed: "5 Dec 2024" },
    accidentHistory: { incidents: [
      { date: "Jun 2021", type: "Front Bumper Impact", severity: "moderate", desc: "Minor collision at low speed in Japan. Front bumper replaced. No frame damage, no airbag deployment. Repaired at authorized Mitsubishi workshop before import to BD." },
    ]},
    ownershipHistory: [
      { num: 1, label: "Original Owner (Japan)", period: "2016 – 2019", note: "Corporate fleet vehicle. Regularly serviced at Mitsubishi dealer Japan." },
      { num: 2, label: "Second Owner (Japan)", period: "2019 – 2022", note: "Private individual. Minor accident in Jun 2021, properly repaired at authorized workshop." },
      { num: 3, label: "Current Owner (BD)", period: "2022 – Present", location: "Rajshahi", note: "Imported 2022. Shocks and timing belt replaced. Owner relocating abroad — genuine sale." },
    ],
    serviceHistory: [
      { icon: "🔧", date: "Nov 2024", km: "94,000 km", type: "Full Shock Absorber Replacement", note: "All four shock absorbers replaced — KYB Excel-G set." },
      { icon: "⚙️", date: "Aug 2024", km: "90,000 km", type: "Oil + CVT Fluid Service", note: "CVT fluid changed. Engine running clean with no leaks." },
      { icon: "🔩", date: "2022 (on import)", km: "80,000 km", type: "Timing Belt Replacement", note: "Done at certified workshop. Critical maintenance completed." },
    ],
  },
  "BMW 3 Series": {
    fuel: "Petrol", transmission: "8-Speed Steptronic", color: "Alpine White", engine: "2000cc TwinPower Turbo (B48)",
    bodyType: "Sports Sedan", seats: "5", doors: "4", drive: "RWD / xDrive", importedFrom: "Germany / USA",
    registrationYear: "2022 (BD)", fitnessExpiry: "Jan 2027", taxToken: "Valid",
    seller: "Elite Auto BD", sellerRating: "5.0 ★", sellerDeals: "14 deals", phone: "+880 1711-999888",
    description: "BMW 330i M Sport in stunning Alpine White. Imported new from authorized dealer. Full BMW service history maintained at authorized service center. M Sport package includes M aero kit, sport seats, and M steering wheel. IDrive 7.0 with full Apple CarPlay. This is the cleanest example you will find in Bangladesh at this price. Serious buyers only — test drive available.",
    photos: [
      { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=80", label: "Front — M Sport" },
      { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80", label: "Side Profile" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", label: "M Sport Interior" },
      { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80", label: "iDrive Dashboard" },
      { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80", label: "B48 Engine Bay" },
      { src: "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=900&q=80", label: "Rear — M Diffuser" },
    ],
    specs: [
      ["Engine", "1998cc B48 TwinPower Turbo"], ["Horsepower", "255 hp"], ["Torque", "400 Nm"],
      ["Transmission", "8-Speed Steptronic"], ["Drive", "Rear-Wheel Drive"], ["0–100 km/h", "5.8 sec"],
      ["Top Speed", "250 km/h (limited)"], ["Fuel Economy", "~10 km/L city"], ["Body Type", "Sports Sedan"],
      ["Seats", "5"], ["Color", "Alpine White"], ["Package", "M Sport"],
      ["Length", "4,709 mm"], ["Width", "1,827 mm"], ["Tyres", "225/45 R18 (F) 255/40 R18 (R)"], ["Airbags", "10 SRS"],
    ],
    features: ["M Sport Package", "iDrive 7.0", "Apple CarPlay / Android Auto", "Wireless Charging", "Harman Kardon Sound", "Head-Up Display", "Parking Assistant Plus", "360° Camera", "Adaptive LED Headlights", "Heated M Seats", "M Steering Wheel", "Launch Control", "Driving Mode Selector", "Live Cockpit Professional"],
    papers: [
      { icon: "📋", name: "Bangladesh Registration", status: "verified" },
      { icon: "📦", name: "Original Bill of Entry", status: "verified" },
      { icon: "🔧", name: "BMW Service History", status: "verified" },
      { icon: "🛡️", name: "Fitness Certificate", status: "verified" },
      { icon: "🔒", name: "Duty Payment Receipt", status: "confidential" },
      { icon: "💳", name: "Insurance (Comprehensive)", status: "verified" },
    ],
    negotiable: false,
    inspectorNote: "GariBazar Premium Inspection (Mar 2025): Immaculate condition throughout. Full BMW service history at authorized service centre — all records intact. All M Sport components verified genuine. Tyres at 80% life. iDrive 7.0 and all driver assistance systems fully functional. Zero accidents. Our cleanest listing this quarter.",
    listingMeta: { ref: "GB-2025-003", views: 1204, listed: "2 Jan 2025" },
    accidentHistory: { clean: true },
    ownershipHistory: [
      { num: 1, label: "First & Only Owner (BD)", period: "2022 – Present", location: "Dhaka", note: "Purchased new from authorized BMW dealer. Full service at BMW Service Centre Dhaka. Selling to upgrade to BMW 5 Series." },
    ],
    serviceHistory: [
      { icon: "🔧", date: "Feb 2025", km: "27,500 km", type: "BMW Annual Service", note: "Oil, filter, brake fluid at BMW Service Centre Dhaka. Warranty-compliant." },
      { icon: "⚙️", date: "Aug 2024", km: "20,000 km", type: "20k Condition Based Service", note: "All systems green. Software update applied by dealer." },
      { icon: "🔧", date: "Feb 2024", km: "12,000 km", type: "12k BMW Service", note: "Microfilter, engine oil, OBD check — official dealer service." },
    ],
  },
};

function getDetail(car: Car): CarDetail {
  if (DETAIL[car.name]) return DETAIL[car.name];
  return {
    fuel: "Petrol", transmission: "Automatic", color: "Silver", engine: "1500cc",
    bodyType: "Sedan", seats: "5", doors: "4", drive: "FWD", importedFrom: "Japan",
    registrationYear: "2023 (BD)", fitnessExpiry: "Dec 2025", taxToken: "Valid",
    seller: "GariBazar Verified Dealer", sellerRating: "4.5 ★", sellerDeals: "20 deals", phone: "+880 1700-000000",
    description: `${car.name} (${car.year}) — ${car.condition} vehicle in ${car.location}. Contact seller for full details and test drive.`,
    photos: [{ src: car.image, label: "Main Photo" }],
    specs: [["Year", String(car.year)], ["Mileage", car.mileage], ["Condition", car.condition], ["Location", car.location]],
    features: ["Power Windows", "A/C", "Power Steering", "Central Locking"],
    papers: [
      { icon: "📋", name: "Registration Card", status: "verified" },
      { icon: "🔧", name: "Inspection Report", status: "verified" },
    ],
    negotiable: true,
    inspectorNote: "Contact seller for inspection details.",
    listingMeta: { ref: "GB-2025-000", views: 0, listed: "Recent" },
    accidentHistory: { clean: true },
    ownershipHistory: [{ num: 1, label: "Current Owner", period: `${car.year} – Present`, location: car.location, note: "Contact seller for details." }],
    serviceHistory: [],
  };
}

/* ─── Component ─── */
export default function CarModal({ car, onClose }: { car: Car; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [wishSaved, setWishSaved] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  const d = getDetail(car);
  const photos = d.photos;

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in the ${car.name} (${car.year}) listed on GariBazar BD. Price: ${car.price}. Ref: ${d.listingMeta.ref}. Please share details.`
  );

  const animateClose = useCallback(() => {
    gsap.to(panelRef.current, {
      xPercent: 100, duration: 0.4, ease: "power3.in",
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    gsap.fromTo(panelRef.current, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: "power3.out" });

    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") animateClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [animateClose]);

  const navPhoto = (dir: number) => {
    setPhotoIdx(prev => {
      const next = prev + dir;
      if (next < 0) return photos.length - 1;
      if (next >= photos.length) return 0;
      return next;
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm" onClick={animateClose} />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 z-[2001] w-full max-w-[680px] h-full bg-[#060a12] border-l border-white/[0.06] shadow-[-20px_0_60px_rgba(0,0,0,0.7)] flex flex-col"
      >
        {/* ── Sticky header bar ── */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-white/[0.06] bg-[#060a12]/95 backdrop-blur-sm shrink-0">
          <button onClick={animateClose} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
            Back
          </button>
          <span className="text-sm font-semibold truncate max-w-[60%]">{car.name} ({car.year})</span>
          <button onClick={animateClose} className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer text-lg">✕</button>
        </div>

        {/* ── Scrollable body ── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden" data-lenis-prevent>

          {/* Hero photo */}
          <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
            <img
              src={photos[photoIdx].src}
              alt={photos[photoIdx].label}
              className="w-full h-full object-cover object-center transition-opacity duration-300"
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-transparent to-transparent opacity-70 pointer-events-none" />
            {/* Nav arrows */}
            {photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <button onClick={() => navPhoto(-1)} className="w-9 h-9 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white text-lg hover:bg-black/70 transition-colors cursor-pointer">‹</button>
                <span className="text-xs font-semibold text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">{photoIdx + 1} / {photos.length}</span>
                <button onClick={() => navPhoto(1)} className="w-9 h-9 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white text-lg hover:bg-black/70 transition-colors cursor-pointer">›</button>
              </div>
            )}
            {/* Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 bg-emerald-500/90 backdrop-blur text-white text-[0.65rem] font-bold uppercase rounded-full">Verified</span>
              {car.badge !== "Verified" && (
                <span className={`px-2.5 py-1 backdrop-blur text-white text-[0.65rem] font-bold uppercase rounded-full ${
                  car.badge === "Hot" ? "bg-rose-500/90" : car.badge === "Premium" ? "bg-amber-500/90 text-black" : "bg-blue-500/90"
                }`}>{car.badge}</span>
              )}
            </div>
          </div>

          {/* Thumbnail strip */}
          {photos.length > 1 && (
            <div className="flex gap-2 px-4 py-3 overflow-x-auto">
              {photos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIdx(i)}
                  className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    i === photoIdx ? "border-[var(--accent)] opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={p.src} alt={p.label} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }} />
                </button>
              ))}
            </div>
          )}

          {/* ── Zone Divider ── */}
          <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.02] border-y border-white/[0.05]">
            <span className="text-base">📋</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Listing Details</span>
            <span className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Listing meta bar */}
          <div className="flex items-center justify-between px-5 py-2.5 text-[0.7rem] text-[var(--text-muted)]">
            <div className="flex items-center gap-3 flex-wrap">
              <span>Ref: {d.listingMeta.ref}</span>
              <span>{d.listingMeta.views} views</span>
              <span>Listed: {d.listingMeta.listed}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { if (typeof navigator !== "undefined") navigator.clipboard?.writeText(window.location.href); }}
                className="flex items-center gap-1 px-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded-md hover:text-white transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Share
              </button>
              <button className="px-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded-md hover:text-white transition-colors cursor-pointer">⚑ Report</button>
            </div>
          </div>

          {/* ── Price + CTAs section ── */}
          <div className="mx-4 my-3 p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <div className="text-xs text-[var(--text-secondary)] uppercase tracking-widest mb-1">Listing Price</div>
            <div className="text-3xl font-extrabold text-amber-400 font-dashboard drop-shadow-[0_0_12px_rgba(251,191,36,0.3)] mb-1">{car.price}</div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-4">
              <span>📍 {car.location}</span>
              {d.negotiable && (
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[0.65rem] font-bold">Negotiable</span>
              )}
            </div>

            {/* Quick stat chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { label: car.year.toString(), icon: "📅" },
                { label: car.mileage, icon: "🛣" },
                { label: d.fuel, icon: "⛽" },
                { label: d.transmission, icon: "⚙️" },
                { label: d.color, icon: "🎨" },
                { label: d.bodyType, icon: "🚘" },
              ].map(c => (
                <span key={c.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-[0.75rem] text-[var(--text-secondary)]">
                  <span>{c.icon}</span> {c.label}
                </span>
              ))}
            </div>

            {/* Primary actions */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => window.alert(`📞 Contact Seller\nPhone: ${d.phone}\nbKash / Nagad available`)}
                className="flex-1 py-3 bg-[var(--accent)] hover:bg-[#2872e5] text-white rounded-lg font-semibold text-sm transition-all cursor-pointer"
              >📞 Contact Seller</button>
              <a
                href={`https://wa.me/${d.phone.replace(/[^0-9]/g, "")}?text=${waMessage}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] rounded-lg font-semibold text-sm hover:bg-[#25d366]/20 transition-all"
              >💬 WhatsApp</a>
            </div>

            {/* Secondary actions */}
            <div className="flex gap-2 mb-3">
              <button className="flex-1 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-[var(--text-secondary)] hover:text-white hover:border-white/[0.12] transition-all cursor-pointer">💬 Make an Offer</button>
              <button className="flex-1 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-[var(--text-secondary)] hover:text-white hover:border-white/[0.12] transition-all cursor-pointer">🚗 Test Drive</button>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => setWishSaved(!wishSaved)}
              className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer border ${
                wishSaved
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                  : "bg-white/[0.03] border-white/[0.06] text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              {wishSaved ? "❤️ Saved to Wishlist" : "🤍 Save to Wishlist"}
            </button>

            {/* Mini seller card */}
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {d.seller[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{d.seller}</div>
                <div className="text-[0.7rem] text-[var(--text-muted)]">{d.sellerRating} · {d.sellerDeals}</div>
              </div>
            </div>
          </div>

          {/* ═══ SECTION: Quick Overview ═══ */}
          <div className="mx-4 mt-4 mb-3 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              Quick Overview
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Year", value: car.year.toString() },
                { label: "Mileage", value: car.mileage },
                { label: "Fuel", value: d.fuel },
                { label: "Transmission", value: d.transmission },
                { label: "Color", value: d.color },
                { label: "Body Type", value: d.bodyType },
                { label: "Seats", value: d.seats },
                { label: "Imported From", value: d.importedFrom },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between px-3 py-2.5 bg-white/[0.03] border border-white/[0.05] rounded-lg">
                  <span className="text-[0.72rem] text-[var(--text-muted)]">{item.label}</span>
                  <span className="text-[0.78rem] font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ SECTION: Inspector Note ═══ */}
          <div className="mx-4 mb-3 p-4 bg-emerald-500/[0.05] border border-emerald-500/20 rounded-2xl">
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">🔍</span>
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">GariBazar Inspector Note</div>
                <p className="text-[0.8rem] text-[var(--text-secondary)] leading-relaxed">{d.inspectorNote}</p>
              </div>
            </div>
          </div>

          {/* ═══ SECTION: About This Car ═══ */}
          <div className="mx-4 mb-3 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              About This Car
            </h3>
            <p className="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed">{d.description}</p>
          </div>

          {/* ═══ GROUP: Vehicle History ═══ */}
          <div className="flex items-center gap-3 mx-4 mt-4 mb-2 px-4 py-2.5 bg-blue-500/[0.06] border border-blue-500/20 rounded-xl">
            <span className="text-base">📋</span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Vehicle History</span>
            <span className="flex-1 h-px bg-blue-500/10" />
          </div>

          {/* Accident History */}
          <div className="mx-4 mb-2 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="text-sm font-bold mb-3">🚨 Accident & Damage History</h3>
            {d.accidentHistory.clean ? (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-500/[0.06] border border-emerald-500/20 rounded-lg">
                <span className="text-emerald-400 font-bold text-sm">✓</span>
                <span className="text-[0.82rem] text-emerald-300">No accidents or damage reported — clean record</span>
              </div>
            ) : (
              <div className="space-y-2">
                {d.accidentHistory.incidents?.map((inc, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${
                    inc.severity === "minor" ? "bg-amber-500/[0.05] border-amber-500/20" : "bg-rose-500/[0.05] border-rose-500/20"
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[0.65rem] font-bold uppercase px-2 py-0.5 rounded-full ${
                        inc.severity === "minor" ? "bg-amber-500/20 text-amber-400" : "bg-rose-500/20 text-rose-400"
                      }`}>{inc.severity}</span>
                      <span className="text-[0.72rem] text-[var(--text-muted)]">{inc.date}</span>
                    </div>
                    <div className="text-[0.82rem] font-semibold mb-0.5">{inc.type}</div>
                    <p className="text-[0.78rem] text-[var(--text-secondary)]">{inc.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ownership History */}
          <div className="mx-4 mb-2 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="text-sm font-bold mb-3">👤 Ownership History</h3>
            <div className="space-y-0">
              {d.ownershipHistory.map((own, i) => (
                <div key={i} className="flex gap-3 relative">
                  {i < d.ownershipHistory.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-px bg-white/[0.08]" />
                  )}
                  <div className="w-8 h-8 shrink-0 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent)]/30 flex items-center justify-center text-[0.7rem] font-bold text-[var(--accent)]">{own.num}</div>
                  <div className="pb-4 flex-1">
                    <div className="text-[0.82rem] font-semibold">{own.label}</div>
                    <div className="text-[0.72rem] text-[var(--text-muted)] mb-0.5">{own.period}{own.location ? ` · ${own.location}` : ""}</div>
                    <p className="text-[0.78rem] text-[var(--text-secondary)]">{own.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service History */}
          {d.serviceHistory.length > 0 && (
            <div className="mx-4 mb-2 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
              <h3 className="text-sm font-bold mb-3">🔧 Service & Maintenance</h3>
              <div className="space-y-2">
                {d.serviceHistory.map((svc, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <span className="text-lg shrink-0">{svc.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[0.82rem] font-semibold">{svc.type}</span>
                        <span className="text-[0.68rem] text-[var(--text-muted)]">{svc.date}</span>
                      </div>
                      <div className="text-[0.7rem] text-[var(--text-muted)] mb-0.5">@ {svc.km}</div>
                      <p className="text-[0.78rem] text-[var(--text-secondary)]">{svc.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ GROUP: Photos & Video ═══ */}
          <div className="flex items-center gap-3 mx-4 mt-4 mb-2 px-4 py-2.5 bg-violet-500/[0.06] border border-violet-500/20 rounded-xl">
            <span className="text-base">📸</span>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Photos & Video</span>
            <span className="flex-1 h-px bg-violet-500/10" />
          </div>

          {/* Photo Gallery */}
          <div className="mx-4 mb-2 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="text-sm font-bold mb-3">Photo Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(p)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.06] group cursor-pointer"
                >
                  <img src={p.src} alt={p.label} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end">
                    <span className="w-full px-2 py-1.5 bg-gradient-to-t from-black/70 to-transparent text-[0.65rem] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">{p.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Video Walkthrough */}
          <div className="mx-4 mb-2 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="text-sm font-bold mb-3">Video Walkthrough</h3>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-white/[0.06]">
              <img
                src={photos[0]?.src}
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-60"
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl hover:bg-white/20 transition-colors cursor-pointer">
                  ▶
                </div>
                <p className="text-xs text-white/60">Tap to play walkthrough video</p>
              </div>
            </div>
          </div>

          {/* ═══ GROUP: Full Specifications ═══ */}
          <div className="flex items-center gap-3 mx-4 mt-4 mb-2 px-4 py-2.5 bg-cyan-500/[0.06] border border-cyan-500/20 rounded-xl">
            <span className="text-base">⚙️</span>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Full Specifications</span>
            <span className="flex-1 h-px bg-cyan-500/10" />
          </div>

          {/* Specs Grid */}
          <div className="mx-4 mb-2 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="text-sm font-bold mb-3">Technical Specs</h3>
            <div className="grid grid-cols-2 gap-px bg-white/[0.04] rounded-xl overflow-hidden border border-white/[0.05]">
              {d.specs.map(([key, val], i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2.5 bg-[#060a12]">
                  <span className="text-[0.72rem] text-[var(--text-muted)]">{key}</span>
                  <span className="text-[0.78rem] font-semibold text-white text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mx-4 mb-2 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="text-sm font-bold mb-3">Features & Equipment</h3>
            <div className="flex flex-wrap gap-2">
              {d.features.map((f, i) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-[0.75rem] text-[var(--text-secondary)]">
                  <span className="text-emerald-400 text-xs">✓</span> {f}
                </span>
              ))}
            </div>
          </div>

          {/* ═══ GROUP: Documents ═══ */}
          <div className="flex items-center gap-3 mx-4 mt-4 mb-2 px-4 py-2.5 bg-amber-500/[0.06] border border-amber-500/20 rounded-xl">
            <span className="text-base">📄</span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Documents & Papers</span>
            <span className="flex-1 h-px bg-amber-500/10" />
          </div>

          {/* Papers Grid */}
          <div className="mx-4 mb-2 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="text-sm font-bold mb-3">Verified Documents</h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {d.papers.map((p, i) => (
                <div key={i} className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                  p.status === "verified"
                    ? "bg-emerald-500/[0.04] border-emerald-500/20"
                    : "bg-white/[0.02] border-white/[0.06]"
                }`}>
                  <span className="text-lg">{p.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.78rem] font-medium truncate">{p.name}</div>
                    <div className={`text-[0.65rem] font-bold uppercase ${
                      p.status === "verified" ? "text-emerald-400" : "text-[var(--text-muted)]"
                    }`}>{p.status === "verified" ? "✓ Verified" : "🔒 Confidential"}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2 px-3 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-[0.75rem] text-[var(--text-muted)]">
              <span>🔒</span>
              <span>Original documents available for in-person inspection. Contact seller to schedule a visit. GariBazar team has verified all listed papers.</span>
            </div>
          </div>

          {/* ═══ GROUP: Seller & Purchase ═══ */}
          <div className="flex items-center gap-3 mx-4 mt-4 mb-2 px-4 py-2.5 bg-emerald-500/[0.06] border border-emerald-500/20 rounded-xl">
            <span className="text-base">🛒</span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Seller & Purchase</span>
            <span className="flex-1 h-px bg-emerald-500/10" />
          </div>

          {/* Seller Info */}
          <div className="mx-4 mb-2 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="text-sm font-bold mb-3">Seller Information</h3>
            <div className="p-4 bg-white/[0.03] border border-white/[0.05] rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {d.seller[0]}
                </div>
                <div>
                  <div className="font-semibold">{d.seller}</div>
                  <div className="text-[0.75rem] text-[var(--text-muted)]">{d.sellerRating} · {d.sellerDeals}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[0.75rem]">
                <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg">
                  <span>📍</span><span className="text-[var(--text-secondary)]">{car.location}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg">
                  <span>📞</span><span className="text-[var(--text-secondary)]">{d.phone}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg">
                  <span>🛡️</span><span className="text-[var(--text-secondary)]">Fitness: {d.fitnessExpiry}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg">
                  <span>📋</span><span className="text-[var(--text-secondary)]">Reg: {d.registrationYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* How to Buy */}
          <div className="mx-4 mb-2 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="text-sm font-bold mb-3">How to Complete This Purchase</h3>
            <div className="space-y-3">
              {[
                { n: 1, title: "Contact Seller", desc: "Call or WhatsApp to confirm availability and arrange a visit." },
                { n: 2, title: "Physical Inspection", desc: "Visit with a trusted mechanic. GariBazar can arrange a certified inspector for ৳500." },
                { n: 3, title: "Verify Papers", desc: "Check registration card, import certificate, fitness certificate, and insurance." },
                { n: 4, title: "Agree Price & Terms", desc: "Negotiate directly with the seller. No hidden fees or middleman charges." },
                { n: 5, title: "Secure Payment", desc: "Use escrow via GariBazar or direct transfer via bKash, Nagad, or bank. Never pay cash upfront." },
                { n: 6, title: "Transfer Ownership", desc: "Complete BRTA ownership transfer. GariBazar assists with paperwork." },
              ].map(step => (
                <div key={step.n} className="flex gap-3 items-start">
                  <div className="w-7 h-7 shrink-0 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent)]/30 flex items-center justify-center text-[0.7rem] font-bold text-[var(--accent)]">{step.n}</div>
                  <div>
                    <div className="text-[0.82rem] font-semibold">{step.title}</div>
                    <p className="text-[0.75rem] text-[var(--text-secondary)]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="mx-4 mt-3 mb-2 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <div className="flex gap-2">
              <button
                onClick={() => window.alert(`📞 Contact Seller\nPhone: ${d.phone}`)}
                className="flex-1 py-3.5 bg-[var(--accent)] hover:bg-[#2872e5] text-white rounded-lg font-semibold text-sm transition-all cursor-pointer"
              >📞 Contact Seller Now</button>
              <a
                href={`https://wa.me/${d.phone.replace(/[^0-9]/g, "")}?text=${waMessage}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] rounded-lg font-semibold text-sm hover:bg-[#25d366]/20 transition-all"
              >💬 WhatsApp Seller</a>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[5000] bg-black/95 flex flex-col items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors cursor-pointer"
          >✕</button>
          <img
            src={lightbox.src}
            alt={lightbox.label}
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="mt-4 text-white/60 text-sm">{lightbox.label}</p>
        </div>
      )}
    </>
  );
}
