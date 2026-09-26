import type { ArtVariant } from "@/components/art/variants";
import type { Cta } from "@/types/content";

export const artist: {
  eyebrow: string;
  title: string;
  description: string;
  belief: string;
  cta: Cta;
  art: ArtVariant;
  accentArt: ArtVariant;
  image?: string;
} = {
  eyebrow: "The Artist",
  title: "Where Heritage Meets Contemporary Expression",
  description: "Discover the creative vision, artistic process and cultural influences behind the collection.",
  belief:
    "Art should not simply fill a wall. It should create atmosphere, express personality and become part of the story of a space.",
  cta: { label: "Meet the Artist", href: "#" },
  art: "enso",
  accentArt: "arches",
};
