import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { StarRating } from ".";

it("renders star rating score and count", () => {
  const { container } = render(<StarRating rating={4.8} count={24} />);
  expect(container.firstChild).toBeInTheDocument();
  expect(screen.getByText("(24)")).toBeInTheDocument();
});
