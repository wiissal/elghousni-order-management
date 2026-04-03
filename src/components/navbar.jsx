import { motion } from 'framer-motion'
import useStore from '../store/useStore'

export default function Navbar() {
  const orders = useStore((state) => state.orders)

  const todayOrders = orders.filter(
    (order) => new Date(order.createdAt).toDateString() === new Date().toDateString()
  )

  const pendingOrders = orders.filter((order) => order.status === 'pending')

  const dailyRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0)

  const stats = [
    { label: 'Orders Today', value: todayOrders.length, bg: '#3d5a2a' },
    { label: 'Pending',      value: pendingOrders.length, bg: '#c4623a' },
    { label: 'Daily Revenue', value: `${dailyRevenue.toLocaleString()} MAD`, bg: '#c8973a' },
  ]

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        
        <h1 style={styles.title}>Coopérative Elghousni</h1>
      </div>

      <div style={styles.statsRow}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ ...styles.pill, background: stat.bg }}
          >
            <span style={styles.pillLabel}>{stat.label}:</span>
            <motion.span
              key={stat.value.toString()}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              style={styles.pillValue}
            >
              {stat.value}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </nav>
  )
}

const styles = {
  navbar: {
    height: 64,
    background: '#fff',
    borderBottom: '1px solid #e8e0d0',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Georgia, serif',
    fontWeight: 600,
    color: '#2e4520',
    letterSpacing: '-0.3px',
    margin: 0,
  },
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  pill: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    borderRadius: 20,
    color: '#fff',
    fontSize: 13,
    fontFamily: 'sans-serif',
  },
  pillLabel: {
    opacity: 0.8,
    fontWeight: 400,
  },
  pillValue: {
    fontWeight: 600,
  },
}