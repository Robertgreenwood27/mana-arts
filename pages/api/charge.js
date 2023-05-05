const sendEmail = require("../utils/email");

async function handlePayment(req, res) {
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
    } else {
      res.status(400).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

app.post("/payment", async (req, res) => {
  try {
    await handlePayment(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
