import type { ImageProps } from "next/image";

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
