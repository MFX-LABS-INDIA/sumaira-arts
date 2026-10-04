import type { Cta, Visual } from "@/types/content";

export const social = {
  eyebrow: "Follow the Art",
  title: "Discover new work, interiors and inspiration.",
  cta: { label: "Follow Us", href: "#" } satisfies Cta,
};

/** Six tiles for the social grid. */
export const socialTiles: (Visual & { label: string })[] = [
  { label: "New work: Letters of Light", art: "noor", image: "/assets/images/prototype/crops/artwork-navy-gold.webp" },
  { label: "In the living room", art: "allah", scene: "living", image: "/assets/images/prototype/room-living-surah-triptych.webp" },
  { label: "Studio detail", art: "ink", image: "/assets/images/prototype/studio-ipad-bismillah.webp" },
  { label: "In the hall", art: "salaam", scene: "hall", image: "/assets/images/prototype/room-lounge-navy-gold.webp" },
  { label: "New work: Mirage", art: "horizon", image: "/assets/images/prototype/crops/artwork-grey-abstract.webp" },
  { label: "In the reading corner", art: "bloom", scene: "bedroom", image: "/assets/images/prototype/crops/scene-blue-wave.webp" },
];
