// lib/menu-data.ts
import { MenuItem } from "@/types";

export const menuItems: MenuItem[] = [
  {
    slug: "cheesy-buffalo",
    name: "Cheesy Buffalo",
    category: "beef",
    price: 10.5,
    description:
      "Brioche bun, homemade 140g beef patty, cheese, burger sauce, cucumber, onion, tomatoes, lettuce",
    spiceLevel: 3,
    image: "/burgers/beef/Cheesy-Buffalo_10,50euros.webp",
    gallery: [
      "/burgers/beef/Cheesy-Buffalo_10,50euros.webp",
      "/burgers/beef/cheesy-buffalo-closeup.webp", // mock
      "/burgers/beef/cheesy-buffalo-cross.webp", // mock
    ],
    ingredients: [
      { name: "Beef Patty" },
      { name: "Brioche Bun" },
      { name: "Cheddar Cheese" },
      { name: "Burger Sauce" },
      { name: "Cucumber" },
      { name: "Onion" },
      { name: "Tomatoes" },
      { name: "Lettuce" },
    ],
    nutrition: {
      calories: 650,
      protein: 32,
      fat: 38,
      carbs: 48,
      allergens: ["Gluten", "Dairy"],
    },
    preparationTime: 12,
    rating: 4.8,
    bestseller: true,
    chefRecommendation: true,
    halal: true,
    customizationOptions: {
      extras: [
        { name: "Extra Cheese", price: 1.5 },
        { name: "Extra Patty", price: 3.0 },
        { name: "Extra Sauce", price: 0.5 },
      ],
      removals: ["Onion", "Tomato", "Cucumber", "Lettuce"],
    },
    relatedSlugs: ["angry-bull", "smokie-beefy-bbq", "loaded-crunchy"],
  },
  // Add all other items...
];

// Helper to get all slugs
export function getAllSlugs() {
  return menuItems.map((item) => item.slug);
}

// Helper to get item by slug
export function getItemBySlug(slug: string): MenuItem | undefined {
  return menuItems.find((item) => item.slug === slug);
}

// Helper for related items
export function getRelatedItems(slugs: string[]): MenuItem[] {
  return menuItems.filter((item) => slugs.includes(item.slug));
}
