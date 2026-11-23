export const WORKSHOP_FORMATS = [
  "Traditional Arabic Calligraphy Foundations",
  "Abstract Texture & Calligraphy on Canvas",
  "Collaborative Group Mural Experience",
  "Private / 1-on-1 Coaching Session",
  "Online Live Calligraphy Cohort",
] as const;

export const WORKSHOP_SESSION_MODES = [
  "Studio Class (The Workshop Dubai, Jumeirah)",
  "Onsite Corporate / Private Venue (UAE)",
  "Online Live Session (Worldwide)",
] as const;

export const WORKSHOP_GROUP_SIZES = [
  "Individual",
  "Small Group",
  "Private / Boutique",
  "Corporate / Event",
  "Large Group / Mural",
] as const;

export const WORKSHOP_SKILL_LEVELS = [
  "Complete Beginner (No prior experience)",
  "Intermediate (Some lettering / painting experience)",
  "Mixed Group Levels",
] as const;

export type WorkshopFormatOption = (typeof WORKSHOP_FORMATS)[number];
export type WorkshopSessionMode = (typeof WORKSHOP_SESSION_MODES)[number];
export type WorkshopGroupSize = (typeof WORKSHOP_GROUP_SIZES)[number];
export type WorkshopSkillLevel = (typeof WORKSHOP_SKILL_LEVELS)[number];

export type WorkshopBooking = {
  bookingId: string;
  submittedAt: string;
  name: string;
  email: string;
  phoneNumber: string;
  workshopFormat: string;
  sessionMode: string;
  groupSize: string;
  skillLevel: string;
  preferredDate: string;
  location: string;
  notes: string;
};
