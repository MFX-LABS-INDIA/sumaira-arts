import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Logo } from ".";

it("renders the studio brand logo", () => {
  render(<Logo />);
  expect(screen.getByRole("link")).toBeInTheDocument();
});
