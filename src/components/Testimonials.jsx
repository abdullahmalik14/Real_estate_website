import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE } from '../utils/motion'
import SectionHeading from './SectionHeading'
import { asset } from '../utils/assets'

const testimonials = [
  {
    quote:
      'Aurelia found us a home we did not know existed — off-market, extraordinary, and utterly us. The entire process felt like a private concierge service.',
    name: 'Charlotte & James Whitmore',
    detail: 'Purchased The Cliff House, Malibu',
    photoKey: 'testimonials.charlotte',
  },
  {
    quote:
      'Their discretion and market intelligence are unmatched. We sold above asking within weeks, entirely off-market, without a single disruption to our lives.',
    name: 'Alexander Voss',
    detail: 'Sold Harbor Modern, Sydney',
    photoKey: 'testimonials.alexander',
  },
  {
    quote:
      'Buying a villa abroad felt daunting until Aurelia. Elena guided every detail with grace. We arrived to a life already waiting for us at Lake Como.',
    name: 'Priya Nair',
    detail: 'Purchased Villa Serena, Lake Como',
    photoKey: 'testimonials.priya',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  const next = useCallback(
    () => setIndex((i) => (i + 1) % testimonials.length),
    [],
  )
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const t = setInterval(next, 6500)
    return () => clearInterval(t)
  }, [next])

  const active = testimonials[index]

  return (
    <section className="bg-charcoal py-24 lg:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Client Stories"
          title="Trusted by the World's Most Discerning"
          align="center"
          light
          className="mb-16"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <Quote
            size={64}
            className="mx-auto mb-8 text-gold/40"
            strokeWidth={1}
          />
          <div className="min-h-[220px] sm:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="font-serif text-2xl leading-relaxed text-cream sm:text-3xl">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <img
                    src={asset(active.photoKey)}
                    alt={active.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/50"
                  />
                  <div className="text-left">
                    <p className="font-medium text-cream">{active.name}</p>
                    <p className="text-xs uppercase tracking-widest text-gold">
                      {active.detail}
                    </p>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/70 transition-all hover:border-gold hover:text-gold"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? 'w-8 bg-gold' : 'w-1.5 bg-cream/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/70 transition-all hover:border-gold hover:text-gold"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
