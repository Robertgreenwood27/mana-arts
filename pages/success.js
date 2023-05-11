//pages/success.js
import React from "react";
import Link from "next/link";
import { useContext } from "react";
import CartContext from "../components/CartContext";


export default function Success() {
  const { clearCart } = useContext(CartContext);
  clearCart();
  return (
    <div className="max-w-screen-lg mx-auto mt-8 p-8 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Thank you for choosing Mana Arts</h1>
      <p>An email receipt has been sent to your email address.</p>
      <Link href="/" legacyBehavior>
        <a className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md">Back to Home</a>
      </Link>
    </div>
  );
}
