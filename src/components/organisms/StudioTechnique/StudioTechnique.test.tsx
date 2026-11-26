import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { StudioTechnique } from ".";

it("renders studio craft technique steps", () => {
  const { container } = render(<StudioTechnique steps={[]} />);
  expect(container.firstChild).toBeInTheDocument();
});
