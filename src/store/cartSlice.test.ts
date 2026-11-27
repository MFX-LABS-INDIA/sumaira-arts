import { afterEach, expect, it } from "vitest";
import { allProducts } from "@/data/products";
import reducer, { addToCart, hydrateCart, removeFromCart, updateQuantity } from "./cartSlice";

const storageKey = "sumaira-arts-cart";
afterEach(() => localStorage.removeItem(storageKey));

it("restores both legacy Bliss rows as two copies, then edits and removes the merged line", () => {
  const bliss = allProducts.find((product) => product.title === "Bliss")!;
  const selection = { ...bliss, quantity: 1 };
  const oldRows = [bliss.slug, bliss.id].map((id) => ({ ...selection, productId: id, id }));
  localStorage.setItem(storageKey, JSON.stringify(oldRows));

  let state = reducer(undefined, hydrateCart());
  expect(state.cart).toHaveLength(1);
  expect(state.cart[0]).toMatchObject({ id: bliss.slug, productId: bliss.slug, quantity: 2 });
  expect(state.cartTotal).toBe(2 * bliss.priceUSD);
  expect(state.cartItemCount).toBe(2);
  expect(reducer(undefined, hydrateCart()).cart).toEqual(state.cart);

  state = reducer(state, addToCart(selection));
  expect(state.cart[0].quantity).toBe(3);
  state = reducer(state, updateQuantity({ id: bliss.slug, quantity: 1 }));
  expect(state.cartTotal).toBe(bliss.priceUSD);
  state = reducer(state, removeFromCart(bliss.slug));
  expect(state).toMatchObject({ cart: [], cartTotal: 0, cartItemCount: 0 });
});

it("keeps a separate line per catalogue artwork when every artwork is added twice", () => {
  let state = reducer(undefined, { type: "init" });
  for (const product of allProducts) {
    const selection = { ...product, quantity: 1 };
    state = reducer(state, addToCart(selection));
    state = reducer(state, addToCart(selection));
  }
  expect(state.cart).toHaveLength(allProducts.length);
  expect(state.cart.every((item) => item.quantity === 2)).toBe(true);
  expect(state.cartItemCount).toBe(2 * allProducts.length);
  expect(state.cartTotal).toBe(allProducts.reduce((sum, p) => sum + 2 * p.priceUSD, 0));
});
