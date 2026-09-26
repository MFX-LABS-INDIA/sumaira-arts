import type { Cta, Visual } from "@/types/content";

export const inspiration = {
  eyebrow: "Art in Your Space",
  title: "Designed To Belong",
  description:
    "See how carefully selected artwork transforms living rooms, bedrooms, offices and contemporary interiors.",
  cta: { label: "Explore Inspiration", href: "#" } satisfies Cta,
};

export const interiors: (Visual & { label: string })[] = [
  { label: "Living room", art: "names", scene: "living" },
  { label: "Bedroom", art: "dunes", scene: "bedroom" },
  { label: "Office", art: "rings", scene: "office" },
];
