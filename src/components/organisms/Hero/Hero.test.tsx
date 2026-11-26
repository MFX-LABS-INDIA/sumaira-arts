import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Hero } from ".";

it("renders home page hero", () => {
  const { container } = render(<Hero />);
  expect(container.firstChild).toBeInTheDocument();
});
