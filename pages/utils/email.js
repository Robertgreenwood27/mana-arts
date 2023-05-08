// pages/utils/email.js
const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, text }) {
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

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
