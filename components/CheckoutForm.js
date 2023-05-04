import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";

export default function CheckoutForm({ totalCost, cartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [name, setName] = React.useState("");
  const [addressLine1, setAddressLine1] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message);
    } else {
      setError(""); // Reset the error message

      const response = await fetch("/api/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalCost * 100, // Convert to cents
          paymentMethodId: paymentMethod.id,
          currency: "usd", // You can change this to your preferred currency
          name,
          address: {
            line1: addressLine1,
            city,
            state,
            postal_code: postalCode,
            country,
          },
          phoneNumber,
          email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Payment succeeded");
        router.push("/success"); // Navigate to the success page
      } else {
        console.log("Payment failed:", data.message);
        setError(data.message); // Set the error message
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-3 py-2 border border-zinc-600 rounded-md"
      />
      <input
        type="text"
        placeholder="Address Line 1"
        value={addressLine1}
        onChange={(e) => setAddressLine1(e.target.value)}
        required
        className="w-full px-3 py-2 border border-zinc-600 rounded-md"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full px-3 py-2 border border-zinc-600 rounded-md"
        />
        <input
          type="text"
          placeholder="State/Province/Region"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className="w-full px-3 py-2 border border-zinc-600 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          className="w-full px-3 py-2 border border-zinc-600 rounded-md"
        />
        <input
  type="text"
  placeholder="Country"
  value="United States"
  readOnly
  className="w-full px-3 py-2 border border-zinc-600 rounded-md"
/>

      </div>
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        className="w-full px-3 py-2 border border-zinc-600 rounded-md"
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-3 py-2 border border-zinc-600 rounded-md"
      />
      <CardElement className="border border-zinc-600 p-2 rounded-md" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-600 text-white w-full px-4 py-2 mt-4 rounded-md"
      >
        Pay
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}
