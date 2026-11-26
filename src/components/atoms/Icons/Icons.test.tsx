import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { InstagramIcon } from ".";

it("renders icon without crashing", () => {
  const { container } = render(<InstagramIcon />);
  expect(container.querySelector("svg")).toBeInTheDocument();
});
