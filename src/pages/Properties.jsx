import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import PropertyCard from '../components/PropertyCard'
import FilterTabs from '../components/FilterTabs'
import { properties, propertyTypes, statusTabs } from '../data/properties'
import { staggerContainer, viewportOnce, fadeUp } from '../utils/motion'

const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $5M', min: 0, max: 5000000 },
  { label: '$5M – $10M', min: 5000000, max: 10000000 },
  { label: '$10M+', min: 10000000, max: Infinity },
]

const PAGE_SIZE = 6

export default function Properties() {
  const [status, setStatus] = useState('Buy')
  const [type, setType] = useState('All')
  const [priceIdx, setPriceIdx] = useState(0)
  const [beds, setBeds] = useState('Any')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const range = priceRanges[priceIdx]
    return properties.filter((p) => {
      if (p.status !== status) return false
      if (type !== 'All' && p.type !== type) return false
      if (p.price < range.min || p.price > range.max) return false
      if (beds !== 'Any' && p.beds < Number(beds)) return false
      if (
        query &&
        !`${p.name} ${p.location}`.toLowerCase().includes(query.toLowerCase())
      )
        return false
      return true
    })
  }, [status, type, priceIdx, beds, query])

  const shown = filtered.slice(0, visible)

  const resetVisible = () => setVisible(PAGE_SIZE)

  return (
    <>
      <PageHeader
        eyebrow="The Collection"
        title="Discover Your Next Address"
        subtitle="Browse our full portfolio of exceptional residences across the globe."
        imageKey="pages.properties"
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Properties' },
        ]}
      />

      {/* Sticky filter bar */}
      <div className="sticky top-[68px] z-30 border-y border-charcoal/10 bg-cream/95 backdrop-blur-md">
        <div className="container-luxe py-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <FilterTabs
              tabs={statusTabs}
              active={status}
              onChange={(v) => {
                setStatus(v)
                resetVisible()
              }}
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:items-center">
              <div className="relative col-span-2 sm:col-span-4 lg:col-span-1">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
                />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    resetVisible()
                  }}
                  placeholder="Search by name or location"
                  className="w-full rounded-full border border-charcoal/15 bg-white py-2.5 pl-11 pr-4 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none lg:w-60"
                />
              </div>

              <SelectPill
                value={type}
                onChange={(v) => {
                  setType(v)
                  resetVisible()
                }}
                options={propertyTypes}
              />
              <SelectPill
                value={String(priceIdx)}
                onChange={(v) => {
                  setPriceIdx(Number(v))
                  resetVisible()
                }}
                options={priceRanges.map((r, i) => ({
                  value: String(i),
                  label: r.label,
                }))}
              />
              <SelectPill
                value={beds}
                onChange={(v) => {
                  setBeds(v)
                  resetVisible()
                }}
                options={['Any', '2', '3', '4', '5'].map((b) => ({
                  value: b,
                  label: b === 'Any' ? 'Any Beds' : `${b}+ Beds`,
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-luxe">
          <p className="mb-10 flex items-center gap-2 text-sm text-charcoal/50">
            <SlidersHorizontal size={15} className="text-gold" />
            Showing{' '}
            <span className="font-medium text-charcoal">{filtered.length}</span>{' '}
            {status.toLowerCase()} {filtered.length === 1 ? 'property' : 'properties'}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${status}-${type}-${priceIdx}-${beds}-${query}`}
              variants={staggerContainer(0.08)}
              initial="hidden"
              animate="show"
              className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            >
              {shown.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-display text-3xl text-charcoal/70">
                No matching residences
              </p>
              <p className="mt-3 text-charcoal/50">
                Try adjusting your filters to explore more of the collection.
              </p>
            </div>
          )}

          {visible < filtered.length && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-16 text-center"
            >
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="btn-outline border-charcoal/40 text-charcoal"
              >
                Load More
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}

function SelectPill({ value, onChange, options }) {
  const opts = options.map((o) =>
    typeof o === 'string' ? { value: o, label: o } : o,
  )
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-full border border-charcoal/15 bg-white py-2.5 pl-4 pr-9 text-sm text-charcoal focus:border-gold focus:outline-none"
      >
        {opts.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40">
        ▾
      </span>
    </div>
  )
}
