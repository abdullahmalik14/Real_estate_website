import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Gem, Handshake, Compass, ShieldCheck } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import Stats from '../components/Stats'
import CTABanner from '../components/CTABanner'
import { fadeUp, staggerContainer, viewportOnce, EASE } from '../utils/motion'
import { asset } from '../utils/assets'

const values = [
  {
    icon: Gem,
    title: 'Uncompromising Quality',
    text: 'We represent only the exceptional — homes with soul, provenance, and enduring value.',
  },
  {
    icon: ShieldCheck,
    title: 'Absolute Discretion',
    text: 'Confidentiality is the foundation of trust. Many of our finest deals never touch the market.',
  },
  {
    icon: Handshake,
    title: 'Relationships First',
    text: 'We measure success not in transactions, but in the lifelong relationships we build.',
  },
  {
    icon: Compass,
    title: 'Global Perspective',
    text: 'From Malibu to Lake Como, our reach is worldwide and our knowledge is local.',
  },
]

const milestones = [
  { year: '2008', title: 'The Beginning', text: 'Sophia Laurent founds Aurelia Estates with a single ambition: to redefine luxury representation.' },
  { year: '2013', title: 'Going Global', text: 'We open our first international office on Lake Como, expanding into the European villa market.' },
  { year: '2018', title: 'A Billion Milestone', text: 'Aurelia surpasses $1B in cumulative sales, cementing our place among the elite.' },
  { year: '2022', title: 'New Development Arm', text: 'We launch a dedicated advisory for branded residences and new architecture.' },
  { year: '2026', title: 'Today', text: 'Six global partners, hundreds of landmark homes, and one unwavering standard.' },
]

function StoryParallax() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} className="overflow-hidden bg-cream py-24 lg:py-32">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
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
            Founded on the belief that a home can change a life
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg leading-relaxed text-charcoal/60">
            Aurelia Estates began in 2008 with a small team, a discerning eye,
            and a conviction that the world&rsquo;s most extraordinary homes
            deserved representation to match. Nearly two decades later, that
            conviction remains unchanged.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-charcoal/60">
            We are architects of introductions — pairing singular properties
            with the people destined to cherish them. Every listing is a story,
            and every client, a lifelong relationship.
          </motion.p>
          <motion.blockquote
            variants={fadeUp}
            className="mt-8 border-l-2 border-gold pl-6 font-serif text-2xl italic leading-relaxed text-charcoal/80"
          >
            &ldquo;We don&rsquo;t sell houses. We open doors to extraordinary lives.&rdquo;
            <footer className="mt-3 text-sm not-italic uppercase tracking-widest text-gold">
              Sophia Laurent, Founder
            </footer>
          </motion.blockquote>
        </motion.div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <motion.img
              style={{ y }}
              src={asset('sections.aboutStory')}
              alt="An architectural interior detail"
              className="absolute inset-0 h-[124%] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="The Art of Extraordinary Living"
        subtitle="For nearly two decades, we have represented the rare, the remarkable, and the utterly irreplaceable."
        imageKey="pages.about"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      <StoryParallax />

      {/* Values */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What We Stand For"
            title="The Principles That Guide Us"
            align="center"
            light
            className="mb-16"
          />
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="group rounded-2xl border border-cream/10 p-8 transition-colors duration-500 hover:border-gold/40 hover:bg-cream/[0.03]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal">
                  <v.icon size={24} />
                </span>
                <h3 className="mt-6 font-display text-2xl text-cream">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cream py-24 lg:py-28">
        <div className="container-luxe">
          <Stats dark={false} />
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream pb-24 lg:pb-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our Journey"
            title="Milestones Along the Way"
            align="center"
            className="mb-16"
          />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-px bg-charcoal/15 sm:left-1/2" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`relative pl-14 sm:w-1/2 sm:pl-0 ${
                    i % 2 === 0
                      ? 'sm:pr-12 sm:text-right'
                      : 'sm:ml-auto sm:pl-12'
                  }`}
                >
                  <span
                    className={`absolute top-1.5 grid h-8 w-8 place-items-center rounded-full bg-gold text-xs font-bold text-charcoal left-0.5 sm:left-auto ${
                      i % 2 === 0 ? 'sm:-right-4' : 'sm:-left-4'
                    }`}
                  >
                    ●
                  </span>
                  <p className="font-display text-3xl text-gold-dark">{m.year}</p>
                  <h3 className="mt-1 font-display text-xl text-charcoal">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                    {m.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Meet the Team"
        title="Advisors Who Understand You"
        text="Our partners bring decades of experience and an unwavering commitment to your goals."
        buttonLabel="Meet the Agents"
        buttonTo="/agents"
      />
    </>
  )
}
