import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

// items: [{ label, to }] — last item is treated as current (no link).
export default function Breadcrumb({ items, light = false }) {
  const base = light ? 'text-cream/70' : 'text-charcoal/50'
  const current = light ? 'text-cream' : 'text-charcoal'
  const hover = light ? 'hover:text-gold' : 'hover:text-gold-dark'

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-2">
              {last || !item.to ? (
                <span className={last ? current : base}>{item.label}</span>
              ) : (
                <Link to={item.to} className={`${base} ${hover} transition-colors`}>
                  {item.label}
                </Link>
              )}
              {!last && <ChevronRight size={13} className="text-gold" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
