import type { Cta, Visual } from "@/types/content";

export const social = {
  eyebrow: "Follow the Art",
  title: "Discover new work, interiors and inspiration.",
  cta: { label: "Follow Us", href: "#" } satisfies Cta,
};

/** Six tiles for the social grid. */
export const socialTiles: (Visual & { label: string })[] = [
  { label: "New work: Letters of Light", art: "letters" },
  { label: "In the living room", art: "names", scene: "living" },
  { label: "Studio detail", art: "ink" },
  { label: "In the hall", art: "arches", scene: "hall" },
  { label: "New work: Mirage", art: "horizon" },
  { label: "In the bedroom", art: "bloom", scene: "bedroom" },
];
