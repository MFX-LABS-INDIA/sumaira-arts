import type { JournalPost } from "@/types/content";
import journalData from "./journal.json";

export const journalIntro = { eyebrow: "From the Journal", title: "Stories & Inspiration" };
export type JournalArticle = JournalPost & {
  author: string;
  isSample: boolean;
  sections: { heading: string; paragraphs: string[] }[];
};
export const journalPosts = journalData as JournalArticle[];
