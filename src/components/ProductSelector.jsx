// ✅ ProductSelector.jsx
import React from "react";
import { products } from "../data/products";

function ProductSelector({ selectedProduct, onSelectProduct }) {
  return (
    <div className="product-selector">
      <label>Product:</label>
      <select
        value={selectedProduct}
        onChange={(e) => onSelectProduct(e.target.value)}
      >
        <option value="">-- Select Product --</option>
        {products.map((product) => (
          <option key={product.id} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductSelector; // ✅ make sure it's exported as default
