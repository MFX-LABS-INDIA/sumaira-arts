import { google } from "googleapis";
import type { Order } from "@/types/store";

class SheetsService {
  private readonly orderHeaders = [
    "Order ID",
    "Date & Time",
    "Status",
    "Full Name",
    "Mobile Number",
    "Email",
    "Address",
    "Category",
    "Product Name",
    "Quantity",
    "Price (USD)",
  ];

  private sheets: ReturnType<typeof google.sheets> | null = null;
  private spreadsheetId: string | null = null;

  private async initializeSheets(): Promise<void> {
    if (this.sheets && this.spreadsheetId) {
      return;
    }

    this.spreadsheetId = process.env.GOOGLE_SHEETS_ID || null;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS;

    if (!this.spreadsheetId) {
      console.warn("[SHEETS SERVICE] GOOGLE_SHEETS_ID not configured.");
      return;
    }

    try {
      if (clientEmail && privateKey) {
        // Clean private key: convert escaped newlines into real ones
        let formattedKey = privateKey;
        if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
          formattedKey = formattedKey.slice(1, -1);
        }
        formattedKey = formattedKey.replace(/\\n/g, "\n");

        const auth = new google.auth.JWT({
          email: clientEmail,
          key: formattedKey,
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        this.sheets = google.sheets({ version: "v4", auth });
        return;
      }

      if (credentialsJson) {
        const credentials = JSON.parse(credentialsJson);
        const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        await auth.getClient();
        this.sheets = google.sheets({ version: "v4", auth });
        return;
      }
    } catch (error) {
      console.error(
        "[SHEETS SERVICE] Failed to initialize Google Sheets:",
        error instanceof Error ? error.name : "Unknown error"
      );
      this.sheets = null;
      throw error;
    }
  }

  private formatOrderRows(order: Order): Array<Array<string | number>> {
    const timestamp = new Date(order.orderDate).toLocaleString("en-GB", {
      timeZone: "Asia/Qatar",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    return order.items.map((item) => [
      order.id,
      timestamp,
      order.status === "pending"
        ? "Under Review"
        : order.status.charAt(0).toUpperCase() + order.status.slice(1),
      order.customerName,
      order.phoneNumber,
      order.email,
      order.address || "",
      item.category,
      item.title,
      item.quantity,
      item.priceUSD,
    ]);
  }

  private async ensureHeaders(sheetName: string): Promise<void> {
    if (!this.sheets || !this.spreadsheetId) return;

    const spreadsheet = await this.sheets.spreadsheets.get({
      spreadsheetId: this.spreadsheetId,
    });

    const sheetExists = spreadsheet.data.sheets?.some(
      (s) => s.properties?.title === sheetName
    );

    if (!sheetExists) {
      await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: { title: sheetName },
              },
            },
          ],
        },
      });
    }

    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!A1:K`,
    });
    const existingRows = response.data.values ?? [];
    const existingHeaders = existingRows[0]?.map(String) ?? [];

    if (
      existingHeaders.length === this.orderHeaders.length &&
      this.orderHeaders.every((header, index) => existingHeaders[index] === header)
    ) {
      return;
    }

    const legacyHeaders = [
      "Date & Time",
      "Category",
      "Product Name",
      "Quantity",
      "Email",
      "Mobile Number",
      "Full Name",
      "Address",
    ];
    const isLegacyLayout =
      existingHeaders.length === legacyHeaders.length &&
      legacyHeaders.every((header, index) => existingHeaders[index] === header);
    const isLegacyLayoutWithoutAddress =
      existingHeaders.length === legacyHeaders.length - 1 &&
      legacyHeaders.slice(0, -1).every((header, index) => existingHeaders[index] === header);

    const previousAdminHeaders = this.orderHeaders.slice(0, -1);
    const previousHeadersWithRequestId = [
      "Request ID",
      ...this.orderHeaders.slice(1, -1),
    ];
    const previousHeadersWithRequestIdAndPrice = [
      "Request ID",
      ...this.orderHeaders.slice(1),
    ];
    const isPreviousAdminLayoutWithoutPrice =
      existingHeaders.length === previousAdminHeaders.length &&
      previousAdminHeaders.every((header, index) => existingHeaders[index] === header);
    const isPreviousAdminLayoutWithRequestId =
      existingHeaders.length === previousHeadersWithRequestId.length &&
      previousHeadersWithRequestId.every((header, index) => existingHeaders[index] === header);
    const isPreviousAdminLayoutWithRequestIdAndPrice =
      existingHeaders.length === previousHeadersWithRequestIdAndPrice.length &&
      previousHeadersWithRequestIdAndPrice.every(
        (header, index) => existingHeaders[index] === header
      );
    const hasAdminLayout =
      isPreviousAdminLayoutWithoutPrice ||
      isPreviousAdminLayoutWithRequestId ||
      isPreviousAdminLayoutWithRequestIdAndPrice;

    if (
      existingHeaders.length > 0 &&
      !isLegacyLayout &&
      !isLegacyLayoutWithoutAddress &&
      !hasAdminLayout
    ) {
      throw new Error("The order enquiry sheet has an unrecognised column layout.");
    }

    const migratedRows = existingRows.slice(1).map((row) => {
      if (isPreviousAdminLayoutWithRequestIdAndPrice) {
        return row;
      }

      if (isPreviousAdminLayoutWithoutPrice || isPreviousAdminLayoutWithRequestId) {
        return [...row, ""];
      }

      return [
        "",
        row[0] ?? "",
        "Existing",
        row[6] ?? "",
        row[5] ?? "",
        row[4] ?? "",
        isLegacyLayout ? row[7] ?? "" : "",
        row[1] ?? "",
        row[2] ?? "",
        row[3] ?? "",
        "",
      ];
    });

    await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!A1:K${Math.max(existingRows.length, 1)}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [this.orderHeaders, ...migratedRows],
      },
    });
  }

  async saveOrder(order: Order, sheetName: string = "Order Enquiries"): Promise<boolean> {
    try {
      await this.initializeSheets();

      if (!this.sheets || !this.spreadsheetId) {
        console.warn("[SHEETS SERVICE] Google Sheets is not configured.");
        return false;
      }

      await this.ensureHeaders(sheetName);

      const rows = this.formatOrderRows(order);

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:K`,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: rows,
        },
      });

      console.log(`[SHEETS SERVICE] Order ${order.id} saved to Google Sheets successfully.`);
      return true;
    } catch (error) {
      console.error(
        "[SHEETS SERVICE] Error saving order to Google Sheets:",
        error instanceof Error ? error.name : "Unknown error"
      );
      throw error;
    }
  }
}

export const sheetsService = new SheetsService();
