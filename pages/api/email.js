// pages/api/email.js
const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, text }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      to,
      subject,
      text,
    };

    console.log("Sending email with options:", mailOptions);

    const result = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully with result:", result);

    return result;
  } catch (error) {
    console.error("Error in sendEmail function:", error.message);
    throw error;
  }
}

module.exports = sendEmail;
