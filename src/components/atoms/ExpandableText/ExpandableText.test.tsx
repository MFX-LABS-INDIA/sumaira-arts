import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { ExpandableText } from ".";

it("toggles a long description with an accessible expanded state", async () => {
  const user = userEvent.setup();
  vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(100);
  render(<ExpandableText text={"A textured calligraphy artwork. ".repeat(10)} />);
  const expand = screen.getByRole("button", { name: "Read more" });
  expect(expand).toHaveAttribute("aria-expanded", "false");
  await user.click(expand);
  expect(screen.getByRole("button", { name: "Show less" })).toHaveAttribute("aria-expanded", "true");
});
