import type { Metadata } from "next";
import { Journal } from "@/components/sections/Journal";
import { journalPosts } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal | Sumaira Arts",
  description: "Stories, studio notes and inspiration from Sumaira Arts.",
};

export default function JournalPage() {
  return <Journal limit={journalPosts.length} />;
}
