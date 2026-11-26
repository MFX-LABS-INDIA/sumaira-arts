import { useState } from "react";
import { COUNTRIES } from "@/constants/countries";

export function useCountryDetection() {
  const [country, selectCountry] = useState(() => COUNTRIES.find(item => item.code === "AE") ?? COUNTRIES[0]);
  return { country, selectCountry };
}
