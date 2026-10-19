import { NextRequest, NextResponse } from "next/server";
import type { Order } from "@/types/store";
import { sheetsService } from "@/services/sheets";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const order: Order = body.order;

    if (!order || !order.id) {
      return NextResponse.json(
        { error: "Order data is required" },
        { status: 400 }
      );
    }

    await sheetsService.saveOrder(order);

    return NextResponse.json(
      {
        success: true,
        message: "Order successfully recorded in Google Sheets",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Save to sheets API error:", error);
    return NextResponse.json(
      {
        error: "Failed to save order to Google Sheets",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
