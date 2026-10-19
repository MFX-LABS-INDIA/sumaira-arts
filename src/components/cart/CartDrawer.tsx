"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCartOpen, removeFromCart, updateQuantity } from "@/store/cartSlice";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.cart.isOpen);
  const cart = useAppSelector((state) => state.cart.cart);
  const cartTotal = useAppSelector((state) => state.cart.cartTotal);
  const cartItemCount = useAppSelector((state) => state.cart.cartItemCount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => dispatch(setCartOpen(false))}
        className={`fixed inset-0 z-50 bg-deep/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 pointer-events-none invisible"
        }`}
      />

      {/* Slide-over Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-raised transition-transform duration-300 ease-out-soft ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping Cart Drawer"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-light px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand" />
            <h2 className="text-base font-semibold uppercase tracking-wider text-deep">
              Your Cart ({cartItemCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dispatch(setCartOpen(false))}
            className="rounded-full p-2 text-steel transition-colors hover:bg-ice hover:text-deep"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ice text-mist">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-base font-medium text-deep">Your cart is empty</h3>
              <p className="mt-1 text-xs text-steel">
                Explore our curated collections and bring sacred elegance to your space.
              </p>
              <button
                type="button"
                onClick={() => dispatch(setCartOpen(false))}
                className="mt-6 rounded-lg bg-brand px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-deep"
              >
                Browse Artworks
              </button>
            </div>
          ) : (
            <div className="divide-y divide-light">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-light bg-ice">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-deep leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-steel hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-micro font-medium uppercase tracking-caps text-mist">
                        {item.category}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded border border-light bg-ice/60">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: Math.max(1, item.quantity - 1),
                              })
                            )
                          }
                          className="p-1 text-steel hover:text-deep"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs font-semibold text-deep">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          className="p-1 text-steel hover:text-deep"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="font-semibold text-sm text-deep">
                        {formatPrice(item.priceUSD * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="border-t border-light bg-ice/30 p-6">
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-xs text-steel">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-deep">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <Link
                href="/checkout"
                onClick={() => dispatch(setCartOpen(false))}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-raised transition-colors hover:bg-deep"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cart"
                onClick={() => dispatch(setCartOpen(false))}
                className="block w-full rounded-lg border border-light bg-white py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-deep transition-colors hover:bg-ice"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
