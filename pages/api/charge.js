const { amount, paymentMethodId, currency, name, address: { line1, city, state, postal_code, country }, phoneNumber, email } = req.body;


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
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Payment failed" });
  }
} catch (error) {
  res.status(500).json({ success: false, message: error.message });
}
