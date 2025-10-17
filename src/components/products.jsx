// Products.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import "../App.css";

function Products() {
  const navigate = useNavigate();
  const products = useStore(state => state.products);
  const addProduct = useStore(state => state.addProduct);
  const updateProduct = useStore(state => state.updateProduct);
  const removeProduct = useStore(state => state.removeProduct);

  const [form, setForm] = useState({ name: "", category: "", price: 0, description: "" });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return alert("Product name required!");

    if (editingId) {
      updateProduct(editingId, form);
      setEditingId(null);
    } else {
      addProduct({ ...form, id: Date.now() });
    }

    setForm({ name: "", category: "", price: 0, description: "" });
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  return (
    <div className="products-page">
      <h2>Manage Products</h2>

      {/* Product Form */}
      <form className="order-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">{editingId ? "Update" : "Add"} Product</button>
      </form>

      {/* Products List */}
      <div className="order-card-container">
        {products.map((p) => (
          <div
            key={p.id}
            className="order-card"
            onClick={() => navigate(`/products/${p.id}`)}
          >
            <h3>{p.name}</h3>
            <p>{p.category}</p>
            <p>{p.description}</p>
            <p>{p.price} MAD</p>
            <div className="product-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(p);
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeProduct(p.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
