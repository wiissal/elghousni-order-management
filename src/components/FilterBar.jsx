import useStore from "../store/useStore"

function FilterBar() {
  const filter = useStore((state) => state.filter)
  const setFilter = useStore((state) => state.setFilter)
  const orders = useStore((state) => state.orders)

  return (
    <div className="filter-bar">
      <button
        className={filter === "all" ? "active" : ""} // Shown if current filter is 'all'
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "pending" ? "active" : ""} // Shown if current filter is 'pending'
        onClick={() => setFilter("pending")}
      >
        Pending {/* Orders not yet prepared */}
      </button>

  const getCount = (value) =>
    value === "all"
      ? orders.length
      : orders.filter((o) => o.status === value).length

  return (
    <div style={styles.bar}>
      {filters.map(({ value, label }) => {
        const isActive = filter === value
        return (
          <button
            key={value}
            onClick={() => setFilter(value)}
            style={{
              ...styles.btn,
              background: isActive ? "#3d5a2a" : "#fff",
              color: isActive ? "#fff" : "#7a7060",
              borderColor: isActive ? "#3d5a2a" : "#d4c9b0",
            }}
          >
            {label}
            <span style={{
              ...styles.count,
              background: isActive ? "rgba(255,255,255,0.2)" : "#f2ece0",
              color: isActive ? "#fff" : "#9e8f7a",
            }}>
              {getCount(value)}
            </span>
          </button>
        )
      })}
    </div>
  )
}

const styles = {
  bar: {
    display: "flex",
    gap: 8,
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "7px 16px",
    borderRadius: 20,
    border: "1px solid",
    fontFamily: "sans-serif",
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  count: {
    padding: "1px 7px",
    borderRadius: 10,
    fontSize: 11,
    fontWeight: 600,
  },
}

export default FilterBar