export type WebhookResult = "sent" | "not-configured" | "failed";

/**
 * Sends a form submission to a webhook (Zapier, Make, Formspree, your CRM's form endpoint...).
 * Returns "not-configured" when the endpoint env var is empty, so callers can say so honestly
 * instead of pretending the submission went anywhere.
 */
export async function postToWebhook(
  endpoint: string | undefined,
  payload: Record<string, unknown>,
): Promise<WebhookResult> {
  if (!endpoint) return "not-configured";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
