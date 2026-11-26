import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { InteriorShowcase } from ".";

it("renders interior artwork showcase", () => {
  const { container } = render(<InteriorShowcase />);
  expect(container.firstChild).toBeInTheDocument();
});
