import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Trees,
  Check,
  Phone,
  Mail,
  Ruler,
} from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import PropertyCard from '../components/PropertyCard'
import ImageLightbox from '../components/ImageLightbox'
import NotFound from './NotFound'
import { getPropertyById, properties } from '../data/properties'
import { getAgentById } from '../data/agents'
import { fadeUp, staggerContainer, viewportOnce, EASE } from '../utils/motion'
import { asset, assetGallery } from '../utils/assets'

export default function PropertyDetail() {
  const { id } = useParams()
  const property = getPropertyById(id)
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', date: '' })
  const [sent, setSent] = useState(false)

  if (!property) return <NotFound />

  const agent = getAgentById(property.agentId)
  const gallery = (
    assetGallery(`properties.${property.id}`).length > 0
      ? assetGallery(`properties.${property.id}`)
      : property.gallery?.length
        ? property.gallery
        : [asset(`properties.${property.id}`) || property.image]
  ).filter(Boolean)

  const openLightbox = (index) => {
    setActive(index)
    setLightbox(true)
  }

  const moveLightbox = (dir) =>
    setActive((i) => (i + dir + gallery.length) % gallery.length)

  const related = properties
    .filter((p) => p.id !== property.id && p.type === property.type)
    .concat(properties.filter((p) => p.id !== property.id))
    .filter((v, i, a) => a.findIndex((x) => x.id === v.id) === i)
    .slice(0, 3)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const specs = [
    { icon: BedDouble, label: 'Bedrooms', value: property.beds },
    { icon: Bath, label: 'Bathrooms', value: property.baths },
    { icon: Maximize, label: 'Interior', value: `${property.sqft.toLocaleString()} sqft` },
    { icon: Trees, label: 'Lot Size', value: property.lot },
    { icon: Calendar, label: 'Year Built', value: property.year },
    { icon: Ruler, label: 'Type', value: property.type },
  ]

  return (
    <>
      <div className="bg-cream pt-28">
        <div className="container-luxe">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Properties', to: '/properties' },
              { label: property.name },
            ]}
          />

          {/* Title row */}
          <div className="mt-6 flex flex-col gap-4 border-b border-charcoal/10 pb-8 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="eyebrow mb-3 block">{property.status === 'Sold' ? 'Sold' : `For ${property.status}`}</span>
              <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
                {property.name}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-charcoal/60">
                <MapPin size={16} className="text-gold" /> {property.address}
              </p>
            </motion.div>
            <div className="text-left md:text-right">
              <p className="text-xs uppercase tracking-widest text-charcoal/50">
                Price
              </p>
              <p className="font-display text-4xl text-gold-dark">
                {property.priceLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <section className="bg-cream py-10">
        <div className="container-luxe">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="group relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl sm:row-span-2 lg:aspect-auto"
            >
              <img
                src={gallery[0]}
                alt={property.name}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-charcoal/50 to-transparent pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-cream/90 px-4 py-2 text-xs font-medium uppercase tracking-widest text-charcoal">
                  View Gallery
                </span>
              </span>
            </button>
            {gallery.slice(1, 5).map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => openLightbox(i + 1)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <img
                  src={src}
                  alt={`${property.name} view ${i + 2}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
                />
                {i === 3 && gallery.length > 5 && (
                  <span className="absolute inset-0 grid place-items-center bg-charcoal/60 font-display text-2xl text-cream">
                    +{gallery.length - 5} more
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-cream pb-24 pt-8 lg:pb-32">
        <div className="container-luxe grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <motion.h2 variants={fadeUp} className="font-display text-3xl text-charcoal">
                About This Residence
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-5 text-lg leading-relaxed text-charcoal/70"
              >
                {property.description}
              </motion.p>

              {/* Specs */}
              <motion.div
                variants={fadeUp}
                className="mt-10 grid grid-cols-2 gap-6 rounded-2xl border border-charcoal/10 bg-white p-8 sm:grid-cols-3"
              >
                {specs.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/10 text-gold">
                      <s.icon size={19} />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-charcoal/50">
                        {s.label}
                      </p>
                      <p className="font-display text-xl text-charcoal">{s.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Amenities */}
              <motion.h3
                variants={fadeUp}
                className="mt-12 font-display text-2xl text-charcoal"
              >
                Amenities & Features
              </motion.h3>
              <motion.ul
                variants={fadeUp}
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {property.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-charcoal/70">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/15 text-gold-dark">
                      <Check size={13} />
                    </span>
                    {a}
                  </li>
                ))}
              </motion.ul>

              {/* Map placeholder */}
              <motion.h3
                variants={fadeUp}
                className="mt-12 font-display text-2xl text-charcoal"
              >
                Location
              </motion.h3>
              <motion.div
                variants={fadeUp}
                className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-charcoal/10"
              >
                <img
                  src={asset('sections.mapPlaceholder')}
                  alt="Map location"
                  className="h-full w-full object-cover opacity-90 grayscale"
                />
                <div className="absolute inset-0 grid place-items-center bg-charcoal/30">
                  <div className="flex flex-col items-center gap-2 text-cream">
                    <MapPin size={32} className="text-gold" />
                    <p className="font-medium">{property.location}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {agent && (
                <div className="rounded-2xl border border-charcoal/10 bg-white p-7">
                  <p className="text-xs uppercase tracking-widest text-charcoal/50">
                    Listed By
                  </p>
                  <Link
                    to={`/agents/${agent.id}`}
                    className="group mt-4 flex items-center gap-4"
                  >
                    <img
                      src={asset(`agents.${agent.id}`)}
                      alt={agent.name}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-gold/40"
                    />
                    <div>
                      <p className="font-display text-xl text-charcoal group-hover:text-gold-dark">
                        {agent.name}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-gold">
                        {agent.title}
                      </p>
                    </div>
                  </Link>
                  <div className="mt-5 space-y-2 text-sm text-charcoal/70">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-3 hover:text-gold-dark"
                    >
                      <Phone size={15} className="text-gold" /> {agent.phone}
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-3 hover:text-gold-dark"
                    >
                      <Mail size={15} className="text-gold" /> {agent.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-charcoal p-7 text-cream">
                <h3 className="font-display text-2xl">Schedule a Viewing</h3>
                <p className="mt-2 text-sm text-cream/60">
                  Arrange a private tour of {property.name}.
                </p>
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 rounded-xl bg-gold/15 p-6 text-center"
                    >
                      <Check size={28} className="mx-auto mb-3 text-gold" />
                      <p className="font-medium text-cream">Request received</p>
                      <p className="mt-1 text-sm text-cream/60">
                        Your advisor will be in touch shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={submit}
                      className="mt-6 space-y-4"
                    >
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                        className="w-full rounded-xl border border-cream/15 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
                      />
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Email address"
                        className="w-full rounded-xl border border-cream/15 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
                      />
                      <input
                        required
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full rounded-xl border border-cream/15 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none [color-scheme:dark]"
                      />
                      <button type="submit" className="btn-gold w-full">
                        Request Viewing
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="bg-charcoal py-24 lg:py-28">
        <div className="container-luxe">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <span className="eyebrow mb-4 block">Continue Exploring</span>
              <h2 className="font-display text-3xl text-cream sm:text-4xl">
                Related Residences
              </h2>
            </div>
            <Link to="/properties" className="link-underline hidden text-cream sm:inline-flex">
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
            {related.map((p) => (
              <PropertyCard key={p.id} property={p} dark />
            ))}
          </motion.div>
        </div>
      </section>

      <ImageLightbox
        open={lightbox}
        images={gallery}
        active={active}
        title={property.name}
        onClose={() => setLightbox(false)}
        onChange={moveLightbox}
      />
    </>
  )
}
