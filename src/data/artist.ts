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
    { art: "enso", alt: "Brushwork from the studio" },
    { art: "arches", alt: "Detail of a studio piece" },
    { art: "ink", alt: "Ink study from the studio" },
  ],
};
