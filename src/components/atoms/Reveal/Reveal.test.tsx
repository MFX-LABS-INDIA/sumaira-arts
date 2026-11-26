import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Reveal } from ".";

it("renders reveal children safely", () => {
  render(<Reveal><span>Animated Content</span></Reveal>);
  expect(screen.getByText("Animated Content")).toBeInTheDocument();
});
