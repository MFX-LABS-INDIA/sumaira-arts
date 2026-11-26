import type { EventCategoryId } from "@/types/event-booking";

export interface LiveEventBookingFormProps {
  initialCategory?: EventCategoryId | "";
  idPrefix?: string;
  stickySubmit?: boolean;
}
