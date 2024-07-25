// src/components/CartIcon.js
import React from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

const CartIcon = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-icon">
      <Link to="/cart">
        🛒 Cart
        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
      </Link>
    </div>
  );
};

export default CartIcon;
