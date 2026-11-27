"use client";

import { useState } from "react";
import { CartQuantityNote } from "@/components/atoms/CartQuantityNote";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { ArtPiece } from "@/components/art/ArtPiece";
import { SmartLink } from "@/components/atoms/Link";
import { Reveal } from "@/components/atoms/Reveal";
import { formatPrice } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, selectArtworkQuantity } from "@/store/cartSlice";
import { ShoppingBag, Check, Star } from "lucide-react";
import type { ProductCardProps } from "./ProductCard.types";

const sizes = "(max-width: 640px) 100vw, (min-width: 1024px) 42vw, 50vw";

export function ProductCard({
  product,
  index,
  className = "",
  disableReveal = false,
  catalogue = false,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const inCart = useAppSelector((state) => selectArtworkQuantity(state, product.slug));
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
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
    <article className={`group relative flex min-h-36 h-full overflow-hidden rounded-2xl border border-light bg-white transition-all duration-300 hover:border-brand/40 hover:shadow-raised sm:flex-col ${catalogue ? "flex-col" : "flex-row"}`}>
      {/* Visual Image Container */}
      <div className={`relative shrink-0 overflow-hidden bg-white sm:w-auto sm:aspect-[5/4] lg:aspect-[4/3] ${catalogue ? "w-full aspect-[4/3]" : "w-[40%]"}`}>
        {/* Main Artwork Image */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          {product.image ? (
            <SkeletonImage
              src={product.image}
              alt={product.title}
              fill
              sizes={catalogue ? "(min-width: 1024px) 25vw, 50vw" : sizes}
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

        {inCart > 0 && (
          <div className="pointer-events-none absolute end-2 top-2 z-10 rounded-full shadow-xs sm:end-3 sm:top-3">
            <CartQuantityNote quantity={inCart} />
          </div>
        )}


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

      <div className="@container min-w-0 flex-1 px-2.5 py-2 sm:px-4 sm:py-3">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-1.5 gap-y-0.5">
        <div className="col-span-2 mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-steel">
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            {product.category}
          </span>
          {product.rating !== undefined && (
            <span className="inline-flex items-center gap-1 whitespace-nowrap text-[11px] tabular-nums sm:text-xs">
              <Star aria-hidden="true" className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="sr-only">Rating:</span>
              {product.rating.toFixed(1)}
              {reviewCount > 0 && <span>({reviewCount}<span className="sr-only"> reviews</span>)</span>}
            </span>
          )}
        </div>

        <h3 className="col-span-2 min-w-0 truncate text-[13px] font-semibold leading-[1.4] text-deep group-hover:text-brand @[13rem]:col-span-1 sm:text-base">
          <SmartLink href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.title}
          </SmartLink>
        </h3>

          <div className="col-start-1 flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-0.5 tabular-nums">
            <span className="text-[15px] font-semibold leading-tight text-deep sm:text-lg">
              <span className="sr-only">Price: </span>{formatPrice(product.price)}
            </span>
            {product.oldPriceUSD != null && product.oldPriceUSD > product.price && (
              <del className="text-[11px] text-red-700 sm:text-xs">
                <span className="sr-only">Previous price: </span>{formatPrice(product.oldPriceUSD)}
              </del>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="relative z-10 col-start-2 flex h-11 w-11 items-center justify-center rounded-lg bg-ice text-brand transition-colors hover:bg-brand hover:text-white disabled:opacity-50 @[13rem]:row-span-2 @[13rem]:row-start-2"
            disabled={product.soldOut}
            aria-label={catalogue ? `Add ${product.title} to cart` : "Add to cart"}
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
