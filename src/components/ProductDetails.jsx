// ProductDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importing necessary hooks for routing like useParams and useNavigate
import useStore from "../store/useStore";

function ProductDetails() { // Product Details Component
  const { id } = useParams(); // Extracting product ID from URL parameters
  const navigate = useNavigate(); //hook to navigate between routes
  const products = useStore((state) => state.products); // Accessing products from global state store

  // Find product by ID
  const product = products.find((p) => p.id === Number(id));  //to  find the product with matching id

  if (!product) { // If product not found, display message
    return (
      <div className="product-details">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/products")}>Back to Products</button> {/* Button to navigate back to products list */}
      </div>
    );
  }

  return (
    <div className="product-details"> {/* Displaying product details */}
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
