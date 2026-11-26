import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { LiveEventBookingSection } from ".";

it("renders live event booking section with form", () => {
  const { container } = render(<LiveEventBookingSection />);
  expect(container.firstChild).toBeInTheDocument();
});
