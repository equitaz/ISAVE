import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/contact
 * Receives event inquiry form data and forwards it as a formatted email
 * via SMTP. Configure the transporter via environment variables in .env.local.
 *
 * Required env vars:
 *   SMTP_HOST     e.g. smtp.gmail.com
 *   SMTP_PORT     e.g. 587
 *   SMTP_USER     your sending address
 *   SMTP_PASS     app password or SMTP password
 *   CONTACT_EMAIL recipient address (the company inbox)
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, eventDate, services, message } = body;

    // Basic server-side validation
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Build the transporter from env vars
    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST   || "smtp.gmail.com",
      port:   Number(process.env.SMTP_PORT  || 587),
      secure: Number(process.env.SMTP_PORT  || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipient = process.env.CONTACT_EMAIL || process.env.SMTP_USER || "";

    const servicesList =
      Array.isArray(services) && services.length > 0
        ? services.join(", ")
        : "Not specified";

    const dateStr = eventDate
      ? new Date(eventDate).toLocaleDateString("en-US", {
          weekday: "long", year: "numeric", month: "long", day: "numeric",
        })
      : "Not specified";

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 24px; }
  .card { background: #fff; border-radius: 12px; padding: 32px; max-width: 560px; margin: 0 auto; }
  h2 { color: #1a1a2e; margin: 0 0 24px; }
  .row { margin-bottom: 16px; }
  .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin-bottom: 4px; }
  .value { font-size: 15px; color: #111; }
  .pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .pill { background: #e8f4ff; color: #1a6bbf; border-radius: 999px; padding: 4px 14px; font-size: 13px; }
  .msg { background: #f9f9f9; border-left: 3px solid #2a9ffa; padding: 12px 16px; border-radius: 4px; font-size: 14px; color: #333; line-height: 1.6; white-space: pre-wrap; }
  .footer { margin-top: 28px; font-size: 12px; color: #aaa; border-top: 1px solid #eee; padding-top: 16px; }
</style>
</head>
<body>
<div class="card">
  <h2>📋 New Event Inquiry — ISAVE</h2>
  <div class="row">
    <div class="label">Name</div>
    <div class="value">${escHtml(name)}</div>
  </div>
  <div class="row">
    <div class="label">Email</div>
    <div class="value"><a href="mailto:${escHtml(email)}">${escHtml(email)}</a></div>
  </div>
  <div class="row">
    <div class="label">Event Date</div>
    <div class="value">${escHtml(dateStr)}</div>
  </div>
  <div class="row">
    <div class="label">Services Requested</div>
    <div class="pills">
      ${(Array.isArray(services) ? services : []).map(
        (s: string) => `<span class="pill">${escHtml(s)}</span>`
      ).join("")}
    </div>
  </div>
  <div class="row">
    <div class="label">Message</div>
    <div class="msg">${escHtml(message || "—")}</div>
  </div>
  <div class="footer">Sent via ISAVE website contact form · Reply directly to this email to respond to ${escHtml(name)}.</div>
</div>
</body>
</html>`;

    await transporter.sendMail({
      from:    `"ISAVE Website" <${process.env.SMTP_USER}>`,
      to:      recipient,
      replyTo: `"${name}" <${email}>`,
      subject: `New Event Inquiry from ${name}`,
      html,
      text: [
        `New Event Inquiry — ISAVE Production`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Event Date: ${dateStr}`,
        `Services: ${servicesList}`,
        `Message:\n${message || "—"}`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] email error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}

function escHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
