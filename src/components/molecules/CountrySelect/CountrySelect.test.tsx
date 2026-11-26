import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { CountrySelect } from ".";

it("filters countries and selects a matching calling code", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<CountrySelect value="AE" onChange={onChange} />);
  await user.click(screen.getByRole("button", { name: /Country calling code/ }));
  await user.type(screen.getByRole("textbox", { name: "Search country or calling code" }), "Qatar");
  await user.click(screen.getByRole("button", { name: /Qatar.*974/ }));
  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ code: "QA" }));
});
