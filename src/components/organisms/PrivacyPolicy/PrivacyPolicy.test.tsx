import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { PrivacyPolicy } from ".";

it("renders privacy policy document content", () => {
  render(<PrivacyPolicy contactEmail="studio@sumairaarts.com" />);
  expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
});
