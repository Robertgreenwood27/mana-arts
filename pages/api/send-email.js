//\pages\api\send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, mailingAddress, city, state, zipCode, phoneNumber, description } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      

      const mailOptions = {
        from: process.env.NEXT_PUBLIC_EMAIL_USER,
        to: 'mana.arts.request@gmail.com',
        subject: 'New Request from Your Website',
        text: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nMailing Address: ${mailingAddress}\nCity: ${city}\nState: ${state}\nZip Code: ${zipCode}\nPhone: ${phoneNumber}\nDescription: ${description}`,
      };
      

    // pages/api/send-email.js
try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error); // Add this line to log the error
    res.status(500).json({ error: 'Failed to send the email.' });
  }  
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
