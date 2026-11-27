import nodemailer, { type Transporter } from "nodemailer";
import { sanitizeEmailHeader } from "@/lib/security/sanitize";
import type { Order } from "@/types/store";
import type { Enquiry } from "@/types/enquiry";
import type { EventBooking } from "@/types/event-booking";
import type { WorkshopBooking } from "@/types/workshop-booking";
import {
  getEnquiryEmailTemplate,
  getEnquiryPlainText,
  getEventBookingEmailTemplate,
  getEventBookingPlainText,
  getOrderEmailTemplate,
  getOrderPlainText,
  getWorkshopBookingEmailTemplate,
  getWorkshopBookingPlainText,
} from "./templates";

class EmailService {
  private transporter: Transporter | null = null;

  private getTransporter() {
    if (this.transporter) return this.transporter;

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.warn("SMTP_USER or SMTP_PASS not set. Email was not sent.");
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

  private getSenderIdentity() {
    const fromName = sanitizeEmailHeader(
      process.env.SMTP_FROM_NAME || "Sumaira Arts Studio",
      80,
    ).replace(/"/g, "");
    const fromEmail = sanitizeEmailHeader(
      process.env.SMTP_USER || "orders@sumairaarts.com",
      254,
    );
    const rawAdmin = process.env.ENQUIRY_ADMIN_EMAIL || process.env.ADMIN_EMAIL_CC;
    const adminEmail = rawAdmin ? sanitizeEmailHeader(rawAdmin, 254) : undefined;
    return { fromName, fromEmail, adminEmail };
  }

  async sendOrderConfirmation(
    order: Order,
  ): Promise<{ success: boolean; simulated?: boolean }> {
    const { fromName, fromEmail, adminEmail } = this.getSenderIdentity();
    const transporter = this.getTransporter();
    const safeEmail = sanitizeEmailHeader(order.email, 254);
    const safeOrderId = sanitizeEmailHeader(order.id, 40);
    const safeCustomerName = sanitizeEmailHeader(order.customerName, 120);

    if (!transporter) {
      console.warn("[SIMULATED EMAIL] SMTP is not configured; no email was sent.");
      return { success: false, simulated: true };
    }

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: safeEmail,
        replyTo: adminEmail,
        subject: sanitizeEmailHeader(
          `Order ID ${safeOrderId} - Artwork Request Received | Sumaira Arts`,
        ),
        html: getOrderEmailTemplate(order, "client"),
        text: getOrderPlainText(order),
      });

      if (adminEmail) {
        try {
          await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: adminEmail,
            replyTo: safeEmail,
            subject: sanitizeEmailHeader(
              `New Artwork Order (${safeOrderId}) — ${safeCustomerName} | Sumaira Arts`,
            ),
            html: getOrderEmailTemplate(order, "admin"),
            text: getOrderPlainText(order),
          });
        } catch (adminError) {
          console.warn(
            "[EMAIL SERVICE] Admin notification for order failed:",
            adminError instanceof Error ? adminError.name : "Unknown error",
          );
        }
      }

      return { success: true };
    } catch (error) {
      console.error(
        "Failed to dispatch order confirmation email:",
        error instanceof Error ? error.name : "Unknown error",
      );
      throw error;
    }
  }

  async sendEnquiry(enquiry: Enquiry): Promise<boolean> {
    const transporter = this.getTransporter();
    const { fromName, fromEmail, adminEmail } = this.getSenderIdentity();
    if (!transporter || !adminEmail) return false;

    const safeEmail = sanitizeEmailHeader(enquiry.email, 254);
    const safeName = sanitizeEmailHeader(enquiry.name, 120);

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      replyTo: safeEmail,
      subject: sanitizeEmailHeader(
        `New Contact Us Enquiry — ${safeName} | Sumaira Arts`,
      ),
      html: getEnquiryEmailTemplate(enquiry, "admin"),
      text: getEnquiryPlainText(enquiry),
    });

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: safeEmail,
        replyTo: adminEmail,
        subject: "Enquiry Received | Sumaira Arts Studio",
        html: getEnquiryEmailTemplate(enquiry, "client"),
        text: getEnquiryPlainText(enquiry),
      });
    } catch (error) {
      console.warn(
        "[EMAIL SERVICE] Client acknowledgement for contact enquiry failed:",
        error instanceof Error ? error.name : "Unknown error",
      );
    }

    return true;
  }

  async sendEventBooking(booking: EventBooking): Promise<boolean> {
    const transporter = this.getTransporter();
    const { fromName, fromEmail, adminEmail } = this.getSenderIdentity();
    if (!transporter || !adminEmail) return false;

    const safeEmail = sanitizeEmailHeader(booking.email, 254);
    const safeCategory = sanitizeEmailHeader(booking.categoryTitle, 80);
    const safeBookingId = sanitizeEmailHeader(booking.bookingId, 40);

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      replyTo: safeEmail,
      subject: sanitizeEmailHeader(
        `New ${safeCategory} Request (${safeBookingId}) | Sumaira Arts`,
      ),
      html: getEventBookingEmailTemplate(booking, "admin"),
      text: getEventBookingPlainText(booking),
    });

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: safeEmail,
        replyTo: adminEmail,
        subject: sanitizeEmailHeader(
          `${safeCategory} Request Received (${safeBookingId}) | Sumaira Arts`,
        ),
        html: getEventBookingEmailTemplate(booking, "client"),
        text: getEventBookingPlainText(booking),
      });
    } catch (error) {
      console.warn(
        "[EMAIL SERVICE] Client confirmation for event booking failed:",
        error instanceof Error ? error.name : "Unknown error",
      );
    }

    return true;
  }

  async sendWorkshopBooking(booking: WorkshopBooking): Promise<boolean> {
    const transporter = this.getTransporter();
    const { fromName, fromEmail, adminEmail } = this.getSenderIdentity();
    if (!transporter || !adminEmail) return false;

    const safeEmail = sanitizeEmailHeader(booking.email, 254);
    const safeBookingId = sanitizeEmailHeader(booking.bookingId, 40);
    const safeFormat = sanitizeEmailHeader(booking.workshopFormat, 80);

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      replyTo: safeEmail,
      subject: sanitizeEmailHeader(
        `New Workshop Booking (${safeBookingId}) — ${safeFormat} | Sumaira Arts`,
      ),
      html: getWorkshopBookingEmailTemplate(booking, "admin"),
      text: getWorkshopBookingPlainText(booking),
    });

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: safeEmail,
        replyTo: adminEmail,
        subject: sanitizeEmailHeader(
          `Workshop Booking Request Received (${safeBookingId}) | Sumaira Arts`,
        ),
        html: getWorkshopBookingEmailTemplate(booking, "client"),
        text: getWorkshopBookingPlainText(booking),
      });
    } catch (error) {
      console.warn(
        "[EMAIL SERVICE] Client confirmation for workshop booking failed:",
        error instanceof Error ? error.name : "Unknown error",
      );
    }

    return true;
  }
}

export const emailService = new EmailService();
