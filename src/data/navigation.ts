import type { NavLink } from "@/types/content";

export const mainNav: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/#contact" },
  { label: "Cart", href: "/cart" },
  { label: "My Orders", href: "/orders" },
  { label: "Journal", href: "/journal" },
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
      { label: "Commission Process", href: "/journal/commission-journey" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
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
