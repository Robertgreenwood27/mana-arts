// pages/checkout.js
import React, { useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import CartContext from "../components/CartContext";

const stripePromise = loadStripe("pk_live_51N35ZvCpcAu4mxfZRYHy1lhSexODaPoEi1BcoJEf6PGVj0sQztPXthHcR9AskLzzkRPIIvP9gcppLU8ypiGoN8tC00FEVQ9wSf");
//
// pk_test_51N35ZvCpcAu4mxfZrAz4Ns4YypKsWB0bZ6KxZrgnTKIU7zMBTHPXx630kc8AxTxzkQAjx1tae9I1zhmQdrDypZzM00GzuWICnm
export default function Checkout() {
  const { totalCost, cartItems } = useContext(CartContext);

  return (
    <div className="max-w-screen-lg mx-auto mt-8 bg-gray-100 p-8 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <Elements stripe={stripePromise}>
      <CheckoutForm totalCost={totalCost} cartItems={cartItems} />
      </Elements>
    </div>
  );
}
