"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ProductImageCarousel } from "@/components/products/ProductImageCarousel";
import {
  ShoppingBag,
  Check,
  ChevronRight,
  Maximize2,
  Palette,
  Frame,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { formatPrice } from "@/lib/format";
import { formatCategoryLabel } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/StarRating";
import { ProductCard } from "@/components/common/ProductCard";
import { products } from "@/data/products";
import type { Product as StoreProduct } from "@/types/store";

function ArtworkDetails({ product }: { product: StoreProduct }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-light bg-white shadow-xs">
      <div className="p-4 sm:p-8">
        <h2 className="text-lg font-semibold tracking-tight text-deep sm:text-2xl">About this artwork</h2>
        <p className="mt-3 sm:mt-5 max-w-prose whitespace-pre-line text-xs sm:text-base font-normal leading-relaxed sm:leading-8 text-deep">{product.description}</p>
      </div>

      {(product.dimensions || product.medium || product.frame) && (
        <div className="border-t border-light bg-ice/30 px-4 py-4 sm:px-8 sm:py-6">
          <h3 className="text-sm sm:text-base font-semibold text-deep">Artwork details</h3>
          <dl className="mt-3 sm:mt-4 divide-y divide-light">
            {product.dimensions && (
              <DetailSpec icon={<Maximize2 className="h-4 w-4 text-brand" />} label="Dimensions" value={product.dimensions} />
            )}
            {product.medium && (
              <DetailSpec icon={<Palette className="h-4 w-4 text-brand" />} label="Medium" value={product.medium} />
            )}
            {product.frame && (
              <DetailSpec icon={<Frame className="h-4 w-4 text-brand" />} label="Framing" value={product.frame} />
            )}
          </dl>
        </div>
      )}

      {product.features && product.features.length > 0 && (
        <div className="border-t border-light p-4 sm:p-8">
          <h3 className="text-sm sm:text-base font-semibold text-deep">Artwork highlights</h3>
          <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-base leading-relaxed sm:leading-7 text-deep">
                <span className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-ice text-brand" aria-hidden="true"><Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function DetailSpec({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5">
      <dt className="flex items-center gap-2 self-start text-sm font-medium leading-7 text-steel">
        <span className="shrink-0" aria-hidden="true">{icon}</span>
        {label}
      </dt>
      <dd className="min-w-0 break-words text-base font-medium leading-7 text-deep">{value}</dd>
    </div>
  );
}

export function ProductDetailsClient({ product }: { product: StoreProduct }) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const images = [
    product.image,
    ...(product.gallery || []).filter((image) => image !== product.image),
  ];

  const relatedProducts = products
    .filter(
      (candidate) =>
        candidate.slug !== product.slug && candidate.categoryRaw === product.category
    )
    .slice(0, 3);

  const handleAdd = () => {
    dispatch(
      addToCart({
        productId: product.id,
        slug: product.slug,
        title: product.title,
        category: formatCategoryLabel(
          product.category || "Mixed_Media_Canvas"
        ),
        collection: product.collection
          ? formatCategoryLabel(product.collection)
          : undefined,
        priceUSD: product.priceUSD,
        image: product.image,
        quantity,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="min-h-screen bg-ice/20 pt-4 pb-[calc(7rem+env(safe-area-inset-bottom))] sm:py-14">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-3.5 sm:mb-6 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-steel overflow-x-auto no-scrollbar py-0.5"
        >
          <Link href="/" className="hover:text-deep transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-mist shrink-0" />
          <Link href="/products" className="hover:text-deep transition-colors shrink-0">
            Artworks
          </Link>
          <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-mist shrink-0" />
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-deep transition-colors shrink-0"
          >
            {formatCategoryLabel(product.category)}
          </Link>
          <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-mist shrink-0" />
          <span className="truncate font-medium text-deep">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14">
          {/* Gallery View (Left Column, 7 cols) with Carousel */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <ProductImageCarousel
              images={images}
              productName={product.title}
              categoryLabel={formatCategoryLabel(product.category)}
            />

            <div className="hidden lg:block">
              <ArtworkDetails product={product} />
            </div>
          </div>

          {/* Details & Acquisition Box (Right Column, 5 cols) */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-4 sm:space-y-5 rounded-2xl border border-light bg-white p-4 sm:p-7 shadow-sm">
              {/* Title + Rating */}
              <div>
                <p className="mb-1.5 sm:mb-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-brand">
                  {formatCategoryLabel(product.category)}
                </p>
                <h1 className="font-serif text-2xl sm:text-4xl font-light text-deep tracking-tight">
                  {product.title}
                </h1>

                {product.rating && product.reviews && product.reviews > 0 && (
                  <div className="mt-2 sm:mt-3 flex items-center gap-2">
                    <StarRating
                      rating={product.rating}
                      count={product.reviews}
                    />
                    {product.booked && (
                      <span className="text-xs text-steel">
                        • {product.booked}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Artwork price */}
              <div className="rounded-xl bg-ice/60 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-steel">Artwork price</p>
                <div className="mt-1 flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-light text-deep">
                  {formatPrice(product.priceUSD)}
                </span>
                {product.oldPriceUSD && (
                  <>
                    <span className="text-sm text-steel">–</span>
                    <span className="text-base text-steel line-through">
                      {formatPrice(product.oldPriceUSD)}
                    </span>
                  </>
                )}</div>
              </div>

              {/* Quantity + Add to Cart */}
              <div
                role="region"
                aria-label="Purchase this artwork"
                className="fixed inset-x-0 bottom-0 z-40 border-t border-light bg-white px-4 pt-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-raised sm:static sm:rounded-xl sm:border sm:p-3 sm:shadow-none"
              >
              <div className="flex items-center gap-3">
                <div className="flex h-12 items-center rounded-lg border border-light bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity === 1}
                    className="min-h-11 min-w-11 px-3 py-2 text-steel hover:text-deep text-sm font-semibold disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-mono text-sm font-semibold text-deep">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="min-h-11 min-w-11 px-3 py-2 text-steel hover:text-deep text-sm font-semibold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  aria-live="polite"
                  className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-3 text-xs font-semibold uppercase tracking-wider text-white shadow-raised hover:bg-deep transition-colors sm:px-6"
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
                <p className="mt-2 text-center text-xs text-steel">Complimentary insured delivery and certificate of authenticity included.</p>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6 lg:hidden">
          <ArtworkDetails product={product} />
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-8 border-t border-light pt-8 sm:mt-24 sm:pt-16">
            <div className="mb-5 sm:mb-8 flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-brand">
                  Continue exploring
                </p>
                <h2 className="mt-1 sm:mt-2 font-serif text-xl sm:text-3xl font-light tracking-tight text-deep">
                  Similar artworks
                </h2>
              </div>
              <Link
                href={`/products?category=${product.category}`}
                className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-brand underline underline-offset-4 hover:text-deep"
              >
                View all in this category
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {relatedProducts.map((related, index) => (
                <ProductCard
                  key={related.slug}
                  product={related}
                  index={index}
                  disableReveal
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
