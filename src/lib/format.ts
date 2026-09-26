import { site } from "@/constants/site";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: site.currency,
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number) => money.format(amount);
