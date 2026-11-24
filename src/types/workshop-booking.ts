export const WORKSHOP_FORMATS = [
  "Traditional Arabic Calligraphy Foundations",
  "Abstract Texture & Calligraphy on Canvas",
  "Collaborative Group Mural Experience",
  "Private / 1-on-1 Coaching Session",
  "Online Live Calligraphy Cohort",
] as const;

export type WorkshopFormatOption = (typeof WORKSHOP_FORMATS)[number];

export const WORKSHOP_SESSION_MODES = [
  "Studio Class (The Workshop Dubai, Jumeirah)",
  "Onsite Corporate / Private Venue (UAE)",
  "Online Live Session (Worldwide)",
  "Other",
] as const;

export type WorkshopSessionMode = (typeof WORKSHOP_SESSION_MODES)[number];

export interface WorkshopSessionModeCard {
  value: WorkshopSessionMode;
  shortTitle: string;
  image?: string;
}

export const WORKSHOP_SESSION_MODE_CARDS: readonly WorkshopSessionModeCard[] = [
  {
    value: "Studio Class (The Workshop Dubai, Jumeirah)",
    shortTitle: "Studio Class (Dubai)",
    image: "/assets/images/workshops/workshop-practice.webp",
  },
  {
    value: "Onsite Corporate / Private Venue (UAE)",
    shortTitle: "Onsite / Private (UAE)",
    image: "/assets/images/workshops/workshop-mural.webp",
  },
  {
    value: "Online Live Session (Worldwide)",
    shortTitle: "Online Live",
    image: "/assets/images/workshops/workshop-group.webp",
  },
  {
    value: "Other",
    shortTitle: "Other",
  },
] as const;

export type WorkshopBooking = {
  bookingId: string;
  submittedAt: string;
  name: string;
  email: string;
  phoneNumber: string;
  workshopFormat: string;
};
