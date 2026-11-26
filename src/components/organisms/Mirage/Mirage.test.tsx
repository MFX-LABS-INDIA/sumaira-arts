import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Mirage } from ".";

it("renders mirage visual experience banner", () => {
  const { container } = render(<Mirage />);
  expect(container.firstChild).toBeInTheDocument();
});
