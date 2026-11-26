import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { RecognitionCarouselController } from ".";

it("renders recognition carousel controller without crashing", () => {
  const { container } = render(
    <RecognitionCarouselController milestoneCount={5}>
      <div>Milestones</div>
    </RecognitionCarouselController>
  );
  expect(container).toBeInTheDocument();
});
