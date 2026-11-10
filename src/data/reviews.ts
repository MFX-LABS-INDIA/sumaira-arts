import testimonialsData from "./testimonials.json";
import type { Testimonial } from "@/types/content";

export const testimonialsIntro = {
  eyebrow: "Collector Stories",
  title: "Loved By Art Collectors",
};

/**
 * Summary stays independent from individual testimonials so it can later be connected to real review data.
 */
export const reviewSummary: { rating: string; count: string } | null = { rating: "4.9", count: "107+" };

export const reviews = testimonialsData as Testimonial[];
