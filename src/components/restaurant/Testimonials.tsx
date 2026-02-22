"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    text: "An absolutely magical experience! The Wagyu ribeye was cooked to perfection, and the ambiance made our anniversary unforgettable. The staff went above and beyond to make us feel special.",
    avatar: "SJ",
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "San Francisco, CA",
    rating: 5,
    text: "Saveur redefines fine dining. Every dish was a masterpiece, from the truffle bruschetta to the chocolate lava cake. The wine pairing recommendations were exceptional. A must-visit!",
    avatar: "MC",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    location: "Los Angeles, CA",
    rating: 5,
    text: "From the moment we walked in, we knew this was special. The attention to detail is remarkable, and the flavors are simply extraordinary. This is now our go-to place for celebrations.",
    avatar: "ER",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-restaurant.png')" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">
            Testimonials
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            What Our <span className="text-gold-gradient">Guests Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from those who have experienced the magic of Saveur
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="bg-card border border-gold/10 rounded-lg p-8 relative card-hover"
            >
              {/* Quote Mark */}
              <div className="absolute top-4 left-6 text-6xl text-gold/20 font-serif">
                &quot;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 pt-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-gold/30">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gold/20 text-gold font-medium">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-card border border-gold/20 rounded-full px-8 py-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-white font-medium">4.9/5</span>
            <span className="text-gray-400">based on 500+ reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
