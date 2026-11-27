import { parsePhoneNumberFromString } from "libphonenumber-js/min";
import { allProducts, formatCategoryLabel } from "@/data/products";
import { validateSafeEmail, validateSafeName } from "@/lib/security/sanitize";
import type { CartItem, Order } from "@/types/store";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isBoundedString = (value: unknown, maxLength: number): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;

const ORDER_ID_PATTERN = /^[A-Z0-9-]{6,40}$/;

const catalogBySlug = new Map(allProducts.map((product) => [product.slug, product]));

/**
 * Validates each requested item against the authoritative server catalogue (`allProducts`)
 * so attackers cannot forge fake products, order out-of-stock artworks, or tamper with `priceUSD`.
 */
function sanitizeVerifiedCartItem(value: unknown): CartItem | null {
  if (!isRecord(value)) return null;
  if (!isBoundedString(value.slug, 200)) return null;

  const catalogProduct = catalogBySlug.get(value.slug.trim());
  if (!catalogProduct || !catalogProduct.inStock) {
    return null;
  }

  if (
    typeof value.quantity !== "number" ||
    !Number.isInteger(value.quantity) ||
    value.quantity < 1 ||
    value.quantity > 25
  ) {
    return null;
  }

  return {
    id: catalogProduct.slug,
    productId: catalogProduct.slug,
    slug: catalogProduct.slug,
    title: catalogProduct.title,
    category: formatCategoryLabel(catalogProduct.category),
    collection:
      typeof value.collection === "string" && value.collection.length <= 120
        ? value.collection.trim()
        : "Curated Collection",
    priceUSD: catalogProduct.priceUSD,
    image: catalogProduct.image,
    quantity: value.quantity,
  };
}

export interface OrderPayloadEnvelope {
  order: Order;
  guardToken: string;
  honeypots: unknown[];
}

/**
 * Validates and reconstructs an `Order` from untrusted JSON input using strict
 * anti-injection rules and authoritative server-side product pricing.
 */
export const getOrderFromPayload = (payload: unknown): Order | null => {
  if (!isRecord(payload) || !isRecord(payload.order)) return null;
  const raw = payload.order;

  if (!isBoundedString(raw.id, 40) || !ORDER_ID_PATTERN.test(raw.id.trim())) {
    return null;
  }

  if (typeof raw.customerName !== "string") return null;
  const nameCheck = validateSafeName(raw.customerName);
  if (!nameCheck.ok) return null;

  if (typeof raw.email !== "string") return null;
  const emailCheck = validateSafeEmail(raw.email);
  if (!emailCheck.ok) return null;

  if (!isBoundedString(raw.phoneNumber, 30)) return null;
  const parsedPhone = parsePhoneNumberFromString(raw.phoneNumber.trim());
  if (!parsedPhone || !parsedPhone.isValid()) {
    return null;
  }

  if (!Array.isArray(raw.items) || raw.items.length === 0 || raw.items.length > 30) {
    return null;
  }

  const verifiedItems: CartItem[] = [];
  for (const rawItem of raw.items) {
    const verified = sanitizeVerifiedCartItem(rawItem);
    if (!verified) return null;
    verifiedItems.push(verified);
  }

  const computedTotal = verifiedItems.reduce(
    (sum, item) => sum + item.priceUSD * item.quantity,
    0,
  );

  if (!isBoundedString(raw.orderDate, 40)) return null;
  const parsedTimestamp = Date.parse(raw.orderDate);
  if (!Number.isFinite(parsedTimestamp)) return null;

  return {
    id: raw.id.trim(),
    customerName: nameCheck.value,
    email: emailCheck.value,
    phoneNumber: parsedPhone.number,
    items: verifiedItems,
    subtotal: computedTotal,
    total: computedTotal,
    currency: "USD",
    orderDate: new Date(parsedTimestamp).toISOString(),
    status: "pending",
  };
};

/** Extracts honeypot fields and `_guardToken` from an order JSON request body. */
export function extractOrderSecurityMetadata(payload: unknown): {
  guardToken: string;
  honeypotValues: unknown[];
} {
  if (!isRecord(payload)) {
    return { guardToken: "", honeypotValues: [] };
  }

  const guardToken = typeof payload.guardToken === "string" ? payload.guardToken.trim() : "";
  const hpRecord = isRecord(payload.honeypots) ? payload.honeypots : {};

  return {
    guardToken,
    honeypotValues: [
      payload.website,
      payload.company_website,
      payload.company_url,
      payload.fax_number,
      hpRecord.website,
      hpRecord.company_url,
      hpRecord.fax_number,
    ],
  };
}
