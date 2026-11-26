import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { SocialGallery } from ".";

it("renders social Instagram gallery feed", () => {
  const { container } = render(<SocialGallery />);
  expect(container.firstChild).toBeInTheDocument();
});
