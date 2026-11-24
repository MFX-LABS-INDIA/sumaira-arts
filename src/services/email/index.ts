import nodemailer, { type Transporter } from "nodemailer";
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
    const fromName = process.env.SMTP_FROM_NAME || "Sumaira Arts Studio";
    const fromEmail = process.env.SMTP_USER || "orders@sumairaarts.com";
    const adminEmail = process.env.ENQUIRY_ADMIN_EMAIL || process.env.ADMIN_EMAIL_CC;
    return { fromName, fromEmail, adminEmail };
  }

  async sendOrderConfirmation(
    order: Order,
  ): Promise<{ success: boolean; simulated?: boolean }> {
    const { fromName, fromEmail, adminEmail } = this.getSenderIdentity();
    const transporter = this.getTransporter();

    if (!transporter) {
      console.warn("[SIMULATED EMAIL] SMTP is not configured; no email was sent.");
      return { success: false, simulated: true };
    }

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: order.email,
        replyTo: adminEmail,
        subject: `Order ID ${order.id} - Artwork Request Received | Sumaira Arts`,
        html: getOrderEmailTemplate(order, "client"),
        text: getOrderPlainText(order),
      });

      if (adminEmail) {
        try {
          await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: adminEmail,
            replyTo: order.email,
            subject: `New Artwork Order (${order.id}) — ${order.customerName} | Sumaira Arts`,
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

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      replyTo: enquiry.email,
      subject: `New Contact Us Enquiry — ${enquiry.name} | Sumaira Arts`,
      html: getEnquiryEmailTemplate(enquiry, "admin"),
      text: getEnquiryPlainText(enquiry),
    });

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: enquiry.email,
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

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      replyTo: booking.email,
      subject: `New ${booking.categoryTitle} Request (${booking.bookingId}) | Sumaira Arts`,
      html: getEventBookingEmailTemplate(booking, "admin"),
      text: getEventBookingPlainText(booking),
    });

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: booking.email,
        replyTo: adminEmail,
        subject: `${booking.categoryTitle} Request Received (${booking.bookingId}) | Sumaira Arts`,
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

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      replyTo: booking.email,
      subject: `New Workshop Booking (${booking.bookingId}) — ${booking.workshopFormat} | Sumaira Arts`,
      html: getWorkshopBookingEmailTemplate(booking, "admin"),
      text: getWorkshopBookingPlainText(booking),
    });

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: booking.email,
        replyTo: adminEmail,
        subject: `Workshop Booking Request Received (${booking.bookingId}) | Sumaira Arts`,
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
