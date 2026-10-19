"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { hydrateCart } from "@/store/cartSlice";

function HydrateCart() {
  useEffect(() => {
    store.dispatch(hydrateCart());
  }, []);
  return null;
}

export function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <HydrateCart />
      {children}
    </Provider>
  );
}
