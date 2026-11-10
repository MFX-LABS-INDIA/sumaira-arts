"use client";

import { useSyncExternalStore } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SmartLink } from "@/components/ui/Link";
import { ProductCard } from "@/components/common/ProductCard";
import { products } from "@/data/products";
import { getWishlist, saveWishlist, subscribeToWishlist } from "@/lib/wishlist";

export default function WishlistPage() {
  const wishlist = useSyncExternalStore(subscribeToWishlist, getWishlist, () => []);
  const savedArtworks = products.filter((product) => wishlist.includes(product.slug));

  return (
    <div className="min-h-screen bg-ice/30 py-10 sm:py-16">
      <Container>
        <div className="flex flex-col gap-5 border-b border-light pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-label font-medium uppercase tracking-caps text-brand">Your collection</p>
            <h1 className="mt-3 font-serif text-3xl font-light tracking-tight text-deep sm:text-5xl">Saved Artworks</h1>
            <p className="mt-3 text-sm text-steel">{savedArtworks.length} {savedArtworks.length === 1 ? "artwork" : "artworks"} saved for later.</p>
          </div>
          {savedArtworks.length > 0 ? <button type="button" onClick={() => saveWishlist([])} className="text-xs font-semibold uppercase tracking-wider text-steel transition-colors hover:text-brand">Clear wishlist</button> : null}
        </div>

        {savedArtworks.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savedArtworks.map((product, index) => <ProductCard key={product.slug} product={product} index={index} homeCard />)}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-light bg-white px-6 py-20 text-center shadow-xs">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ice text-brand"><Heart className="h-7 w-7" /></span>
            <h2 className="mt-5 font-serif text-2xl font-light text-deep">Your wishlist is waiting</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-steel">Save artworks you love with the heart icon, then return here when you are ready to compare or add them to your bag.</p>
            <SmartLink href="/products" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-deep">Explore artworks <ArrowRight className="h-4 w-4" /></SmartLink>
          </div>
        )}
      </Container>
    </div>
  );
}
