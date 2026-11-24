import type { Metadata } from "next";
import { LiveEventsView } from "@/templates/LiveEventsView";

export const metadata: Metadata = {
  title: "Live Events, On-Site Engraving & Calligraphy Station | Sumaira Arts",
  description:
    "Book UAE-licensed calligraphy artist Sumaira Mohammed Ashik for on-site perfume and glass engraving, live calligraphy stations, product customization, and live sketching across Dubai & GCC.",
};

export default function LiveEventsPage() {
  return <LiveEventsView />;
}
