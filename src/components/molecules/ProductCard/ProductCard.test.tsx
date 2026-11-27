import { act, fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { expect, it } from "vitest";
import cart, { removeFromCart } from "@/store/cartSlice";
import { allProducts } from "@/data/products";
import type { Product } from "@/types/content";
import { ProductCard } from ".";

it("shows the current cart quantity while browsing and clears the note on removal", () => {
  const store = configureStore({ reducer: { cart } });
  const p = allProducts[0];
  const product: Product = {
    ...p,
    price: p.priceUSD,
    category: "Originals",
    art: "allah",
    scene: "living",
  };

  render(
    <Provider store={store}>
      <ProductCard product={product} index={0} />
    </Provider>
  );
  expect(screen.queryByText(/in your cart/i)).not.toBeInTheDocument();
  const add = screen.getByRole("button", { name: "Add to cart" });
  fireEvent.click(add);
  expect(screen.getByText("In your cart").parentElement).toHaveTextContent("1 In your cart");
  fireEvent.click(add);
  expect(screen.getByText("In your cart").parentElement).toHaveTextContent("2 In your cart");
  act(() => { store.dispatch(removeFromCart(product.slug)); });
  expect(screen.queryByText(/in your cart/i)).not.toBeInTheDocument();
});
