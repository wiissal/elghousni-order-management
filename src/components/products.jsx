import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useStore from "../store/useStore"

function Products() {
  const navigate = useNavigate()
  const products = useStore((state) => state.products)
  const addProduct = useStore((state) => state.addProduct)
  const removeProduct = useStore((state) => state.removeProduct)

  const [form, setForm] = useState({ name: "", category: "", price: 0, description: "" })
  const [editingId, setEditingId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name) return alert("Product name required!")

    if (editingId) {
      // updateProduct doesn't exist in your store yet — we remove + re-add
      removeProduct(editingId)
      addProduct({ ...form, id: editingId })
      setEditingId(null)
    } else {
      addProduct({ ...form, id: Date.now() })
    }
    setForm({ name: "", category: "", price: 0, description: "" })
  }

  const handleEdit = (product) => {
    setForm(product)
    setEditingId(product.id)
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Manage Products</h2>
        <p style={styles.subtitle}>{products.length} products in catalog</p>
      </div>

      {/* Form */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>{editingId ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label style={styles.label}>NAME</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>CATEGORY</label>
              <input
                style={styles.input}
                type="text"
                placeholder="e.g. Olive Oil"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>PRICE (MAD)</label>
              <input
                style={styles.input}
                type="number"
                placeholder="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>DESCRIPTION</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Short description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button type="submit" style={styles.btnPrimary}>
              {editingId ? "Update Product" : "Add Product"}
            </button>
            {editingId && (
              <button
                type="button"
                style={styles.btnSecondary}
                onClick={() => {
                  setEditingId(null)
                  setForm({ name: "", category: "", price: 0, description: "" })
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products Grid — 3 columns */}
      <div style={styles.grid}>
        {products.map((p) => (
          <div
            key={p.id}
            style={styles.card}
            onClick={() => navigate(`/products/${p.id}`)}
          >
            {/* Image area */}
            <div style={styles.imageArea}>
              {p.image
                ? <img src={p.image} alt={p.name} style={styles.image} />
                : <span style={{ fontSize: 36 }}>🫒</span>
              }
            </div>

            <div style={styles.cardBody}>
              <span style={styles.category}>{p.category}</span>
              <h3 style={styles.productName}>{p.name}</h3>
              <p style={styles.description}>{p.description}</p>
              <p style={styles.price}>{p.price} <span style={styles.mad}>MAD</span></p>

              <div style={styles.actions}>
                <button
                  style={styles.btnEdit}
                  onClick={(e) => { e.stopPropagation(); handleEdit(p) }}
                >
                  Edit
                </button>
                <button
                  style={styles.btnDelete}
                  onClick={(e) => { e.stopPropagation(); removeProduct(p.id) }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  page: {
    padding: "2rem",
    background: "#faf7f2",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "1.5rem",
  },
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
    marginBottom: "2rem",
  },
  formTitle: {
    fontFamily: "Georgia, serif",
    fontSize: 16,
    color: "#2e4520",
    fontWeight: "normal",
    margin: "0 0 1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontFamily: "sans-serif",
    fontSize: 11,
    letterSpacing: "1px",
    color: "#9e8f7a",
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
  },
  card: {
    background: "#fff",
    border: "1px solid #e8e0d0",
    borderRadius: 12,
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.15s",
  },
  imageArea: {
    height: 140,
    background: "#f2ece0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  cardBody: {
    padding: "12px",
  },
  category: {
    fontFamily: "sans-serif",
    fontSize: 10,
    letterSpacing: "1.5px",
    color: "#c8973a",
    textTransform: "uppercase",
  },
  productName: {
    fontSize: 14,
    fontFamily: "Georgia, serif",
    color: "#2e4520",
    margin: "4px 0 6px",
    lineHeight: 1.3,
  },
  description: {
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#9e8f7a",
    lineHeight: 1.4,
    marginBottom: 8,
  },
  price: {
    fontFamily: "sans-serif",
    fontSize: 15,
    fontWeight: 600,
    color: "#3d5a2a",
    margin: "0 0 10px",
  },
  mad: {
    fontSize: 11,
    fontWeight: "normal",
    color: "#9e8f7a",
  },
  actions: {
    display: "flex",
    gap: 8,
    borderTop: "1px solid #f0e8d8",
    paddingTop: 10,
  },
  btnEdit: {
    flex: 1,
    padding: "7px 0",
    background: "#f2ece0",
    color: "#3d5a2a",
    border: "none",
    borderRadius: 6,
    fontSize: 12,
    fontFamily: "sans-serif",
    cursor: "pointer",
    fontWeight: 500,
  },
  btnDelete: {
    flex: 1,
    padding: "7px 0",
    background: "#fdf0ee",
    color: "#c4623a",
    border: "none",
    borderRadius: 6,
    fontSize: 12,
    fontFamily: "sans-serif",
    cursor: "pointer",
    fontWeight: 500,
  },
}

export default Products