"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductImageCarousel } from "@/components/products/ProductImageCarousel";
import {
  ShieldCheck,
  Truck,
  ShoppingBag,
  Check,
  ChevronRight,
  Maximize2,
  Palette,
  Frame,
  Award,
  Gem,
  Brush,
  Star,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { formatPrice } from "@/lib/format";
import { formatCategoryLabel } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/StarRating";
import type { Product as StoreProduct } from "@/types/store";

type DetailTab = "description" | "reviews";
const EMPTY_STYLES: NonNullable<StoreProduct["styles"]> = [];
const EMPTY_SIZES: NonNullable<StoreProduct["sizes"]> = [];

export function ProductDetailsClient({ product }: { product: StoreProduct }) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<DetailTab>("description");

  // Style & Size selections
  const styles = product.styles ?? EMPTY_STYLES;
  const sizes = product.sizes ?? EMPTY_SIZES;
  const [selectedStyleIdx, setSelectedStyleIdx] = useState(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);

  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  // Calculate effective price based on style + size modifiers
  const effectivePrice = useMemo(() => {
    const base = product.priceUSD;
    const styleMod = styles[selectedStyleIdx]?.priceModifier || 0;
    const sizeMod = sizes[selectedSizeIdx]?.priceModifier || 0;
    return base + styleMod + sizeMod;
  }, [product.priceUSD, styles, selectedStyleIdx, sizes, selectedSizeIdx]);

  const effectiveOldPrice = useMemo(() => {
    if (!product.oldPriceUSD) return undefined;
    const base = product.oldPriceUSD;
    const styleMod = styles[selectedStyleIdx]?.priceModifier || 0;
    const sizeMod = sizes[selectedSizeIdx]?.priceModifier || 0;
    return base + styleMod + sizeMod;
  }, [product.oldPriceUSD, styles, selectedStyleIdx, sizes, selectedSizeIdx]);

  const handleAdd = () => {
    dispatch(
      addToCart({
        productId: product.id,
        slug: product.slug,
        title: product.title,
        titleAr: product.titleAr,
        category: formatCategoryLabel(
          product.category || "Mixed_Media_Canvas"
        ),
        collection: product.collection
          ? formatCategoryLabel(product.collection)
          : undefined,
        priceUSD: effectivePrice,
        image: product.image,
        quantity,
        selectedStyle: styles[selectedStyleIdx]?.label,
        selectedSize: sizes[selectedSizeIdx]?.label,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="min-h-screen bg-ice/20 py-8 sm:py-14">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs text-steel"
        >
          <Link href="/" className="hover:text-deep transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-mist" />
          <Link href="/products" className="hover:text-deep transition-colors">
            Artworks
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-mist" />
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-deep transition-colors"
          >
            {formatCategoryLabel(product.category)}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-mist" />
          <span className="truncate font-medium text-deep">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery View (Left Column, 7 cols) with Carousel */}
          <div className="lg:col-span-7 space-y-6">
            <ProductImageCarousel
              images={images}
              productName={product.title}
              categoryLabel={formatCategoryLabel(product.category)}
            />

            {/* In Situ / Room Scene Banner */}
            {product.sceneImage && (
              <div className="rounded-2xl border border-light bg-white p-6 shadow-xs">
                <h3 className="font-serif text-lg font-light text-deep mb-3">
                  In Situ Interior Preview
                </h3>
                <div className="relative aspect-landscape w-full overflow-hidden rounded-xl bg-ice">
                  <Image
                    src={product.sceneImage}
                    alt={`${product.title} installed in modern interior`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Details & Acquisition Box (Right Column, 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-5 rounded-2xl border border-light bg-white p-5 shadow-sm sm:p-7">
              {/* Title + Rating */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand">
                  {formatCategoryLabel(product.category)}
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl font-light text-deep tracking-tight">
                  {product.title}
                </h1>
                {product.titleAr && (
                  <p
                    lang="ar"
                    dir="rtl"
                    className="mt-1 font-serif text-xl text-steel"
                  >
                    {product.titleAr}
                  </p>
                )}
                {product.rating && (
                  <div className="mt-3 flex items-center gap-2">
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

              {/* Price Range */}
              <div className="rounded-xl bg-ice/60 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-steel">Your selected edition</p>
                <div className="mt-1 flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-light text-deep">
                  {formatPrice(effectivePrice)}
                </span>
                {effectiveOldPrice && (
                  <>
                    <span className="text-sm text-steel">–</span>
                    <span className="text-base text-steel line-through">
                      {formatPrice(effectiveOldPrice)}
                    </span>
                  </>
                )}</div>
              </div>

              {/* ====== Style Selector ====== */}
              {styles.length > 0 && (
                <div className="rounded-xl border border-light bg-ice/40 p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-deep mb-3">
                    Style <span className="normal-case font-medium text-steel">— {styles[selectedStyleIdx]?.label}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((style, idx) => (
                      <button
                        key={style.label}
                        type="button"
                        onClick={() => setSelectedStyleIdx(idx)}
                        className={`rounded-lg border px-4 py-2 text-xs font-medium transition-all ${
                          selectedStyleIdx === idx
                            ? "border-brand bg-brand text-white shadow-sm"
                            : "border-light bg-white text-deep hover:border-brand/40 hover:bg-ice"
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ====== Size Selector ====== */}
              {sizes.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-deep mb-3">
                    Size <span className="normal-case font-medium text-steel">— {sizes[selectedSizeIdx]?.label}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size, idx) => (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => setSelectedSizeIdx(idx)}
                        className={`rounded-lg border px-4 py-2 text-xs font-medium transition-all ${
                          selectedSizeIdx === idx
                            ? "border-brand bg-brand text-white shadow-sm"
                            : "border-light bg-white text-deep hover:border-brand/40 hover:bg-ice"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="rounded-xl border border-light bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 items-center rounded-lg border border-light bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-steel hover:text-deep text-sm font-semibold"
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
                    className="px-3 py-2 text-steel hover:text-deep text-sm font-semibold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-xs font-semibold uppercase tracking-wider text-white shadow-raised hover:bg-deep transition-all"
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Added to Collection</span>
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

              {/* SKU + Category meta */}
              <div className="flex items-center gap-4 text-xs text-steel border-b border-light pb-4">
                {product.sku && (
                  <span>
                    <strong className="text-deep">SKU</strong> {product.sku}
                  </span>
                )}
                <span className="text-light">|</span>
                <span>
                  <strong className="text-deep">Category</strong>{" "}
                  <Link
                    href={`/products?category=${product.category}`}
                    className="underline hover:text-deep transition-colors"
                  >
                    {formatCategoryLabel(product.category)}
                  </Link>
                </span>
              </div>

              {/* Trust Badges — Unique & Handcrafted, Made by Artisans, Highest Quality Material */}
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center gap-1.5 rounded-lg border border-light bg-ice/30 px-2 py-3 text-center text-xs text-steel">
                  <Gem className="h-4 w-4 text-brand" />
                  <span className="font-semibold uppercase tracking-wider text-deep">
                    Unique &amp; Handcrafted
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 rounded-lg border border-light bg-ice/30 px-2 py-3 text-center text-xs text-steel">
                  <Brush className="h-4 w-4 text-brand" />
                  <span className="font-semibold uppercase tracking-wider text-deep">
                    Made by Artisans
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 rounded-lg border border-light bg-ice/30 px-2 py-3 text-center text-xs text-steel">
                  <Award className="h-4 w-4 text-brand" />
                  <span className="font-semibold uppercase tracking-wider text-deep">
                    Highest Quality Material
                  </span>
                </div>
              </div>

              {/* Tabs: Description | Reviews */}
              <div>
                <div className="flex border-b border-light">
                  <button
                    type="button"
                    onClick={() => setActiveTab("description")}
                    className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      activeTab === "description"
                        ? "border-b-2 border-brand text-deep"
                        : "text-steel hover:text-deep"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("reviews")}
                    className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      activeTab === "reviews"
                        ? "border-b-2 border-brand text-deep"
                        : "text-steel hover:text-deep"
                    }`}
                  >
                    Reviews ({product.reviews || 0})
                  </button>
                </div>

                <div className="pt-4">
                  {activeTab === "description" && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-bold text-deep mb-2">
                          Description
                        </h3>
                        <p className="text-sm leading-relaxed text-steel">
                          {product.description}
                        </p>
                      </div>

                      {/* Specifications */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {product.dimensions && (
                          <div className="rounded-xl border border-light bg-white p-3.5">
                            <div className="flex items-center gap-2 text-steel mb-1">
                              <Maximize2 className="h-4 w-4 text-brand" />
                              <span className="font-semibold uppercase tracking-wider">
                                Dimensions
                              </span>
                            </div>
                            <p className="text-deep font-medium">
                              {product.dimensions}
                            </p>
                          </div>
                        )}
                        {product.medium && (
                          <div className="rounded-xl border border-light bg-white p-3.5">
                            <div className="flex items-center gap-2 text-steel mb-1">
                              <Palette className="h-4 w-4 text-brand" />
                              <span className="font-semibold uppercase tracking-wider">
                                Medium
                              </span>
                            </div>
                            <p className="text-deep font-medium line-clamp-2">
                              {product.medium}
                            </p>
                          </div>
                        )}
                        {product.frame && (
                          <div className="rounded-xl border border-light bg-white p-3.5 sm:col-span-2">
                            <div className="flex items-center gap-2 text-steel mb-1">
                              <Frame className="h-4 w-4 text-brand" />
                              <span className="font-semibold uppercase tracking-wider">
                                Framing
                              </span>
                            </div>
                            <p className="text-deep font-medium">
                              {product.frame}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Studio Key Features */}
                      {product.features && product.features.length > 0 && (
                        <div className="rounded-xl border border-light bg-white p-4">
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-deep mb-2.5">
                            Artwork Highlights
                          </h3>
                          <ul className="space-y-2">
                            {product.features.map((feat, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-steel"
                              >
                                <Check className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-4">
                      {product.reviews && product.reviews > 0 ? (
                        <div className="rounded-xl border border-light bg-white p-5">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < Math.round(product.rating || 0)
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-mist"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-semibold text-deep">
                              {product.rating?.toFixed(1)}
                            </span>
                            <span className="text-xs text-steel">
                              based on {product.reviews} reviews
                            </span>
                          </div>
                          <p className="text-sm text-steel leading-relaxed">
                            Our collectors consistently praise the quality and
                            craftsmanship of this piece. Every artwork is
                            handmade in our studio with the finest materials and
                            undergoes rigorous quality checks before shipping.
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-steel">
                          No reviews yet for this artwork.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Studio Guarantees */}
              <div className="grid grid-cols-2 gap-4 border-t border-light pt-6 text-xs text-steel">
                <div className="flex items-start gap-2.5">
                  <Truck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-deep block">
                      Complimentary Shipping
                    </span>
                    <span>Fully insured museum crating.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-deep block">
                      Authenticity Certificate
                    </span>
                    <span>Signed studio provenance.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
