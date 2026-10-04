import type { Cta, Visual } from "@/types/content";

export const inspiration = {
  eyebrow: "Art in Your Space",
  title: "Designed To Belong",
  description:
    "See how carefully selected artwork transforms living rooms, bedrooms, offices and contemporary interiors.",
  cta: { label: "Explore Inspiration", href: "#" } satisfies Cta,
};

export const interiors: (Visual & { label: string })[] = [
  { label: "Living room", art: "allah", scene: "living", image: "/assets/images/prototype/room-living-surah-triptych.webp" },
  { label: "Reading corner", art: "dunes", scene: "bedroom", image: "/assets/images/prototype/room-reading-corner-blue-wave.webp" },
  { label: "Office", art: "rings", scene: "office", image: "/assets/images/prototype/room-reception-beige-abstract.webp" },
];
