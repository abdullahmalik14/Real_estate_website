import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'
import { asset } from '../utils/assets'

export default function CTABanner({
  eyebrow = 'Begin Your Journey',
  title = 'Let Us Find Your Extraordinary',
  text = 'Whether buying, selling, or simply dreaming, our advisors are ready to guide you with discretion and care.',
  buttonLabel = 'Book a Consultation',
  buttonTo = '/contact',
  imageKey = 'sections.ctaDefault',
}) {
  const image = asset(imageKey)

  return (
    <section className="relative overflow-hidden">
      <div
        className="relative bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-charcoal/80" />
        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="container-luxe relative z-10 flex flex-col items-center py-28 text-center lg:py-36"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-5">
            {eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="max-w-3xl font-display text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-cream/70 sm:text-xl"
          >
            {text}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <Link to={buttonTo} className="btn-gold group">
              {buttonLabel}
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
