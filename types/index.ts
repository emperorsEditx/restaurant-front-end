// types/index.ts
export interface Ingredient {
  name: string;
  icon?: string; // optional emoji or image
}

export interface Nutrition {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  allergens?: string[];
}

export interface MenuItem {
  slug: string;
  name: string;
  category: "beef" | "chicken" | "veggie" | "drink";
  price: number;
  description: string;
  spiceLevel: 0 | 1 | 2 | 3;
  image: string; // main image
  gallery?: string[]; // additional images
  ingredients: Ingredient[];
  nutrition: Nutrition;
  preparationTime?: number; // minutes
  rating?: number; // 0-5
  bestseller?: boolean;
  chefRecommendation?: boolean;
  halal: true;
  customizationOptions?: {
    extras: { name: string; price: number }[];
    removals: string[];
  };
  relatedSlugs?: string[];
}
