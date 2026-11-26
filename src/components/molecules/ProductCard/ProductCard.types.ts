import type { Product } from "@/types/content";

export type ProductCardProps = {
  product: Product;
  index: number;
  className?: string;
  disableReveal?: boolean;
  /** Home carousel cards use a compact stacked footer; catalogue cards retain their original layout. */
  homeCard?: boolean;
};
