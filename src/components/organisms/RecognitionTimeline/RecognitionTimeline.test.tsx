import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { RecognitionTimeline } from ".";

it("renders career recognition timeline milestones", () => {
  const { container } = render(<RecognitionTimeline milestones={[]} />);
  expect(container.firstChild).toBeInTheDocument();
});
