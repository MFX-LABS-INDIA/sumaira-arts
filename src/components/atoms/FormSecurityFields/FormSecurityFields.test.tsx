import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { FormSecurityFields } from ".";

it("renders offscreen honeypot traps and hidden guard token field", () => {
  const { container } = render(<FormSecurityFields scope="enquiry" />);

  const guardInput = container.querySelector('input[name="_guardToken"]');
  const websiteTrap = container.querySelector('input[name="website"]');
  const companyUrlTrap = container.querySelector('input[name="company_url"]');
  const faxTrap = container.querySelector('input[name="fax_number"]');

  expect(guardInput).toBeInTheDocument();
  expect(websiteTrap).toHaveAttribute("tabindex", "-1");
  expect(companyUrlTrap).toHaveAttribute("tabindex", "-1");
  expect(faxTrap).toHaveAttribute("tabindex", "-1");
});
