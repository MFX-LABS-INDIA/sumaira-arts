import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FounderBlock } from ".";

it("renders home page artist founder spotlight block", () => {
  const { container } = render(<FounderBlock />);
  expect(container.firstChild).toBeInTheDocument();
});
