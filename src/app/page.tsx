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

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <Hero />
      <SearchBar />
      <FeaturedCars />
      <WhyChoose />
      <Brands />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </SmoothScroll>
  );
}
