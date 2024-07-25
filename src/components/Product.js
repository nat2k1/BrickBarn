// src/components/Product.js
import React from "react";
import useCart from "../hooks/useCart";

const Product = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;
