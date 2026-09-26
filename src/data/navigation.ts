import type { NavLink } from "@/types/content";

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "#collections" },
  { label: "Artwork", href: "#artwork" },
  { label: "About", href: "#artist" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

/** "#" entries are pages that do not exist yet. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Collections", href: "#collections" },
      { label: "Artwork", href: "#artwork" },
      { label: "Limited Editions", href: "#collections" },
      { label: "Custom Art", href: "#commission" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About", href: "#artist" },
      { label: "Journal", href: "#journal" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

/** Replace each "#" with the real profile URL. */
export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "YouTube", href: "#" },
] as const;
