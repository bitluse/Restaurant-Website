"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-restaurant.png')",
        }}
      />
      
      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-gold uppercase tracking-[0.3em] text-sm md:text-base mb-6">
            Welcome to
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          <span className="text-gold-gradient">Saveur</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Experience Culinary Excellence
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10"
        >
          Where every dish tells a story of passion and perfection. 
          Indulge in an unforgettable gastronomic journey crafted by our award-winning chefs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => scrollToSection("#menu")}
            className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black font-semibold px-8 py-6 rounded-none text-lg uppercase tracking-wider transition-all duration-300 btn-shine"
          >
            View Menu
          </Button>
          <Button
            onClick={() => scrollToSection("#booking")}
            className="bg-gradient-to-r from-gold to-gold-dark text-black font-semibold px-8 py-6 rounded-none text-lg uppercase tracking-wider hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 btn-shine"
          >
            Book a Table
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="cursor-pointer"
          onClick={() => scrollToSection("#about")}
        >
          <ChevronDown className="w-8 h-8 text-gold" />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-gold/20 rounded-full animate-pulse-gold" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-gold/20 rounded-full animate-pulse-gold" style={{ animationDelay: "1s" }} />
    </section>
  );
}
