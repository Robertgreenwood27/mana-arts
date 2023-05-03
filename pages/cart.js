import React, { useContext } from "react";
import CartContext from "../components/CartContext";
import Link from "next/link";


export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const totalCost = cart.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);


  return (
    <div className="max-w-screen-lg mx-auto mt-8">
    <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
    {cart.length === 0 ? (
        <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
              <li key={item.product._id} className="flex items-center justify-between mb-4">
                <span className="font-bold">{item.product.name}</span>
                <span className="font-semibold">x {item.quantity}</span>
                <span className="font-semibold">${item.product.price * item.quantity}</span>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md shadow"
                  onClick={() => removeFromCart(item.product)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-xl font-semibold">Total: ${totalCost.toFixed(2)}</p>
            <Link href="/checkout"legacyBehavior>
              <a className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md inline-block">
                Checkout
              </a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
