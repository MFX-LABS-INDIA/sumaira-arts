import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { LiveEventsGallery } from ".";

it("renders live events gallery", () => {
  const { container } = render(<LiveEventsGallery items={[]} />);
  expect(container.firstChild).toBeInTheDocument();
});
