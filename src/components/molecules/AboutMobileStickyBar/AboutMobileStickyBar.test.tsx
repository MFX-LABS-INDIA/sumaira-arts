import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { AboutMobileStickyBar } from ".";

it("renders mobile sticky view works CTA bar", () => {
  render(<AboutMobileStickyBar />);
  expect(screen.getByText("View Available Works")).toBeInTheDocument();
});
