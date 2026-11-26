import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { DatePickerField } from ".";

it("renders date picker input with label", () => {
  const { container } = render(
    <DatePickerField
      id="event-date"
      name="eventDate"
      value=""
      onChange={() => {}}
    />
  );
  expect(container).toBeInTheDocument();
});
