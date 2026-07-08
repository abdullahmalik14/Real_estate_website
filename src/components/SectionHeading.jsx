import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'

// Reusable animated section heading (eyebrow + title + optional intro).
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  light = false,
  className = '',
}) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left'
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`flex max-w-2xl flex-col ${alignment} ${className}`}
    >
      {eyebrow && (
        <motion.span variants={fadeUp} className="eyebrow mb-4">
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className={`font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? 'text-cream' : 'text-charcoal'
        }`}
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 text-lg leading-relaxed ${
            light ? 'text-cream/70' : 'text-charcoal/60'
          }`}
        >
          {intro}
        </motion.p>
      )}
    </motion.div>
  )
}
