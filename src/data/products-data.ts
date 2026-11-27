import type { Product as StoreProduct } from "@/types/store";

import { mixedMediaCanvasProducts1 } from "./products-mixed-media-canvas-1";
import { mixedMediaCanvasProducts2 } from "./products-mixed-media-canvas-2";
import { mixedMediaArtworksProducts1 } from "./products-mixed-media-artworks-1";
import { mixedMediaArtworksProducts2 } from "./products-mixed-media-artworks-2";
import { originalTextureProducts1 } from "./products-original-texture-1";

export const productsData: StoreProduct[] = [
  ...mixedMediaCanvasProducts1,
  ...mixedMediaCanvasProducts2,
  ...mixedMediaArtworksProducts1,
  ...mixedMediaArtworksProducts2,
  ...originalTextureProducts1,
];
