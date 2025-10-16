// OrderCard.jsx
import React, { useState } from "react";
import "../App.css";
import { products } from "../data/products";
import useStore from "../store/useStore";

function OrderCard() {
  const addOrder = useStore((state) => state.setOrder); // Add orders to Zustand
  const [quantities, setQuantities] = useState({}); // Local quantity state for UI

  // Function to handle quantity changes
  const handleQuantityChange = (product) => {
    setQuantities((prev) => {
      const newQuantity = (prev[product.id] || 0) + 1;
      const updated = { ...prev, [product.id]: newQuantity };

      // Add or update order in Zustand store
      if (newQuantity > 0) {
        addOrder({
          id: Date.now() + product.id,
          customerName: "Guest", // Can later be updated in order form
          product: product.name,
          quantity: newQuantity,
          price: product.price,
          status: "pending",
        });
      }

      return updated;
    });
  };

  const handleDecrease = (product) => {
    setQuantities((prev) => {
      const newQuantity = Math.max((prev[product.id] || 0) - 1, 0);
      const updated = { ...prev, [product.id]: newQuantity };
      return updated;
    });
  };

  return (
    <div className="order-card-wrapper">
      <div className="order-card-container">
        {products.map((product) => (
          <div className="order-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-img" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price} MAD</p>

            <div className="quantity-controls">
              <button onClick={() => handleDecrease(product)}>-</button>
              <span>{quantities[product.id] || 0}</span>
              <button onClick={() => handleQuantityChange(product)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderCard;
