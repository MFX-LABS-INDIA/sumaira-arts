import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/services/email";
import { getOrderFromPayload } from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid order request." }, { status: 400 });
    }

    const order = getOrderFromPayload(payload);
    if (!order) {
      return NextResponse.json(
        { error: "Valid customer and artwork details are required." },
        { status: 400 }
      );
    }

    const emailResult = await emailService.sendOrderConfirmation(order);
    if (!emailResult.success) {
      return NextResponse.json(
        { error: "Order confirmation email is not connected. Please contact the studio." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        message: "Artwork request received and confirmation email sent successfully.",
        simulated: emailResult.simulated ?? false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Order processing API error:",
      error instanceof Error ? error.name : "Unknown error"
    );
    return NextResponse.json(
      {
        error: "We could not send your request confirmation. Please contact the studio.",
      },
      { status: 500 }
    );
  }
}
