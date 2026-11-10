import type { JournalPost } from "@/types/content";
import journalSamplesData from "./journal-samples.json";

export const journalIntro = {
  eyebrow: "From the Journal",
  title: "Stories & Inspiration",
};

export const journalPosts: JournalPost[] = [
  ...(journalSamplesData as JournalPost[]),
  { slug: "meaningful-gallery-walls", category: "Interiors", title: "Building a Meaningful Gallery Wall", excerpt: "A considered approach to arranging art with balance, rhythm and room to breathe.", href: "/journal#meaningful-gallery-walls", art: "allah", scene: "living", image: "/assets/images/prototype/room-living-surah-triptych.webp" },
  { slug: "texture-and-light", category: "Art & Design", title: "Texture, Light and the Living Room", excerpt: "Why tactile artwork changes character as daylight moves through your space.", href: "/journal#texture-and-light", art: "enso", scene: "hall", image: "/assets/images/prototype/ink-angled-wall.webp" },
  { slug: "art-of-stillness", category: "Inspiration", title: "The Art of Stillness", excerpt: "Creating an interior that feels calm, personal and quietly expressive.", href: "/journal#art-of-stillness", art: "salaam", scene: "bedroom", image: "/assets/images/prototype/room-living-ayatul-kursi.webp" },
  { slug: "scale-before-style", category: "Interiors", title: "Choose Scale Before Style", excerpt: "A simple guide to finding the right canvas proportion for every wall.", href: "/journal#scale-before-style", art: "dunes", scene: "living", image: "/assets/images/prototype/studio-pastel-canvases.webp" },
  { slug: "gold-leaf-craft", category: "Art & Design", title: "The Quiet Brilliance of Gold Leaf", excerpt: "The traditional process behind the luminous detail in selected studio works.", href: "/journal#gold-leaf-craft", art: "noor", scene: "hall", image: "/assets/images/prototype/room-lounge-navy-gold.webp" },
  { slug: "collecting-with-intention", category: "Inspiration", title: "Collecting Art With Intention", excerpt: "How to begin a collection that reflects your story rather than a passing trend.", href: "/journal#collecting-with-intention", art: "rings", scene: "office", image: "/assets/images/prototype/room-reception-beige-abstract.webp" },
  { slug: "commission-journey", category: "Art & Design", title: "From Conversation to Commission", excerpt: "What to expect when a bespoke work is created around your space and vision.", href: "/journal#commission-journey", art: "bloom", scene: "living", image: "/assets/images/prototype/room-living-grey-abstract.webp" },
];
