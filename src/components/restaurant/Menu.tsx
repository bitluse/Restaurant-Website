"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Flame, Leaf, Sparkles, Star } from "lucide-react";

const menuCategories = [
  { id: "appetizers", name: "Appetizers", image: "/images/menu-appetizer.png" },
  { id: "main", name: "Main Course", image: "/images/menu-main.png" },
  { id: "desserts", name: "Desserts", image: "/images/menu-dessert.png" },
  { id: "drinks", name: "Drinks", image: "/images/menu-drinks.png" },
];

const menuItems: Record<string, Array<{
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: "popular" | "chefs-special" | "new" | "vegetarian";
}>> = {
  appetizers: [
    {
      id: "a1",
      name: "Truffle Bruschetta",
      description: "Toasted artisan bread topped with heirloom tomatoes, fresh basil, black truffle oil, and aged balsamic glaze",
      price: "$18",
      image: "/images/menu-appetizer.png",
      badge: "popular",
    },
    {
      id: "a2",
      name: "Tuna Tartare",
      description: "Fresh yellowfin tuna, avocado mousse, citrus ponzu, crispy wontons, and microgreens",
      price: "$24",
      image: "/images/menu-appetizer.png",
      badge: "chefs-special",
    },
    {
      id: "a3",
      name: "French Onion Soup",
      description: "Caramelized onions in rich beef broth, topped with Gruyère cheese and crusty bread",
      price: "$16",
      image: "/images/menu-appetizer.png",
    },
    {
      id: "a4",
      name: "Burrata Salad",
      description: "Creamy burrata, roasted cherry tomatoes, fresh basil, arugula, and extra virgin olive oil",
      price: "$19",
      image: "/images/menu-appetizer.png",
      badge: "vegetarian",
    },
  ],
  main: [
    {
      id: "m1",
      name: "Wagyu Ribeye",
      description: "12oz Australian Wagyu beef, herb butter, truffle mashed potatoes, seasonal vegetables, and red wine jus",
      price: "$85",
      image: "/images/menu-main.png",
      badge: "chefs-special",
    },
    {
      id: "m2",
      name: "Pan-Seared Salmon",
      description: "Atlantic salmon, lemon beurre blanc, asparagus, wild rice pilaf, and caper berries",
      price: "$42",
      image: "/images/menu-main.png",
      badge: "popular",
    },
    {
      id: "m3",
      name: "Lobster Thermidor",
      description: "Whole Maine lobster, cognac cream sauce, gruyère gratin, and buttered vegetables",
      price: "$78",
      image: "/images/menu-main.png",
    },
    {
      id: "m4",
      name: "Duck Confit",
      description: "Slow-cooked duck leg, cherry gastrique, roasted root vegetables, and crispy potato galette",
      price: "$48",
      image: "/images/menu-main.png",
    },
  ],
  desserts: [
    {
      id: "d1",
      name: "Chocolate Lava Cake",
      description: "Warm dark chocolate fondant, molten center, vanilla bean ice cream, and fresh berries",
      price: "$16",
      image: "/images/menu-dessert.png",
      badge: "popular",
    },
    {
      id: "d2",
      name: "Crème Brûlée",
      description: "Classic French custard with caramelized sugar crust, served with shortbread cookies",
      price: "$14",
      image: "/images/menu-dessert.png",
    },
    {
      id: "d3",
      name: "Tiramisu",
      description: "Espresso-soaked ladyfingers, mascarpone cream, Valrhona cocoa, and amaretto",
      price: "$15",
      image: "/images/menu-dessert.png",
      badge: "chefs-special",
    },
    {
      id: "d4",
      name: "Seasonal Fruit Tart",
      description: "Buttery pastry shell, vanilla pastry cream, fresh seasonal fruits, and apricot glaze",
      price: "$14",
      image: "/images/menu-dessert.png",
      badge: "vegetarian",
    },
  ],
  drinks: [
    {
      id: "dr1",
      name: "Signature Old Fashioned",
      description: "Woodford Reserve bourbon, Angostura bitters, demerara sugar, orange zest, and Luxardo cherry",
      price: "$18",
      image: "/images/menu-drinks.png",
      badge: "chefs-special",
    },
    {
      id: "dr2",
      name: "French 75",
      description: "Gin, fresh lemon juice, simple syrup, topped with champagne, and lemon twist",
      price: "$16",
      image: "/images/menu-drinks.png",
      badge: "popular",
    },
    {
      id: "dr3",
      name: "Espresso Martini",
      description: "Vodka, Kahlúa, fresh espresso, and vanilla syrup, served with coffee beans",
      price: "$17",
      image: "/images/menu-drinks.png",
    },
    {
      id: "dr4",
      name: "Wine Selection",
      description: "Curated selection of premium wines from renowned vineyards worldwide",
      price: "$15+",
      image: "/images/menu-drinks.png",
    },
  ],
};

const badgeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  popular: Star,
  "chefs-special": Flame,
  new: Sparkles,
  vegetarian: Leaf,
};

const badgeColors: Record<string, string> = {
  popular: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "chefs-special": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  vegetarian: "bg-green-500/20 text-green-400 border-green-500/30",
};

// Helper component to render badge icon
function BadgeIcon({ badge }: { badge: string }) {
  const IconComponent = badgeIcons[badge];
  if (!IconComponent) return null;
  return <IconComponent className="w-3 h-3" />;
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="menu" className="py-24 bg-card relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">
            Our Menu
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Culinary <span className="text-gold-gradient">Masterpieces</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our carefully curated menu featuring the finest ingredients 
            and innovative culinary techniques from around the world.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-none text-sm uppercase tracking-widest font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-gold to-gold-dark text-black"
                  : "bg-transparent border border-gold/30 text-gray-300 hover:border-gold hover:text-gold"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Category Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-12"
        >
          <img
            src={menuCategories.find((c) => c.id === activeCategory)?.image}
            alt={activeCategory}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {menuCategories.find((c) => c.id === activeCategory)?.name}
            </h3>
          </div>
        </motion.div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {menuItems[activeCategory]?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-background/50 border border-gold/10 rounded-lg p-6 hover:border-gold/30 transition-all duration-300 card-hover"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 img-zoom">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4
                        className="text-lg font-semibold text-white group-hover:text-gold transition-colors"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {item.name}
                      </h4>
                      <span className="text-gold font-semibold text-lg">
                        {item.price}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    {item.badge && (
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs border ${
                          badgeColors[item.badge]
                        }`}
                      >
                        <BadgeIcon badge={item.badge} />
                        {item.badge === "chefs-special"
                          ? "Chef's Special"
                          : item.badge.charAt(0).toUpperCase() + item.badge.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
