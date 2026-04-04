import { useState } from "react"
import { products } from "../data/products"
import useStore from "../store/useStore"

function OrderCard() {
  const [quantities, setQuantities] = useState({})
  const orders = useStore((state) => state.orders)
  const setOrder = useStore((state) => state.setOrder)
  const removeOrder = useStore((state) => state.removeOrder)

  const handleQuantityChange = (product, change) => {
    setQuantities((prev) => {
      const newQty = Math.max((prev[product.id] || 0) + change, 0)
      const existingOrder = orders.find((o) => o.product === product.name)

      if (existingOrder) {
        // remove old order and replace with updated quantity
        removeOrder(existingOrder.id)
        if (newQty > 0) {
          setOrder({
            ...existingOrder,
            quantity: newQty,
            total: product.price * newQty,
          })
        }
      } else if (newQty > 0) {
        setOrder({
          id: Date.now(),
          customerName: "Guest",
          product: product.name,
          quantity: newQty,
          price: product.price,
          total: product.price * newQty,
          status: "pending",
          createdAt: new Date().toISOString(),
        })
      }

      return { ...prev, [product.id]: newQty }
    })
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Our Products</h2>
        <p style={styles.subtitle}>Select products to add to your order</p>
      </div>

      <div style={styles.grid}>
        {products.map((product) => {
          const qty = quantities[product.id] || 0
          return (
            <div key={product.id} style={styles.card}>

              {/* Image */}
              <div style={styles.imageArea}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.image}
                />
              </div>

              {/* Body */}
              <div style={styles.cardBody}>
                <span style={styles.category}>{product.category}</span>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.description}>{product.description}</p>

                <div style={styles.footer}>
                  <span style={styles.price}>
                    {product.price} <span style={styles.mad}>MAD</span>
                  </span>

                  {/* Quantity controls */}
                  <div style={styles.qtyControl}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => handleQuantityChange(product, -1)}
                    >
                      −
                    </button>
                    <span style={styles.qtyNum}>{qty}</span>
                    <button
                      style={{
                        ...styles.qtyBtn,
                        background: qty > 0 ? "#3d5a2a" : "#f2ece0",
                        color: qty > 0 ? "#fff" : "#3d5a2a",
                      }}
                      onClick={() => handleQuantityChange(product, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                {qty > 0 && (
                  <div style={styles.subtotal}>
                    Subtotal: <strong>{product.price * qty} MAD</strong>
                  </div>
                )}
              </div>
            </div>
          )
        })}
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
    margin: 0,
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
    transition: "transform 0.15s",
  },
  imageArea: {
    height: 160,
    background: "#f2ece0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
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
    margin: "4px 0 4px",
    lineHeight: 1.3,
  },
  description: {
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#9e8f7a",
    lineHeight: 1.4,
    margin: "0 0 10px",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontFamily: "sans-serif",
    fontSize: 15,
    fontWeight: 600,
    color: "#3d5a2a",
  },
  mad: {
    fontSize: 11,
    fontWeight: "normal",
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
    fontFamily: "sans-serif",
    lineHeight: 1,
  },
  qtyNum: {
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "#2e4520",
    minWidth: 20,
    textAlign: "center",
  },
  subtotal: {
    marginTop: 8,
    padding: "6px 10px",
    background: "#f2ece0",
    borderRadius: 6,
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#3d5a2a",
    textAlign: "right",
  },
}

export default OrderCard