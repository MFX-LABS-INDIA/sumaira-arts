export interface ExperienceCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: string;
  alt: string;
  meta: string;
}

export const experiencesIntro = {
  eyebrow: "Events & Learning",
  title: "Beyond the canvas: live events & workshops.",
  description:
    "Bring bespoke Arabic calligraphy, luxury fragrance engraving, and guided studio classes to weddings, brand launches, corporate gatherings, and creative teams across the UAE.",
};

export const experienceCards: ExperienceCard[] = [
  {
    id: "live-events",
    eyebrow: "Engraving · Products · Sketching",
    title: "Live Events",
    description:
      "On-site diamond-tip perfume and glass engraving, live Arabic calligraphy stations, and wedding portrait sketching for luxury launches and Emirati celebrations.",
    ctaLabel: "Explore Live Events",
    href: "/live-events",
    image: "/assets/images/events/hero-live-engraving.webp",
    alt: "Sumaira performing live calligraphy and engraving at an activation station",
    meta: "35+ Brand Partners · Starting 500 AED/hr",
  },
  {
    id: "calligraphy-workshops",
    eyebrow: "Studio · Corporate · Online",
    title: "Calligraphy Workshops",
    description:
      "Guided Arabic calligraphy and textured abstract canvas sessions for beginners, Emirati Women's Day gatherings, and corporate teams—300+ students taught.",
    ctaLabel: "Explore Workshops",
    href: "/workshops",
    image: "/assets/images/workshops/hero-workshop.webp",
    alt: "Sumaira guiding participants through an Arabic calligraphy and textured canvas workshop",
    meta: "300+ Students · The Workshop Dubai",
  },
];
