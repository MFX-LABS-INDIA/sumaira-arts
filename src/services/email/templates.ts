import type { Order } from "@/types/store";
import type { Enquiry } from "@/types/enquiry";
import type { EventBooking } from "@/types/event-booking";
import type { WorkshopBooking } from "@/types/workshop-booking";

const SITE_URL = "https://sumaira-arts.vercel.app";
const BRAND_LOGO_URL = `${SITE_URL}/assets/brand/logo.png`;

type EmailAudience = "admin" | "client";

interface SummaryMetric {
  label: string;
  value: string;
}

interface CalloutBlock {
  label: string;
  body: string;
}

interface BrandEmailLayoutOptions {
  preheader: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  audience: EmailAudience;
  greetingName?: string;
  introHtml: string;
  metrics?: SummaryMetric[];
  sectionTitle: string;
  detailRows: Array<[string, string]>;
  middleHtml?: string;
  callout?: CalloutBlock;
  sheetTabName: string;
  replyToEmail?: string;
  replyToName?: string;
  nextStepsHtml?: string;
  primaryLink?: { label: string; href: string };
}

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });

const formatMultilineHtml = (value: string): string =>
  escapeHtml(value).replace(/\r?\n/g, "<br />");

const formatCurrency = (amount: number): string =>
  `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} USD`;

function formatDubaiDateTime(value: string | Date, timeZone: string = "Asia/Dubai"): string {
  return new Date(value).toLocaleString("en-GB", {
    timeZone,
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function renderSummaryMetrics(metrics: SummaryMetric[]): string {
  if (metrics.length === 0) return "";
  const widthPct = Math.floor(100 / metrics.length);

  const cells = metrics
    .map(
      (metric, idx) => `
        <td width="${widthPct}%" class="kpi-cell" style="padding: 12px 14px; background: #f7fafe; ${
          idx < metrics.length - 1 ? "border-right: 1px solid #cde1f2;" : ""
        } vertical-align: top;">
          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #6b8cae;">
            ${escapeHtml(metric.label)}
          </div>
          <div style="margin-top: 5px; font-size: 14px; font-weight: 700; color: #0d182a; line-height: 1.3;">
            ${escapeHtml(metric.value)}
          </div>
        </td>`,
    )
    .join("");

  return `
    <tr>
      <td style="padding: 0 28px 20px;" class="email-pad-x">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: separate; border: 1px solid #cde1f2; border-radius: 10px; overflow: hidden; background: #f7fafe;">
          <tr>${cells}</tr>
        </table>
      </td>
    </tr>`;
}

function renderDetailRows(rows: Array<[string, string]>): string {
  return rows
    .map(
      ([label, htmlValue], idx) => `
        <tr>
          <td style="padding: 11px 16px; width: 38%; ${
            idx < rows.length - 1 ? "border-bottom: 1px solid #dce8f5;" : ""
          } color: #6b8cae; font-size: 12px; font-weight: 600; letter-spacing: 0.04em; vertical-align: top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding: 11px 16px; width: 62%; ${
            idx < rows.length - 1 ? "border-bottom: 1px solid #dce8f5;" : ""
          } color: #0d182a; font-size: 13px; text-align: right; line-height: 1.5; vertical-align: top; word-break: break-word;">
            ${htmlValue}
          </td>
        </tr>`,
    )
    .join("");
}

function renderBrandEmailLayout(options: BrandEmailLayoutOptions): string {
  const {
    preheader,
    eyebrow,
    heading,
    subheading,
    audience,
    greetingName,
    introHtml,
    metrics = [],
    sectionTitle,
    detailRows,
    middleHtml = "",
    callout,
    sheetTabName,
    replyToEmail,
    replyToName,
    nextStepsHtml,
    primaryLink,
  } = options;

  const greetingLine =
    audience === "admin"
      ? "Hello Sumaira Arts Studio Team,"
      : `Dear ${escapeHtml(greetingName || "Guest")},`;

  const calloutHtml = callout
    ? `
      <tr>
        <td style="padding: 0 28px 20px;" class="email-pad-x">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #cde1f2; border-left: 3px solid #c8a86b; border-radius: 8px; background: #fbfcfe;">
            <tr>
              <td style="padding: 14px 16px;">
                <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #3d5a80;">
                  ${escapeHtml(callout.label)}
                </div>
                <p style="margin: 6px 0 0; font-size: 13px; line-height: 1.6; color: #0d182a;">
                  ${formatMultilineHtml(callout.body)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    : "";

  const adminPanelHtml =
    audience === "admin"
      ? `
      <tr>
        <td style="padding: 0 28px 26px;" class="email-pad-x">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #cde1f2; border-radius: 10px; background: #ebf1fa;">
            <tr>
              <td style="padding: 16px 18px;">
                <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #1b3a6b;">
                  Logged in Google Sheets
                </div>
                <p style="margin: 4px 0 14px; font-size: 13px; line-height: 1.5; color: #3d5a80;">
                  Recorded automatically in the <strong style="color: #0d182a;">${escapeHtml(sheetTabName)}</strong> tab.
                </p>
                ${
                  replyToEmail
                    ? `<a href="mailto:${encodeURIComponent(replyToEmail)}" style="display: inline-block; padding: 10px 18px; border-radius: 8px; background: #1b3a6b; color: #ffffff; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;">
                        Reply to ${escapeHtml(replyToName || "Client")}
                      </a>`
                    : ""
                }
              </td>
            </tr>
          </table>
        </td>
      </tr>`
      : `
      <tr>
        <td style="padding: 0 28px 26px;" class="email-pad-x">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #cde1f2; border-radius: 10px; background: #ebf1fa;">
            <tr>
              <td style="padding: 16px 18px;">
                <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #1b3a6b;">
                  What happens next
                </div>
                <p style="margin: 6px 0 ${primaryLink ? "14px" : "0"}; font-size: 13px; line-height: 1.65; color: #3d5a80;">
                  ${
                    nextStepsHtml ||
                    "Our studio team in Dubai will review your request and reply directly to your email or WhatsApp/mobile shortly."
                  }
                </p>
                ${
                  primaryLink
                    ? `<a href="${escapeHtml(primaryLink.href)}" style="display: inline-block; padding: 10px 18px; border-radius: 8px; background: #1b3a6b; color: #ffffff; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;">
                        ${escapeHtml(primaryLink.label)}
                      </a>`
                    : ""
                }
              </td>
            </tr>
          </table>
        </td>
      </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(heading)} | Sumaira Arts</title>
    <style>
      @media only screen and (max-width: 600px) {
        .email-outer { padding: 16px 8px !important; }
        .email-pad-x { padding-left: 18px !important; padding-right: 18px !important; }
        .kpi-cell {
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
          border-right: none !important;
          border-bottom: 1px solid #cde1f2 !important;
        }
        .kpi-cell:last-child { border-bottom: none !important; }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background: #ebf1fa; color: #0d182a; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <!-- Hidden Inbox Preheader -->
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; mso-hide: all;">
      ${escapeHtml(preheader)}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="email-outer" style="padding: 32px 12px; background: #ebf1fa;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; overflow: hidden; border: 1px solid #cde1f2; border-radius: 16px; background: #ffffff; box-shadow: 0 10px 30px -18px rgba(13, 24, 42, 0.25);">
            <!-- Brand Masthead -->
            <tr>
              <td align="center" style="padding: 20px 24px 16px; background: #ffffff; border-bottom: 2px solid #c8a86b;">
                <a href="${SITE_URL}" style="display: inline-block; text-decoration: none;">
                  <img
                    src="${BRAND_LOGO_URL}"
                    alt="Sumaira Arts"
                    height="46"
                    style="display: block; height: 46px; width: auto; border: 0; margin: 0 auto;"
                  />
                </a>
              </td>
            </tr>

            <!-- Editorial Navy Header -->
            <tr>
              <td align="center" style="padding: 28px 28px 26px; background: #0d182a; background-image: linear-gradient(135deg, #0d182a 0%, #1b3a6b 100%);" class="email-pad-x">
                <div style="display: inline-block; padding: 4px 12px; border: 1px solid rgba(168, 197, 224, 0.35); border-radius: 999px; background: rgba(255, 255, 255, 0.06); color: #a8c5e0; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;">
                  ${escapeHtml(eyebrow)}
                </div>
                <h1 style="margin: 12px 0 0; color: #ffffff; font-family: Georgia, 'Times New Roman', serif; font-size: 25px; font-weight: normal; line-height: 1.25;">
                  ${escapeHtml(heading)}
                </h1>
                <p style="margin: 8px 0 0; color: #cde1f2; font-size: 13px; line-height: 1.5;">
                  ${escapeHtml(subheading)}
                </p>
              </td>
            </tr>

            <!-- Greeting & Intro -->
            <tr>
              <td style="padding: 26px 28px 18px;" class="email-pad-x">
                <p style="margin: 0 0 10px; font-size: 15px; font-weight: 700; color: #0d182a;">
                  ${greetingLine}
                </p>
                <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #3d5a80;">
                  ${introHtml}
                </p>
              </td>
            </tr>

            <!-- KPI Summary Strip -->
            ${renderSummaryMetrics(metrics)}

            <!-- Primary Details Card -->
            <tr>
              <td style="padding: 0 28px 20px;" class="email-pad-x">
                <div style="margin: 0 0 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1b3a6b;">
                  ${escapeHtml(sectionTitle)}
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: separate; border: 1px solid #cde1f2; border-radius: 10px; overflow: hidden; background: #f7fafe;">
                  ${renderDetailRows(detailRows)}
                </table>
              </td>
            </tr>

            <!-- Middle Content (e.g. Line Items Table) -->
            ${middleHtml}

            <!-- Optional Notes / Address Callout -->
            ${calloutHtml}

            <!-- Audience Closing Panel -->
            ${adminPanelHtml}

            <!-- Studio Footer -->
            <tr>
              <td style="padding: 22px 28px; background: #f7fafe; border-top: 1px solid #cde1f2; text-align: center;" class="email-pad-x">
                <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: #1b3a6b;">
                  Sumaira Arts Studio
                </p>
                <p style="margin: 4px 0 0; font-size: 12px; color: #6b8cae;">
                  Arabic Calligraphy · Live Event Engraving · Bespoke Workshops · Dubai, UAE
                </p>
                <p style="margin: 12px 0 0; font-size: 12px;">
                  <a href="${SITE_URL}/products" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">Artworks</a>
                  <span style="color: #a8c5e0; margin: 0 8px;">&bull;</span>
                  <a href="${SITE_URL}/live-events" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">Live Events</a>
                  <span style="color: #a8c5e0; margin: 0 8px;">&bull;</span>
                  <a href="${SITE_URL}/workshops" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">Workshops</a>
                </p>
                <p style="margin: 8px 0 0; font-size: 11px; color: #6b8cae;">
                  Instagram:
                  <a href="https://www.instagram.com/sumaira_arts/?hl=en" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">@sumaira_arts</a>
                  &nbsp;&middot;&nbsp;
                  <a href="https://www.instagram.com/sumevents.ae" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">@sumevents.ae</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/* -------------------------------------------------------------------------- */
/* 1. ORDERS                                                                  */
/* -------------------------------------------------------------------------- */

export const getOrderPlainText = (order: Order): string => {
  const itemsText = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.title} (${item.category}) — Qty: ${item.quantity} — ${formatCurrency(
          item.priceUSD * item.quantity,
        )}`,
    )
    .join("\n");

  return [
    `Sumaira Arts — Artwork Order Request (${order.id})`,
    "",
    `Date & Time: ${formatDubaiDateTime(order.orderDate)} (Dubai)`,
    `Customer Name: ${order.customerName}`,
    `Email: ${order.email}`,
    `Mobile Number: ${order.phoneNumber}`,
    `Delivery Address: ${order.address || "Not provided"}`,
    "",
    "Selected Artworks:",
    itemsText,
    "",
    `Request Total: ${formatCurrency(order.total)}`,
    "Google Sheet Tab: Orders",
  ].join("\n");
};

export const getOrderEmailTemplate = (
  order: Order,
  audience: EmailAudience = "client",
): string => {
  const totalPieces = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const formattedDate = formatDubaiDateTime(order.orderDate);

  const itemsHtml = order.items
    .map(
      (item, idx) => `
        <tr>
          <td style="padding: 13px 16px; ${
            idx < order.items.length - 1 ? "border-bottom: 1px solid #dce8f5;" : ""
          } color: #0d182a; font-size: 13px;">
            <strong style="color: #0d182a;">${escapeHtml(item.title)}</strong>
            <div style="margin-top: 3px; font-size: 11px; color: #6b8cae;">
              ${escapeHtml(item.category)}
            </div>
          </td>
          <td style="padding: 13px 12px; ${
            idx < order.items.length - 1 ? "border-bottom: 1px solid #dce8f5;" : ""
          } text-align: center; color: #3d5a80; font-size: 13px;">
            ${item.quantity}
          </td>
          <td style="padding: 13px 16px; ${
            idx < order.items.length - 1 ? "border-bottom: 1px solid #dce8f5;" : ""
          } text-align: right; color: #0d182a; font-size: 13px; font-weight: 600;">
            ${formatCurrency(item.priceUSD * item.quantity)}
          </td>
        </tr>`,
    )
    .join("");

  const itemsTableHtml = `
    <tr>
      <td style="padding: 0 28px 20px;" class="email-pad-x">
        <div style="margin: 0 0 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1b3a6b;">
          Selected Artworks
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: separate; border: 1px solid #cde1f2; border-radius: 10px; overflow: hidden; background: #ffffff;">
          <thead>
            <tr style="background: #ebf1fa;">
              <th style="padding: 10px 16px; color: #1b3a6b; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-align: left; text-transform: uppercase;">Artwork</th>
              <th style="padding: 10px 12px; color: #1b3a6b; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-align: center; text-transform: uppercase;">Qty</th>
              <th style="padding: 10px 16px; color: #1b3a6b; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-align: right; text-transform: uppercase;">Amount</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot>
            <tr style="background: #f7fafe;">
              <td colspan="2" style="padding: 13px 16px; border-top: 1px solid #cde1f2; color: #3d5a80; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-align: right;">
                Request Total
              </td>
              <td style="padding: 13px 16px; border-top: 1px solid #cde1f2; color: #1b3a6b; font-size: 15px; font-weight: 700; text-align: right;">
                ${formatCurrency(order.total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </td>
    </tr>`;

  return renderBrandEmailLayout({
    preheader: `Order ${order.id} — ${totalPieces} artwork item${totalPieces === 1 ? "" : "s"} (${formatCurrency(order.total)})`,
    eyebrow: audience === "admin" ? "New Order Request" : "Order Request Received",
    heading:
      audience === "admin"
        ? `Artwork Order · ${order.id}`
        : "Your Artwork Request Is With Us",
    subheading: `Submitted ${formattedDate} (Dubai) · ${totalPieces} item${totalPieces === 1 ? "" : "s"}`,
    audience,
    greetingName: order.customerName,
    introHtml:
      audience === "admin"
        ? `A new artwork request (<strong>${escapeHtml(order.id)}</strong>) was placed by <strong>${escapeHtml(order.customerName)}</strong> and saved to the <strong>Orders</strong> Google Sheet tab.`
        : "Thank you for selecting pieces from Sumaira Arts. Our studio is verifying artwork availability and bespoke framing/shipping options before confirming your order.",
    metrics: [
      { label: "Order Reference", value: order.id },
      { label: "Total Items", value: `${totalPieces} ${totalPieces === 1 ? "Piece" : "Pieces"}` },
      { label: "Request Total", value: formatCurrency(order.total) },
    ],
    sectionTitle: "Client & Delivery Details",
    detailRows: [
      ["Order ID", `<strong>${escapeHtml(order.id)}</strong>`],
      ["Submitted At", `${escapeHtml(formattedDate)} (Dubai)`],
      ["Customer Name", escapeHtml(order.customerName)],
      [
        "Email",
        `<a href="mailto:${encodeURIComponent(order.email)}" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">${escapeHtml(order.email)}</a>`,
      ],
      [
        "Mobile Number",
        `<a href="tel:${escapeHtml(order.phoneNumber)}" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">${escapeHtml(order.phoneNumber)}</a>`,
      ],
    ],
    middleHtml: itemsTableHtml,
    callout: order.address
      ? { label: "Delivery Address", body: order.address }
      : undefined,
    sheetTabName: "Orders",
    replyToEmail: order.email,
    replyToName: order.customerName,
    nextStepsHtml:
      "Your submission is a reservation enquiry — no payment has been charged yet. We will reach out shortly to confirm artwork availability, shipping timeline, and payment details.",
    primaryLink: { label: "Browse Gallery", href: `${SITE_URL}/products` },
  });
};

/* -------------------------------------------------------------------------- */
/* 2. LIVE EVENTS                                                             */
/* -------------------------------------------------------------------------- */

export const getEventBookingPlainText = (booking: EventBooking): string => {
  const quantityLabel =
    booking.tab === "sketching" ? "Estimated Portraits" : "Estimated Pieces";
  return [
    `${booking.stationTitle} Booking Request (${booking.bookingId})`,
    "",
    `Submitted At: ${formatDubaiDateTime(booking.submittedAt)} (Dubai)`,
    `Hourly Rate: ${booking.hourlyRateAed} AED / hour`,
    `Google Sheet Tab: Live Events`,
    "",
    `Full Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Mobile Number: ${booking.phoneNumber}`,
    `Event Date: ${booking.eventDate}`,
    `Duration: ${booking.duration}`,
    `${quantityLabel}: ${booking.guestCount || "Not specified"}`,
    `Venue / Location: ${booking.location}`,
    `Notes: ${booking.notes || "None"}`,
  ].join("\n");
};

export const getEventBookingEmailTemplate = (
  booking: EventBooking,
  audience: EmailAudience,
): string => {
  const formattedSubmitted = formatDubaiDateTime(booking.submittedAt);
  const quantityLabel =
    booking.tab === "sketching" ? "Est. Portraits" : "Est. Pieces";

  return renderBrandEmailLayout({
    preheader: `${booking.stationTitle} (${booking.bookingId}) for ${booking.eventDate} · ${booking.duration}`,
    eyebrow: "Live Event Activation",
    heading: booking.stationTitle,
    subheading: `${booking.hourlyRateAed} AED / hour · ${booking.duration} · ${booking.eventDate}`,
    audience,
    greetingName: booking.name,
    introHtml:
      audience === "admin"
        ? `A new <strong>${escapeHtml(booking.stationTitle)}</strong> request (<strong>${escapeHtml(booking.bookingId)}</strong>) was submitted and logged in the <strong>Live Events</strong> Google Sheet tab.`
        : `Thank you for requesting our <strong>${escapeHtml(booking.stationTitle)}</strong> experience. We are checking artist calendar availability for <strong>${escapeHtml(booking.eventDate)}</strong> and will confirm setup details shortly.`,
    metrics: [
      { label: "Booking ID", value: booking.bookingId },
      { label: "Event Date", value: booking.eventDate },
      { label: "Station Rate", value: `${booking.hourlyRateAed} AED / hr` },
    ],
    sectionTitle: "Event & Client Details",
    detailRows: [
      ["Booking ID", `<strong>${escapeHtml(booking.bookingId)}</strong>`],
      ["Submitted At", `${escapeHtml(formattedSubmitted)} (Dubai)`],
      ["Station Selected", `<strong>${escapeHtml(booking.stationTitle)}</strong>`],
      ["Duration", escapeHtml(booking.duration)],
      [quantityLabel, escapeHtml(booking.guestCount || "Not specified")],
      ["Venue / Location", `<strong>${escapeHtml(booking.location)}</strong>`],
      ["Contact Name", escapeHtml(booking.name)],
      [
        "Email",
        `<a href="mailto:${encodeURIComponent(booking.email)}" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">${escapeHtml(booking.email)}</a>`,
      ],
      [
        "Mobile Number",
        `<a href="tel:${escapeHtml(booking.phoneNumber)}" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">${escapeHtml(booking.phoneNumber)}</a>`,
      ],
    ],
    callout: booking.notes
      ? { label: "Customization Notes", body: booking.notes }
      : undefined,
    sheetTabName: "Live Events",
    replyToEmail: booking.email,
    replyToName: booking.name,
    nextStepsHtml:
      "Sumaira's live events team will confirm date availability, arrival setup timing, and any metallic ink or framing customization within 24 hours.",
    primaryLink: { label: "View Live Events", href: `${SITE_URL}/live-events` },
  });
};

/* -------------------------------------------------------------------------- */
/* 3. BOOK WORKSHOPS                                                          */
/* -------------------------------------------------------------------------- */

export const getWorkshopBookingPlainText = (booking: WorkshopBooking): string =>
  [
    `Calligraphy Workshop Booking Request (${booking.bookingId})`,
    "",
    `Submitted At: ${formatDubaiDateTime(booking.submittedAt)} (Dubai)`,
    `Google Sheet Tab: Book Workshops`,
    "",
    `Full Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Mobile Number: ${booking.phoneNumber}`,
    `Workshop Format: ${booking.workshopFormat}`,
    `Session Mode: ${booking.sessionMode}`,
    `Group Size: ${booking.groupSize}`,
    `Skill Level: ${booking.skillLevel}`,
    `Preferred Date: ${booking.preferredDate}`,
    `Venue / City: ${booking.location || "To be confirmed"}`,
    `Notes: ${booking.notes || "None"}`,
  ].join("\n");

export const getWorkshopBookingEmailTemplate = (
  booking: WorkshopBooking,
  audience: EmailAudience,
): string => {
  const formattedSubmitted = formatDubaiDateTime(booking.submittedAt);

  return renderBrandEmailLayout({
    preheader: `Workshop request ${booking.bookingId} — ${booking.workshopFormat} on ${booking.preferredDate}`,
    eyebrow: "Calligraphy & Art Workshops",
    heading: "Workshop Booking Request",
    subheading: `${booking.workshopFormat} · ${booking.preferredDate}`,
    audience,
    greetingName: booking.name,
    introHtml:
      audience === "admin"
        ? `A new workshop enquiry (<strong>${escapeHtml(booking.bookingId)}</strong>) was submitted and saved in the <strong>Book Workshops</strong> Google Sheet tab.`
        : `Thank you for booking a calligraphy workshop with Sumaira Arts. We are reviewing schedule availability for <strong>${escapeHtml(booking.preferredDate)}</strong> and will reach out with session timing and material details.`,
    metrics: [
      { label: "Booking ID", value: booking.bookingId },
      { label: "Preferred Date", value: booking.preferredDate },
      { label: "Group Type", value: booking.groupSize },
    ],
    sectionTitle: "Session Preferences & Contact",
    detailRows: [
      ["Booking ID", `<strong>${escapeHtml(booking.bookingId)}</strong>`],
      ["Submitted At", `${escapeHtml(formattedSubmitted)} (Dubai)`],
      ["Workshop Format", `<strong>${escapeHtml(booking.workshopFormat)}</strong>`],
      ["Session Mode", escapeHtml(booking.sessionMode)],
      ["Group Size", escapeHtml(booking.groupSize)],
      ["Skill Level", escapeHtml(booking.skillLevel)],
      ["Preferred Date", `<strong>${escapeHtml(booking.preferredDate)}</strong>`],
      ["Venue / City", escapeHtml(booking.location || "To be confirmed")],
      ["Contact Name", escapeHtml(booking.name)],
      [
        "Email",
        `<a href="mailto:${encodeURIComponent(booking.email)}" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">${escapeHtml(booking.email)}</a>`,
      ],
      [
        "Mobile Number",
        `<a href="tel:${escapeHtml(booking.phoneNumber)}" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">${escapeHtml(booking.phoneNumber)}</a>`,
      ],
    ],
    callout: booking.notes
      ? { label: "Session Goals & Notes", body: booking.notes }
      : undefined,
    sheetTabName: "Book Workshops",
    replyToEmail: booking.email,
    replyToName: booking.name,
    nextStepsHtml:
      "All traditional qalam pens, calligraphic inks, and canvases are prepared by our studio for in-person UAE sessions (or a curated supply list for online cohorts). We'll reply shortly to finalize your date.",
    primaryLink: { label: "Explore Workshops", href: `${SITE_URL}/workshops` },
  });
};

/* -------------------------------------------------------------------------- */
/* 4. CONTACT US                                                              */
/* -------------------------------------------------------------------------- */

export const getEnquiryPlainText = (enquiry: Enquiry): string =>
  [
    "Sumaira Arts — Contact Us Enquiry",
    "",
    `Received At: ${formatDubaiDateTime(new Date())} (Dubai)`,
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Mobile Number: ${enquiry.phoneNumber}`,
    `Address: ${enquiry.address || "Not provided"}`,
    "Google Sheet Tab: Contact Us",
  ].join("\n");

export const getEnquiryEmailTemplate = (
  enquiry: Enquiry,
  audience: EmailAudience = "admin",
): string => {
  const receivedLabel = formatDubaiDateTime(new Date());

  return renderBrandEmailLayout({
    preheader:
      audience === "admin"
        ? `New Contact Us enquiry from ${enquiry.name} (${enquiry.email})`
        : "Thank you for contacting Sumaira Arts Studio — we've received your enquiry",
    eyebrow: "Contact Us Enquiry",
    heading:
      audience === "admin"
        ? `New Enquiry · ${enquiry.name}`
        : "Thank You for Reaching Out",
    subheading: `Received ${receivedLabel} (Dubai) · Sumaira Arts Studio`,
    audience,
    greetingName: enquiry.name,
    introHtml:
      audience === "admin"
        ? `<strong>${escapeHtml(enquiry.name)}</strong> submitted a general studio enquiry through the Contact Us dialog and was logged in the <strong>Contact Us</strong> Google Sheet tab.`
        : "Thank you for writing to Sumaira Arts. Your contact details have been received by our studio in Dubai, and we will get back to you personally.",
    sectionTitle: "Contact Details",
    detailRows: [
      ["Received At", `${escapeHtml(receivedLabel)} (Dubai)`],
      ["Full Name", `<strong>${escapeHtml(enquiry.name)}</strong>`],
      [
        "Email",
        `<a href="mailto:${encodeURIComponent(enquiry.email)}" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">${escapeHtml(enquiry.email)}</a>`,
      ],
      [
        "Mobile Number",
        `<a href="tel:${escapeHtml(enquiry.phoneNumber)}" style="color: #1b3a6b; text-decoration: none; font-weight: 600;">${escapeHtml(enquiry.phoneNumber)}</a>`,
      ],
    ],
    callout: enquiry.address
      ? { label: "Address / Message", body: enquiry.address }
      : undefined,
    sheetTabName: "Contact Us",
    replyToEmail: enquiry.email,
    replyToName: enquiry.name,
    nextStepsHtml:
      "Whether you're commissioning a bespoke calligraphy canvas or planning a private gathering, Sumaira or a studio coordinator will follow up with you shortly.",
    primaryLink: { label: "Visit Sumaira Arts", href: SITE_URL },
  });
};
