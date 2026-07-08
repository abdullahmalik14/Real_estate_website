import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Home,
  TrendingUp,
  Building2,
  LineChart,
  Plane,
  ArrowRight,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import CTABanner from '../components/CTABanner'
import { fadeUp, staggerContainer, viewportOnce, EASE } from '../utils/motion'

const services = [
  {
    icon: Home,
    title: 'Buying',
    text: 'We uncover homes that never reach the open market, guiding you from first viewing to final signature with total discretion.',
    points: ['Off-market access', 'Private viewings', 'Negotiation strategy'],
  },
  {
    icon: TrendingUp,
    title: 'Selling',
    text: 'Cinematic marketing, a global buyer network, and a pricing strategy engineered to achieve the extraordinary.',
    points: ['Bespoke marketing', 'Global exposure', 'Discreet sales'],
  },
  {
    icon: Building2,
    title: 'Property Management',
    text: 'White-glove stewardship of your assets, from staffing and maintenance to seasonal preparation.',
    points: ['Estate staffing', 'Maintenance', 'Concierge care'],
  },
  {
    icon: LineChart,
    title: 'Investment Consulting',
    text: 'Data-driven advice on acquiring, holding, and optimizing trophy real estate as a resilient asset class.',
    points: ['Market analysis', 'Portfolio strategy', 'Yield optimization'],
  },
  {
    icon: Plane,
    title: 'Relocation',
    text: 'A seamless move across borders, coordinating everything from residency to interior design.',
    points: ['Global coordination', 'Advisor network', 'Turnkey arrival'],
  },
]

const steps = [
  { n: '01', title: 'Discovery', text: 'We begin by understanding your vision, lifestyle, and aspirations in depth.' },
  { n: '02', title: 'Curation', text: 'We handpick a shortlist of homes — many never publicly listed — tailored to you.' },
  { n: '03', title: 'Experience', text: 'Private viewings, expert counsel, and negotiation handled with total care.' },
  { n: '04', title: 'Belonging', text: 'Beyond the keys, we ensure your transition into a new chapter is effortless.' },
]

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="How We Serve"
        title="Services Beyond Expectation"
        subtitle="A full spectrum of expertise, delivered with the discretion and polish our clients deserve."
        imageKey="pages.services"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      {/* Services grid */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our Expertise"
            title="Comprehensive Care, End to End"
            intro="Whatever your ambition in real estate, our specialists provide the guidance to realize it."
            className="mb-16"
          />
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-2xl border border-charcoal/10 bg-white p-8 transition-shadow duration-500 hover:shadow-[0_30px_70px_-40px_rgba(22,22,20,0.5)]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal">
                  <s.icon size={24} />
                </span>
                <h3 className="mt-6 font-display text-2xl text-charcoal">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/60">
                  {s.text}
                </p>
                <ul className="mt-5 space-y-2 border-t border-charcoal/10 pt-5">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-sm text-charcoal/70"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="How It Works"
            title="A Considered Process"
            align="center"
            light
            className="mb-20"
          />
          <div className="relative">
            <div className="absolute left-0 top-10 hidden h-px w-full bg-cream/15 lg:block" />
            <div className="grid gap-12 lg:grid-cols-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
                  className="relative text-center lg:text-left"
                >
                  <span className="relative z-10 mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/40 bg-charcoal font-display text-2xl text-gold lg:mx-0">
                    {step.n}
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/60">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-20 text-center"
          >
            <Link to="/contact" className="btn-gold group">
              Start the Conversation
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTABanner
        eyebrow="Ready When You Are"
        title="Let's Discuss Your Ambitions"
        text="Book a private consultation with one of our advisors and discover what's possible."
        imageKey="sections.ctaServices"
      />
    </>
  )
}
