import type { Cta } from "@/types/content";

export interface ArtistMilestone {
  year?: string;
  title: string;
  category: "Exhibition" | "Collaboration" | "Workshop" | "Award";
  description: string;
  highlight?: string;
}

export interface ArchiveStory {
  id: string;
  title: string;
  category: "Exhibitions" | "Product Design" | "Workshops" | "Awards";
  image: string;
  subtitle: string;
  location: string;
  description: string;
  details: string[];
}

export interface StudioCraftStep {
  step: string;
  title: string;
  description: string;
}

export const artist = {
  name: "Sumaira Mohammed Ashik",
  role: "Abstract Calligraphy Artist & Product Designer",
  eyebrow: "The Artist & Founder",
  title: "Where Heritage Meets Contemporary Expression",
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
    { value: "08+", label: "Years in Dubai" },
    { value: "37+", label: "GCC Stores" },
    { value: "100+", label: "Products Designed" },
    { value: "20+", label: "Masterclasses" },
  ],
  craftSteps: [
    {
      step: "01",
      title: "Structural Modeling Paste",
      description:
        "Sculpting tactile 3D relief using heavy impasto pastes and custom scrapers to build architectural depth before pigments touch canvas.",
    },
    {
      step: "02",
      title: "Sacred Arabic Calligraphy",
      description:
        "Inscribing Quranic verses, poetic stanzas, and symbolic monograms in Thuluth, Diwani, and contemporary abstract script styles.",
    },
    {
      step: "03",
      title: "Metallic & 24K Gold Embellishment",
      description:
        "Applying multi-tone gold leaf, copper accents, and metallic patinas that catch daylight and shimmer dynamically as viewers move.",
    },
    {
      step: "04",
      title: "Layered Glaze & Sealing",
      description:
        "Locking the work with archival museum-grade UV varnishes, preserving tactile textural peaks while ensuring decades of longevity.",
    },
  ] satisfies StudioCraftStep[],
  milestones: [
    {
      title: "World Art Dubai",
      category: "Exhibition",
      description:
        "Solo showcase and live presentation at Dubai World Trade Centre, selling original masterworks to regional and global collectors.",
      highlight: "Solo Exhibition & Live Art",
    },
    {
      title: "Landmark Group / Homebox GCC",
      category: "Collaboration",
      description:
        "Commissioned as principal calligraphy product designer for the GCC-wide Ramadan dining and luxury décor collection across 37 retail stores.",
      highlight: "Over 100+ Commercial Products",
    },
    {
      title: "Gallery Vibes — Mall of the Emirates",
      category: "Exhibition",
      description:
        "Curated feature displaying 5 signature calligraphy works during the prestigious Ramadan Fusion Vibes Exhibition.",
      highlight: "5 Masterworks Exhibited",
    },
    {
      title: "The Workshop Dubai, Jumeirah",
      category: "Workshop",
      description:
        "Resident calligraphy and mixed-media tutor, leading 15+ hands-on masterclasses in abstract texture building and Arabic script.",
      highlight: "Resident Masterclass Tutor",
    },
    {
      title: "UAE @ 50 Arts & Crafts Competition",
      category: "Award",
      description:
        "Awarded 6th position out of 123 international artists celebrating the 50th National Day of the United Arab Emirates.",
      highlight: "6th Position out of 123 Artists",
    },
    {
      title: "ARTOZE Global & Ramadan Exhibitions",
      category: "Exhibition",
      description:
        "Participated in high-profile art competitions held under royal patronage and diplomatic cultural celebrations.",
      highlight: "Royal Patronage Showcase",
    },
  ] satisfies ArtistMilestone[],
  archiveStories: [
    {
      id: "world-art-dubai",
      title: "World Art Dubai Solo Showcase",
      category: "Exhibitions",
      subtitle: "Solo Stand & Live Calligraphy Showcase",
      image: "/assets/images/artist/exhibition-world-art-dubai.webp",
      location: "Dubai World Trade Centre",
      description:
        "A landmark solo exhibition showcasing original textured Arabic calligraphy masterworks. Works were acquired by international art collectors and commercial interior stylists across the region.",
      details: [
        "Stand No. E27, Hall 1 (Sheikh Saeed Halls)",
        "Featured custom Arabic calligraphy on metallic-textured canvases",
        "Direct interactions with bespoke residential and commercial buyers",
      ],
    },
    {
      id: "homebox-dining",
      title: "Homebox GCC Calligraphy Dining Collection",
      category: "Product Design",
      subtitle: "Commercial Lifestyle Collaboration with Landmark Group",
      image: "/assets/images/artist/homebox-dining-collection.webp",
      location: "37 Stores across UAE & GCC",
      description:
        "Sumaira's digital and hand-drawn calligraphy patterns were selected by Landmark Group to anchor Homebox's iconic Ramadan dining collection, blending traditional reverence with contemporary luxury.",
      details: [
        "Included Istikan and Kahwa sets, twin dispensers & porcelain tea sets",
        "Available across 11 stores in the UAE and 37 stores GCC-wide",
        "Celebrated for elegant gold motifs and balanced calligraphic geometry",
      ],
    },
    {
      id: "gallery-vibes",
      title: "Ramadan Fusion Vibes Exhibition",
      category: "Exhibitions",
      subtitle: "Curated Showcase in Mall of the Emirates",
      image: "/assets/images/artist/exhibition-gallery-vibes.webp",
      location: "Gallery Vibes, Mall of the Emirates",
      description:
        "An exclusive Ramadan curation featuring five monumental works fusing equine anatomy with sacred Arabic script and multi-layered textural acrylics.",
      details: [
        "5 original masterworks exhibited",
        "Curated by prominent art advisors during the holy month of Ramadan",
        "Featured the celebrated calligraphic Arabian horse compositions",
      ],
    },
    {
      id: "workshop-jumeirah",
      title: "The Workshop Dubai, Jumeirah",
      category: "Workshops",
      subtitle: "Resident Tutor for Modern Calligraphy & 3D Textures",
      image: "/assets/images/artist/workshop-dubai-jumeirah.webp",
      location: "Jumeirah, Dubai",
      description:
        "As resident tutor at one of Dubai's most celebrated boutique design hubs, Sumaira has trained hundreds of students in modern Arabic letterforms, knife techniques, and fluid color layering.",
      details: [
        "Conducted 20+ specialized masterclasses",
        "Covers modeling paste sculpting, 24K gold foil application & stroke composition",
        "Special Ramadan masterclasses hosted for 50+ students in fitness and corporate settings",
      ],
    },
    {
      id: "uae-national-day",
      title: "UAE @ 50 National Day Competition",
      category: "Awards",
      subtitle: "6th Position out of 123 International Artists",
      image: "/assets/images/artist/artwork-uae-national-day.webp",
      location: "National Art Competition UAE",
      description:
        "An award-winning homage to the 50th National Day of the United Arab Emirates, integrating national symbols, the Burj Khalifa skyline, and flowing patriotic Arabic verses.",
      details: [
        "Ranked 6th among 123 juried international participants",
        "Crafted with heavy impasto sculpting, gold metallic accents, and fluid pigments",
        "Commended by esteemed UAE cultural curators and collectors",
      ],
    },
    {
      id: "homebox-decor",
      title: "Homebox Ramadan Décor & Textiles",
      category: "Product Design",
      subtitle: "Embroidered Cushions, Lanterns & Living Décor",
      image: "/assets/images/artist/homebox-decor-collection.webp",
      location: "Homebox Furniture Stores",
      description:
        "Extending calligraphic aesthetics into soft home textiles, sculptural lanterns, and decorative accessories for modern living rooms and majlis environments.",
      details: [
        "Gold-embroidered velvet filled cushions and beaded placemats",
        "Arabic calligraphy lanterns, sculpted wall mirrors, and decorative platters",
        "Designed specifically for festive Ramadan hospitality collections",
      ],
    },
  ] satisfies ArchiveStory[],
  cta: { label: "Explore Her Story & Works", href: "/about" } satisfies Cta,
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
