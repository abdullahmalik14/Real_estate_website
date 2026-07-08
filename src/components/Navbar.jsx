import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { EASE } from '../utils/motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/about', label: 'About' },
  { to: '/agents', label: 'Agents' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe ${
        solid
          ? 'bg-charcoal/90 py-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md'
          : 'bg-transparent py-7'
      }`}
    >
      <nav className="container-luxe flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-3 text-cream">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/60 font-display text-lg text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal">
            A
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wide">Aurelia</span>
            <span className="text-[0.6rem] uppercase tracking-luxe text-gold/80">
              Estates
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} className="group relative">
                {({ isActive }) => (
                  <span
                    className={`text-xs font-medium uppercase tracking-widest text-cream/80 transition-colors duration-300 hover:text-cream ${
                      isActive ? 'text-cream' : ''
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-500 ease-luxe ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn-gold !px-6 !py-3 text-[0.7rem]">
            Book a Consultation
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-cream lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-y-0 right-0 z-40 flex h-screen w-[85%] max-w-sm flex-col bg-charcoal px-8 pb-10 pt-28 lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: EASE }}
                  className="border-b border-cream/10"
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `block py-4 font-display text-2xl ${
                        isActive ? 'text-gold' : 'text-cream'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <Link to="/contact" className="btn-gold mt-8 w-full">
              Book a Consultation
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}
