import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { InteractiveArchive } from ".";

it("renders interactive archive component", () => {
  render(<InteractiveArchive />);
  expect(screen.getByRole("region")).toBeInTheDocument();
});
