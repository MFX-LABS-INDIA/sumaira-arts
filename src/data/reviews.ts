import type { Review } from "@/types/content";

export const testimonialsIntro = {
  eyebrow: "Collector Stories",
  title: "Loved By Art Collectors",
};

/**
 * PLACEHOLDER rating, count and reviews. Replace with real collector reviews before launch.
 * Set `reviewSummary` to null to hide the summary line. A review may also carry `rating`, `verified`,
 * `date`, `product`, `reply` and `photo`; each renders only when present.
 */
export const reviewSummary: { rating: string; count: string } | null = { rating: "4.9", count: "107+" };

export const reviews: Review[] = [
  { quote: "The piece changed how our living room feels. Quiet, considered and beautifully finished.", author: "Art collector" },
  { quote: "The craftsmanship is immediate. Every detail feels like it was made by hand, for us.", author: "Art collector" },
  { quote: "We commissioned a work for our office. It now anchors the entire space.", author: "Art collector" },
];
