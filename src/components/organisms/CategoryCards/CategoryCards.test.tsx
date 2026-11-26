import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { CategoryCards } from ".";

it("renders category showcase cards", () => {
  const { container } = render(<CategoryCards />);
  expect(container.firstChild).toBeInTheDocument();
});
