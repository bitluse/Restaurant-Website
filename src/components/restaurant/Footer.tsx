"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Reservations", href: "#booking" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black border-t border-gold/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span
                className="text-4xl font-bold"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                <span className="text-gold-gradient">Saveur</span>
              </span>
            </motion.a>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Experience culinary excellence at Saveur. Where every dish tells a story 
              of passion, creativity, and an unwavering commitment to the finest dining experience.
            </p>

            {/* Newsletter */}
            <div className="max-w-sm">
              <p className="text-white font-medium mb-3">Subscribe to our newsletter</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-card border-gold/20 focus:border-gold rounded-none flex-1"
                />
                <Button
                  type="submit"
                  className="bg-gold hover:bg-gold-dark text-black rounded-none px-4"
                >
                  {isSubscribed ? "✓" : <ArrowRight className="w-4 h-4" />}
                </Button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">
              Connect With Us
            </h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <p>+1 (555) 123-4567</p>
              <p>reservations@saveur.com</p>
              <p>123 Gourmet Avenue</p>
              <p>Downtown, NY 10001</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Saveur Restaurant. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Crafted with ❤️ by{" "}
              <a
                href="https://bitluse.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors font-medium"
              >
                BitLuse
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
