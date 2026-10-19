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

const calculateMetrics = (items: CartItem[]) => {
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);
  return { cartItemCount, cartTotal };
};

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
              state.cart = parsed;
              const { cartItemCount, cartTotal } = calculateMetrics(parsed);
              state.cartItemCount = cartItemCount;
              state.cartTotal = cartTotal;
            }
          }
        } catch {
          // fallback
        }
      }
      state.isHydrated = true;
    },
    addToCart: (state, action: PayloadAction<Omit<CartItem, "id"> & { id?: string }>) => {
      const incoming = action.payload;
      const baseId = incoming.id || incoming.productId;
      const quantityToAdd = incoming.quantity && incoming.quantity > 0 ? incoming.quantity : 1;

      const existingIndex = state.cart.findIndex(
        (item) =>
          item.productId === incoming.productId &&
          item.selectedSize === incoming.selectedSize &&
          item.selectedStyle === incoming.selectedStyle
      );

      if (existingIndex !== -1) {
        state.cart[existingIndex].quantity += quantityToAdd;
      } else {
        const newItem: CartItem = {
          ...incoming,
          id: baseId,
          quantity: quantityToAdd,
        };
        state.cart.push(newItem);
      }

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
