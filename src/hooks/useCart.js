// src/hooks/useCart.js
import { useState, useEffect } from "react";

const useCart = () => {
  const [cart, setCart] = useState(() => {
    // Retrieve cart from local storage if available, else initialize as an empty array
    const savedCart = localStorage.getItem("shoppingCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Persist cart state to local storage whenever it changes
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]); // Only re-run the effect if cart changes

  const addItem = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Increase quantity if item is already in the cart
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item to the cart
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateItemQuantity = (itemId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return { cart, addItem, removeItem, updateItemQuantity, clearCart };
};

export default useCart;
