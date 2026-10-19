import type { NavLink } from "@/types/content";

export const mainNav: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/#artist" },
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
      { label: "Collections", href: "#collections" },
      { label: "Artwork", href: "#artwork" },
      { label: "Original Artworks", href: "#collections" },
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
