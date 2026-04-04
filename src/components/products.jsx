import React, { useState } from "react"
import { Save, Upload, Plus } from "lucide-react"
import useStore from "../store/useStore"
import { products as catalogProducts } from "../data/products"

const CATEGORIES = ["Olive Oil", "Olives", "Honey", "Processed Products", "Derived Products"]

function Products() {
  const products = useStore((state) => state.products)
  const addProduct = useStore((state) => state.addProduct)
  const removeProduct = useStore((state) => state.removeProduct)

  const [form, setForm] = useState({ name: "", category: "Olive Oil", price: 0, description: "" })
  const [editingId, setEditingId] = useState(null)

  // combine store products + catalog products for display
  const allProducts = [
    ...catalogProducts,
    ...products.filter((p) => !catalogProducts.find((c) => c.id === p.id)),
  ]

  const handleSubmit = () => {
    if (!form.name) return alert("Product name required!")
    if (editingId) {
      removeProduct(editingId)
      addProduct({ ...form, id: editingId })
      setEditingId(null)
    } else {
      addProduct({ ...form, id: Date.now() })
    }
    setForm({ name: "", category: "Olive Oil", price: 0, description: "" })
  }

  const handleEdit = (product) => {
    setForm(product)
    setEditingId(product.id)
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Manage Products</h2>
        <p style={styles.subtitle}>Add and manage your product catalog</p>
      </div>

      {/* Form Card */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>
          <Plus size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
          {editingId ? "Edit Product" : "Add New Product"}
        </h3>

        {/* Image Upload Area */}
        <div style={styles.field}>
          <label style={styles.label}>Product Image</label>
          <div style={styles.uploadArea}>
            <Upload size={24} color="#9e8f7a" />
            <p style={styles.uploadText}>Click to upload or drag and drop</p>
            <p style={styles.uploadHint}>PNG, JPG up to 10MB</p>
          </div>
        </div>

        {/* Product Name */}
        <div style={styles.field}>
          <label style={styles.label}>Product Name</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Price */}
        <div style={styles.field}>
          <label style={styles.label}>Price (MAD)</label>
          <input
            style={styles.input}
            type="number"
            placeholder="0"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
        </div>

        {/* Category Dropdown */}
        <div style={styles.field}>
          <label style={styles.label}>Category</label>
          <select
            style={styles.select}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button style={styles.btnPrimary} onClick={handleSubmit}>
            <Save size={15} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {editingId ? "Update Product" : "Save Product"}
          </button>
          {editingId && (
            <button
              style={styles.btnSecondary}
              onClick={() => {
                setEditingId(null)
                setForm({ name: "", category: "Olive Oil", price: 0, description: "" })
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Current Products List */}
      <div style={styles.listCard}>
        <h3 style={styles.formTitle}>Current Products</h3>
        <div style={styles.productList}>
          {allProducts.map((p) => (
            <div key={p.id} style={styles.productRow}>
              {/* Thumbnail */}
              <div style={styles.thumb}>
                {p.image
                  ? <img src={p.image} alt={p.name} style={styles.thumbImg} />
                  : <span style={{ fontSize: 20 }}>🫒</span>
                }
              </div>

              {/* Info */}
              <div style={styles.productInfo}>
                <span style={styles.categoryBadge}>{p.category}</span>
                <span style={styles.productName}>{p.name}</span>
              </div>

              {/* Price */}
              <span style={styles.productPrice}>{p.price} MAD</span>

              {/* Actions — only for store products not in catalog */}
              {products.find((sp) => sp.id === p.id) && (
                <div style={styles.rowActions}>
                  <button
                    style={styles.btnRowEdit}
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.btnRowDelete}
                    onClick={() => removeProduct(p.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    padding: "2rem",
    background: "#faf7f2",
    minHeight: "100vh",
    maxWidth: 600,
  },
  header: { marginBottom: "1.5rem" },
  title: {
    fontSize: 22,
    fontFamily: "Georgia, serif",
    color: "#2e4520",
    fontWeight: "normal",
    margin: 0,
  },
  subtitle: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#9e8f7a",
    marginTop: 4,
  },
  formCard: {
    background: "#fff",
    border: "1px solid #e8e0d0",
    borderRadius: 16,
    padding: "1.5rem",
    marginBottom: "1rem",
  },
  listCard: {
    background: "#fff",
    border: "1px solid #e8e0d0",
    borderRadius: 16,
    padding: "1.5rem",
  },
  formTitle: {
    fontFamily: "Georgia, serif",
    fontSize: 16,
    color: "#2e4520",
    fontWeight: "normal",
    margin: "0 0 1.25rem",
    display: "flex",
    alignItems: "center",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: "1rem",
  },
  label: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#5a4f3f",
    fontWeight: 500,
  },
  uploadArea: {
    border: "1.5px dashed #d4c9b0",
    borderRadius: 10,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    background: "#faf7f2",
    cursor: "pointer",
  },
  uploadText: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#9e8f7a",
    margin: 0,
  },
  uploadHint: {
    fontFamily: "sans-serif",
    fontSize: 11,
    color: "#c4b8a0",
    margin: 0,
  },
  input: {
    padding: "10px 14px",
    border: "1px solid #d4c9b0",
    borderRadius: 8,
    fontSize: 14,
    background: "#faf7f2",
    color: "#2e4520",
    outline: "none",
    fontFamily: "sans-serif",
  },
  select: {
    padding: "10px 14px",
    border: "1px solid #d4c9b0",
    borderRadius: 8,
    fontSize: 14,
    background: "#faf7f2",
    color: "#2e4520",
    outline: "none",
    fontFamily: "sans-serif",
    width: "fit-content",
  },
  btnPrimary: {
    padding: "10px 24px",
    background: "#3d5a2a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 13,
    fontFamily: "sans-serif",
    cursor: "pointer",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
  },
  btnSecondary: {
    padding: "10px 24px",
    background: "transparent",
    color: "#9e8f7a",
    border: "1px solid #d4c9b0",
    borderRadius: 8,
    fontSize: 13,
    fontFamily: "sans-serif",
    cursor: "pointer",
  },
  productList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxHeight: 400,
    overflowY: "auto",
  },
  productRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    border: "1px solid #f0e8d8",
    borderRadius: 10,
    background: "#faf7f2",
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    background: "#f2ece0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
  },
  thumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  productInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
  },
  categoryBadge: {
    display: "inline-block",
    padding: "2px 8px",
    background: "#f2ece0",
    color: "#c8973a",
    borderRadius: 10,
    fontSize: 11,
    fontFamily: "sans-serif",
    fontWeight: 500,
    width: "fit-content",
  },
  productName: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#2e4520",
    fontWeight: 500,
  },
  productPrice: {
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: "#c8973a",
    flexShrink: 0,
  },
  rowActions: {
    display: "flex",
    gap: 6,
  },
  btnRowEdit: {
    padding: "4px 10px",
    background: "#f2ece0",
    color: "#3d5a2a",
    border: "none",
    borderRadius: 6,
    fontSize: 11,
    fontFamily: "sans-serif",
    cursor: "pointer",
  },
  btnRowDelete: {
    padding: "4px 10px",
    background: "#fdf0ee",
    color: "#c4623a",
    border: "none",
    borderRadius: 6,
    fontSize: 11,
    fontFamily: "sans-serif",
    cursor: "pointer",
  },
}

export default Products