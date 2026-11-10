import type { Cta } from "@/types/content";

export interface ArtistMilestone {
  year?: string;
  title: string;
  category: "Exhibition" | "Collaboration" | "Workshop" | "Award";
  description: string;
  highlight?: string;
}

export const artist: {
  name: string;
  role: string;
  eyebrow: string;
  title: string;
  tagline: string;
  bio: string[];
  philosophy: string;
  belief: string;
  stats: { value: string; label: string }[];
  milestones: ArtistMilestone[];
  cta: Cta;
  gallery: { image: string; alt: string }[];
} = {
  name: "Sumaira Mohammed Ashik",
  role: "Abstract Calligraphy Artist & Product Designer",
  eyebrow: "The Artist & Founder",
  title: "Where Modern Textures Meet Sacred Calligraphy",
  tagline: "Bridging architectural geometry, metallic textures, and timeless Arabic calligraphy.",
  bio: [
    "Sumaira Mohammed Ashik is a Dubai-based abstract calligraphy artist and commercial product designer who moved to the United Arab Emirates from India over 8 years ago. Over nearly a decade in Dubai, she has cultivated an internationally recognized artistic signature characterized by a bold synthesis of metallic textured abstracts and contemporary Arabic script.",
    "Using modeling paste, palette knives, and heavy-grade paint scrapers, Sumaira sculpts multi-dimensional layers with striking contrast. Her creations range from minimal fluid abstracts to deeply layered mixed-media canvases that bring a tactile 3D perspective to traditional lettering.",
    "Her mastery extends from gallery walls to commercial interior lifestyle decor. Sumaira collaborated with Landmark Group's Homebox across the GCC, designing over a hundred digital calligraphy dining & home décor pieces featured across 37 stores throughout the UAE and Gulf region.",
  ],
  philosophy:
    "For Sumaira, abstract calligraphy is more than aesthetic embellishment—it is an evocative dialogue between sacred heritage, contemporary architectural spaces, and deep personal spirituality.",
  belief:
    "Art should not simply fill a wall. It should create atmosphere, express personality and become part of the story of a space.",
  stats: [
    { value: "8+ Years", label: "Studio Practice in Dubai" },
    { value: "37+ Stores", label: "GCC-Wide Homebox Retail Presence" },
    { value: "100+", label: "Bespoke & Commercial Product Designs" },
    { value: "20+", label: "Masterclasses & Workshops Conducted" },
  ],
  milestones: [
    {
      title: "World Art Dubai",
      category: "Exhibition",
      description: "Solo showcase and live presentation at Dubai World Trade Centre, selling original masterworks to regional and global collectors.",
      highlight: "Solo Exhibition & Live Art",
    },
    {
      title: "Landmark Group / Homebox GCC",
      category: "Collaboration",
      description: "Commissioned as principal calligraphy product designer for the GCC-wide Ramadan dining and luxury décor collection across 37 retail stores.",
      highlight: "Over 100+ Commercial Products",
    },
    {
      title: "Gallery Vibes — Mall of the Emirates",
      category: "Exhibition",
      description: "Curated feature displaying 5 signature calligraphy works during the prestigious Ramadan Fusion Vibes Exhibition.",
      highlight: "5 Masterworks Exhibited",
    },
    {
      title: "The Workshop Dubai, Jumeirah",
      category: "Workshop",
      description: "Resident calligraphy and mixed-media tutor, leading 15+ hands-on masterclasses in abstract texture building and Arabic script.",
      highlight: "Resident Masterclass Tutor",
    },
    {
      title: "UAE @ 50 Arts & Crafts Competition",
      category: "Award",
      description: "Awarded 6th position out of 123 international artists celebrating the 50th National Day of the United Arab Emirates.",
      highlight: "6th Position out of 123 Artists",
    },
    {
      title: "ARTOZE Global & Ramadan Exhibitions",
      category: "Exhibition",
      description: "Participated in high-profile art competitions held under royal patronage and diplomatic cultural celebrations.",
      highlight: "Royal Patronage Showcase",
    },
  ],
  cta: { label: "Explore Her Story & Works", href: "/about" },
  gallery: [
    {
      image: "/assets/images/artist/sumaira-studio-calligraphy.webp",
      alt: "Sumaira Mohammed Ashik working on contemporary Arabic calligraphy in her studio",
    },
    {
      image: "/assets/images/artist/sumaira-portrait.webp",
      alt: "Sumaira Mohammed Ashik with custom textured calligraphy artwork",
    },
    {
      image: "/assets/images/artist/exhibition-world-art-dubai.webp",
      alt: "Sumaira's solo exhibition stand at World Art Dubai",
    },
  ],
};
