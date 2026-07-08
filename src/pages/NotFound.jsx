import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { EASE } from '../utils/motion'
import { asset } from '../utils/assets'

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal text-center">
        <img
          src={asset('pages.notFound')}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="container-luxe relative z-10"
        >
          <span className="eyebrow mb-4 block">Error 404</span>
          <h1 className="font-display text-7xl text-cream sm:text-8xl lg:text-9xl">
            Lost in Luxury
          </h1>
          <p className="mx-auto mt-6 max-w-md font-serif text-xl text-cream/70">
            The page you are looking for has moved on to a more exclusive address.
          </p>
          <Link to="/" className="btn-gold group mt-10">
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Return Home
          </Link>
        </motion.div>
      </section>
  )
}
