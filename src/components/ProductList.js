// src/components/ProductList.js
import React, { useState } from "react";
import ProductItem from "./ProductItem";
import useFetchProducts from "../hooks/useFetchProducts";
import useCart from "../hooks/useCart";

const ProductList = () => {
  const { products, loading, error } = useFetchProducts();
  const { addItem } = useCart();
  const [sortOption, setSortOption] = useState("Alphabetical");
  const [order, setOrder] = useState("Ascending");
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const [selectedColorCategories, setSelectedColorCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const primaryColors = {
    Grays: ["Gray", "Grey"],
    WhitesAndBlacks: ["White", "Black"],
    Reds: ["Red"],
    Blues: ["Blue"],
    Greens: ["Green"],
    Yellows: ["Yellow"],
    Browns: ["Brown"],
    Oranges: ["Orange"],
    Purples: ["Purple"],
  };

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleDimensionChange = (e) => {
    const value = e.target.value;
    setSelectedDimensions((prev) =>
      prev.includes(value)
        ? prev.filter((dim) => dim !== value)
        : [...prev, value]
    );
  };

  const handleColorCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedColorCategories((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const matchesColorCategory = (product) => {
    if (selectedColorCategories.length === 0) return true;
    return selectedColorCategories.some((category) =>
      primaryColors[category].some((color) =>
        product.color.toLowerCase().includes(color.toLowerCase())
      )
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.color.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDimension = selectedDimensions.length > 0
      ? selectedDimensions.includes(product.dimension)
      : true;
    return matchesSearch && matchesDimension && matchesColorCategory(product);
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    let comparison = 0;
    if (sortOption === "Alphabetical") {
      comparison = a.color.localeCompare(b.color);
    } else if (sortOption === "Price") {
      comparison = a.price - b.price;
    } else if (sortOption === "Availability") {
      comparison = (a.availability === b.availability) ? 0 : a.availability ? -1 : 1;
    }

    return order === "Ascending" ? comparison : -comparison;
  });

  const dimensions = [
    "1x1", "1x2", "1x3", "1x4", "1x6", "1x8", "2x2", "2x3", "2x4",
    "2x6", "2x8", "2x10", "2x12", "2x16", "3x3", "4x4", "4x6", "4x8",
    "4x10", "6x6", "6x8", "6x10", "6x12", "6x14", "6x16", "8x8", "8x10",
    "8x16", "10x10", "12x12"
  ];

  return (
    <div className="container">
      <h1>Brick Catalog</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="sort-controls">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="Alphabetical">Alphabetical</option>
          <option value="Price">Price</option>
          <option value="Availability">Availability</option>
        </select>

        <label htmlFor="order">Order:</label>
        <select id="order" value={order} onChange={handleOrderChange}>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
      <div className="dimension-filters">
        {dimensions.map((dim) => (
          <label key={dim}>
            <input
              type="checkbox"
              value={dim}
              checked={selectedDimensions.includes(dim)}
              onChange={handleDimensionChange}
            />
            {dim}
          </label>
        ))}
      </div>
      <div className="color-category-filters">
        {Object.keys(primaryColors).map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={selectedColorCategories.includes(category)}
              onChange={handleColorCategoryChange}
            />
            {category}
          </label>
        ))}
      </div>
      <div className="product-list">
        {loading && <p>Loading products...</p>}
        {error && <p>Error loading products: {error}</p>}
        {sortedProducts.map((product) => (
          <ProductItem
            key={product.color + product.dimension}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
