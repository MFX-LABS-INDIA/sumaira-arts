import { NextRequest, NextResponse } from "next/server";
import type { Order } from "@/types/store";
import { emailService } from "@/services/email";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const order: Order = body.order;

    if (!order || !order.email || !order.items || order.items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data. Customer email and items are required." },
        { status: 400 }
      );
    }

    // Process email sending
    const emailResult = await emailService.sendOrderConfirmation(order);

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        message: "Order placed and confirmation email sent successfully.",
        simulated: emailResult.simulated ?? false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order processing API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process order or dispatch confirmation email.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
