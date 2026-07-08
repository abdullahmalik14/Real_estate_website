import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'

const defaultStats = [
  { value: 500, suffix: '+', label: 'Properties Sold' },
  { value: 15, suffix: '+', label: 'Years of Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 2, prefix: '$', suffix: 'B+', label: 'In Total Sales' },
]

function Counter({ value, prefix = '', suffix = '', start }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!start) return
    let raf
    const duration = 2000
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value])

  const rounded = Number.isInteger(value)
    ? Math.round(display)
    : display.toFixed(1)

  return (
    <span>
      {prefix}
      {rounded}
      {suffix}
    </span>
  )
}

export default function Stats({
  items = defaultStats,
  dark = true,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(0.15)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`grid grid-cols-2 gap-y-12 gap-x-6 lg:grid-cols-4 ${className}`}
    >
      {items.map((s, i) => (
        <motion.div key={i} variants={fadeUp} className="text-center">
          <p
            className={`font-display text-5xl lg:text-6xl ${
              dark ? 'text-cream' : 'text-charcoal'
            }`}
          >
            <Counter
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              start={inView}
            />
          </p>
          <div className="mx-auto my-4 h-px w-10 bg-gold" />
          <p
            className={`text-xs font-medium uppercase tracking-widest ${
              dark ? 'text-cream/60' : 'text-charcoal/60'
            }`}
          >
            {s.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
