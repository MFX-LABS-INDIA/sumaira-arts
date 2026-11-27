import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/services/email";
import { extractOrderSecurityMetadata, getOrderFromPayload } from "@/lib/orders";
import {
  consumeGuardNonce,
  isHoneypotTriggered,
  verifyFormGuard,
  verifySameOriginBrowserRequest,
} from "@/lib/security/form-guard";
import { checkSubmissionRateLimit, getTrustedClientIp } from "@/lib/security/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32 * 1024;

export async function POST(request: NextRequest) {
  try {
    if (!verifySameOriginBrowserRequest(request.headers)) {
      return NextResponse.json({ error: "Forbidden request origin." }, { status: 403 });
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request payload too large." }, { status: 413 });
    }

    let rawBody: string;
    let payload: unknown;
    try {
      rawBody = await request.text();
      if (rawBody.length > MAX_BODY_BYTES) {
        return NextResponse.json({ error: "Request payload too large." }, { status: 413 });
      }
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid order request." }, { status: 400 });
    }

    const { guardToken, honeypotValues } = extractOrderSecurityMetadata(payload);
    if (isHoneypotTriggered(honeypotValues)) {
      return NextResponse.json({ success: true, simulated: true }, { status: 200 });
    }

    const guardCheck = verifyFormGuard({
      token: guardToken,
      expectedScope: "checkout",
      honeypotValues,
      subChannel: "send-emails",
      consumeNonce: false,
    });

    if (!guardCheck.ok) {
      if (guardCheck.silentDrop) {
        return NextResponse.json({ success: true, simulated: true }, { status: 200 });
      }
      return NextResponse.json({ error: guardCheck.message }, { status: 403 });
    }

    const order = getOrderFromPayload(payload);
    if (!order) {
      return NextResponse.json(
        { error: "Valid customer and artwork details are required." },
        { status: 400 },
      );
    }

    const clientIp = getTrustedClientIp(request.headers);
    if (
      checkSubmissionRateLimit({
        scope: "order-emails",
        ip: clientIp,
        email: order.email,
      })
    ) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before trying again." },
        { status: 429 },
      );
    }

    if (!consumeGuardNonce(guardCheck.nonceKey)) {
      return NextResponse.json(
        { error: "Duplicate order submission detected." },
        { status: 409 },
      );
    }

    const emailResult = await emailService.sendOrderConfirmation(order);
    if (!emailResult.success) {
      return NextResponse.json(
        { error: "Order confirmation email is not connected. Please contact the studio." },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        message: "Artwork request received and confirmation email sent successfully.",
        simulated: emailResult.simulated ?? false,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Order processing API error:",
      error instanceof Error ? error.name : "Unknown error",
    );
    return NextResponse.json(
      {
        error: "We could not send your request confirmation. Please contact the studio.",
      },
      { status: 500 },
    );
  }
}
