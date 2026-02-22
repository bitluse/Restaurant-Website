"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ChefHat, Clock } from "lucide-react";

const stats = [
  { icon: Clock, value: "15+", label: "Years of Excellence" },
  { icon: ChefHat, value: "12", label: "Expert Chefs" },
  { icon: Award, value: "25+", label: "Awards Won" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d4a574 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-gold/30 rounded-lg" />
              <div className="absolute -inset-8 border border-gold/10 rounded-lg" />
              
              {/* Main image */}
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/images/chef-about.png"
                  alt="Our Executive Chef"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-gold to-gold-dark text-black p-6 rounded-lg shadow-xl"
              >
                <p className="text-4xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Since 2009
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">
                Our Story
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                A Legacy of <span className="text-gold-gradient">Culinary Art</span>
              </h2>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Founded in 2009, Saveur was born from a passionate dream to create 
                a dining experience that transcends the ordinary. Our founder, 
                Chef Marcus Laurent, envisioned a place where culinary artistry 
                meets warm hospitality, where every meal becomes a cherished memory.
              </p>
              <p>
                Nestled in the heart of the city, our restaurant combines timeless 
                elegance with contemporary sophistication. Our award-winning culinary 
                team sources the finest ingredients from local farms and sustainable 
                suppliers, crafting dishes that celebrate both tradition and innovation.
              </p>
              <p>
                At Saveur, we believe that dining is not merely about sustenance—it is 
                an art form, a celebration of flavors, textures, and aromas that 
                awaken the senses and nourish the soul. Every plate that leaves our 
                kitchen tells a story of dedication, creativity, and an unwavering 
                commitment to excellence.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold/20">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
