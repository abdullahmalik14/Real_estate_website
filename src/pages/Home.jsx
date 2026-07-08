import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import PropertyCard from '../components/PropertyCard'
import FilterTabs from '../components/FilterTabs'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import CTABanner from '../components/CTABanner'
import { properties, statusTabs } from '../data/properties'
import { fadeUp, staggerContainer, viewportOnce, EASE } from '../utils/motion'
import { asset } from '../utils/assets'

function StoryTeaser() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} className="overflow-hidden bg-cream py-24 lg:py-32">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <motion.img
              style={{ y }}
              src={asset('sections.storyTeaser')}
              alt="An elegant interior living space"
              className="absolute inset-0 h-[124%] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden w-56 rounded-2xl bg-charcoal p-7 text-cream shadow-2xl sm:block lg:-right-10">
            <p className="font-display text-5xl text-gold">15+</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-cream/70">
              Years defining luxury living
            </p>
          </div>
        </div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.span variants={fadeUp} className="eyebrow mb-5 block">
            Our Story
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl leading-tight text-charcoal sm:text-4xl lg:text-[2.75rem]"
          >
            More than property. A philosophy of living well.
          </motion.h2>
          <motion.blockquote
            variants={fadeUp}
            className="mt-8 border-l-2 border-gold pl-6 font-serif text-2xl italic leading-relaxed text-charcoal/80"
          >
            &ldquo;A home should not simply house a life — it should elevate it.&rdquo;
          </motion.blockquote>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-charcoal/60"
          >
            For over fifteen years, Aurelia Estates has represented the rare and
            the remarkable. We are curators as much as advisors, matching
            singular homes with the people destined to love them.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <Link to="/about" className="link-underline text-charcoal">
              Learn More <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  const [filter, setFilter] = useState('Buy')
  const featured = properties.filter((p) => p.status === filter).slice(0, 6)

  return (
    <>
      <Hero />

      {/* Featured Properties */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="container-luxe">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Featured Collection"
              title="Homes That Defy the Expected"
              intro="A curated selection from our portfolio of the world's most coveted residences."
            />
            <div className="flex flex-col items-start gap-6 md:items-end">
              <FilterTabs tabs={statusTabs} active={filter} onChange={setFilter} />
              <Link to="/properties" className="link-underline text-charcoal">
                View All Properties <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <motion.div
            key={filter}
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featured.length > 0 ? (
              featured.map((p) => <PropertyCard key={p.id} property={p} />)
            ) : (
              <p className="col-span-full py-16 text-center font-serif text-xl text-charcoal/50">
                No {filter.toLowerCase()} listings at the moment. Please check back soon.
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal py-24 lg:py-28">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-16 text-center"
          >
            <span className="eyebrow mb-4 block">By the Numbers</span>
            <h2 className="mx-auto max-w-2xl font-display text-3xl text-cream sm:text-4xl">
              A track record written in landmark sales
            </h2>
          </motion.div>
          <Stats dark />
        </div>
      </section>

      <StoryTeaser />
      <Testimonials />
      <CTABanner />
    </>
  )
}
