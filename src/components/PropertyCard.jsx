import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BedDouble, Bath, Maximize, MapPin, ArrowUpRight } from 'lucide-react'
import { fadeUp } from '../utils/motion'
import { asset } from '../utils/assets'

export default function PropertyCard({ property, dark = false, priority = false }) {
  const imageSrc = property.image || asset(`properties.${property.id}`)
  const statusColor =
    property.status === 'Sold'
      ? 'bg-charcoal/80 text-cream'
      : property.status === 'Rent'
        ? 'bg-sage text-cream'
        : 'bg-gold text-charcoal'

  return (
    <motion.article variants={fadeUp} className="group">
      <Link to={`/properties/${property.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <img
            src={imageSrc}
            alt={property.name}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/0 to-charcoal/0 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest ${statusColor}`}
          >
            {property.status === 'Sold' ? 'Sold' : `For ${property.status}`}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-charcoal">
            {property.type}
          </span>

          <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-charcoal">
              View Details <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </Link>

      <div className="px-1 pt-5">
        <div className="flex items-start justify-between gap-4">
          <Link to={`/properties/${property.id}`}>
            <h3
              className={`font-display text-2xl transition-colors duration-300 group-hover:text-gold ${
                dark ? 'text-cream' : 'text-charcoal group-hover:text-gold-dark'
              }`}
            >
              {property.name}
            </h3>
          </Link>
          <p
            className={`whitespace-nowrap font-display text-xl ${
              dark ? 'text-gold' : 'text-gold-dark'
            }`}
          >
            {property.priceLabel}
          </p>
        </div>

        <p
          className={`mt-1.5 flex items-center gap-1.5 text-sm ${
            dark ? 'text-cream/60' : 'text-charcoal/60'
          }`}
        >
          <MapPin size={14} className="text-gold" /> {property.location}
        </p>

        <div
          className={`mt-4 flex items-center gap-5 border-t pt-4 text-sm ${
            dark ? 'border-cream/15 text-cream/70' : 'border-charcoal/10 text-charcoal/70'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <BedDouble size={16} className="text-gold" /> {property.beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={16} className="text-gold" /> {property.baths} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize size={16} className="text-gold" />{' '}
            {property.sqft.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </motion.article>
  )
}
