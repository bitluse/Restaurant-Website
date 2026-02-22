"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    id: "1",
    src: "/images/gallery-1.png",
    alt: "Romantic Dinner Setting",
    category: "ambiance",
  },
  {
    id: "2",
    src: "/images/gallery-2.png",
    alt: "Wine Cellar",
    category: "ambiance",
  },
  {
    id: "3",
    src: "/images/gallery-3.png",
    alt: "Private Dining Room",
    category: "ambiance",
  },
  {
    id: "4",
    src: "/images/gallery-4.png",
    alt: "Artisan Bread",
    category: "food",
  },
  {
    id: "5",
    src: "/images/menu-appetizer.png",
    alt: "Gourmet Appetizer",
    category: "food",
  },
  {
    id: "6",
    src: "/images/menu-main.png",
    alt: "Signature Main Course",
    category: "food",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="py-24 bg-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">
            Gallery
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            A Visual <span className="text-gold-gradient">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Step inside Saveur and discover the elegant ambiance, exquisite dishes, 
            and memorable moments that define our dining experience.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="img-zoom">
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full object-cover transition-all duration-500 ${
                    index === 0 ? "h-full min-h-[400px]" : "h-48 md:h-64"
                  }`}
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
