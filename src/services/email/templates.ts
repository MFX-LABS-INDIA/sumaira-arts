import type { Order } from "@/types/store";

export const getOrderEmailTemplate = (order: Order): string => {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 16px 14px; border-bottom: 1px solid #cde1f2; vertical-align: top;">
        <div style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 16px; font-weight: normal; color: #0d182a; line-height: 1.3;">
          ${item.title}
        </div>

        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #6b8cae; margin-top: 6px;">
          ${item.category} &nbsp;•&nbsp; ${item.collection}
        </div>
      </td>
      <td style="padding: 16px 14px; border-bottom: 1px solid #cde1f2; text-align: center; color: #3d5a80; font-size: 14px; font-weight: 500; vertical-align: top;">
        ${item.quantity}
      </td>
      <td style="padding: 16px 14px; border-bottom: 1px solid #cde1f2; text-align: right; color: #0d182a; font-family: 'Times New Roman', Times, Georgia, serif; font-size: 16px; vertical-align: top;">
        $${(item.priceUSD * item.quantity).toLocaleString()}
      </td>
    </tr>
  `
    )
    .join("");

  const formattedDate = new Date(order.orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fullLocation = [order.address, order.city, order.country].filter(Boolean).join(", ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation #${order.id} | Sumaira Arts</title>
</head>
<body style="margin: 0; padding: 32px 12px; background-color: #ebf1fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #3d5a80;">

  <!-- Outer wrapper card -->
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #cde1f2; box-shadow: 0 10px 30px -18px rgba(13, 24, 42, 0.35);">

    <!-- Header Section (Deep Navy tone="deep") -->
    <tr>
      <td style="background-color: #0d182a; padding: 44px 32px 36px 32px; text-align: center; border-bottom: 3px solid #1b3a6b;">
        <div style="color: #a8c5e0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 8px; font-weight: 500;">
          The Artist & Studio
        </div>
        <h1 style="margin: 0; font-family: 'Times New Roman', Times, Georgia, serif; font-size: 28px; font-weight: 300; letter-spacing: 0.12em; color: #ffffff;">
          SUMAIRA ARTS
        </h1>
        <div style="display: inline-block; width: 40px; height: 1px; background-color: #a8c5e0; margin: 16px 0 12px 0;"></div>
        <p style="margin: 0; color: #cde1f2; font-size: 12px; text-transform: uppercase; letter-spacing: 0.22em;">
          Contemporary & Sacred Calligraphy
        </p>
      </td>
    </tr>

    <!-- Salutation & Confirmation Banner -->
    <tr>
      <td style="padding: 36px 36px 20px 36px; background-color: #ffffff;">
        <span style="display: inline-block; border: 1px solid #cde1f2; background-color: #ebf1fa; color: #1b3a6b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; padding: 4px 12px; border-radius: 20px; font-weight: 600;">
          Order Confirmed
        </span>
        <h2 style="margin: 16px 0 0 0; font-family: 'Times New Roman', Times, Georgia, serif; font-size: 24px; font-weight: normal; color: #0d182a; letter-spacing: -0.01em;">
          Thank you for your order, ${order.customerName}.
        </h2>
        <p style="margin: 12px 0 0 0; font-size: 14px; line-height: 1.6; color: #3d5a80;">
          We have received your artwork commission order <strong style="color: #0d182a;">#${order.id}</strong>. Each bespoke piece is curated, registered, and packaged with museum-grade protective presentation at our studio in Dubai.
        </p>
      </td>
    </tr>

    <!-- Order Metadata Summary Card (tone="ice") -->
    <tr>
      <td style="padding: 0 36px 24px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #ebf1fa; border: 1px solid #cde1f2; border-radius: 8px; padding: 18px 20px;">
          <tr>
            <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #6b8cae;">
              Order Number
            </td>
            <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0d182a; text-align: right; font-family: monospace;">
              #${order.id}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #6b8cae;">
              Order Date
            </td>
            <td style="padding: 6px 0; font-size: 13px; color: #0d182a; text-align: right;">
              ${formattedDate}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #6b8cae;">
              Contact Phone
            </td>
            <td style="padding: 6px 0; font-size: 13px; color: #0d182a; text-align: right;">
              ${order.phoneNumber}
            </td>
          </tr>
          ${
            fullLocation
              ? `
          <tr>
            <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #6b8cae; vertical-align: top;">
              Delivery Address
            </td>
            <td style="padding: 6px 0; font-size: 13px; color: #0d182a; text-align: right; max-width: 240px; line-height: 1.4;">
              ${fullLocation}
            </td>
          </tr>
          `
              : ""
          }
        </table>
      </td>
    </tr>

    <!-- Curated Artworks Table -->
    <tr>
      <td style="padding: 0 36px 32px 36px;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; color: #1b3a6b; font-weight: 600; margin-bottom: 12px;">
          Acquired Artworks
        </div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #cde1f2; border-radius: 8px; overflow: hidden;">
          <thead>
            <tr style="background-color: #ebf1fa; border-bottom: 1px solid #cde1f2;">
              <th style="padding: 12px 14px; text-align: left; font-size: 11px; font-weight: 600; color: #1b3a6b; text-transform: uppercase; letter-spacing: 0.2em;">
                Piece
              </th>
              <th style="padding: 12px 14px; text-align: center; font-size: 11px; font-weight: 600; color: #1b3a6b; text-transform: uppercase; letter-spacing: 0.2em;">
                Qty
              </th>
              <th style="padding: 12px 14px; text-align: right; font-size: 11px; font-weight: 600; color: #1b3a6b; text-transform: uppercase; letter-spacing: 0.2em;">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr style="background-color: #ebf1fa;">
              <td colspan="2" style="padding: 16px 14px; text-align: right; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; color: #0d182a;">
                Total Investment:
              </td>
              <td style="padding: 16px 14px; text-align: right; font-family: 'Times New Roman', Times, Georgia, serif; font-size: 20px; font-weight: normal; color: #1b3a6b;">
                $${order.total.toLocaleString()} USD
              </td>
            </tr>
          </tfoot>
        </table>
      </td>
    </tr>

    <!-- Studio Packaging & Handling Details (Branded Callout) -->
    <tr>
      <td style="padding: 0 36px 36px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-left: 3px solid #1b3a6b; border-radius: 4px; padding: 18px 20px;">
          <tr>
            <td>
              <div style="font-size: 12px; font-weight: 600; color: #0d182a; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 4px;">
                Certificate & Studio Packaging
              </div>
              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #3d5a80;">
                Each original artwork includes a signed certificate of authenticity and is protected with custom conservation packaging. Courier tracking details will be dispatched as soon as the piece is safely secured for transit.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Studio Sign-off -->
    <tr>
      <td style="padding: 0 36px 36px 36px; border-top: 1px solid #cde1f2; padding-top: 28px;">
        <p style="margin: 0 0 6px 0; font-size: 13px; color: #6b8cae;">
          Warm regards,
        </p>
        <p style="margin: 0; font-family: 'Times New Roman', Times, Georgia, serif; font-size: 18px; color: #0d182a;">
          Sumaira Mohammed Ashik & Studio
        </p>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #6b8cae;">
          Dubai, United Arab Emirates &nbsp;•&nbsp; 
          <a href="https://sumaira-arts.vercel.app" style="color: #1b3a6b; text-decoration: none; font-weight: 500;">
            sumaira-arts.vercel.app
          </a>
        </p>
      </td>
    </tr>

    <!-- Footer Copyright -->
    <tr>
      <td style="background-color: #0d182a; padding: 22px 32px; text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #a8c5e0;">
        © ${new Date().getFullYear()} Sumaira Arts. All rights reserved.
      </td>
    </tr>

  </table>
</body>
</html>`;
};
