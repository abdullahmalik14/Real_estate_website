import { motion } from 'framer-motion'
import { EASE } from '../utils/motion'

// Wraps routed page content for AnimatePresence (used in MainLayout around Outlet).
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
