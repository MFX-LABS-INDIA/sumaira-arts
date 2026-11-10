"use client";

import { useSyncExternalStore } from "react";
import { HeartIcon } from "@/components/ui/Icons";
import { getWishlist, saveWishlist, subscribeToWishlist } from "@/lib/wishlist";

export function WishlistButton({ title, productSlug, className = "" }: { title: string; productSlug: string; className?: string }) {
  const wishlist = useSyncExternalStore(subscribeToWishlist, getWishlist, () => []);
  const saved = wishlist.includes(productSlug);
  const toggle = () => {
    saveWishlist(saved ? wishlist.filter((slug) => slug !== productSlug) : [...wishlist, productSlug]);
  };
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`${saved ? "Remove" : "Save"} ${title} ${saved ? "from" : "to"} wishlist`}
      onClick={toggle}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-deep backdrop-blur-sm transition-colors hover:text-brand ${className}`}
    >
      <HeartIcon className={`h-5 w-5 ${saved ? "fill-brand text-brand" : ""}`} />
    </button>
  );
}
