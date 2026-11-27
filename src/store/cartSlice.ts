import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types/store";

const CART_STORAGE_KEY = "sumaira-arts-cart";

interface CartState {
  cart: CartItem[];
  cartItemCount: number;
  cartTotal: number;
  isOpen: boolean; // For slide-over quick cart drawer
  isHydrated: boolean;
}

const initialState: CartState = {
  cart: [],
  cartItemCount: 0,
  cartTotal: 0,
  isOpen: false,
  isHydrated: false,
};

export function selectArtworkQuantity(state: { cart: CartState }, slug: string) {
  return state.cart.cart.reduce((sum, item) => sum + (item.slug === slug ? item.quantity : 0), 0);
}

const calculateMetrics = (items: CartItem[]) => {
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);
  return { cartItemCount, cartTotal };
};

type CartSelection = Omit<CartItem, "id" | "productId">;

function mergeSelection(items: CartItem[], selection: CartSelection) {
  const { slug, selectedSize, selectedStyle, selectedFrame, quantity } = selection;
  if (!slug || !Number.isSafeInteger(quantity) || quantity < 1) return;

  // Older carts may contain editions. Give each real selection its own editable row.
  const id = selectedSize || selectedStyle || selectedFrame
    ? JSON.stringify([slug, selectedSize || "", selectedStyle || "", selectedFrame || ""])
    : slug;
  const existing = items.find((item) => item.id === id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ ...selection, id, productId: slug });
  }
}

const saveToLocalStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore localStorage quota error
    }
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state) => {
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem(CART_STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              const restored: CartItem[] = [];
              for (const item of parsed) {
                if (item && typeof item.slug === "string" && Number.isFinite(item.priceUSD)) {
                  mergeSelection(restored, item);
                }
              }
              state.cart = restored;
              const { cartItemCount, cartTotal } = calculateMetrics(restored);
              state.cartItemCount = cartItemCount;
              state.cartTotal = cartTotal;
              saveToLocalStorage(restored);
            }
          }
        } catch {
          // fallback
        }
      }
      state.isHydrated = true;
    },
    addToCart: (state, action: PayloadAction<CartSelection>) => {
      mergeSelection(state.cart, action.payload);
      const { cartItemCount, cartTotal } = calculateMetrics(state.cart);
      state.cartItemCount = cartItemCount;
      state.cartTotal = cartTotal;
      saveToLocalStorage(state.cart);
      state.isOpen = true; // Auto open cart drawer on add
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const targetId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== targetId);
      const { cartItemCount, cartTotal } = calculateMetrics(state.cart);
      state.cartItemCount = cartItemCount;
      state.cartTotal = cartTotal;
      saveToLocalStorage(state.cart);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      if (!Number.isSafeInteger(quantity)) return;
      if (quantity <= 0) {
        state.cart = state.cart.filter((item) => item.id !== id);
      } else {
        const target = state.cart.find((item) => item.id === id);
        if (target) {
          target.quantity = quantity;
        }
      }
      const { cartItemCount, cartTotal } = calculateMetrics(state.cart);
      state.cartItemCount = cartItemCount;
      state.cartTotal = cartTotal;
      saveToLocalStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartItemCount = 0;
      state.cartTotal = 0;
      saveToLocalStorage([]);
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartOpen,
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
