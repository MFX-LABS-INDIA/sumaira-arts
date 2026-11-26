import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SelectField } from "./SelectField";
describe("SelectField", () => {
  it("selects an option and closes the list", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SelectField id="category" name="category" ariaLabel="Category" options={["Originals", "Collections"]} value="" onChange={onChange} />);
    const trigger = screen.getByRole("combobox", { name: "Category" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.click(screen.getByRole("button", { name: "Originals" }));
    expect(onChange).toHaveBeenCalledWith("Originals");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
  it("closes on Escape and restores focus", async () => {
    const user = userEvent.setup();
    render(<SelectField id="category" name="category" ariaLabel="Category" options={["Originals"]} value="" onChange={() => {}} />);
    const trigger = screen.getByRole("combobox", { name: "Category" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });
});

