import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Container } from ".";

it("renders children wrapped in a container", () => {
  render(<Container><div>Test Content</div></Container>);
  expect(screen.getByText("Test Content")).toBeInTheDocument();
});
