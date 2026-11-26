import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { EnquiryForm } from ".";

it("renders contact enquiry form with inputs", () => {
  render(<EnquiryForm />);
  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
});
