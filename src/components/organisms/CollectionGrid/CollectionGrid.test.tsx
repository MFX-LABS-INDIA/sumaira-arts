import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { CollectionGrid } from ".";

it("renders collection gallery grid", () => {
  const { container } = render(<CollectionGrid />);
  expect(container.firstChild).toBeInTheDocument();
});
