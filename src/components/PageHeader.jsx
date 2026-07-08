import { motion } from 'framer-motion'
import { EASE } from '../utils/motion'
import Breadcrumb from './Breadcrumb'
import { asset } from '../utils/assets'

// Shared hero/header banner used at the top of interior pages.
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  imageKey,
  breadcrumb,
}) {
  const src = imageKey ? asset(imageKey) : image

  return (
    <header className="relative flex min-h-[62vh] items-end overflow-hidden">
      <motion.img
        src={src}
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />

      <div className="container-luxe relative z-10 pb-16 pt-40">
        {breadcrumb && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: EASE }}
            className="mb-6"
          >
            <Breadcrumb items={breadcrumb} light />
          </motion.div>
        )}
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ease: EASE }}
            className="eyebrow mb-4 block"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
          className="max-w-4xl font-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, ease: EASE }}
            className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-cream/70 sm:text-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </header>
  )
}
