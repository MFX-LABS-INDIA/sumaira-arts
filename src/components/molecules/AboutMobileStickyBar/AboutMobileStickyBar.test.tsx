import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { AboutMobileStickyBar } from ".";

it("renders mobile sticky contact CTA bar", () => {
  render(<AboutMobileStickyBar />);
  expect(screen.getByText("Contact Us")).toBeInTheDocument();
});
