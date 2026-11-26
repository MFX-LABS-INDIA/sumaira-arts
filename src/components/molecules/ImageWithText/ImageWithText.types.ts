import type { ReactNode } from "react";
import type { Feature } from "@/types/content";

export type ImageWithTextProps = {
  feature: Feature;
  isReversed?: boolean;
  children?: ReactNode;
};
