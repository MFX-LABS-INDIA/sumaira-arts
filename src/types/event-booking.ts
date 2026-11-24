export type EventCategoryId =
  | "on-site-engraving"
  | "live-calligraphy-station"
  | "calligraphy-on-products"
  | "live-sketching-station"
  | "other";

export const LIVE_EVENTS_SHEET_TAB = "Live Events";

export interface EventCategoryOption {
  id: EventCategoryId;
  title: string;
  subtitle: string;
  idPrefix: string;
  image?: string;
}

export const EVENT_CATEGORY_OPTIONS: readonly EventCategoryOption[] = [
  {
    id: "on-site-engraving",
    title: "On-Site Engraving",
    subtitle: "Perfume · Glass · Crystal",
    idPrefix: "ENG",
    image: "/assets/images/events/service-engraving.webp",
  },
  {
    id: "live-calligraphy-station",
    title: "Live Calligraphy Station",
    subtitle: "Finjan · Mugs · VIP Cards",
    idPrefix: "CAL",
    image: "/assets/images/events/service-station.webp",
  },
  {
    id: "calligraphy-on-products",
    title: "Calligraphy on Products",
    subtitle: "Weddings · Retail · Corporate",
    idPrefix: "PRD",
    image: "/assets/images/events/service-products.webp",
  },
  {
    id: "live-sketching-station",
    title: "Live Sketching Station",
    subtitle: "Digital & Original Portraits",
    idPrefix: "SKT",
    image: "/assets/images/events/service-sketching.webp",
  },
  {
    id: "other",
    title: "Other",
    subtitle: "Custom live art activation",
    idPrefix: "EVT",
  },
] as const;

export function getEventCategoryOption(id: EventCategoryId): EventCategoryOption {
  return EVENT_CATEGORY_OPTIONS.find((opt) => opt.id === id) ?? EVENT_CATEGORY_OPTIONS[0];
}

export type EventBooking = {
  bookingId: string;
  submittedAt: string;
  categoryId: EventCategoryId;
  categoryTitle: string;
  sheetTabName: string;
  name: string;
  email: string;
  phoneNumber: string;
};
