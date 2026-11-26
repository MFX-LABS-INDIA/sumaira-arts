import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Button } from ".";

it("supports keyboard activation and prevents disabled actions", async () => {
  const user = userEvent.setup();
  const retry = vi.fn();
  const { rerender } = render(<Button onClick={retry}>Try again</Button>);
  await user.tab();
  await user.keyboard("{Enter}");
  expect(retry).toHaveBeenCalledTimes(1);
  rerender(<Button onClick={retry} disabled>Try again</Button>);
  await user.click(screen.getByRole("button", { name: "Try again" }));
  expect(retry).toHaveBeenCalledTimes(1);
});
