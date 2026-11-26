import type { ReactNode } from "react";

export type RevealProps = {
  children: ReactNode;
  /** Stagger offset in milliseconds. */
  delay?: number;
  className?: string;
};
