import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { WorkshopBookingSection } from ".";

it("renders workshop booking section", () => {
  const { container } = render(<WorkshopBookingSection />);
  expect(container.firstChild).toBeInTheDocument();
});
