import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { CollaboratedBrands } from ".";

it("renders collaborated luxury brands marquee", () => {
  const { container } = render(<CollaboratedBrands />);
  expect(container.firstChild).toBeInTheDocument();
});
