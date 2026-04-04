import useStore from "../store/useStore"
import { useNavigate } from "react-router-dom"

function OrderSummary() {
  const orders = useStore((state) => state.orders)
  const setFilter = useStore((state) => state.setFilter)
  const navigate = useNavigate()

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const avgOrderValue = totalOrders ? Math.round(totalRevenue / totalOrders) : 0

  const statuses = [
    { value: "pending",   label: "Pending",   color: "#c8973a" },
    { value: "prepared",  label: "Prepared",  color: "#3b82f6" },
    { value: "delivered", label: "Delivered", color: "#3d5a2a" },
  ]

  const getCount = (status) => orders.filter((o) => o.status === status).length
  const getPercent = (status) =>
    totalOrders ? Math.round((getCount(status) / totalOrders) * 100) : 0

  // Top products by quantity sold
  const productMap = {}
  orders.forEach((o) => {
    if (!o.product) return
    productMap[o.product] = (productMap[o.product] || 0) + (o.quantity || 1)
  })
  const topProducts = Object.entries(productMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  const maxSold = topProducts[0]?.[1] || 1

  const handleClick = (filter) => {
    setFilter(filter)
    navigate("/orders")
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Summary</h2>
        <p style={styles.subtitle}>Overview of your business performance</p>
      </div>

      {/* Stat Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard} onClick={() => handleClick("all")}>
          <div style={{ ...styles.iconBox, background: "#3d5a2a" }}>📦</div>
          <p style={styles.statLabel}>Total Orders</p>
          <p style={styles.statValue}>{totalOrders}</p>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.iconBox, background: "#c8973a" }}>📈</div>
          <p style={styles.statLabel}>Total Revenue</p>
          <p style={styles.statValue}>
            {totalRevenue.toLocaleString()}
            <span style={styles.mad}> MAD</span>
          </p>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.iconBox, background: "#c4623a" }}>🧾</div>
          <p style={styles.statLabel}>Avg Order Value</p>
          <p style={styles.statValue}>
            {avgOrderValue}
            <span style={styles.mad}> MAD</span>
          </p>
        </div>
      </div>

      {/* Orders by Status */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Orders by Status</h3>
        <div style={styles.statusList}>
          {statuses.map(({ value, label, color }) => {
            const count = getCount(value)
            const percent = getPercent(value)
            return (
              <div
                key={value}
                style={styles.statusRow}
                onClick={() => handleClick(value)}
              >
                <div style={styles.statusHeader}>
                  <span style={styles.statusLabel}>{label}</span>
                  <span style={styles.statusCount}>
                    {count} ({percent}%)
                  </span>
                </div>
                <div style={styles.progressTrack}>
                  <div style={{
                    ...styles.progressBar,
                    width: `${percent}%`,
                    background: color,
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top Products */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>
          <span style={{ marginRight: 8 }}>📦</span>Top Products
        </h3>
        {topProducts.length === 0 ? (
          <p style={styles.emptyText}>No orders yet</p>
        ) : (
          <div style={styles.productList}>
            {topProducts.map(([name, sold], index) => (
              <div key={name} style={styles.productRow}>
                <div style={styles.productHeader}>
                  <span style={styles.productRank}>{index + 1}</span>
                  <span style={styles.productName}>{name}</span>
                  <span style={styles.productSold}>{sold} sold</span>
                </div>
                <div style={styles.progressTrack}>
                  <div style={{
                    ...styles.progressBar,
                    width: `${(sold / maxSold) * 100}%`,
                    background: "#3d5a2a",
                  }} />
                </div>
              </div>
            ))}
          </div>
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
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    marginBottom: "1rem",
  },
  statCard: {
    background: "#fff",
    border: "1px solid #e8e0d0",
    borderRadius: 12,
    padding: "1.25rem",
    cursor: "pointer",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    marginBottom: 12,
  },
  statLabel: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#9e8f7a",
    margin: "0 0 4px",
  },
  statValue: {
    fontFamily: "Georgia, serif",
    fontSize: 28,
    color: "#2e4520",
    margin: 0,
    lineHeight: 1,
  },
  mad: {
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "#9e8f7a",
  },
  card: {
    background: "#fff",
    border: "1px solid #e8e0d0",
    borderRadius: 12,
    padding: "1.25rem",
    marginBottom: "1rem",
  },
  cardTitle: {
    fontFamily: "Georgia, serif",
    fontSize: 16,
    color: "#2e4520",
    fontWeight: "normal",
    margin: "0 0 1.25rem",
  },
  statusList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  statusRow: {
    cursor: "pointer",
  },
  statusHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  statusLabel: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#2e4520",
    fontWeight: 500,
  },
  statusCount: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#9e8f7a",
  },
  progressTrack: {
    height: 6,
    background: "#f0e8d8",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
    transition: "width 0.4s ease",
  },
  productList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  productRow: {},
  productHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  productRank: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "#f2ece0",
    color: "#3d5a2a",
    fontSize: 11,
    fontFamily: "sans-serif",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  productName: {
    flex: 1,
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#2e4520",
  },
  productSold: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#9e8f7a",
  },
  emptyText: {
    fontFamily: "sans-serif",
    fontSize: 13,
    color: "#9e8f7a",
    textAlign: "center",
    padding: "1rem 0",
  },
}

export default OrderSummary