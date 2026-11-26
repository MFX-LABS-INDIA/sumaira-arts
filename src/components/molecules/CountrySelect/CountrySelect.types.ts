import type { Country } from "@/constants/countries";

export interface CountrySelectProps {
  value: Country["code"];
  onChange: (country: Country) => void;
  className?: string;
}
