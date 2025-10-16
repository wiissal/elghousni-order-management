// OrderCard.jsx
import { useState } from "react";
import "../App.css";
import { products } from "../data/products"; // Import products list

function OrderCard() {
  const [quantities, setQuantities] = useState({}); // Track quantities for each product

  // Increase or decrease quantity
  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + change, 0), // Prevent negative quantities
    }));
  };

  return (
    <div className="order-card-wrapper">
      <div className="order-card-container">
        {products.map((product) => (
          <div className="order-card" key={product.id}>
            <img
              src={product.image} // Make sure images are imported in products.js
              alt={product.name}
              className="product-img"
            />

            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price} MAD</p>

            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
              <span>{quantities[product.id] || 0}</span>
              <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderCard;
