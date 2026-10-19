"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart, updateQuantity, clearCart } from "@/store/cartSlice";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const cartTotal = useAppSelector((state) => state.cart.cartTotal);
  const cartItemCount = useAppSelector((state) => state.cart.cartItemCount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-ice/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="h-8 w-48 animate-pulse rounded bg-light mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-xl bg-white border border-light" />
              ))}
            </div>
            <div className="h-64 animate-pulse rounded-xl bg-white border border-light" />
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-ice/40 flex items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-raised text-steel">
            <Sparkles className="h-10 w-10 text-brand" />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-light text-deep">Your Collection is Empty</h1>
          <p className="mt-3 text-sm text-steel leading-relaxed">
            You haven’t added any artwork pieces yet. Browse our original textures, calligraphic masterworks, and contemporary fine art pieces.
          </p>
          <div className="mt-8">
            <Link
              href="/#artwork"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-raised hover:bg-deep transition-colors"
            >
              <span>Explore Artworks</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ice/30 py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-light pb-6 gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-deep">Shopping Bag</h1>
            <p className="mt-1 text-xs uppercase tracking-wider text-steel font-medium">
              {cartItemCount} {cartItemCount === 1 ? "Artwork Selected" : "Artworks Selected"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="text-xs uppercase tracking-wider text-steel hover:text-red-500 transition-colors self-start sm:self-auto font-medium"
          >
            Clear Entire Bag
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-5 rounded-xl border border-light bg-white p-5 shadow-xs transition-colors hover:border-soft"
              >
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-ice border border-light">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-caps text-mist">
                        {item.category} {item.collection ? `• ${item.collection}` : ''}
                      </span>
                      <h2 className="mt-1 font-serif text-lg font-normal text-deep">{item.title}</h2>
                      {item.titleAr && (
                        <p lang="ar" dir="rtl" className="text-xs text-steel mt-0.5">
                          {item.titleAr}
                        </p>
                      )}
                      {(item.selectedStyle || item.selectedSize) && (
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {item.selectedStyle && (
                            <span className="inline-flex items-center rounded-md bg-ice px-2 py-0.5 text-[10px] font-medium text-deep border border-light">
                              {item.selectedStyle}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="inline-flex items-center rounded-md bg-ice px-2 py-0.5 text-[10px] font-medium text-deep border border-light">
                              {item.selectedSize}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-lg font-semibold text-deep">
                      {formatPrice(item.priceUSD * item.quantity)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-light/60 pt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center rounded-md border border-light bg-ice/40">
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
                        className="px-2.5 py-1 text-steel hover:text-deep transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono text-xs font-bold text-deep">
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
                        className="px-2.5 py-1 text-steel hover:text-deep transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="flex items-center gap-1.5 text-xs text-steel hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Studio Guarantee Banner */}
            <div className="mt-6 rounded-xl border border-light bg-ice/40 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-deep">
                      White Glove Insured Courier
                    </h3>
                    <p className="text-xs text-steel mt-0.5">
                      Museum-grade custom crating ensures your artwork arrives in immaculate condition.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-deep">
                      Certificate of Authenticity
                    </h3>
                    <p className="text-xs text-steel mt-0.5">
                      Each piece is signed by the artist and registered in the Sumaira Arts archive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-xl border border-light bg-white p-6 shadow-sm">
              <h2 className="font-serif text-xl font-light text-deep border-b border-light pb-4">
                Order Summary
              </h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-steel">
                  <span>Artworks Subtotal</span>
                  <span className="font-medium text-deep">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-steel">
                  <span>Shipping & Handling</span>
                  <span className="text-brand font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between text-steel">
                  <span>Certificate of Authenticity</span>
                  <span className="text-brand font-medium">Included</span>
                </div>
                <div className="border-t border-light pt-4 flex justify-between items-baseline">
                  <span className="font-semibold text-deep">Estimated Total</span>
                  <span className="font-serif text-2xl font-light text-brand">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-raised hover:bg-deep transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#artwork"
                  className="block w-full text-center py-2 text-xs font-medium uppercase tracking-wider text-steel hover:text-brand transition-colors"
                >
                  Continue Browsing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
