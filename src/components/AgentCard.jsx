import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { fadeUp } from '../utils/motion'
import { asset } from '../utils/assets'

export default function AgentCard({ agent }) {
  const photo = agent.photo || asset(`agents.${agent.id}`)
  return (
    <motion.article variants={fadeUp}>
      <Link to={`/agents/${agent.id}`} className="group block">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_-30px_rgba(22,22,20,0.35)] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-30px_rgba(22,22,20,0.5)]"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={photo}
              alt={agent.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-charcoal">
              {agent.specialty}
            </span>
          </div>
          <div className="flex items-start justify-between gap-3 p-6">
            <div>
              <h3 className="font-display text-2xl text-charcoal">{agent.name}</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-gold">
                {agent.title}
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-charcoal/60">
                <MapPin size={14} className="text-gold" /> {agent.location}
              </p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}
