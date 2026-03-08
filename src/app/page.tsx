"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FeaturedCars from "@/components/FeaturedCars";
import WhyChoose from "@/components/WhyChoose";
import Brands from "@/components/Brands";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import TrustStrip from "@/components/TrustStrip";
import SellModal from "@/components/SellModal";
import CarModal from "@/components/CarModal";
import type { Car, SearchFilters } from "@/types";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>({ brand: "", price: "", location: "", year: "" });
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleBrandSelect = useCallback((brand: string) => {
    setFilters(f => ({ ...f, brand }));
    setTimeout(() => scrollTo("browse-cars"), 80);
  }, []);

  const handleLocationSelect = useCallback((location: string) => {
    setFilters(f => ({ ...f, location }));
    setTimeout(() => scrollTo("browse-cars"), 80);
  }, []);

  return (
    <SmoothScroll>
      <Navbar onSellClick={() => setSellModalOpen(true)} />
      <Hero />
      <SearchBar
        filters={filters}
        setFilters={setFilters}
        onSearch={() => scrollTo("browse-cars")}
        onBrandChipClick={handleBrandSelect}
      />
      <TrustStrip />
      <FeaturedCars
        filters={filters}
        onCarClick={setSelectedCar}
      />
      <div className="py-6 flex justify-center"><div className="tire-track max-w-[400px]" /></div>
      <WhyChoose />
      <Brands onBrandClick={handleBrandSelect} />
      <div className="py-6 flex justify-center"><div className="tire-track max-w-[400px]" /></div>
      <HowItWorks />
      <Testimonials />
      <div className="py-6 flex justify-center"><div className="tire-track max-w-[400px]" /></div>
      <CTA
        onBrowseClick={() => scrollTo("browse-cars")}
        onSellClick={() => setSellModalOpen(true)}
      />
      <Footer
        onSellClick={() => setSellModalOpen(true)}
        onLocationClick={handleLocationSelect}
      />

      {sellModalOpen && <SellModal onClose={() => setSellModalOpen(false)} />}
      {selectedCar && <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
    </SmoothScroll>
  );
}
