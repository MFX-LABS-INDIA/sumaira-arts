import type { Order } from "@/types/store";

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

const formatCurrency = (amount: number): string =>
  `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} USD`;

export const getOrderEmailTemplate = (order: Order): string => {
  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 14px 12px; border-bottom: 1px solid #dce5ef; color: #233750;">
            <strong>${escapeHtml(item.title)}</strong>
            <div style="margin-top: 5px; font-size: 12px; color: #6b7c91;">
              ${escapeHtml(item.category)}
            </div>
          </td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #dce5ef; text-align: center; color: #233750;">
            ${item.quantity}
          </td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #dce5ef; text-align: right; color: #233750;">
            ${formatCurrency(item.priceUSD * item.quantity)}
          </td>
        </tr>`
    )
    .join("");

  const formattedDate = new Date(order.orderDate).toLocaleString("en-GB", {
    timeZone: "Asia/Qatar",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const customerName = escapeHtml(order.customerName);
  const email = escapeHtml(order.email);
  const phoneNumber = escapeHtml(order.phoneNumber);
  const orderId = escapeHtml(order.id);
  const addressRow = order.address
    ? `<tr>
              <td style="padding: 10px 12px; color: #6b7c91; font-size: 13px;">Address</td>
              <td style="padding: 10px 12px; color: #233750; font-size: 13px; text-align: right;">${escapeHtml(order.address)}</td>
            </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Artwork Request Received | Sumaira Arts</title>
  </head>
  <body style="margin: 0; padding: 28px 12px; background: #f3f6fa; color: #26364a; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; overflow: hidden; border: 1px solid #dce5ef; border-radius: 10px; background: #ffffff;">
      <tr>
        <td style="padding: 28px 24px; background: #1b3a6b; text-align: center;">
          <h1 style="margin: 0; color: #ffffff; font-family: Georgia, 'Times New Roman', serif; font-size: 25px; font-weight: normal;">
            Artwork Request Received
          </h1>
          <p style="margin: 9px 0 0; color: #dce8f5; font-size: 14px;">
            Thank you for your interest in Sumaira Arts.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 26px 26px 10px;">
          <p style="margin: 0 0 12px; font-size: 15px;">Dear ${customerName},</p>
          <p style="margin: 0; color: #52657b; font-size: 14px; line-height: 1.65;">
            We have received your artwork request. Our studio is checking availability and will contact you to confirm the details. Your request is not a confirmed purchase yet.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 18px 26px 8px;">
          <h2 style="margin: 0 0 12px; color: #1b3a6b; font-size: 16px;">Request details</h2>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background: #f5f8fc;">
            <tr>
              <td style="padding: 10px 12px; color: #6b7c91; font-size: 13px;">Order ID</td>
              <td style="padding: 10px 12px; color: #233750; font-size: 13px; text-align: right;"><strong>${orderId}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; color: #6b7c91; font-size: 13px;">Date &amp; time</td>
              <td style="padding: 10px 12px; color: #233750; font-size: 13px; text-align: right;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; color: #6b7c91; font-size: 13px;">Email</td>
              <td style="padding: 10px 12px; color: #233750; font-size: 13px; text-align: right;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; color: #6b7c91; font-size: 13px;">Mobile number</td>
              <td style="padding: 10px 12px; color: #233750; font-size: 13px; text-align: right;">${phoneNumber}</td>
            </tr>
            ${addressRow}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 18px 26px 26px;">
          <h2 style="margin: 0 0 12px; color: #1b3a6b; font-size: 16px;">Selected artwork</h2>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #dce5ef;">
            <thead>
              <tr style="background: #f5f8fc;">
                <th style="padding: 10px 12px; color: #52657b; font-size: 11px; text-align: left; text-transform: uppercase;">Artwork</th>
                <th style="padding: 10px 12px; color: #52657b; font-size: 11px; text-align: center; text-transform: uppercase;">Qty</th>
                <th style="padding: 10px 12px; color: #52657b; font-size: 11px; text-align: right; text-transform: uppercase;">Amount</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 14px 12px; color: #233750; font-size: 13px; text-align: right;"><strong>Request total</strong></td>
                <td style="padding: 14px 12px; color: #1b3a6b; font-size: 15px; text-align: right;"><strong>${formatCurrency(order.total)}</strong></td>
              </tr>
            </tfoot>
          </table>
          <p style="margin: 20px 0 0; color: #52657b; font-size: 13px; line-height: 1.6;">
            We will be in touch using the contact details above once our review is complete.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 26px; border-top: 1px solid #dce5ef;">
          <p style="margin: 0 0 5px; color: #52657b; font-size: 13px;">Warm regards,</p>
          <p style="margin: 0; color: #1b3a6b; font-family: Georgia, 'Times New Roman', serif; font-size: 17px;">Sumaira Arts Studio</p>
          <p style="margin: 7px 0 0; font-size: 12px;">
            <a href="https://sumaira-arts.vercel.app" style="color: #1b3a6b; text-decoration: none;">sumaira-arts.vercel.app</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
