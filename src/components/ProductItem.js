// src/components/ProductItem.js
import React from "react";
import PropTypes from "prop-types";

const ProductItem = ({ product, onAddToCart }) => {
  const { imageURL, color, colorCategory, description, dimension, price, availability } = product;

  return (
    <div className="product-item">
      {imageURL ? (
        <img src={imageURL} alt={`${color} ${dimension}`} />
      ) : (
        <div className="image-placeholder">No Image Available</div>
      )}
      <h3>{`${color} ${dimension}`}</h3>
      <p>{description}</p>
      <p>Category: {colorCategory}</p>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Availability: {availability ? "In Stock" : "Out of Stock"}</p>
      {availability ? (
        <button onClick={() => onAddToCart(product)} className="btn btn-primary">Add to Cart</button>
      ) : (
        <button className="btn btn-secondary" disabled>Unavailable for Purchase</button>
      )}
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    imageURL: PropTypes.string,
    color: PropTypes.string.isRequired,
    colorCategory: PropTypes.string,
    description: PropTypes.string,
    dimension: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    availability: PropTypes.bool.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductItem;
