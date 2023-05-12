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
      cartItems,  // Add this line
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
            subject: "Thank you for your purchase!",
            text: `Thank you for your purchase. Please let me know if you have any questions. Feel free to reply to this email and I'll get back to you as soon as I can.
          
          Order Details:
          ${formatCustomerPaymentInfo(cartItems)}`,
          });
          

          // Send email to yourself with customer and payment information
await sendEmail({
  to: process.env.YOUR_EMAIL_ADDRESS,
  subject: "New payment received",
  text: `Customer information:\n${formatCustomerPaymentInfo(customer)}\nPayment information:\n${formatCustomerPaymentInfo(payment)}\nOrder Details:\n${formatCustomerPaymentInfo(cartItems)}`,
});
          

          res.status(200).json({ success: true });
        } catch (emailError) {
          res.status(500).json({ success: false, message: emailError.message });
        }
      } else {
        res.status(400).json({ success: false, message: "Payment failed" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }

  function formatCustomerPaymentInfo(cartItems) {
    if (!Array.isArray(cartItems)) {
        return 'No items in the cart';
    }

    return cartItems.map((item, index) => {
        return `Item ${index + 1}:
        Product ID: ${item.product._id}
        Product Name: ${item.product.name}
        Price: $${item.product.price}
        Quantity: ${item.quantity}\n`;
    }).join('\n');
}

  
};
