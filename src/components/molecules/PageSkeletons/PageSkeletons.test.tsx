import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { CatalogPageSkeleton } from ".";

it("renders catalog loading skeleton without crashing", () => {
  const { container } = render(<CatalogPageSkeleton />);
  expect(container.firstChild).toBeInTheDocument();
});
