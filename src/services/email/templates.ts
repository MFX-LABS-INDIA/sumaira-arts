import type { Order } from "@/types/store";

export const getOrderEmailTemplate = (order: Order): string => {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 16px 12px; border-bottom: 1px solid #e2e8f0;">
        <div style="font-weight: 600; font-size: 15px; color: #0d182a;">${item.title}</div>
        ${item.titleAr ? `<div style="font-size: 13px; color: #6b8cae; direction: rtl;">${item.titleAr}</div>` : ""}
        <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Category: ${item.category} • Collection: ${item.collection}</div>
      </td>
      <td style="padding: 16px 12px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #3d5a80; font-weight: 500;">
        ${item.quantity}
      </td>
      <td style="padding: 16px 12px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #0d182a; font-weight: 600;">
        $${(item.priceUSD * item.quantity).toLocaleString()}
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Artwork Order Confirmation - Sumaira Arts</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #334155;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px -2px rgba(13, 24, 42, 0.08);">
    
    <!-- Header banner -->
    <tr>
      <td style="background-color: #0d182a; padding: 36px 32px; text-align: center; border-bottom: 3px solid #1b3a6b;">
        <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 400; letter-spacing: 0.05em; font-family: serif;">SUMAIRA ARTS</h1>
        <p style="color: #a8c5e0; margin: 8px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.2em;">Contemporary & Sacred Art Curation</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px;">
        <h2 style="color: #0d182a; margin-top: 0; font-size: 20px; font-weight: 600;">Artwork Order Confirmation</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #475569;">
          Dear <strong>${order.customerName}</strong>,
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #475569;">
          Thank you for choosing Sumaira Arts. We have received your artwork order <strong>#${order.id}</strong>. Each piece is handled with utmost care by our studio artisans.
        </p>

        <!-- Order Information Box -->
        <table width="100%" style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin: 24px 0;" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b;">Order Number:</td>
            <td style="padding: 6px 12px; font-size: 13px; font-weight: 600; color: #0d182a; text-align: right;">${order.id}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b;">Order Date:</td>
            <td style="padding: 6px 12px; font-size: 13px; font-weight: 600; color: #0d182a; text-align: right;">${new Date(order.orderDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b;">Customer Phone:</td>
            <td style="padding: 6px 12px; font-size: 13px; font-weight: 600; color: #0d182a; text-align: right;">${order.phoneNumber}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b;">Shipping Destination:</td>
            <td style="padding: 6px 12px; font-size: 13px; font-weight: 600; color: #0d182a; text-align: right;">${order.city ? `${order.city}, ` : ""}${order.country}</td>
          </tr>
        </table>

        <!-- Items Table -->
        <h3 style="font-size: 16px; color: #0d182a; margin: 24px 0 12px 0;">Curated Selection</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px;">
          <thead>
            <tr style="background-color: #ebf1fa;">
              <th style="padding: 12px; text-align: left; font-size: 12px; color: #1b3a6b; text-transform: uppercase; letter-spacing: 0.05em;">Artwork</th>
              <th style="padding: 12px; text-align: center; font-size: 12px; color: #1b3a6b; text-transform: uppercase; letter-spacing: 0.05em;">Qty</th>
              <th style="padding: 12px; text-align: right; font-size: 12px; color: #1b3a6b; text-transform: uppercase; letter-spacing: 0.05em;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 16px 12px; font-weight: 700; font-size: 16px; text-align: right; color: #0d182a;">Total:</td>
              <td style="padding: 16px 12px; font-weight: 700; font-size: 18px; text-align: right; color: #1b3a6b;">$${order.total.toLocaleString()} USD</td>
            </tr>
          </tfoot>
        </table>

        <!-- Art Advisor note -->
        <div style="background-color: #ebf1fa; border-left: 4px solid #1b3a6b; padding: 16px; border-radius: 4px; margin-top: 24px;">
          <h4 style="margin: 0 0 6px 0; color: #1b3a6b; font-size: 14px;">Next Steps & Packaging</h4>
          <p style="margin: 0; font-size: 13px; color: #3d5a80; line-height: 1.5;">
            Our art studio team will review your order and begin preparing museum-grade protective packaging. You will receive tracking details once the courier collection is arranged.
          </p>
        </div>

        <p style="margin-top: 32px; font-size: 14px; color: #64748b;">
          Warm regards,<br>
          <strong style="color: #0d182a;">The Sumaira Arts Studio Team</strong><br>
          <a href="mailto:info@sumairaarts.com" style="color: #1b3a6b; text-decoration: none;">info@sumairaarts.com</a>
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
        © ${new Date().getFullYear()} Sumaira Arts. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
