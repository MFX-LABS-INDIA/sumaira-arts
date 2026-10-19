import { google } from "googleapis";
import type { Order } from "@/types/store";

class SheetsService {
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
      console.error("[SHEETS SERVICE] Failed to initialize Google Sheets:", error);
      this.sheets = null;
      throw error;
    }
  }

  private formatOrderRow(order: Order): string[] {
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Qatar",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    const artworkTitles = order.items
      .map((item) => `${item.title} (x${item.quantity})`)
      .join(", ");

    const categories = [...new Set(order.items.map((i) => i.category))].join(", ");
    const collections = [...new Set(order.items.map((i) => i.collection))].join(", ");

    const formattedTotal = `$${order.total.toLocaleString()} USD`;
    const fullLocation = `${order.address || ""}, ${order.city || ""}, ${order.country || ""}`;

    return [
      timestamp,
      order.id,
      order.customerName,
      order.phoneNumber,
      order.email,
      artworkTitles,
      categories,
      collections,
      formattedTotal,
      fullLocation,
      order.notes || "None",
    ];
  }

  private async ensureHeaders(sheetName: string = "Orders"): Promise<void> {
    if (!this.sheets || !this.spreadsheetId) return;

    try {
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
        range: `${sheetName}!A1:K1`,
      });

      const existingHeaders = response.data.values?.[0];
      const expectedHeaders = [
        "Timestamp",
        "Order ID",
        "Customer Name",
        "Mobile Phone",
        "Email",
        "Artworks Ordered",
        "Categories",
        "Collections",
        "Total Price",
        "Delivery Address",
        "Notes",
      ];

      if (!existingHeaders || existingHeaders.length === 0) {
        await this.sheets.spreadsheets.values.append({
          spreadsheetId: this.spreadsheetId,
          range: `${sheetName}!A1`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [expectedHeaders],
          },
        });
      }
    } catch (error) {
      console.warn("[SHEETS SERVICE] Error ensuring headers:", error);
    }
  }

  async saveOrder(order: Order, sheetName: string = "Orders"): Promise<void> {
    try {
      await this.initializeSheets();

      if (!this.sheets || !this.spreadsheetId) {
        console.warn("[SHEETS SERVICE] Google Sheets credentials not configured. Skipping remote save.");
        return;
      }

      await this.ensureHeaders(sheetName);

      const row = this.formatOrderRow(order);

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:K`,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [row],
        },
      });

      console.log(`[SHEETS SERVICE] Order ${order.id} saved to Google Sheets successfully.`);
    } catch (error) {
      console.error("[SHEETS SERVICE] Error saving order to Google Sheets:", error);
      throw error;
    }
  }
}

export const sheetsService = new SheetsService();
