import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ReviewsWall } from ".";

it("renders customer reviews wall", () => {
  const { container } = render(<ReviewsWall />);
  expect(container.firstChild).toBeInTheDocument();
});
