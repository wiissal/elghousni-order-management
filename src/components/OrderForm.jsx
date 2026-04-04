import { useState } from "react"
import { products } from "../data/products"
import useStore from "../store/useStore"
import { useNavigate } from "react-router-dom"
function OrderForm() {
  const setOrder = useStore((state) => state.setOrder)

  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [quantities, setQuantities] = useState({})
  const navigate = useNavigate()

  const handleQty = (product, change) => {
    setQuantities((prev) => ({
      ...prev,
      [product.id]: Math.max((prev[product.id] || 0) + change, 0),
    }))
  }

  const selectedItems = products.filter((p) => quantities[p.id] > 0)
  const total = selectedItems.reduce(
    (sum, p) => sum + p.price * quantities[p.id],
    0
  )

  const handleSubmit = () => {
    if (!customerName) return alert("Please enter customer name!")
    if (selectedItems.length === 0) return alert("Please select at least one product!")

    selectedItems.forEach((p) => {
      setOrder({
        id: Date.now() + p.id,
        customerName,
        phone,
        product: p.name,
        quantity: quantities[p.id],
        price: p.price,
        total: p.price * quantities[p.id],
        status: "pending",
        createdAt: new Date().toISOString(),
      })
    })

    setCustomerName("")
    setPhone("")
    setQuantities({})
    navigate("/orders")
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>New Order</h2>
        <p style={styles.subtitle}>Create a new customer order</p>
      </div>

      <div style={styles.card}>
        {/* Customer Info */}
        <h3 style={styles.sectionTitle}>Customer Information</h3>

        <div style={styles.field}>
          <label style={styles.label}>Customer Name</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Phone Number</label>
          <input
            style={styles.input}
            type="text"
            placeholder="+212 6 XX XX XX XX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Product List */}
        <h3 style={{ ...styles.sectionTitle, marginTop: "1.5rem" }}>
          Select Products
        </h3>

        <div style={styles.productList}>
          {products.map((product) => {
            const qty = quantities[product.id] || 0
            return (
              <div key={product.id} style={styles.productRow}>
                <div style={styles.productInfo}>
                  <span style={styles.productName}>{product.name}</span>
                  <span style={styles.productPrice}>{product.price} MAD</span>
                </div>

                <div style={styles.qtyControl}>
                  {qty > 0 ? (
                    <>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => handleQty(product, -1)}
                      >
                        −
                      </button>
                      <span style={styles.qtyNum}>{qty}</span>
                      <button
                        style={{ ...styles.qtyBtn, ...styles.qtyBtnActive }}
                        onClick={() => handleQty(product, 1)}
                      >
                        +
                      </button>
                    </>
                  ) : (
                    <button
                      style={styles.addBtn}
                      onClick={() => handleQty(product, 1)}
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Place Order Button */}
        <button style={styles.submitBtn} onClick={handleSubmit}>
          Place Order
        </button>
      </div>

      {/* Order Summary */}
      <div style={styles.summaryCard}>
        <h3 style={styles.sectionTitle}>Order Summary</h3>

        {selectedItems.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyText}>No items selected</p>
            <p style={styles.emptyHint}>Add products from the catalog</p>
          </div>
        ) : (
          <>
            {selectedItems.map((p) => (
              <div key={p.id} style={styles.summaryRow}>
                <span style={styles.summaryName}>
                  {p.name}
                  <span style={styles.summaryQty}> x{quantities[p.id]}</span>
                </span>
                <span style={styles.summaryPrice}>
                  {p.price * quantities[p.id]} MAD
                </span>
              </div>
            ))}

            <div style={styles.summaryDivider} />

            <div style={styles.summaryTotal}>
              <span>Total</span>
              <span style={styles.totalAmount}>{total} MAD</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    padding: "2rem",
    background: "#faf7f2",
    minHeight: "100vh",
    maxWidth: "100%",
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
  card: {
    background: "#fff",
    border: "1px solid #e8e0d0",
    borderRadius: 16,
    padding: "1.5rem",
    marginBottom: "1rem",
  },
  summaryCard: {
    background: "#fff",
    border: "1px solid #e8e0d0",
    borderRadius: 16,
    padding: "1.5rem",
  },
  sectionTitle: {
    fontFamily: "Georgia, serif",
    fontSize: 16,
    color: "#2e4520",
    fontWeight: "normal",
    margin: "0 0 1rem",
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
  productList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginBottom: "1.5rem",
    maxHeight: 320,
    overflowY: "auto",
  },
  productRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid #f0e8d8",
    background: "#faf7f2",
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  productName: {
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "#2e4520",
    fontWeight: 500,
  },
  productPrice: {
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#9e8f7a",
  },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    border: "1px solid #d4c9b0",
    background: "#f2ece0",
    color: "#3d5a2a",
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  },
  qtyBtnActive: {
    background: "#3d5a2a",
    color: "#fff",
    border: "none",
  },
  qtyNum: {
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "#2e4520",
    minWidth: 20,
    textAlign: "center",
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "none",
    background: "#3d5a2a",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    background: "#3d5a2a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "sans-serif",
    fontWeight: 500,
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
  empty: {
    textAlign: "center",
    padding: "2rem 0",
  },
  emptyText: {
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "#9e8f7a",
  },
  emptyHint: {
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#c4b8a0",
    marginTop: 4,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #f0e8d8",
  },
  summaryName: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#2e4520",
  },
  summaryQty: {
    color: "#9e8f7a",
    fontSize: 12,
  },
  summaryPrice: {
    fontFamily: "sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: "#3d5a2a",
  },
  summaryDivider: {
    height: 1,
    background: "#e8e0d0",
    margin: "12px 0",
  },
  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "sans-serif",
    fontSize: 15,
    fontWeight: 600,
    color: "#2e4520",
  },
  totalAmount: {
    color: "#3d5a2a",
    fontSize: 18,
  },
}

export default OrderForm