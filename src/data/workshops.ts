import type { WorkshopFormatOption } from "@/types/workshop-booking";

export interface WorkshopFormat {
  id: string;
  bookingFormat: WorkshopFormatOption;
  eyebrow: string;
  title: string;
  description: string;
  audience: string;
  image: string;
  alt: string;
}

export interface WorkshopStep {
  step: string;
  title: string;
  description: string;
}

export interface WorkshopGalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
}

export const workshopsData = {
  hero: {
    eyebrow: "Arabic Calligraphy & Abstract Art Workshops",
    title: "Learn the rhythm of script, texture, and ink.",
    description:
      "With over 300 students taught online and onsite, Dubai-based artist and resident tutor Sumaira Mohammed Ashik hosts immersive calligraphy and textured abstract workshops at The Workshop Dubai (Jumeirah), private venues, and corporate retreats across the UAE.",
    primaryCta: { label: "Book a Workshop", href: "#book-workshop" },
    secondaryCta: { label: "Explore Workshop Formats", href: "#formats" },
    image: "/assets/images/workshops/hero-workshop.webp",
    imageAlt:
      "Sumaira Mohammed Ashik guiding workshop participants through layered teal canvas painting and calligraphy",
    stats: [
      { value: "300+", label: "Students Taught" },
      { value: "Online & Onsite", label: "Dubai, UAE & Worldwide" },
      { value: "Jumeirah", label: "The Workshop Dubai Tutor" },
      { value: "All Included", label: "Qalam, Ink & Canvas Kits" },
    ],
  },
  navPills: [
    { label: "Workshop Formats", href: "#formats" },
    { label: "Learning Journey", href: "#curriculum" },
    { label: "Workshop Gallery", href: "#gallery" },
    { label: "Book a Session", href: "#book-workshop" },
  ],
  formatsIntro: {
    eyebrow: "Curated Learning Experiences",
    title: "Workshops designed for beginners, teams, and creatives.",
    description:
      "From classical reed-pen discipline to expressive mixed-media canvases and collaborative murals, each workshop balances calm artistic mindfulness with practical technique.",
  },
  formats: [
    {
      id: "traditional-calligraphy",
      bookingFormat: "Traditional Arabic Calligraphy Foundations",
      eyebrow: "Reed Pen · Qalam · Proportions",
      title: "Traditional Arabic Calligraphy Foundations",
      description:
        "Master foundational reed pen (qalam) posture, ink flow, nuqta (dot) proportions, and classical letterforms through structured guided practice workbooks—crafted for complete beginners and aspiring calligraphers.",
      audience: "Studio Classes & Guided Workbooks",
      image: "/assets/images/workshops/workshop-practice.webp",
      alt: "Sumaira demonstrating Arabic calligraphy strokes using a wooden qalam pen and structured practice sheet",
    },
    {
      id: "abstract-texture-canvas",
      bookingFormat: "Abstract Texture & Calligraphy on Canvas",
      eyebrow: "Impasto · Gold Accents · Canvas",
      title: "Abstract Texture & Calligraphy on Canvas",
      description:
        "Combine soothing layered acrylic gradients and sculpted textures with flowing metallic gold Arabic calligraphy. Every guest leaves with an exhibition-ready canvas they created themselves.",
      audience: "Individual & Weekend Studio Sessions",
      image: "/assets/images/workshops/workshop-canvas.webp",
      alt: "Workshop participant painting metallic gold Arabic calligraphy over a layered turquoise canvas",
    },
    {
      id: "collaborative-mural",
      bookingFormat: "Collaborative Group Mural Experience",
      eyebrow: "Corporate · Emirati Women's Day · VIP",
      title: "Collaborative Group Mural Experience",
      description:
        "An unforgettable team-building and cultural activation where groups paint together across a table-length canvas—transforming individual brush strokes into one unified contemporary calligraphy masterpiece.",
      audience: "Corporate Teams & Cultural Celebrations",
      image: "/assets/images/workshops/workshop-mural.webp",
      alt: "Group of participants wearing branded aprons painting black expressive Arabic calligraphy across a long shared mural",
    },
    {
      id: "studio-and-online",
      bookingFormat: "Private / 1-on-1 Coaching Session",
      eyebrow: "The Workshop Dubai · Private & Online",
      title: "Studio, Private & Online Masterclasses",
      description:
        "Join Sumaira's regular sessions as a resident tutor at The Workshop Dubai (Jumeirah), book a private celebratory workshop in Dubai/UAE, or learn step-by-step from anywhere via live online cohorts.",
      audience: "All Skill Levels · Flexible Scheduling",
      image: "/assets/images/workshops/workshop-group.webp",
      alt: "Workshop group holding canvases and mixing metallic paints during a daytime studio session",
    },
  ] satisfies WorkshopFormat[],
  curriculumIntro: {
    eyebrow: "How Every Session Unfolds",
    title: "From first stroke to finished artwork.",
    description:
      "No prior Arabic language or painting experience required—each session provides step-by-step demonstration, bespoke practice sheets, and personal feedback.",
  },
  steps: [
    {
      step: "01",
      title: "Script & Qalam Fundamentals",
      description:
        "Understand pen angle, ink loading, and rhythm through tactile warmup stroke drills and bespoke practice workbooks.",
    },
    {
      step: "02",
      title: "Texture & Surface Layering",
      description:
        "Explore color blending, palette-knife reliefs, and compositional balance before placing your calligraphy on canvas.",
    },
    {
      step: "03",
      title: "Guided Hands-On Creation",
      description:
        "Receive individual guidance from Sumaira as you compose your chosen Arabic word, phrase, or abstract script piece.",
    },
    {
      step: "04",
      title: "Curated Kit & Take-Home Art",
      description:
        "All qalam pens, inks, paints, aprons, and canvases are provided—plus your finished artwork and practice kit to keep.",
    },
  ] satisfies WorkshopStep[],
  galleryIntro: {
    eyebrow: "Inside the Classroom",
    title: "Moments from workshops across Dubai & the UAE.",
    description:
      "Over 300 students have discovered the meditative joy of Arabic lettering across gallery studios, Emirati Women's Day events, and brand retreats.",
  },
  gallery: [
    {
      id: "ws-gal-1",
      title: "Hands-On Canvas Coaching",
      caption: "Guided brushwork at The Workshop Dubai",
      image: "/assets/images/workshops/hero-workshop.webp",
      alt: "Sumaira coaching participants around a studio table with acrylic paints and canvases",
    },
    {
      id: "ws-gal-2",
      title: "Qalam Stroke Mastery",
      caption: "Classical proportions & dot drills",
      image: "/assets/images/workshops/workshop-practice.webp",
      alt: "Overhead view of qalam pen calligraphy practice drills and workbook sheets",
    },
    {
      id: "ws-gal-3",
      title: "Gold Leaf & Acrylic Layers",
      caption: "Blending colour stories with script",
      image: "/assets/images/workshops/workshop-canvas.webp",
      alt: "Participant adding gold calligraphy flourishes onto a teal gradient canvas",
    },
    {
      id: "ws-gal-4",
      title: "Table-Length Team Mural",
      caption: "Collaborative corporate calligraphy experience",
      image: "/assets/images/workshops/workshop-mural.webp",
      alt: "Four participants painting bold black calligraphy flourishes onto a long communal mural",
    },
    {
      id: "ws-gal-5",
      title: "Brush & Ink Flow",
      caption: "Expressive modern Arabic lettering",
      image: "/assets/images/workshops/workshop-strokes.webp",
      alt: "Students practicing wide brush strokes and contemporary Arabic curves on paper",
    },
    {
      id: "ws-gal-6",
      title: "Studio Prep & Community",
      caption: "Small-group welcoming atmosphere",
      image: "/assets/images/workshops/workshop-group.webp",
      alt: "Participants preparing canvases together in a sunlit Dubai studio",
    },
  ] satisfies WorkshopGalleryItem[],
  quote: {
    text: "This country gave me space to grow, create, teach and share. The Emirates didn't just inspire me — it helped me become who I am today.",
    attribution: "Sumaira Mohammed Ashik · Dubai, UAE",
  },
  bookingSection: {
    eyebrow: "Reserve Your Seat or Group",
    title: "Workshop Booking Request",
    description:
      "Whether joining a studio session at The Workshop Dubai, organizing a corporate team mural, or scheduling private online coaching, submit your preferred format and date below.",
    quickInfo: [
      { label: "Location", value: "The Workshop Dubai, Jumeirah · UAE Onsite · Online" },
      { label: "Students Taught", value: "300+ online & onsite learners" },
      { label: "Materials", value: "All qalam pens, inks & canvases provided" },
    ],
    assurances: [
      "Branded email confirmation sent directly to you",
      "Beginner-friendly guidance — no Arabic fluency required",
      "Custom private & corporate packages across the UAE",
    ],
  },
  cta: {
    eyebrow: "Reserve Your Spot or Corporate Session",
    title: "Host a workshop or join an upcoming class.",
    description:
      "Enquire above for individual studio seats at The Workshop Dubai, private group gatherings, Emirati Women's Day celebrations, corporate team-building, or online lessons.",
    primary: { label: "Complete Booking Form", href: "#book-workshop" },
    secondary: { label: "Explore Live Event Services", href: "/live-events" },
  },
};
