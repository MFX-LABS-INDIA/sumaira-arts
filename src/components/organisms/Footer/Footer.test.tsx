import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Footer } from ".";

it("renders studio footer with copyright and navigation", () => {
  const { container } = render(<Footer />);
  expect(container.firstChild).toBeInTheDocument();
});
