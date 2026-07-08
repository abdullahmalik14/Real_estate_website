import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { EASE } from '../utils/motion'
import { asset } from '../utils/assets'

const headline = ['Live', 'Extraordinary']

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
}
const word = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Ken Burns background */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: EASE }}
        className="absolute inset-0"
      >
        <img
          src={asset('hero.home')}
          alt="A luxury architectural home at dusk"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />

      <div className="container-luxe relative z-10 pt-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: EASE }}
          className="eyebrow mb-6 block"
        >
          Aurelia Estates — Est. 2008
        </motion.span>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display text-6xl leading-[0.95] text-cream sm:text-7xl lg:text-[8.5rem]"
        >
          {headline.map((w, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                variants={word}
                className={`inline-block ${i === 1 ? 'italic text-gold' : ''}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, ease: EASE }}
          className="mt-8 max-w-lg font-serif text-xl leading-relaxed text-cream/80"
        >
          Curating the world&rsquo;s most exceptional residences for those who
          refuse to settle for the ordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <Link to="/properties" className="btn-gold group">
            Explore Properties
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            to="/contact"
            className="btn-outline border-cream/40 text-cream"
          >
            Book a Consultation
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-cream/70"
      >
        <span className="text-[0.6rem] uppercase tracking-luxe">Scroll</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-gold" />
        </motion.span>
      </motion.div>
    </section>
  )
}
