import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { FeaturedProducts } from ".";

it("renders featured artworks section", () => {
  const { container } = render(<FeaturedProducts />);
  expect(container.firstChild).toBeInTheDocument();
});
