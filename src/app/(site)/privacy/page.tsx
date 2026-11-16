import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/sections/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy | Sumaira Arts",
  description: "How Sumaira Arts handles information submitted through the Contact Us form.",
};

export default function PrivacyPage() {
  const contactEmail = process.env.ENQUIRY_ADMIN_EMAIL?.split(",")[0]?.trim() ?? "";

  return <PrivacyPolicy contactEmail={contactEmail} />;
}
