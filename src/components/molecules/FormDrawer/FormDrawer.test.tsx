import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { FormDrawer } from ".";

it("closes with Escape and the labelled close button", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();
  render(<FormDrawer isOpen onClose={onClose} title="Contact the studio">Message form</FormDrawer>);
  expect(screen.getByRole("dialog", { name: "Contact the studio" })).toBeInTheDocument();
  await user.keyboard("{Escape}");
  await user.click(screen.getByRole("button", { name: "Close Contact the studio" }));
  expect(onClose).toHaveBeenCalledTimes(2);
});
