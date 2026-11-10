"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Images, Maximize2 } from "lucide-react";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
  categoryLabel?: string;
}

export function ProductImageCarousel({
  images,
  productName,
  categoryLabel,
}: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const validImages = images.length > 0 ? images : ["/assets/images/prototype/crops/artwork-surah-ikhlas.webp"];

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  }, [validImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  }, [validImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  return (
    <>
      <div className="space-y-4">
        {/* Main Stage Image / Carousel with navigation */}
        <div className="group relative aspect-portrait sm:aspect-landscape lg:aspect-[4/3] w-full overflow-hidden rounded-2xl border border-light bg-white p-4 shadow-sm">
          <div
            className="relative h-full w-full cursor-zoom-in overflow-hidden rounded-xl"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Image
              src={validImages[currentIndex]}
              alt={`${productName} - Image ${currentIndex + 1}`}
              fill
              priority
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Badge */}
          {categoryLabel && (
            <span className="absolute left-6 top-6 rounded-full bg-brand/90 px-3 py-1 text-micro font-medium uppercase tracking-caps text-white backdrop-blur-xs shadow-xs">
              {categoryLabel}
            </span>
          )}

          {/* View full lightbox button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-steel shadow-raised backdrop-blur-xs transition-colors hover:text-deep"
            title="Expand image"
          >
            <Maximize2 className="h-4 w-4" />
          </button>

          {/* Carousel arrows */}
          {validImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-deep shadow-raised backdrop-blur-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-white"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-deep shadow-raised backdrop-blur-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-white"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Counter pill at bottom right */}
          <div className="absolute bottom-6 right-6 flex items-center gap-1.5 rounded-full bg-deep/80 px-3 py-1 text-xs font-mono text-white backdrop-blur-xs">
            <Images className="h-3.5 w-3.5" />
            <span>
              {currentIndex + 1} / {validImages.length}
            </span>
          </div>
        </div>

        {/* Thumbnails Row */}
        {validImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {validImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all ${
                  currentIndex === idx
                    ? "border-brand shadow-sm scale-95"
                    : "border-light opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal (like Arabian Sand Dunes) */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-deep/95 backdrop-blur-md"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 text-white border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm">
                {currentIndex + 1} / {validImages.length}
              </span>
              <span className="text-white/40">|</span>
              <span className="font-serif text-base truncate max-w-sm">{productName}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Center Stage */}
          <div
            className="relative flex flex-1 items-center justify-center p-4 sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            {validImages.length > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
            )}

            <div className="relative h-full w-full max-w-5xl max-h-[75vh]">
              <Image
                src={validImages[currentIndex]}
                alt={`${productName} - Fullscreen View`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {validImages.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div
            className="flex justify-center gap-2 overflow-x-auto p-4 border-t border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {validImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg transition-all ${
                  currentIndex === idx
                    ? "ring-2 ring-brand ring-offset-2 ring-offset-deep scale-105"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
