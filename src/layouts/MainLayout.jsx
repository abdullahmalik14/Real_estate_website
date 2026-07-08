import { useLocation, useOutlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { EASE } from '../utils/motion'

// useOutlet() (not <Outlet />) is required so route changes mount the next page
// correctly. AnimatePresence + mode="wait" + <Outlet /> leaves pages at opacity: 0.
export default function MainLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {outlet}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
