"use client";

import { useState } from "react";
import { HeartIcon } from "@/components/ui/Icons";

/** Heart toggle. State is local for now; persist it once accounts or a wishlist exist. */
export function WishlistButton({ title, className = "" }: { title: string; className?: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`${saved ? "Remove" : "Save"} ${title} ${saved ? "from" : "to"} wishlist`}
      onClick={() => setSaved((value) => !value)}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-deep backdrop-blur-sm transition-colors hover:text-brand ${className}`}
    >
      <HeartIcon className={`h-5 w-5 ${saved ? "fill-brand text-brand" : ""}`} />
    </button>
  );
}
