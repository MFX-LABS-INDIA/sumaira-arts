import type { NavLink } from "@/types/content";
import { site } from "@/constants/site";

export const mainNav: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Live Events", href: "/live-events" },
  { label: "Workshops", href: "/workshops" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/#contact" },
  { label: "Cart", href: "/cart" },
  { label: "My Orders", href: "/orders" },
];

/** "#" entries are pages that do not exist yet. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Originals", href: "/products?category=Original_Texture" },
      { label: "Mixed Media", href: "/products?category=Mixed_Media_Artworks" },
      { label: "Collections", href: "/products?category=Mixed_Media_Canvas" },
      { label: "All Artworks", href: "/products" },
      { label: "Commission Process", href: "/#commission" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Live Events", href: "/live-events" },
      { label: "Calligraphy Workshops", href: "/workshops" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "#" },
    ],
  },
];

/** Official social profiles. */
export const socialLinks = [
  { label: "Instagram", href: site.instagram.main },
  { label: "Facebook", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "YouTube", href: "#" },
] as const;
