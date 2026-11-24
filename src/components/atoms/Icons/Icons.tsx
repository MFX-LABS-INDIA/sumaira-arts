import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export const SearchIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
  </svg>
);

export const BagIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const ArrowIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h15m-5-5 5 5-5 5" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...p}>
    <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 8.5h3V4.5h-3A4 4 0 0 0 10 8.5v3H7v4h3v5h4v-5h3l1-4h-4v-2.5a.5.5 0 0 1 .5-.5Z" />
  </svg>
);

export const PinterestIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M11 8.6c2.5-.7 4.4.7 4.2 3-.2 2.2-2 3.4-3.6 2.6M10.7 11.6 9.3 18" />
  </svg>
);

export const YoutubeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="m10 9.5 4.6 2.5-4.6 2.5v-5Z" />
  </svg>
);

export const PauseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 6v12M15 6v12" />
  </svg>
);

export const PlayIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8 5.5v13l10-6.5-10-6.5Z" />
  </svg>
);

/** Originals: qalam calligraphy reed nib over a flowing Arabic stroke and nuqta dot. */
export const CalligraphyOriginalsIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M18.5 3.5 11 11l-1.5 4 4-1.5 7.5-7.5-2.5-2.5Z" />
    <path d="M15.5 6.5 18 9" />
    <path d="M4 18.5c2.2-1.8 4.6-1.8 6.8-.4 2.1 1.3 4.5 1.3 7.2-.6" />
    <path d="M6.5 13.5 7.5 12.5 8.5 13.5 7.5 14.5Z" fill="currentColor" stroke="none" />
  </svg>
);

/** Mixed Media: canvas frame with layered sculptural texture waves and brush accent. */
export const MixedMediaTextureIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
    <path d="M3.5 14.5c2.5-2.2 5.2-2.2 7.8 0 2.5 2.2 5.2 2.2 9.2-.8" />
    <path d="M3.5 10.5c2.4-1.6 4.8-1.6 7.2.2 2.2 1.6 4.6 1.6 7.3-.4" />
    <path d="M15.5 7.2 16.5 6.2 17.5 7.2 16.5 8.2Z" fill="currentColor" stroke="none" />
  </svg>
);

/** Collections: curated gallery frame with calligraphic flourish inside. */
export const CollectionsGalleryIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="3.5" width="16" height="17" rx="2" />
    <rect x="7" y="6.5" width="10" height="11" rx="1" />
    <path d="M9.2 13.2c1.1-2.6 2.8-3.8 4.4-2.5 1.1.9.7 2.5-.6 3.1-1 .4-2.1.2-3.2-.3" />
    <path d="M13.6 9.1 14.4 8.3 15.2 9.1 14.4 9.9Z" fill="currentColor" stroke="none" />
  </svg>
);

/** All Artworks: curated 4-frame gallery wall grid. */
export const AllArtworksGridIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="7" height="8.5" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="5.5" rx="1.5" />
    <rect x="3.5" y="15" width="7" height="5.5" rx="1.5" />
    <rect x="13.5" y="12" width="7" height="8.5" rx="1.5" />
  </svg>
);
