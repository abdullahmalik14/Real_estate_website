import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Check,
  Award,
  Briefcase,
} from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import PropertyCard from '../components/PropertyCard'
import NotFound from './NotFound'
import { getAgentById } from '../data/agents'
import { getPropertiesByAgent } from '../data/properties'
import { fadeUp, staggerContainer, viewportOnce, EASE } from '../utils/motion'
import { asset } from '../utils/assets'

export default function AgentDetail() {
  const { id } = useParams()
  const agent = getAgentById(id)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  if (!agent) return <NotFound />

  const listings = getPropertiesByAgent(agent.id)
  const socials = [
    { icon: Instagram, href: agent.social.instagram },
    { icon: Linkedin, href: agent.social.linkedin },
    { icon: Twitter, href: agent.social.twitter },
  ]

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal pb-16 pt-32 text-cream lg:pt-40">
        <div className="container-luxe">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Agents', to: '/agents' },
              { label: agent.name },
            ]}
            light
          />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[380px,1fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <img
                src={asset(`agents.${agent.id}`)}
                alt={agent.name}
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate="show"
            >
              <motion.span variants={fadeUp} className="eyebrow mb-4 block">
                {agent.specialty}
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="font-display text-4xl text-cream sm:text-5xl lg:text-6xl"
              >
                {agent.name}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-3 text-lg text-gold"
              >
                {agent.title}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-8"
              >
                <div className="flex items-center gap-3">
                  <Briefcase size={20} className="text-gold" />
                  <div>
                    <p className="font-display text-2xl">{agent.experience} yrs</p>
                    <p className="text-xs uppercase tracking-widest text-cream/50">
                      Experience
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-gold" />
                  <div>
                    <p className="font-display text-2xl">{agent.sales}</p>
                    <p className="text-xs uppercase tracking-widest text-cream/50">
                      Total Sales
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap items-center gap-6 text-sm text-cream/70"
              >
                <span className="flex items-center gap-2">
                  <MapPin size={15} className="text-gold" /> {agent.location}
                </span>
                <a href={`tel:${agent.phone}`} className="flex items-center gap-2 hover:text-gold">
                  <Phone size={15} className="text-gold" /> {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="flex items-center gap-2 hover:text-gold">
                  <Mail size={15} className="text-gold" /> {agent.email}
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 flex gap-3">
                {socials.map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream/70 transition-all hover:border-gold hover:text-gold"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-cream py-20 lg:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-3">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-2"
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl text-charcoal">
              About {agent.name.split(' ')[0]}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-lg leading-relaxed text-charcoal/70"
            >
              {agent.bio}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-lg leading-relaxed text-charcoal/70"
            >
              {agent.name.split(' ')[0]} works with a select group of clients each
              year, ensuring the personal attention and discretion that define the
              Aurelia experience.
            </motion.p>
          </motion.div>

          {/* Contact form */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-7">
              <h3 className="font-display text-2xl text-charcoal">
                Contact This Agent
              </h3>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-xl bg-gold/10 p-6 text-center"
                >
                  <Check size={28} className="mx-auto mb-3 text-gold-dark" />
                  <p className="font-medium text-charcoal">Message sent</p>
                  <p className="mt-1 text-sm text-charcoal/60">
                    {agent.name.split(' ')[0]} will respond personally soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-charcoal/15 bg-cream/50 px-4 py-3 text-sm focus:border-gold focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email address"
                    className="w-full rounded-xl border border-charcoal/15 bg-cream/50 px-4 py-3 text-sm focus:border-gold focus:outline-none"
                  />
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Your message"
                    className="w-full rounded-xl border border-charcoal/15 bg-cream/50 px-4 py-3 text-sm focus:border-gold focus:outline-none"
                  />
                  <button type="submit" className="btn-gold w-full">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      {listings.length > 0 && (
        <section className="bg-cream pb-24 lg:pb-32">
          <div className="container-luxe">
            <SectionListings agentName={agent.name.split(' ')[0]} listings={listings} />
          </div>
        </section>
      )}
    </>
  )
}

function SectionListings({ agentName, listings }) {
  return (
    <>
      <div className="mb-14 flex items-end justify-between">
        <div>
          <span className="eyebrow mb-4 block">Active Portfolio</span>
          <h2 className="font-display text-3xl text-charcoal sm:text-4xl">
            {agentName}&rsquo;s Listings
          </h2>
        </div>
        <Link to="/properties" className="link-underline hidden text-charcoal sm:inline-flex">
          View All
        </Link>
      </div>
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        {listings.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </motion.div>
    </>
  )
}
