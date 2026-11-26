import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ArtistFounderHero } from ".";

it("renders founder hero with artist name and role", () => {
  render(<ArtistFounderHero />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});
