import type { ReactNode } from "react";

export interface StatHighlightItem {
  value: string;
  label: string;
  icon: ReactNode;
  href?: string;
}

export interface StatsBarProps {
  items: readonly StatHighlightItem[];
  className?: string;
}
