//compnents/CartContext.js
import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const addToCart = (product, quantity = 1) => {
    setCart((prevState) => {
      const existingCartItemIndex = prevState.findIndex((item) => item.product._id === product._id);
  
      if (existingCartItemIndex > -1) {
        const updatedCart = [...prevState];
        updatedCart[existingCartItemIndex] = {
          ...updatedCart[existingCartItemIndex],
          quantity: updatedCart[existingCartItemIndex].quantity + quantity,
        };
        return updatedCart;
      } else {
        return [...prevState, { product, quantity }];
      }
    });
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.product._id !== product._id);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };
  

  const calculateTotalCost = () => {
    const cost = cart.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    setTotalCost(cost);
  };

  useEffect(() => {
    calculateTotalCost();
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalCost, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
