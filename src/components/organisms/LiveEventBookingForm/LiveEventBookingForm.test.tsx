import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { LiveEventBookingForm } from ".";

it("renders live event booking form with required inputs", () => {
  const { container } = render(<LiveEventBookingForm />);
  expect(container.firstChild).toBeInTheDocument();
});
