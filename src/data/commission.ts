import type { Feature } from "@/types/content";

export const commission: Feature & {
  steps: { number: string; title: string; text: string }[];
} = {
  eyebrow: "Bespoke Art",
  title: "Create Something Unique",
  description:
    "Bring your vision to life with artwork created specifically for your home, office or commercial space. From concept and curation to the finished piece, create something that belongs uniquely to you.",
  cta: { label: "Start a Commission", href: "#contact" },
  steps: [
    { number: "01", title: "Concept", text: "Your vision, space and dimensions." },
    { number: "02", title: "Curation", text: "Palette, form and materials chosen with you." },
    { number: "03", title: "The finished piece", text: "Made by hand, finished and delivered." },
  ],
  art: "rings",
  scene: "office",
  alt: "A commissioned artwork in an office interior",
};
