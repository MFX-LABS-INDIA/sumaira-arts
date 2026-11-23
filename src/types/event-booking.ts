export type EventBookingTab = "engraving" | "products" | "sketching";

export const LIVE_EVENTS_SHEET_TAB = "Live Events";

export interface EventBookingTabConfig {
  id: EventBookingTab;
  title: string;
  shortTitle: string;
  sheetTabName: string;
  idPrefix: string;
  hourlyRateAed: number;
  capacitySummary: string;
  scriptBadge: string;
  tagline: string;
}

export const EVENT_BOOKING_TABS: readonly EventBookingTabConfig[] = [
  {
    id: "engraving",
    title: "On-Site Engraving",
    shortTitle: "Engraving",
    sheetTabName: LIVE_EVENTS_SHEET_TAB,
    idPrefix: "ENG",
    hourlyRateAed: 600,
    capacitySummary: "50 pieces · 3 Hours",
    scriptBadge: "Eng / Arabic Calligraphy",
    tagline: "Diamond-tip engraving on perfume bottles, crystal flutes & glass",
  },
  {
    id: "products",
    title: "Calligraphy on Products",
    shortTitle: "Products",
    sheetTabName: LIVE_EVENTS_SHEET_TAB,
    idPrefix: "CAL",
    hourlyRateAed: 500,
    capacitySummary: "100 pieces · 3 Hours",
    scriptBadge: "Eng / Arabic Calligraphy",
    tagline: "Live lettering on Finjan cups, mugs, mabkhara, fans & gifts",
  },
  {
    id: "sketching",
    title: "Live Sketching Station",
    shortTitle: "Sketching",
    sheetTabName: LIVE_EVENTS_SHEET_TAB,
    idPrefix: "SKT",
    hourlyRateAed: 500,
    capacitySummary: "25–30 portraits · 3 Hours",
    scriptBadge: "Digital / Original",
    tagline: "Live guest & couple illustrations with optional gold & Arabic script",
  },
] as const;

export const BOOKING_DURATIONS = [
  { label: "1 Hour", hours: 1 },
  { label: "2 Hours", hours: 2 },
  { label: "3 Hours (Standard)", hours: 3 },
  { label: "4 Hours", hours: 4 },
  { label: "5 Hours", hours: 5 },
  { label: "6 Hours (Full Day)", hours: 6 },
  { label: "Custom / Multi-Day", hours: null },
] as const;

export function getTabConfig(tabId: EventBookingTab): EventBookingTabConfig {
  return EVENT_BOOKING_TABS.find((t) => t.id === tabId) ?? EVENT_BOOKING_TABS[0];
}

export type EventBooking = {
  bookingId: string;
  submittedAt: string;
  tab: EventBookingTab;
  stationTitle: string;
  sheetTabName: string;
  hourlyRateAed: number;
  name: string;
  email: string;
  phoneNumber: string;
  eventDate: string;
  duration: string;
  guestCount: string;
  location: string;
  notes: string;
};
