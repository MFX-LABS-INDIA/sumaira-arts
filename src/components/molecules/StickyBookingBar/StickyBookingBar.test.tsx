import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Calendar } from "lucide-react";
import { StickyBookingBar } from ".";

it("renders sticky booking bar trigger", () => {
  const { container } = render(
    <StickyBookingBar
      title="Master Calligraphy Workshop"
      subtitle="The Workshop Jumeirah"
      buttonLabel="Book Seat"
      icon={<Calendar className="h-4 w-4" />}
      hidden={false}
      onAction={() => {}}
    />
  );
  expect(container).toBeInTheDocument();
});
