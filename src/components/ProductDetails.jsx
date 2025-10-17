// ProductDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useStore((state) => state.products);

  // Find product by ID
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-details">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/products")}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <h2>Product Details</h2>
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> {product.price} MAD</p>
      <p><strong>Description:</strong> {product.description || "N/A"}</p>

      <button onClick={() => navigate("/products")} style={{ marginTop: "10px" }}>
        Back to Products
      </button>
    </div>
  );
}

export default ProductDetails;
