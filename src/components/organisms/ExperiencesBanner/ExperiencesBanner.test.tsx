import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ExperiencesBanner } from ".";

it("renders studio experiences banner", () => {
  const { container } = render(<ExperiencesBanner />);
  expect(container.firstChild).toBeInTheDocument();
});
