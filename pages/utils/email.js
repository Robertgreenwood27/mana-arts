const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, text }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
