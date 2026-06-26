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
  category: "beef" | "chicken" | "veggie" | "drink" | "appetizer" | "fried-chicken" | "dip";
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

// Cart types
export interface SelectedOption {
  name: string
  price: number
}

export interface CartItem {
  // unique id for cart entry (could be product slug + options hash)
  id: string
  productSlug: string
  name: string
  image?: string
  category: MenuItem['category']
  basePrice: number
  quantity: number
  selectedOptions?: SelectedOption[]
  notes?: string
  // timestamp when added to cart
  addedAt: string
}

export interface Coupon {
  code: string
  amount: number // fixed amount discount (euros)
  percent?: number // optional percent discount (0-100)
}

export type DeliveryMethod = "delivery" | "pickup"

export interface OrderRequest {
  customerName: string
  phone: string
  email?: string
  deliveryMethod: DeliveryMethod
  address?: string
  city?: string
  postalCode?: string
  paymentMethod: "cash" | "card" | "apple_pay" | "google_pay"
  notes?: string
  cart: CartItem[]
  subtotal: number
  taxes: number
  deliveryFee: number
  discount: number
  total: number
}

export interface OrderResponse {
  orderId: string
  status: "created"
  message: string
}

export interface CartState {
  items: CartItem[]
  coupon?: Coupon | null
  deliveryFee: number
  taxRate: number // e.g. 0.07 for 7%
}
