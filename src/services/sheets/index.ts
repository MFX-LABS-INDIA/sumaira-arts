import { google } from "googleapis";
import type { Order } from "@/types/store";
import type { Enquiry } from "@/types/enquiry";
import type { EventBooking } from "@/types/event-booking";
import type { WorkshopBooking } from "@/types/workshop-booking";

export const SHEET_TABS = {
  orders: "Orders",
  liveEvents: "Live Events",
  bookWorkshops: "Book Workshops",
  contactUs: "Contact Us",
} as const;

function quoteSheetName(title: string): string {
  return `'${title.replace(/'/g, "''")}'`;
}

function formatDubaiTimestamp(value: string | Date = new Date()): string {
  return new Date(value).toLocaleString("en-GB", {
    timeZone: "Asia/Dubai",
    dateStyle: "medium",
    timeStyle: "medium",
  });
}

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

  private readonly liveEventHeaders = [
    "Booking ID",
    "Submitted At",
    "Station",
    "Full Name",
    "Email",
    "Mobile Number",
    "Event Date",
    "Duration",
    "Hourly Rate (AED)",
    "Est. Pieces / Portraits",
    "Venue / Location",
    "Notes",
  ];

  private readonly workshopHeaders = [
    "Booking ID",
    "Submitted At",
    "Full Name",
    "Email",
    "Mobile Number",
    "Workshop Format",
    "Session Mode",
    "Group Size",
    "Skill Level",
    "Preferred Date",
    "Venue / City",
    "Notes",
  ];

  private readonly contactHeaders = [
    "Received At",
    "Name",
    "Email",
    "Mobile Number",
    "Address",
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
      this.sheets = null;
      throw error;
    }
  }

  private async resolveOrCreateSheet(
    requestedTitle: string,
  ): Promise<{ title: string; sheetId: number | null; created: boolean } | null> {
    if (!this.sheets || !this.spreadsheetId) return null;

    const spreadsheet = await this.sheets.spreadsheets.get({
      spreadsheetId: this.spreadsheetId,
    });

    const existing = spreadsheet.data.sheets?.find(
      (sheet) =>
        sheet.properties?.title?.trim().toLowerCase() ===
        requestedTitle.trim().toLowerCase(),
    );

    if (existing?.properties?.title) {
      return {
        title: existing.properties.title,
        sheetId: existing.properties.sheetId ?? null,
        created: false,
      };
    }

    const created = await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId: this.spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: requestedTitle } } }],
      },
    });

    const sheetId =
      created.data.replies?.[0]?.addSheet?.properties?.sheetId ?? null;

    return { title: requestedTitle, sheetId, created: true };
  }

  private async applyBrandHeaderStyle(
    sheetId: number | null,
    columnCount: number,
  ): Promise<void> {
    if (!this.sheets || !this.spreadsheetId || sheetId === null) return;

    try {
      await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requestBody: {
          requests: [
            {
              updateSheetProperties: {
                properties: {
                  sheetId,
                  gridProperties: { frozenRowCount: 1 },
                },
                fields: "gridProperties.frozenRowCount",
              },
            },
            {
              repeatCell: {
                range: {
                  sheetId,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: columnCount,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: {
                      red: 27 / 255,
                      green: 58 / 255,
                      blue: 107 / 255,
                    },
                    textFormat: {
                      foregroundColor: { red: 1, green: 1, blue: 1 },
                      bold: true,
                    },
                  },
                },
                fields: "userEnteredFormat(backgroundColor,textFormat)",
              },
            },
          ],
        },
      });
    } catch {
      // Non-fatal formatting enhancement
    }
  }

  private async ensureTabWithHeaders(
    requestedTitle: string,
    headers: string[],
  ): Promise<string | null> {
    await this.initializeSheets();
    if (!this.sheets || !this.spreadsheetId) return null;

    const resolved = await this.resolveOrCreateSheet(requestedTitle);
    if (!resolved) return null;

    const quoted = quoteSheetName(resolved.title);
    const endCol = String.fromCharCode(64 + headers.length);
    const headerRange = `${quoted}!A1:${endCol}1`;

    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: headerRange,
    });
    const rows = response.data.values ?? [];
    const existingHeaders = rows[0]?.map(String) ?? [];

    if (rows.length === 0) {
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: headerRange,
        valueInputOption: "RAW",
        requestBody: { values: [headers] },
      });
      await this.applyBrandHeaderStyle(resolved.sheetId, headers.length);
      return resolved.title;
    }

    if (
      existingHeaders.length !== headers.length ||
      !headers.every((header, index) => existingHeaders[index] === header)
    ) {
      throw new Error(
        `The "${resolved.title}" sheet has an unrecognised column layout.`,
      );
    }

    return resolved.title;
  }

  private formatOrderRows(order: Order): Array<Array<string | number>> {
    const timestamp = formatDubaiTimestamp(order.orderDate);

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

  private async ensureOrderHeaders(requestedTitle: string): Promise<string | null> {
    if (!this.sheets || !this.spreadsheetId) return null;

    const resolved = await this.resolveOrCreateSheet(requestedTitle);
    if (!resolved) return null;

    const quoted = quoteSheetName(resolved.title);
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `${quoted}!A1:K`,
    });
    const existingRows = response.data.values ?? [];
    const existingHeaders = existingRows[0]?.map(String) ?? [];

    if (
      existingHeaders.length === this.orderHeaders.length &&
      this.orderHeaders.every((header, index) => existingHeaders[index] === header)
    ) {
      return resolved.title;
    }

    if (existingRows.length === 0) {
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `${quoted}!A1:K1`,
        valueInputOption: "RAW",
        requestBody: { values: [this.orderHeaders] },
      });
      await this.applyBrandHeaderStyle(resolved.sheetId, this.orderHeaders.length);
      return resolved.title;
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
        (header, index) => existingHeaders[index] === header,
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
      throw new Error(`The "${resolved.title}" sheet has an unrecognised column layout.`);
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
      range: `${quoted}!A1:K${Math.max(existingRows.length, 1)}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [this.orderHeaders, ...migratedRows],
      },
    });
    await this.applyBrandHeaderStyle(resolved.sheetId, this.orderHeaders.length);

    return resolved.title;
  }

  async saveOrder(
    order: Order,
    sheetName: string = SHEET_TABS.orders,
  ): Promise<boolean> {
    try {
      await this.initializeSheets();

      if (!this.sheets || !this.spreadsheetId) {
        console.warn("[SHEETS SERVICE] Google Sheets is not configured.");
        return false;
      }

      const resolvedTab = await this.ensureOrderHeaders(sheetName);
      if (!resolvedTab) return false;

      const rows = this.formatOrderRows(order);

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${quoteSheetName(resolvedTab)}!A:K`,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: rows,
        },
      });

      console.log(
        `[SHEETS SERVICE] Order ${order.id} saved to Google Sheets (${resolvedTab}) successfully.`,
      );
      return true;
    } catch (error) {
      console.error(
        "[SHEETS SERVICE] Error saving order to Google Sheets:",
        error instanceof Error ? error.name : "Unknown error",
      );
      throw error;
    }
  }

  async saveEnquiry(enquiry: Enquiry): Promise<boolean> {
    const resolvedTab = await this.ensureTabWithHeaders(
      SHEET_TABS.contactUs,
      this.contactHeaders,
    );
    if (!resolvedTab || !this.sheets || !this.spreadsheetId) return false;

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: `${quoteSheetName(resolvedTab)}!A:E`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            formatDubaiTimestamp(),
            enquiry.name,
            enquiry.email,
            enquiry.phoneNumber,
            enquiry.address || "",
          ],
        ],
      },
    });

    return true;
  }

  async saveEventBooking(booking: EventBooking): Promise<boolean> {
    const resolvedTab = await this.ensureTabWithHeaders(
      SHEET_TABS.liveEvents,
      this.liveEventHeaders,
    );
    if (!resolvedTab || !this.sheets || !this.spreadsheetId) return false;

    const submittedLabel = formatDubaiTimestamp(booking.submittedAt);

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: `${quoteSheetName(resolvedTab)}!A:L`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            booking.bookingId,
            submittedLabel,
            booking.stationTitle,
            booking.name,
            booking.email,
            booking.phoneNumber,
            booking.eventDate,
            booking.duration,
            booking.hourlyRateAed,
            booking.guestCount || "",
            booking.location,
            booking.notes || "",
          ],
        ],
      },
    });

    return true;
  }

  async saveWorkshopBooking(booking: WorkshopBooking): Promise<boolean> {
    const resolvedTab = await this.ensureTabWithHeaders(
      SHEET_TABS.bookWorkshops,
      this.workshopHeaders,
    );
    if (!resolvedTab || !this.sheets || !this.spreadsheetId) return false;

    const submittedLabel = formatDubaiTimestamp(booking.submittedAt);

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: `${quoteSheetName(resolvedTab)}!A:L`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            booking.bookingId,
            submittedLabel,
            booking.name,
            booking.email,
            booking.phoneNumber,
            booking.workshopFormat,
            booking.sessionMode,
            booking.groupSize,
            booking.skillLevel,
            booking.preferredDate,
            booking.location || "",
            booking.notes || "",
          ],
        ],
      },
    });

    return true;
  }
}

export const sheetsService = new SheetsService();
