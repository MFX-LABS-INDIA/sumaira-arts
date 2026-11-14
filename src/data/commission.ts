import type { Feature } from "@/types/content";

export const commission: Feature & {
  steps: { number: string; title: string; text: string }[];
} = {
  eyebrow: "Bespoke Art",
  title: "Create Something Unique",
  description:
    "An artwork begins with your space and the feeling you want to create. Explore how your ideas, colours and personal meaning can become a piece made for you.",
  cta: { label: "Explore the commission process", href: "/journal/commission-journey" },
  steps: [
    { number: "01", title: "Begin with your space", text: "Bring together room photographs, wall measurements and the ideas that matter to you." },
    { number: "02", title: "Shape the direction", text: "Explore a palette, composition and materials that complement your interior." },
    { number: "03", title: "Bring it to life", text: "Follow the journey from the first concept to the finished artwork." },
  ],
  art: "rings",
  scene: "office",
  image: "/assets/images/prototype/room-reception-beige-abstract.webp",
  alt: "A commissioned artwork in an office interior",
};
