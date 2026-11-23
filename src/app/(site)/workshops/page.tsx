import type { Metadata } from "next";
import { WorkshopsView } from "@/components/sections/WorkshopsView";

export const metadata: Metadata = {
  title: "Arabic Calligraphy & Abstract Art Workshops | Sumaira Arts",
  description:
    "Join Arabic calligraphy and textured canvas workshops in Dubai with resident tutor Sumaira Mohammed Ashik. 300+ students taught online, at The Workshop Dubai, and corporate retreats.",
};

export default function WorkshopsPage() {
  return <WorkshopsView />;
}
