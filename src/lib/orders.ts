import type { CartItem, Order } from "@/types/store";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isBoundedString = (value: unknown, maxLength: number): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;

const isCartItem = (value: unknown): value is CartItem => {
  if (!isRecord(value)) return false;

  return (
    isBoundedString(value.id, 128) &&
    isBoundedString(value.productId, 128) &&
    isBoundedString(value.slug, 200) &&
    isBoundedString(value.title, 200) &&
    isBoundedString(value.category, 100) &&
    isBoundedString(value.image, 500) &&
    typeof value.priceUSD === "number" &&
    Number.isFinite(value.priceUSD) &&
    value.priceUSD >= 0 &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    value.quantity <= 100
  );
};

const isOrder = (value: unknown): value is Order => {
  if (!isRecord(value)) return false;
  const order = value;
  const phoneDigits =
    typeof order.phoneNumber === "string" ? order.phoneNumber.replace(/\D/g, "") : "";

  return (
    isBoundedString(order.id, 64) &&
    isBoundedString(order.customerName, 120) &&
    isBoundedString(order.email, 254) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email) &&
    isBoundedString(order.phoneNumber, 30) &&
    /^[+\d\s().-]+$/.test(order.phoneNumber.trim()) &&
    phoneDigits.length >= 7 &&
    phoneDigits.length <= 15 &&
    (order.address === undefined ||
      (typeof order.address === "string" && order.address.length <= 300)) &&
    Array.isArray(order.items) &&
    order.items.length > 0 &&
    order.items.length <= 50 &&
    order.items.every(isCartItem) &&
    typeof order.total === "number" &&
    Number.isFinite(order.total) &&
    order.total >= 0 &&
    typeof order.subtotal === "number" &&
    Number.isFinite(order.subtotal) &&
    order.subtotal >= 0 &&
    isBoundedString(order.currency, 10) &&
    isBoundedString(order.orderDate, 40) &&
    Number.isFinite(Date.parse(order.orderDate)) &&
    typeof order.status === "string" &&
    ["pending", "confirmed", "shipped", "cancelled"].includes(order.status)
  );
};

export const getOrderFromPayload = (payload: unknown): Order | null => {
  if (!isRecord(payload) || !isOrder(payload.order)) return null;
  return payload.order;
};
