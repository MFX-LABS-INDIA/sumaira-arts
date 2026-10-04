import type { Cta, Visual } from "@/types/content";

export const artist: {
  eyebrow: string;
  title: string;
  description: string;
  belief: string;
  cta: Cta;
  /** Three pictures from the studio, shown beside the words. */
  gallery: (Visual & { alt: string })[];
} = {
  eyebrow: "The Artist",
  title: "Where Heritage Meets Contemporary Expression",
  description: "Discover the creative vision, artistic process and cultural influences behind the collection.",
  belief:
    "Art should not simply fill a wall. It should create atmosphere, express personality and become part of the story of a space.",
  cta: { label: "Meet the Artist", href: "#" },
  gallery: [
    { art: "enso", image: "/assets/images/prototype/studio-pastel-canvases.webp", alt: "The artist lettering a canvas in the studio" },
    { art: "salaam", image: "/assets/images/prototype/studio-falaq-canvas.webp", alt: "The artist finishing a Surah Al-Falaq canvas" },
    { art: "ink", image: "/assets/images/prototype/studio-dhikr-canvases.webp", alt: "The artist beside a set of dhikr canvases" },
  ],
};
