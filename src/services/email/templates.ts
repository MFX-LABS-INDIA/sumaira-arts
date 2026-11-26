import type { Order } from "@/types/store";
import type { Enquiry } from "@/types/enquiry";
import type { EventBooking } from "@/types/event-booking";
import type { WorkshopBooking } from "@/types/workshop-booking";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "") ||
  "https://sumaira-arts.vercel.app"
).replace(/\/+$/, "");
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

// Tables and inline styles keep the essential layout usable without embedded CSS.
function renderEmailButton(label: string, href: string): string {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" class="email-button" style="border-collapse: separate; margin-top: 20px;">
      <tr>
        <td align="center" bgcolor="#1b3a6b" style="border: 1px solid #1b3a6b; border-radius: 6px; mso-padding-alt: 14px 24px;">
          <a href="${escapeHtml(href)}" style="display: block; padding: 14px 24px; color: #ffffff; font-size: 14px; line-height: 20px; font-weight: 700; text-align: center; text-decoration: none; mso-padding-alt: 0;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>`;
}

function renderSummaryMetrics(metrics: SummaryMetric[]): string {
  if (metrics.length === 0) return "";

  return `
    <tr>
      <td class="email-pad-x" style="padding: 0 40px 28px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="table-layout: fixed; border: 1px solid #dce5ef; background: #f3f6fa; border-radius: 8px;">
          <tr>${metrics.map((metric, index) => `
            <td width="${100 / metrics.length}%" class="metric-cell" style="padding: 16px; vertical-align: top; ${index ? "border-left: 1px solid #dce5ef;" : ""} word-wrap: break-word; overflow-wrap: anywhere;">
              <div class="metric-label" style="color: #3d5a80; font-size: 11px; line-height: 18px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;">${escapeHtml(metric.label)}</div>
              <div class="metric-value" style="padding-top: 6px; color: #0d182a; font-size: 15px; line-height: 22px; font-weight: 700;">${escapeHtml(metric.value)}</div>
            </td>`).join("")}
          </tr>
        </table>
      </td>
    </tr>`;
}

function renderDetailRows(rows: Array<[string, string]>): string {
  return rows.map(([label, htmlValue], index) => `
    <tr>
      <th scope="row" class="detail-label" style="width: 34%; padding: 14px 16px; ${index ? "border-top: 1px solid #e2e8f0;" : ""} color: #3d5a80; font-size: 13px; line-height: 21px; font-weight: 400; text-align: left; vertical-align: top;">
        ${escapeHtml(label)}
      </th>
      <td class="detail-value" style="padding: 14px 16px; ${index ? "border-top: 1px solid #e2e8f0;" : ""} color: #0d182a; font-size: 14px; line-height: 21px; text-align: left; vertical-align: top; word-wrap: break-word; overflow-wrap: anywhere;">
        ${htmlValue}
      </td>
    </tr>`).join("");
}

function renderBrandEmailLayout(options: BrandEmailLayoutOptions): string {
  const {
    preheader, eyebrow, heading, subheading, audience, greetingName, introHtml,
    metrics = [], sectionTitle, detailRows, middleHtml = "", callout,
    sheetTabName, replyToEmail, nextStepsHtml, primaryLink,
  } = options;
  const isAdmin = audience === "admin";
  const greetingLine = isAdmin
    ? "Hello studio team,"
    : `Dear ${escapeHtml(greetingName || "Guest")},`;
  const action = isAdmin
    ? replyToEmail && { label: "Reply to client", href: `mailto:${encodeURIComponent(replyToEmail)}` }
    : primaryLink;
  const nextSteps = isAdmin
    ? "Review the details above and reply to the client to discuss availability and next steps."
    : nextStepsHtml || "Our Dubai studio will review your request and contact you using the details you shared.";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>${escapeHtml(heading)} | Sumaira Arts</title>
    <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
    <style>
      body, table, td, th, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td, th { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      table { border-spacing: 0; }
      img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      a:focus-visible { outline: 2px solid #b69252; outline-offset: 4px; }
      @media only screen and (max-width: 600px) {
        .email-outer { padding: 16px 8px !important; }
        .email-pad-x { padding-left: 22px !important; padding-right: 22px !important; }
        .email-masthead { padding-top: 20px !important; padding-bottom: 20px !important; }
        .email-hero { padding-top: 28px !important; padding-bottom: 28px !important; }
        .email-title { font-size: 29px !important; line-height: 35px !important; }
        .masthead-note { font-size: 10px !important; letter-spacing: 0.08em !important; }
        .metric-cell { display: block !important; width: auto !important; padding: 12px 14px !important; border-left: 0 !important; border-top: 1px solid #dce5ef !important; }
        .metric-cell:first-child { border-top: 0 !important; }
        .metric-label { display: inline-block !important; width: 40% !important; vertical-align: top !important; letter-spacing: 0 !important; }
        .metric-value { display: inline-block !important; width: 57% !important; padding-top: 0 !important; font-size: 14px !important; vertical-align: top !important; }
        .detail-label { display: block !important; width: auto !important; padding: 12px 14px 3px !important; font-size: 12px !important; }
        .detail-value { display: block !important; padding: 0 14px 12px !important; border-top: 0 !important; }
        .email-button { width: 100% !important; }
        .email-panel { padding: 20px !important; }
        .item-cell { padding: 12px 8px !important; }
        .item-title { width: 58% !important; }
        .item-amount { width: 42% !important; }
        .item-total { font-size: 16px !important; line-height: 23px !important; }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; width: 100%; background: #ebf1f7; color: #0d182a; font-family: Arial, Helvetica, sans-serif;">
    <div aria-hidden="true" style="display: none; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; overflow: hidden; opacity: 0; mso-hide: all;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ebf1f7">
      <tr>
        <td align="center" class="email-outer" style="padding: 40px 16px;">
          <!--[if mso]><table role="presentation" width="640" align="center" cellspacing="0" cellpadding="0"><tr><td><![endif]-->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; table-layout: fixed; margin: 0 auto; background: #ffffff; border: 1px solid #dce5ef; border-radius: 12px;">
            <tr>
              <td class="email-pad-x email-masthead" style="padding: 26px 40px; border-bottom: 3px solid #b69252;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="128" style="vertical-align: middle;">
                      <a href="${SITE_URL}" style="text-decoration: none; color: #1b3a6b;">
                        <img src="${BRAND_LOGO_URL}" alt="Sumaira Arts" width="112" height="70" style="display: block; width: 112px; height: 70px; color: #1b3a6b; font-size: 14px;">
                      </a>
                    </td>
                    <td align="right" class="masthead-note" style="vertical-align: middle; color: #3d5a80; font-size: 11px; line-height: 19px; letter-spacing: 0.12em; text-transform: uppercase;">
                      Art with meaning<br><span style="letter-spacing: 0; text-transform: none;">Dubai, UAE</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="#1b3a6b" class="email-pad-x email-hero" style="padding: 34px 40px 36px; background: #1b3a6b;">
                <p style="margin: 0 0 14px; color: #e4cfa8; font-size: 11px; line-height: 18px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;">${escapeHtml(eyebrow)}</p>
                <h1 class="email-title" style="margin: 0; color: #ffffff; font-family: Georgia, 'Times New Roman', serif; font-size: 36px; line-height: 43px; font-weight: 400; word-wrap: break-word; overflow-wrap: anywhere;">${escapeHtml(heading)}</h1>
                <p style="margin: 16px 0 0; color: #dce5ef; font-size: 14px; line-height: 22px; word-wrap: break-word; overflow-wrap: anywhere;">${escapeHtml(subheading)}</p>
              </td>
            </tr>
            <tr>
              <td class="email-pad-x" style="padding: 30px 40px 26px;">
                <p style="margin: 0 0 10px; color: #0d182a; font-size: 16px; line-height: 24px; font-weight: 700; overflow-wrap: anywhere;">${greetingLine}</p>
                <p style="margin: 0; color: #3d5a80; font-size: 15px; line-height: 25px; overflow-wrap: anywhere;">${introHtml}</p>
              </td>
            </tr>
            ${renderSummaryMetrics(metrics)}
            ${middleHtml}
            <tr>
              <td class="email-pad-x" style="padding: 0 40px 28px;">
                <h2 style="margin: 0 0 12px; color: #0d182a; font-size: 17px; line-height: 24px; font-weight: 700;">${escapeHtml(sectionTitle)}</h2>
                <table aria-label="${escapeHtml(sectionTitle)}" width="100%" cellspacing="0" cellpadding="0" style="table-layout: fixed; border: 1px solid #dce5ef; border-radius: 8px; background: #ffffff;">
                  ${renderDetailRows(detailRows)}
                </table>
              </td>
            </tr>
            ${callout ? `
            <tr>
              <td class="email-pad-x" style="padding: 0 40px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="table-layout: fixed; background: #f8f6f1; border-left: 3px solid #b69252;">
                  <tr><td style="padding: 18px 20px;">
                    <h2 style="margin: 0 0 8px; color: #3d5a80; font-size: 12px; line-height: 18px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;">${escapeHtml(callout.label)}</h2>
                    <p style="margin: 0; color: #0d182a; font-size: 14px; line-height: 23px; word-wrap: break-word; overflow-wrap: anywhere;">${formatMultilineHtml(callout.body)}</p>
                  </td></tr>
                </table>
              </td>
            </tr>` : ""}
            <tr>
              <td class="email-pad-x" style="padding: 0 40px 30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="table-layout: fixed; background: #f3f6fa; border: 1px solid #dce5ef; border-radius: 8px;">
                  <tr><td class="email-panel" style="padding: 24px;">
                    <h2 style="margin: 0 0 10px; color: #1b3a6b; font-size: 18px; line-height: 25px; font-weight: 700;">${isAdmin ? "Continue the conversation" : "What happens next"}</h2>
                    <p style="margin: 0; color: #3d5a80; font-size: 14px; line-height: 24px;">${nextSteps}</p>
                    ${action ? renderEmailButton(action.label, action.href) : ""}
                  </td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="email-pad-x" style="padding: 0 40px 30px;">
                ${isAdmin ? `<p style="margin: 0; color: #3d5a80; font-size: 12px; line-height: 20px;">Studio reference &middot; Google Sheets / ${escapeHtml(sheetTabName)}</p>` : `
                <p style="margin: 0; color: #3d5a80; font-size: 14px; line-height: 23px;">With appreciation,</p>
                <p style="margin: 4px 0 0; color: #1b3a6b; font-family: Georgia, 'Times New Roman', serif; font-size: 21px; line-height: 28px;">Sumaira Arts Studio</p>`}
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; table-layout: fixed; margin: 0 auto;">
            <tr>
              <td align="center" style="padding: 26px 20px 0;">
                <p style="margin: 0; color: #1b3a6b; font-size: 12px; line-height: 20px; font-weight: 700; letter-spacing: 0.1em;">SUMAIRA ARTS</p>
                <p style="margin: 6px 0 12px; color: #3d5a80; font-size: 12px; line-height: 20px;">Calligraphy, art &amp; meaningful experiences.</p>
                <p style="margin: 0; font-size: 12px; line-height: 28px;">
                  <a href="${SITE_URL}/products" style="display: inline-block; padding: 6px 8px; color: #1b3a6b; text-decoration: underline;">Artworks</a>
                  <a href="${SITE_URL}/live-events" style="display: inline-block; padding: 6px 8px; color: #1b3a6b; text-decoration: underline;">Live events</a>
                  <a href="${SITE_URL}/workshops" style="display: inline-block; padding: 6px 8px; color: #1b3a6b; text-decoration: underline;">Workshops</a>
                </p>
                <p style="margin: 4px 0 0; color: #3d5a80; font-size: 12px; line-height: 24px;">
                  <a href="https://www.instagram.com/sumaira_arts/" style="display: inline-block; padding: 6px; color: #3d5a80; text-decoration: underline;">@sumaira_arts</a>
                  &middot;
                  <a href="https://www.instagram.com/sumevents.ae" style="display: inline-block; padding: 6px; color: #3d5a80; text-decoration: underline;">@sumevents.ae</a>
                </p>
                <p style="margin: 12px 0 0; color: #3d5a80; font-size: 11px; line-height: 18px;">${isAdmin ? "A website request for the Sumaira Arts team." : "Sent in response to your request at Sumaira Arts."}</p>
              </td>
            </tr>
          </table>
          <!--[if mso]></td></tr></table><![endif]-->
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
          <td class="item-cell" style="padding: 16px; ${
            idx < order.items.length - 1 ? "border-bottom: 1px solid #dce8f5;" : ""
          } color: #0d182a; font-size: 14px; line-height: 22px;">
            <strong style="color: #0d182a;">${escapeHtml(item.title)}</strong>
            <div style="margin-top: 3px; font-size: 12px; line-height: 19px; color: #3d5a80;">
              ${escapeHtml(item.category)}
            </div>
            <div style="margin-top: 3px; font-size: 12px; line-height: 19px; color: #3d5a80;">Quantity: ${item.quantity}</div>
          </td>
          <td class="item-cell" style="padding: 16px; ${
            idx < order.items.length - 1 ? "border-bottom: 1px solid #dce8f5;" : ""
          } text-align: right; color: #0d182a; font-size: 14px; line-height: 22px; font-weight: 600;">
            ${formatCurrency(item.priceUSD * item.quantity)}
          </td>
        </tr>`,
    )
    .join("");

  const itemsTableHtml = `
    <tr>
      <td class="email-pad-x" style="padding: 0 40px 28px;">
        <h2 style="margin: 0 0 12px; color: #0d182a; font-size: 17px; line-height: 24px; font-weight: 700;">Selected artworks</h2>
        <table aria-label="Selected artworks" width="100%" cellspacing="0" cellpadding="0" style="table-layout: fixed; border-collapse: separate; word-wrap: break-word; overflow-wrap: anywhere; border: 1px solid #cde1f2; border-radius: 8px; overflow: hidden; background: #ffffff;">
          <thead>
            <tr style="background: #ebf1fa;">
              <th scope="col" width="62%" class="item-cell item-title" style="padding: 12px 16px; color: #1b3a6b; font-size: 11px; line-height: 18px; font-weight: 700; letter-spacing: 0.03em; text-align: left; text-transform: uppercase;">Artwork</th>
              <th scope="col" width="38%" class="item-cell item-amount" style="padding: 12px 16px; color: #1b3a6b; font-size: 11px; line-height: 18px; font-weight: 700; letter-spacing: 0.03em; text-align: right; text-transform: uppercase;">Amount</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot>
            <tr style="background: #f7fafe;">
              <td class="item-cell" style="padding: 16px; border-top: 1px solid #cde1f2; color: #3d5a80; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-align: left;">
                Request Total
              </td>
              <td class="item-cell item-total" style="padding: 16px; border-top: 1px solid #cde1f2; color: #1b3a6b; font-size: 18px; line-height: 25px; font-weight: 700; text-align: right;">
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
        ? "New artwork request"
        : "Your artwork request is with us",
    subheading: `Submitted ${formattedDate} (Dubai) · ${totalPieces} item${totalPieces === 1 ? "" : "s"}`,
    audience,
    greetingName: order.customerName,
    introHtml:
      audience === "admin"
        ? `A new artwork request (<strong>${escapeHtml(order.id)}</strong>) was placed by <strong>${escapeHtml(order.customerName)}</strong>.`
        : "Thank you for selecting pieces from Sumaira Arts. Our studio is verifying artwork availability and bespoke framing/shipping options before confirming your order.",
    metrics: [
      { label: "Order Reference", value: order.id },
      { label: "Total Items", value: `${totalPieces} ${totalPieces === 1 ? "Piece" : "Pieces"}` },
      { label: "Request Total", value: formatCurrency(order.total) },
    ],
    sectionTitle: "Client & Delivery Details",
    detailRows: [
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
    sheetTabName: "Orders",
    replyToEmail: order.email,
    nextStepsHtml:
      "Your submission is a reservation enquiry — no payment has been charged yet. We will reach out shortly to confirm artwork availability, shipping timeline, and payment details.",
    primaryLink: { label: "Browse Gallery", href: `${SITE_URL}/products` },
  });
};

/* -------------------------------------------------------------------------- */
/* 2. LIVE EVENTS                                                             */
/* -------------------------------------------------------------------------- */

export const getEventBookingPlainText = (booking: EventBooking): string => {
  return [
    `${booking.categoryTitle} Booking Request (${booking.bookingId})`,
    "",
    `Submitted At: ${formatDubaiDateTime(booking.submittedAt)} (Dubai)`,
    `Google Sheet Tab: Live Events`,
    "",
    `Full Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Mobile Number: ${booking.phoneNumber}`,
    `Event Category: ${booking.categoryTitle}`,
  ].join("\n");
};

export const getEventBookingEmailTemplate = (
  booking: EventBooking,
  audience: EmailAudience,
): string => {
  const formattedSubmitted = formatDubaiDateTime(booking.submittedAt);

  return renderBrandEmailLayout({
    preheader: `${booking.categoryTitle} (${booking.bookingId}) · ${booking.name}`,
    eyebrow: "Live Event Activation",
    heading: audience === "admin" ? "New live event request" : "Your event request is with us",
    subheading: booking.categoryTitle,
    audience,
    greetingName: booking.name,
    introHtml:
      audience === "admin"
        ? `A new <strong>${escapeHtml(booking.categoryTitle)}</strong> request (<strong>${escapeHtml(booking.bookingId)}</strong>) was submitted.`
        : `Thank you for requesting our <strong>${escapeHtml(booking.categoryTitle)}</strong> experience. Our live events team will reach out shortly to discuss your event date, setup, and customization details.`,
    metrics: [
      { label: "Booking ID", value: booking.bookingId },
      { label: "Event Category", value: booking.categoryTitle },
    ],
    sectionTitle: "Event & Client Details",
    detailRows: [
      ["Submitted At", `${escapeHtml(formattedSubmitted)} (Dubai)`],
      ["Event Category", `<strong>${escapeHtml(booking.categoryTitle)}</strong>`],
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
    sheetTabName: "Live Events",
    replyToEmail: booking.email,
    nextStepsHtml:
      "Sumaira's live events team will contact you within 24 hours to confirm availability, setup timing, and any custom event requirements.",
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
    `Workshop Session: ${booking.workshopFormat}`,
  ].join("\n");

export const getWorkshopBookingEmailTemplate = (
  booking: WorkshopBooking,
  audience: EmailAudience,
): string => {
  const formattedSubmitted = formatDubaiDateTime(booking.submittedAt);

  return renderBrandEmailLayout({
    preheader: `Workshop request ${booking.bookingId} — ${booking.workshopFormat}`,
    eyebrow: "Calligraphy & Art Workshops",
    heading: audience === "admin" ? "New workshop request" : "Your workshop request is with us",
    subheading: booking.workshopFormat,
    audience,
    greetingName: booking.name,
    introHtml:
      audience === "admin"
        ? `A new workshop enquiry (<strong>${escapeHtml(booking.bookingId)}</strong>) was submitted.`
        : `Thank you for requesting a calligraphy workshop with Sumaira Arts. Our studio will reach out shortly with upcoming session dates, timing, and material details.`,
    metrics: [
      { label: "Booking ID", value: booking.bookingId },
      { label: "Workshop Session", value: booking.workshopFormat },
    ],
    sectionTitle: "Session & Client Details",
    detailRows: [
      ["Submitted At", `${escapeHtml(formattedSubmitted)} (Dubai)`],
      ["Workshop Session", `<strong>${escapeHtml(booking.workshopFormat)}</strong>`],
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
    sheetTabName: "Book Workshops",
    replyToEmail: booking.email,
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
        ? "New studio enquiry"
        : "A conversation worth starting",
    subheading: `Received ${receivedLabel} (Dubai) · Sumaira Arts Studio`,
    audience,
    greetingName: enquiry.name,
    introHtml:
      audience === "admin"
        ? `<strong>${escapeHtml(enquiry.name)}</strong> sent a new enquiry through the website.`
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
    sheetTabName: "Contact Us",
    replyToEmail: enquiry.email,
    nextStepsHtml:
      "Whether you're commissioning a bespoke calligraphy canvas or planning a private gathering, Sumaira or a studio coordinator will follow up with you shortly.",
    primaryLink: { label: "Visit Sumaira Arts", href: SITE_URL },
  });
};
