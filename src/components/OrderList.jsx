import { useState } from "react"
import useStore from "../store/useStore"
import StatusBadge from "./StatusBadge"
import FilterBar from "./FilterBar"

function OrderList() {
  const orders = useStore((state) => state.orders)
  const filter = useStore((state) => state.filter)
  const removeOrder = useStore((state) => state.removeOrder)
  const [expanded, setExpanded] = useState(null)

  const filtered = filter === "all"
    ? orders
    : orders.filter((o) => o.status === filter)

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "??"

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric"
    }) : "—"

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Orders</h2>
        <p style={styles.subtitle}>Manage and track all customer orders</p>
      </div>

      {/* FilterBar centered */}
      <div style={styles.filterWrapper}>
        <FilterBar />
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>No orders found</p>
          <p style={styles.emptyHint}>Try a different filter or create a new order</p>
        </div>
      ) : (
        <div style={styles.list}>
          {filtered.map((order) => {
            const isOpen = expanded === order.id
            return (
              <div key={order.id} style={styles.card}>

                {/* Main row */}
                <div style={styles.row}>

                  {/* Avatar */}
                  <div style={styles.avatar}>
                    {getInitials(order.customerName)}
                  </div>

                  {/* Info */}
                  <div style={styles.info}>
                    <div style={styles.nameRow}>
                      <span style={styles.name}>{order.customerName}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <span style={styles.meta}>
                      {order.phone && `${order.phone} • `}
                      {order.product} × {order.quantity}
                    </span>
                  </div>

                  {/* Right */}
                  <div style={styles.right}>
                    <span style={styles.total}>
                      {order.total || (order.price * order.quantity) || "—"} MAD
                    </span>
                    <span style={styles.date}>{formatDate(order.createdAt)}</span>
                  </div>

                  {/* Chevron */}
                  <button
                    style={styles.chevron}
                    onClick={() => setExpanded(isOpen ? null : order.id)}
                  >
                    {isOpen ? "▲" : "▼"}
                  </button>
                </div>

                {/* Expanded details */}
                {isOpen && (
                  <div style={styles.details}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Customer</span>
                      <span style={styles.detailValue}>{order.customerName}</span>
                    </div>
                    {order.phone && (
                      <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>Phone</span>
                        <span style={styles.detailValue}>{order.phone}</span>
                      </div>
                    )}
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Product</span>
                      <span style={styles.detailValue}>{order.product}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Quantity</span>
                      <span style={styles.detailValue}>{order.quantity}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Price/unit</span>
                      <span style={styles.detailValue}>{order.price} MAD</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Total</span>
                      <span style={{ ...styles.detailValue, color: "#3d5a2a", fontWeight: 600 }}>
                        {order.total || order.price * order.quantity} MAD
                      </span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Status</span>
                      <StatusBadge status={order.status} />
                    </div>

                    {/* Delete */}
                    <div style={styles.detailActions}>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => removeOrder(order.id)}
                      >
                        Delete Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
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
  filterWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  empty: {
    textAlign: "center",
    padding: "4rem 0",
  },
  emptyText: {
    fontFamily: "sans-serif",
    fontSize: 15,
    color: "#9e8f7a",
  },
  emptyHint: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#c4b8a0",
    marginTop: 6,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  card: {
    background: "#fff",
    border: "1px solid #e8e0d0",
    borderRadius: 12,
    overflow: "hidden",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 16px",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "#3d5a2a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    fontSize: 13,
    fontWeight: 600,
    flexShrink: 0,
  },
  info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: "#2e4520",
  },
  meta: {
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#9e8f7a",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 2,
  },
  total: {
    fontFamily: "sans-serif",
    fontSize: 15,
    fontWeight: 700,
    color: "#3d5a2a",
  },
  date: {
    fontFamily: "sans-serif",
    fontSize: 11,
    color: "#c4b8a0",
  },
  chevron: {
    background: "none",
    border: "none",
    color: "#9e8f7a",
    cursor: "pointer",
    fontSize: 11,
    padding: "4px 8px",
  },
  details: {
    borderTop: "1px solid #f0e8d8",
    padding: "14px 16px",
    background: "#faf7f2",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #f0e8d8",
  },
  detailLabel: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#9e8f7a",
  },
  detailValue: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#2e4520",
  },
  detailActions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  deleteBtn: {
    padding: "7px 16px",
    background: "#fdf0ee",
    color: "#c4623a",
    border: "1px solid #f5c4b3",
    borderRadius: 8,
    fontFamily: "sans-serif",
    fontSize: 13,
    cursor: "pointer",
  },
}

export default OrderList