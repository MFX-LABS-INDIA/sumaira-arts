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
        "SMTP_USER or SMTP_PASS not set. Email was not sent."
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
      console.warn("[SIMULATED EMAIL] SMTP is not configured; no email was sent.");
      return { success: false, simulated: true };
    }

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: order.email,
        cc: adminEmailCC,
        subject: `Order ID ${order.id} - Artwork Request Received | Sumaira Arts`,
        html: htmlContent,
      });

      return { success: true };
    } catch (error) {
      console.error(
        "Failed to dispatch email:",
        error instanceof Error ? error.name : "Unknown error"
      );
      throw error;
    }
  }
}

export const emailService = new EmailService();
