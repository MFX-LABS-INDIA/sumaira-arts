import type { JournalPost } from "@/types/content";

export const journalIntro = {
  eyebrow: "From the Journal",
  title: "Stories & Inspiration",
};

export const journalPosts: JournalPost[] = [
  {
    category: "Art & Design",
    title: "Calligraphy in the Contemporary Home",
    excerpt: "How a centuries-old script finds new life on the walls of modern interiors.",
    href: "#",
    art: "letters",
    scene: "hall",
  },
  {
    category: "Interiors",
    title: "Choosing Art for a Room You Live In",
    excerpt: "Scale, light and colour: a calm way to decide what belongs on your wall.",
    href: "#",
    art: "dunes",
    scene: "living",
  },
  {
    category: "Inspiration",
    title: "Inside the Studio",
    excerpt: "From first sketch to finished piece: how a commission comes to life.",
    href: "#",
    art: "enso",
    scene: "office",
  },
];
