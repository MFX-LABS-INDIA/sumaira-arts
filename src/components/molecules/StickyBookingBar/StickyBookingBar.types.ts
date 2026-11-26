import type { ReactNode } from "react";

export interface StickyBookingBarProps {
  title?: string;
  subtitle?: string;
  buttonLabel: string;
  icon: ReactNode;
  hidden: boolean;
  onAction: () => void;
}
