function StatusBadge({ status }) {
  const normalized = status?.toLowerCase()

  const styles = {
    pending:   { background: "#fef3c7", color: "#92400e" },
    prepared:  { background: "#dbeafe", color: "#1e40af" },
    delivered: { background: "#dcfce7", color: "#166534" },
  }

  return (
    <span style={{
      ...badge,
      ...(styles[normalized] || { background: "#f3f4f6", color: "#6b7280" })
    }}>
      {normalized}
    </span>
  )
}

const badge = {
  padding: "4px 10px",
  borderRadius: 12,
  fontSize: 11,
  fontWeight: 600,
  fontFamily: "sans-serif",
  textTransform: "capitalize",
  display: "inline-block",
}

export default StatusBadge