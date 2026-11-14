"use client";

import { useState } from "react";
import Image from "next/image";
import { ArtPiece } from "@/components/art/ArtPiece";
import { SmartLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice } from "@/lib/format";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { ShoppingBag, Check, Star } from "lucide-react";
import type { Product } from "@/types/content";

const sizes = "(max-width: 640px) 100vw, (min-width: 1024px) 42vw, 50vw";

export function ProductCard({
  product,
  index,
  className = "",
  disableReveal = false,
  homeCard = false,
}: {
  product: Product;
  index: number;
  className?: string;
  disableReveal?: boolean;
  /** Home carousel cards use a compact stacked footer; catalogue cards retain their original layout. */
  homeCard?: boolean;
}) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        productId: product.slug,
        slug: product.slug,
        title: product.title,
        category: product.category,
        collection: product.collection || "Curated Collection",
        priceUSD: product.price,
        image: product.image || "/assets/images/prototype/crops/artwork-surah-ikhlas.webp",
        quantity: 1,
      })
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const reviewCount = product.reviewCount ?? product.reviews ?? 0;

  const cardContent = (
    <article className="group relative flex min-h-36 h-full flex-row overflow-hidden rounded-2xl border border-light bg-white transition-all duration-300 hover:border-brand/40 hover:shadow-raised sm:flex-col">
      {/* Visual Image Container */}
      <div className="relative w-[40%] shrink-0 overflow-hidden bg-white sm:w-auto sm:aspect-[5/4] lg:aspect-[4/3]">
        {/* Main Artwork Image */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes={sizes}
              loading="lazy"
              className="object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={product.title}
              className="absolute inset-[10%] bg-white p-[3%] shadow-artwork"
            >
              <ArtPiece variant={product.art} className="h-full w-full" />
            </div>
          )}
        </div>

        {/* Top Badges */}
        <div className="absolute start-2 top-2 z-10 flex items-center gap-1.5 sm:start-3 sm:top-3">
          <span className="rounded-md bg-white/95 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-deep shadow-xs sm:px-2.5 sm:text-[10px]">
            {product.category}
          </span>
        </div>


        {/* Quick Add To Cart Button Overlay */}
        {!product.soldOut && (
          <button
            type="button"
            onClick={handleAddToCart}
            className="absolute bottom-3 inset-x-3 z-10 hidden items-center justify-center gap-2 rounded-xl bg-deep/95 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-raised opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-brand sm:flex"
          >
            {added ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className={`flex flex-1 flex-col p-3 sm:p-4 ${homeCard ? "" : "sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-5"}`}>
        <div>
          {product.rating !== undefined && reviewCount > 0 && (
            <div className="mb-2 flex items-center gap-1.5 text-xs text-steel">
              <Star aria-hidden="true" className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span aria-hidden="true">·</span>
              <span>{reviewCount} reviews</span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-serif text-sm font-semibold leading-snug tracking-tight text-deep transition-colors group-hover:text-brand line-clamp-2 sm:text-base sm:font-medium">
            <SmartLink href={`/products/${product.slug}`} className="after:absolute after:inset-0">
              {product.title}
            </SmartLink>
          </h3>


        </div>

        {/* Fixed artwork price */}
        <div className={`flex items-end justify-between border-t border-light/60 ${homeCard ? "mt-4 pt-3" : "mt-3 pt-2 sm:mt-0 sm:min-w-36 sm:border-s sm:border-t-0 sm:ps-5 sm:pt-0"}`}>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[10px] text-steel uppercase font-semibold sm:text-[11px]">Price</span>
              {product.oldPriceUSD && (
                <span className="text-xs text-steel line-through">
                  {formatPrice(product.oldPriceUSD)}
                </span>
              )}
            </div>
            <p className="font-serif text-xl font-semibold text-deep leading-none mt-0.5 sm:text-xl sm:font-medium">
              {formatPrice(product.price)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-ice text-brand hover:bg-brand hover:text-white transition-all shadow-xs"
            aria-label="Add to cart"
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </article>
  );

  if (disableReveal) {
    return <div className={className}>{cardContent}</div>;
  }

  return (
    <Reveal delay={(index % 4) * 90} className={className}>
      {cardContent}
    </Reveal>
  );
}
