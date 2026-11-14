export interface ProductStyleOption {
  label: string;
  priceModifier: number; // added to base price
}

export interface ProductSizeOption {
  label: string;
  priceModifier: number; // added to base price
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: "Mixed_Media_Canvas" | "Original_Texture" | "Collections" | string;
  collection?: string;
  priceUSD: number;
  oldPriceUSD?: number;
  rating?: number;
  reviews?: number;
  booked?: string;
  isFeatured?: boolean;
  isMostFav?: boolean;
  isMostLoved?: boolean;
  inStock?: boolean;
  dimensions?: string;
  medium?: string;
  frame?: string;
  description: string;
  image: string;
  sceneImage?: string;
  gallery?: string[];
  artVariant?: string;
  scene?: string;
  features?: string[];
  styles?: ProductStyleOption[];
  sizes?: ProductSizeOption[];
}

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  title: string;
  category: string;
  collection?: string;
  priceUSD: number;
  oldPriceUSD?: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedStyle?: string;
  selectedFrame?: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  currency: string;
  orderDate: string;
  status: "pending" | "confirmed" | "shipped" | "cancelled";
}
