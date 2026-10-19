import nodemailer, { type Transporter } from "nodemailer";
import type { Order } from "@/types/store";
import { getOrderEmailTemplate } from "./templates";

class EmailService {
  private transporter: Transporter | null = null;

  private getTransporter() {
    if (this.transporter) return this.transporter;

    // Use SMTP environment variables or fallback to a standard pool
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.warn(
        "SMTP_USER or SMTP_PASS not set. Emails will be logged to console in development mode."
      );
      return null;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    return this.transporter;
  }

  async sendOrderConfirmation(order: Order): Promise<{ success: boolean; simulated?: boolean }> {
    const fromName = process.env.SMTP_FROM_NAME || "Sumaira Arts Studio";
    const fromEmail = process.env.SMTP_USER || "orders@sumairaarts.com";
    const adminEmailCC = process.env.ADMIN_EMAIL_CC;

    const transporter = this.getTransporter();
    const htmlContent = getOrderEmailTemplate(order);

    if (!transporter) {
      // Development simulated fallback
      console.log(`\n======================================================`);
      console.log(`[SIMULATED EMAIL] To: ${order.email}`);
      console.log(`[SIMULATED EMAIL] Subject: Sumaira Arts Order Confirmation - #${order.id}`);
      console.log(`[SIMULATED EMAIL] Total: $${order.total} USD for ${order.items.length} items`);
      console.log(`======================================================\n`);
      return { success: true, simulated: true };
    }

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: order.email,
        cc: adminEmailCC,
        subject: `Your Sumaira Arts Order #${order.id} Confirmation`,
        html: htmlContent,
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to dispatch email:", error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
