import { useState } from "react";
// Import the global CSS file for styles
import "../App.css";

// Import the list of products from the data folder
import { products } from "../data/products";

function OrderCard() {
  // useState to store the quantity for each product
  // Example: { 1: 2, 2: 5 } means product with id 1 has quantity 2, id 2 has quantity 5
  let [quantities, setQuantities] = useState({});

  // Function to increase or decrease quantity
  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
      ...prev, // keep previous values
      [id]: Math.max((prev[id] || 0) + change, 0), // ensure quantity never goes below 0
    }));
  };
  return (
    // Wrapper to center all the cards on the screen
    <div className="order-card-wrapper">
      {/* Container that holds all product cards in a grid layout */}
      <div className="order-card-container">
        {/* Loop through each product in the array and create a card */}
        {products.map((product) => (
          <div className="order-card" key={product.id}>
            {/* Product image — you can replace this placeholder with a real image */}
            <img
              src={`/${product.image}`}
              alt={product.name}
              className="product-img"
            />

            {/* Product details */}
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price} MAD</p>

            {/* Quantity control buttons */}
            <div className="quantity-controls">
              {/* - button to decrease quantity */}
              <button onClick={() => handleQuantityChange(product.id, -1)}>
                -
              </button>

              {/* Display current quantity (default is 0 if not set) */}
              <span>{quantities[product.id] || 0}</span>

              {/* + button to increase quantity */}
              <button onClick={() => handleQuantityChange(product.id, 1)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export this component so it can be used in App.jsx
export default OrderCard;
