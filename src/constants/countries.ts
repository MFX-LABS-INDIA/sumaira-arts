import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";

export interface Country {
  name: string;
  code: CountryCode;
  dialCode: string;
}

const names = new Intl.DisplayNames(["en"], { type: "region" });
const preferred: CountryCode[] = ["QA", "AE", "SA", "KW", "BH", "OM"];

export const COUNTRIES: Country[] = getCountries()
  .map((code) => ({ code, name: names.of(code) ?? code, dialCode: getCountryCallingCode(code) }))
  .sort((a, b) => {
    const aRank = preferred.indexOf(a.code);
    const bRank = preferred.indexOf(b.code);
    if (aRank !== -1 || bRank !== -1) {
      return (aRank === -1 ? preferred.length : aRank) - (bRank === -1 ? preferred.length : bRank);
    }
    return a.name.localeCompare(b.name, "en");
  });
