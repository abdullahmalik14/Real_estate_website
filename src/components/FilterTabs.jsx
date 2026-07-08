import { motion } from 'framer-motion'

// Animated tab bar with a sliding underline indicator (Framer Motion layoutId).
export default function FilterTabs({ tabs, active, onChange, light = false }) {
  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      {tabs.map((tab) => {
        const isActive = tab === active
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className="relative px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors duration-300"
          >
            <span
              className={
                isActive
                  ? light
                    ? 'text-cream'
                    : 'text-charcoal'
                  : light
                    ? 'text-cream/50 hover:text-cream/80'
                    : 'text-charcoal/50 hover:text-charcoal/80'
              }
            >
              {tab}
            </span>
            {isActive && (
              <motion.span
                layoutId={`tab-underline-${light ? 'light' : 'dark'}`}
                className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gold"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
