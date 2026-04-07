import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/* ---------------- TRANSPORTER ---------------- */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ---------------- BOOKING EMAIL ---------------- */

export const sendBookingEmail = async (
  userEmail,
  userName,
  eventTitle
) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Booking Confirmed: ${eventTitle}`,
      html: `
        <h2>Hi ${userName}!</h2>
        <p>Your booking for <strong>${eventTitle}</strong> is confirmed.</p>
        <p>Thank you for using Eventora 🚀</p>
      `,
    });

    console.log("✅ Booking Email Sent");
  } catch (error) {
    console.error("❌ Email Error:", error.message);
  }
};

/* ---------------- OTP EMAIL ---------------- */

export const sendOtpEmail = async (userEmail, otp, type) => {
  try {
    const title =
      type === "account_verification"
        ? "Verify your account"
        : "Booking Verification";

    const msg =
      type === "account_verification"
        ? "Use this OTP to verify your account"
        : "Use this OTP to confirm booking";

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: title,
      html: `
        <div style="text-align:center;font-family:Arial">
          <h2>${title}</h2>
          <p>${msg}</p>
          <h1 style="letter-spacing:5px">${otp}</h1>
          <p style="font-size:12px;color:gray">
            Expires in 5 minutes
          </p>
        </div>
      `,
    });

    console.log("✅ OTP Email Sent");
  } catch (error) {
    console.error("❌ Email Error:", error.message);
  }
};