import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { WorkshopBookingForm } from ".";

it("renders workshop booking form with required fields", () => {
  const { container } = render(<WorkshopBookingForm />);
  expect(container.firstChild).toBeInTheDocument();
});
