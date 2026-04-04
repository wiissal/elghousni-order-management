import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, PlusCircle, ClipboardList, BarChart3, Settings } from 'lucide-react'

const navItems = [
  { href: '/',              label: 'Products',        icon: Package },
  { href: '/new-order',     label: 'New Order',       icon: PlusCircle },
  { href: '/orders',        label: 'Orders',          icon: ClipboardList },
  { href: '/summary',       label: 'Summary',         icon: BarChart3 },
  { href: '/manage',        label: 'Manage Products', icon: Settings },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside style={styles.sidebar}>
      <nav style={{ flex: 1, paddingTop: '1.5rem' }}>
        <div style={styles.divider} />

        <ul style={{ listStyle: 'none', padding: '0 12px', margin: 0 }}>
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = location.pathname === href

            return (
              <li key={href} style={{ marginBottom: 4 }}>
                <Link to={href} style={{ textDecoration: 'none' }}>
                  <motion.div
                    style={{
                      ...styles.navItem,
                      color: isActive ? '#c8973a' : 'rgba(253,246,227,0.75)',
                      background: isActive ? 'rgba(0,0,0,0.2)' : 'transparent',
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        style={styles.activeBar}
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    <Icon size={18} />
                    <span style={{ fontSize: 13, fontFamily: 'sans-serif' }}>{label}</span>
                  </motion.div>
                </Link>
              </li>
            )
          })}
        </ul>

        <div style={{ ...styles.divider, marginTop: '1.5rem' }} />
      </nav>

      <div style={styles.footer}>
        <p style={{ fontSize: 11, color: 'rgba(253,246,227,0.4)', textAlign: 'center', fontFamily: 'sans-serif', lineHeight: 1.6 }}>
          Premium Olive Oil<br />Tanger, Morocco
        </p>
      </div>
    </aside>
  )
}

const styles = {
  sidebar: {
    width: 220,
    minWidth: 220,
    height: 'calc(100vh - 64px)',
    background: '#2e4520',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c8973a' fill-opacity='0.06'%3E%3Cpath d='M20 0l20 20-20 20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 64,
  },
  navItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 3,
    height: 24,
    background: '#c8973a',
    borderRadius: '0 4px 4px 0',
  },
  divider: {
    height: 1,
    background: 'rgba(200,151,58,0.25)',
    margin: '0 16px 16px',
  },
  footer: {
    padding: '1rem',
    borderTop: '1px solid rgba(200,151,58,0.2)',
  },
}