import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Section } from ".";

it("renders section with correct tone and content", () => {
  render(<Section id="test-section" tone="ice"><p>Section Text</p></Section>);
  expect(screen.getByText("Section Text")).toBeInTheDocument();
});
