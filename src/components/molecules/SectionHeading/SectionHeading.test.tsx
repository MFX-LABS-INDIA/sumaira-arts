import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { SectionHeading } from ".";

it("renders section heading with eyebrow, title, and description", () => {
  render(
    <SectionHeading
      eyebrow="Portfolio"
      title="Master Artworks"
      description="Hand-sculpted calligraphy"
    />
  );
  expect(screen.getByText("Master Artworks")).toBeInTheDocument();
});
