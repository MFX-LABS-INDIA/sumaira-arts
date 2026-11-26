import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ArchiveCarouselController } from ".";

it("renders archive carousel controller without crashing", () => {
  const { container } = render(
    <ArchiveCarouselController categories={[]}>
      <div>Archive items</div>
    </ArchiveCarouselController>
  );
  expect(container).toBeInTheDocument();
});
