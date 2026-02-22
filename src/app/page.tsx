"use client";

import Navigation from "@/components/restaurant/Navigation";
import Hero from "@/components/restaurant/Hero";
import About from "@/components/restaurant/About";
import Menu from "@/components/restaurant/Menu";
import Booking from "@/components/restaurant/Booking";
import Gallery from "@/components/restaurant/Gallery";
import Testimonials from "@/components/restaurant/Testimonials";
import Contact from "@/components/restaurant/Contact";
import Footer from "@/components/restaurant/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Booking />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
