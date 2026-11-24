"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";

export interface SkeletonImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  /** Shimmer backdrop tone while image bytes decode. Set "none" for dark logo tiles or custom frames. */
  skeletonTone?: "light" | "dark" | "none";
  /** Additional class names applied to the shimmer overlay. */
  skeletonClassName?: string;
  /** Keep the image immediately opaque for critical LCP heroes while showing shimmer behind it until decoded. */
  instantReveal?: boolean;
  onLoad?: ImageProps["onLoad"];
  onError?: ImageProps["onError"];
}

/**
 * Drop-in `next/image` wrapper displaying a smooth shimmer skeleton while the image loads
 * and fading it in cleanly once decoded (immediately visible when cached or SW-preloaded).
 */
export function SkeletonImage({
  src,
  alt,
  className = "",
  skeletonTone = "light",
  skeletonClassName = "",
  instantReveal = false,
  preload,
  priority,
  onLoad,
  onError,
  ...props
}: SkeletonImageProps) {
  const srcKey = typeof src === "string" ? src : JSON.stringify(src);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const isLoaded = loadedKey === srcKey;
  const skipOpacityGate = instantReveal || Boolean(preload) || Boolean(priority);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoadedKey(srcKey);
    }
  }, [srcKey]);

  const shimmerClass =
    skeletonTone === "dark"
      ? "skeleton-shimmer-dark"
      : skeletonTone === "light"
        ? "skeleton-shimmer"
        : "";

  return (
    <>
      {skeletonTone !== "none" && !isLoaded && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ${shimmerClass} ${skeletonClassName}`}
        />
      )}
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        preload={preload}
        priority={priority}
        className={`${className} ${
          skipOpacityGate
            ? ""
            : `transition-opacity duration-500 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`
        }`}
        onLoad={(event) => {
          setLoadedKey(srcKey);
          onLoad?.(event);
        }}
        onError={(event) => {
          setLoadedKey(srcKey);
          onError?.(event);
        }}
        {...props}
      />
    </>
  );
}
