"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PizzaSlice as BurgerIcon,
  CoffeeCup,
  Leaf,
  FireFlame as Flame,
  ShoppingBag,
  NavArrowRight,
  Plus,
  Check,
} from "iconoir-react";
import { useCart } from "@/components/cart/CartProvider";

// Helper to generate a slug from a name
const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Extend items with slug
const categories = [
  { id: "beef", label: "Beef Burger", icon: BurgerIcon },
  { id: "chicken", label: "Chicken Burger", icon: Flame },
  { id: "veggie", label: "Veggie", icon: Leaf },
  { id: "drinks", label: "Drinks", icon: CoffeeCup },
];

const menuItems = {
  beef: [
    {
      name: "Cheesy Buffalo",
      price: "10,50€",
      description:
        "Brioche bun, homemade 140g beef patty, cheese, burger sauce, cucumber, onion, tomatoes, lettuce",
      spiceLevel: 3,
      image: "/burgers/beef/Cheesy-Buffalo_10,50euros.webp",
    },
    {
      name: "Angry Bull",
      price: "12,00€",
      description:
        "Brioche bun, homemade 140g beef patty, cheese, chili cheese sauce, jalapeno, cucumber, onion, lettuce",
      spiceLevel: 3,
      image: "/burgers/beef/Angry-Bull_12euros.webp",
    },
    {
      name: "Smokie Beefy BBQ",
      price: "13,00€",
      description:
        "Brioche bun, homemade 140g beef patty, cheese, burger sauce, cucumber, onion rings, crispy onions, BBQ sauce, tomatoes, lettuce",
      spiceLevel: 3,
      image: "/burgers/beef/Smookie-Beefy-BBQ_13euros.webp",
    },
    {
      name: "Blazing Nacho Beef",
      price: "13,00€",
      description:
        "Brioche bun, homemade 140g beef patty, cheese, burger sauce, cucumber, jalapeno, nachos, sriracha sauce, tomatoes, lettuce",
      spiceLevel: 3,
      image: "/burgers/beef/Blazing-Nacho-Beef_13euros.webp",
    },
    {
      name: "Cheese Burger",
      price: "7,00€",
      description:
        "Brioche bun, homemade 140g beef patty, cheese, burger sauce, cucumber, onion, tomatoes, lettuce",
      spiceLevel: 1,
      image: "/burgers/beef/Cheese-Burger_7euros.webp",
    },
  ],
  chicken: [
    {
      name: "Crunchy Chicken",
      price: "8,50€",
      description: "Brioche bun, chicken strips, cheese, burger sauce, lettuce",
      spiceLevel: 2,
      image: "/burgers/chicken/Chrunchy-Chicken_8,50euros.webp",
    },
    {
      name: "Loaded Crunchy",
      price: "9,00€",
      description:
        "Brioche bun, chicken strips, cheese, burger sauce, tomatoes, onion, cucumber, lettuce",
      spiceLevel: 2,
      image: "/burgers/chicken/Loaded-Chrunchy_9euros.webp",
    },
    {
      name: "Crispy Ringer",
      price: "10,00€",
      description:
        "Brioche bun, chicken strips, cheese, burger sauce, onion rings, onion, tomatoes, lettuce",
      spiceLevel: 2,
      image: "/burgers/chicken/Crispy-Ringer_10euros.webp",
    },
    {
      name: "Mexican Cracker",
      price: "11,00€",
      description:
        "Brioche bun, chicken strips, cheese, burger sauce, jalapeno, cucumber, nachos, sriracha sauce, onion, lettuce",
      spiceLevel: 2,
      image: "/burgers/chicken/Mexican-Cracker_11euros.webp",
    },
    {
      name: "Flip Chicken Burger",
      price: "6,00€",
      description: "Brioche bun, chicken strips, cheese, burger sauce, lettuce",
      spiceLevel: 1,
      image: "/burgers/chicken/Flip-Chicken-Burger_6euros.webp",
    },
    {
      name: "Foodie Bomber",
      price: "13,00€",
      description:
        "Brioche bun, chicken strips, cheese, chili cheese nuggets, chili cheese sauce, onion, jalapeno, lettuce",
      spiceLevel: 2,
      image: "/burgers/chicken/Foodie-Bomber-13euros.webp",
    },
  ],
  veggie: [
    {
      name: "Plant Power",
      price: "9,00€",
      description:
        "Brioche bun, falafel, cheese, burger sauce, cucumber, lettuce, onion, tomatoes",
      spiceLevel: 0,
      image: "",
    },
    {
      name: "Veggie BBQ",
      price: "11,00€",
      description:
        "Brioche bun, falafel, cheese, burger sauce, cucumber, onion rings, crispy onions, BBQ sauce, tomatoes, lettuce",
      spiceLevel: 0,
      image: "",
    },
  ],
  drinks: [
    {
      name: "Coca Cola",
      price: "2,50€",
      description: "330ml Dose",
      image: "/graphics/cold drinks sprite cola fanta.svg",
    },
    {
      name: "Coca Cola Zero",
      price: "2,50€",
      description: "330ml Dose",
      image: "/graphics/cold drinks sprite cola fanta.svg",
    },
    {
      name: "Fanta",
      price: "2,50€",
      description: "330ml Dose",
      image: "/graphics/cold drinks sprite cola fanta.svg",
    },
    {
      name: "Sprite",
      price: "2,50€",
      description: "330ml Dose",
      image: "/graphics/cold drinks sprite cola fanta.svg",
    },
    {
      name: "Capri Sonne",
      price: "1,50€",
      description: "200ml",
      image: "/graphics/caprisun.svg",
    },
    {
      name: "Wasser",
      price: "2,00€",
      description: "500ml",
      image: "/graphics/water.svg",
    },
    {
      name: "Mezzo Mix",
      price: "2,50€",
      description: "330ml Dose",
      image: "/graphics/cold drinks sprite cola fanta.svg",
    },
    {
      name: "Red Bull",
      price: "3,50€",
      description: "250ml Dose",
      image: "/graphics/redbull.svg",
    },
  ],
};

const appetizers = [
  {
    name: "Chili Cheese Nuggets",
    image: "/Appetizers/Chilli-Cheese-Nuggets.webp",
    prices: "6 pcs €5 • 10 pcs €7.50 • 16 pcs €11",
  },
  {
    name: "Mozzarella Sticks",
    image: "/Appetizers/Mozarella-Sticks.webp",
    prices: "4 pcs €5 • 8 pcs €9 • 14 pcs €14",
  },
  {
    name: "Onion Rings",
    image: "/Appetizers/Onion-Rings.webp",
    prices: "6 pcs €4 • 12 pcs €7 • 24 pcs €12",
  },
  {
    name: "Fries",
    image: "/Appetizers/Pommes_3,5euros.webp",
    prices: "€3.50",
    featured: true,
  },
];

const friedChicken = [
  {
    name: "Chicken Wings",
    image: "/Fried-Chicken/Chicken-Wings.webp",
    prices: "6 pcs €7.50 • 10 pcs €11 • 20 pcs €20",
  },
  {
    name: "Chicken Strips",
    image: "/Fried-Chicken/Chicken-Stripes.webp",
    prices: "3 pcs €6 • 6 pcs €11.50 • 9 pcs €16",
  },
];

const dips = [
  { name: "Mayo", price: "0,50€" },
  { name: "Ketchup", price: "0,50€" },
  { name: "Garlic Flip", price: "1,00€" },
  { name: "Blazing BBQ", price: "1,00€" },
  { name: "Super Curry", price: "1,00€" },
  { name: "Dragon's Flame", price: "1,00€" },
  { name: "Smokie Volcano", price: "1,00€" },
  { name: "Sweet Chili Magic", price: "1,00€" },
  { name: "Tangy Chili Cheese", price: "1,00€" },
  { name: "Foodie Burger Sauce", price: "1,00€" },
];

// Parse price strings like "10,50€" or "€4.50" → number
function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[€\s]/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("beef");
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});
  const { addItem } = useCart();

  const flashAdded = (key: string) => {
    setAddedMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [key]: false })), 1500);
  };

  const handleAddToCart = (
    e: React.MouseEvent,
    item: { name: string; price: string; image?: string; description?: string },
    slug: string,
    category: "beef" | "chicken" | "veggie" | "drink" | "appetizer" | "fried-chicken" | "dip"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productSlug: slug,
      name: item.name,
      image: item.image || "",
      category,
      basePrice: parsePrice(item.price),
      quantity: 1,
      selectedOptions: [],
    });
    flashAdded(slug);
  };

  const SpiceIndicator = ({ level }: { level: number }) => {
    if (level === 0) return null;
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: level }).map((_, i) => (
          <Flame key={i} className="w-3 h-3 text-red-500" />
        ))}
      </div>
    );
  };

  return (
    <section
      id="menu"
      className="relative py-12 md:py-20 lg:py-24 overflow-hidden bg-black"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <p className="text-primary font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1.5">
            Our Menu
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Crafted Fresh Every Day
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Fresh ingredients. Premium beef. Authentic street food.
          </p>
        </div>

        {/* Deal Banner */}
        <div className="max-w-3xl mx-auto mb-10 md:mb-16 lg:mb-20">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-amber-400 to-primary rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
              <div className="flex flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="bg-primary/20 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-primary font-bold tracking-widest uppercase">
                      Most Popular
                    </p>
                    <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black text-white truncate">
                      Burger Combo
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 hidden sm:block">
                      Burger + Fries + Drink
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary">
                    €4.50
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/40">
                    incl. tax
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="relative mb-10 md:mb-14 lg:mb-16">
          <div className="flex overflow-x-auto gap-2 pb-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center md:gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    relative flex-shrink-0 snap-start flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300
                    ${
                      isActive
                        ? "bg-primary text-black shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-105"
                        : "bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                  {isActive && (
                    <span className="absolute -inset-0.5 rounded-full bg-primary/20 blur-md -z-10" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-16 md:mb-20 lg:mb-24">
          {menuItems[activeCategory as keyof typeof menuItems].map(
            (item, index) => {
              const slug = generateSlug(item.name);

              // Drinks – horizontal compact cards
              if (activeCategory === "drinks") {
                const isAdded = addedMap[slug];
                return (
                  <Link
                    key={index}
                    href={`/menu/${slug}`}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      {item.image && (
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                            sizes="64px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm sm:text-base truncate group-hover:text-primary transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs text-white/40 truncate">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <p className="font-black text-primary text-sm sm:text-base">
                          {item.price}
                        </p>
                        <button
                          onClick={(e) => handleAddToCart(e, item, slug, "drink")}
                          aria-label={`Add ${item.name} to cart`}
                          className={`
                            flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs transition-all duration-300 flex-shrink-0
                            ${isAdded
                              ? "bg-green-500 text-white scale-110"
                              : "bg-primary text-black hover:scale-110 hover:shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                            }
                          `}
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              }

              // Burgers & Veggie – horizontal on mobile, vertical on larger screens
              const isAdded = addedMap[slug];
              const category = activeCategory as "beef" | "chicken" | "veggie";
              return (
                <Link
                  key={index}
                  href={`/menu/${slug}`}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 flex flex-row md:flex-col"
                >
                  {/* Image Container */}
                  <div className="relative w-2/5 md:w-full aspect-square md:aspect-square overflow-hidden bg-black/40 flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2 md:p-4 group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 40vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">
                        <BurgerIcon className="w-12 h-12 md:w-20 md:h-20" />
                      </div>
                    )}
                    {/* Halal badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <div className="relative h-6 w-6 md:h-8 md:w-8">
                        <Image
                          src="/graphics/halal logo.svg"
                          alt="100% Halal"
                          fill
                          className="object-contain"
                          sizes="32px"
                        />
                      </div>
                    </div>
                    {/* Spice indicator */}
                    {"spiceLevel" in item && item.spiceLevel !== undefined && (
                      <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                        <SpiceIndicator level={item.spiceLevel} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-3 md:p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="text-sm sm:text-base md:text-xl font-black text-white leading-tight group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg font-black text-primary whitespace-nowrap">
                          {item.price}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-white/50 line-clamp-2 leading-relaxed mt-0.5 md:mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2 md:mt-3">
                      <div className="flex items-center gap-2">
                        {"spiceLevel" in item && item.spiceLevel > 0 && (
                          <span className="text-[10px] md:text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">
                            Spicy
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, item, slug, category)}
                        aria-label={`Add ${item.name} to cart`}
                        className={`
                          flex items-center gap-1 px-2.5 py-1.5 md:px-3 md:py-2 rounded-full font-bold text-[10px] md:text-xs transition-all duration-300
                          ${isAdded
                            ? "bg-green-500 text-white scale-105"
                            : "bg-primary text-black hover:scale-105 hover:shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                          }
                        `}
                      >
                        {isAdded ? (
                          <><Check className="w-3 h-3" /><span className="hidden sm:inline">Added!</span></>
                        ) : (
                          <><Plus className="w-3 h-3" /><span className="hidden sm:inline">Add to Cart</span></>
                        )}
                      </button>
                    </div>
                  </div>
                </Link>
              );
            },
          )}
        </div>

        {/* Appetizers */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center mb-8 md:mb-12 tracking-tight">
            Appetizers &amp; Sides
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
            {appetizers.map((item) => {
              const slug = generateSlug(item.name);
              return (
                <Link
                  key={item.name}
                  href={`/menu/${slug}`}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className="relative aspect-square overflow-hidden bg-black/30">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2 md:p-4 group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute bottom-1 left-1 z-10">
                      <div className="relative h-6 w-6 md:h-8 md:w-8">
                        <Image
                          src="/graphics/halal logo.svg"
                          alt="100% Halal"
                          fill
                          className="object-contain"
                          sizes="32px"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-2 md:p-4 text-center">
                    <h4 className="font-bold text-white text-xs sm:text-sm md:text-lg group-hover:text-primary transition-colors truncate">
                      {item.name}
                    </h4>
                    <p
                      className={`font-bold ${
                        item.featured
                          ? "text-base sm:text-xl md:text-2xl text-primary"
                          : "text-xs sm:text-sm text-primary/80"
                      }`}
                    >
                      {item.prices}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Fried Chicken */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center mb-8 md:mb-12 tracking-tight">
            Fried Chicken
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
            {friedChicken.map((item) => {
              const slug = generateSlug(item.name);
              return (
                <Link
                  key={item.name}
                  href={`/menu/${slug}`}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden bg-black/30">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2 md:p-4 group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-1 left-1 z-10">
                      <div className="relative h-8 w-8 md:h-10 md:w-10">
                        <Image
                          src="/graphics/halal logo.svg"
                          alt="100% Halal"
                          fill
                          className="object-contain"
                          sizes="40px"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 md:p-5 text-center">
                    <h4 className="text-base sm:text-xl md:text-2xl font-black text-white group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm sm:text-base md:text-lg text-primary font-bold">
                      {item.prices}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sauces & Dips */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center mb-8 md:mb-12 tracking-tight">
            Sauces &amp; Dips
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
            {dips.map((dip) => {
              const slug = generateSlug(dip.name);
              return (
                <Link
                  key={dip.name}
                  href={`/menu/${slug}`}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2 md:p-3 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative w-10 h-10 md:w-12 md:h-12 mx-auto mb-1">
                    <Image
                      src="/graphics/dips.svg"
                      alt={dip.name}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                  <p className="font-bold text-white text-[10px] sm:text-xs md:text-sm group-hover:text-primary transition-colors truncate">
                    {dip.name}
                  </p>
                  <p className="font-black text-primary text-xs sm:text-sm md:text-base">
                    {dip.price}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
