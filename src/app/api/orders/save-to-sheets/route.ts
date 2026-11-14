import { NextRequest, NextResponse } from "next/server";
import { sheetsService } from "@/services/sheets";
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

    const saved = await sheetsService.saveOrder(order);
    if (!saved) {
      return NextResponse.json(
        { error: "Order enquiries are not connected. Please contact the studio." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order successfully recorded in Google Sheets",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Save to sheets API error:",
      error instanceof Error ? error.name : "Unknown error"
    );
    return NextResponse.json(
      {
        error: "We could not record your request. Please contact the studio.",
      },
      { status: 500 }
    );
  }
}
