import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ totalCost }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
  
    if (error) {
      console.error(error);
    } else {
      // Replace 1000 with the actual amount (in cents) you want to charge
      const amount = Math.round(totalCost * 100);
    const currency = "usd";
  
      try {
        const response = await fetch("/api/charge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            currency,
            paymentMethodId: paymentMethod.id,
          }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          console.log("Payment successful");
        } else {
          console.error("Payment failed:", data.message);
        }
      } catch (error) {
        console.error("Error while processing payment:", error);
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
