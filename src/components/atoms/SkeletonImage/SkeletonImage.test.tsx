import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { SkeletonImage } from ".";

it("renders skeleton image with alt description", () => {
  const { container } = render(<SkeletonImage src="/test.jpg" alt="Artwork test" width={100} height={100} />);
  expect(container.querySelector("img")).toHaveAttribute("alt", "Artwork test");
});
