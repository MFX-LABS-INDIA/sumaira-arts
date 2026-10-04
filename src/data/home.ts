import type { Cta, HeroSlide, Offering } from "@/types/content";

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Contemporary Art • Curated With Purpose",
    lead: "Art That Gives Your Space",
    accent: "Meaning.",
    description:
      "Discover refined contemporary artwork created to bring character, depth and timeless beauty into the spaces you live and work in.",
    primary: { label: "Explore Artwork", href: "#artwork" },
    secondary: { label: "Discover Our Story", href: "#artist" },
    image: {
      src: "/assets/images/prototype/room-lounge-navy-gold.webp",
      alt: "A large calligraphy artwork in navy and gold between two armchairs",
    },
    focus: "50% 35%",
    caption: { kicker: "Featured work", title: "Letters of Light" },
  },
  {
    eyebrow: "The 99 Names Collection",
    lead: "Qur’anic Calligraphy for",
    accent: "Modern Living.",
    description:
      "Hand-embellished canvas artworks that bring the beauty of Arabic script into contemporary interiors.",
    primary: { label: "Explore Mixed Media", href: "#artwork" },
    secondary: { label: "View Collections", href: "#collections" },
    image: {
      src: "/assets/images/prototype/room-living-surah-triptych.webp",
      alt: "Three Surah calligraphy panels above a sofa",
    },
    focus: "50% 30%",
    caption: { kicker: "Featured collection", title: "The 99 Names" },
  },
  {
    eyebrow: "Bespoke Art",
    lead: "Created For",
    accent: "Your Space.",
    description:
      "Commission artwork designed around your vision, preferred dimensions and interior, made specifically for your home or workspace.",
    primary: { label: "Start a Commission", href: "#commission" },
    secondary: { label: "Meet the Artist", href: "#artist" },
    image: {
      src: "/assets/images/prototype/room-reading-corner-blue-wave.webp",
      alt: "A tall blue and black calligraphy artwork above a reading chair",
    },
    focus: "30% 35%",
    caption: { kicker: "Featured work", title: "Waves of Light" },
  },
];

/** Carousel labels, kept here so the controls component holds no copy. */
export const heroControls = {
  label: "Featured artwork",
  slide: "Slide",
  of: "of",
  previous: "Previous slide",
  next: "Next slide",
  goTo: "Go to slide",
  pause: "Pause slideshow",
  play: "Play slideshow",
};

export const intro = {
  eyebrow: "The Art of Living",
  title: "Where Art, Heritage & Modern Design Meet",
  description:
    "Explore a curated world of contemporary artwork and beautifully crafted pieces inspired by culture, creativity and modern living. Each collection is designed to bring a distinctive sense of character and expression to your space.",
  cta: { label: "Our Story", href: "#artist" } satisfies Cta,
};

export const offerings: Offering[] = [
  {
    number: "01",
    eyebrow: "Hand-Embellished Canvas",
    title: "Mixed Media Artworks",
    description:
      "Hand-embellished printed canvas artworks combining texture, detail, and Qur’anic calligraphy in a contemporary mixed media expression.",
    cta: { label: "Explore Mixed Media", href: "#artwork" },
    art: "allah",
    scene: "living",
    image: "/assets/images/prototype/room-living-ayatul-kursi.webp",
  },
  {
    number: "02",
    eyebrow: "Hand-Textured Originals",
    title: "Original Texture Artworks",
    description:
      "One-of-a-kind textured artworks created by hand on raw canvas, incorporating Qur’anic verses, surahs, and Arabic letters through layers of sculptural texture.",
    cta: { label: "Explore Originals", href: "#collections" },
    art: "ink",
    scene: "hall",
    image: "/assets/images/prototype/crops/artwork-dhikr-canvases.webp",
  },
];
