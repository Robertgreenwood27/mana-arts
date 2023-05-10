// pages/api/charge.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const sendEmail = require("./email");

export default async (req, res) => {
  if (req.method === "POST") {
    const {
      amount,
      paymentMethodId,
      currency,
      name,
      address: { line1, city, state, postal_code, country },
      phoneNumber,
      email,
    } = req.body;

    try {
      const customer = await stripe.customers.create({
        name,
        address: {
          line1,
          city,
          state,
          postal_code,
          country,
        },
        phone: phoneNumber,
        email,
      });

      const payment = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethodId,
        customer: customer.id,
        confirm: true,
      });

      if (payment.status === "succeeded") {
        try {
          // Send email to the customer
          await sendEmail({
            to: email,
            subject: "Thank you for your payment",
            text: `Thank you for your payment. An email receipt has been sent to ${email}.`,
          });

          // Send email to yourself with customer and payment information
          await sendEmail({
            to: process.env.YOUR_EMAIL_ADDRESS,
            subject: "New payment received",
            text: `Customer information: ${JSON.stringify(
              customer
            )}\nPayment information: ${JSON.stringify(payment)}`,
          });

          res.status(200).json({ success: true });
        } catch (emailError) {
          console.error("Error sending email:", emailError.message);
          res.status(500).json({ success: false, message: emailError.message });
        }
      } else {
        res.status(400).json({ success: false, message: "Payment failed" });
      }
    } catch (error) {
      console.error("Error in charge processing:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
