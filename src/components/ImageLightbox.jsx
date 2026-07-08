import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { EASE } from '../utils/motion'

// Portals to document.body so fixed positioning works (parent motion transforms break fixed).
export default function ImageLightbox({
  open,
  images,
  active,
  title,
  onClose,
  onChange,
}) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onChange(-1)
      if (e.key === 'ArrowRight') onChange(1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, onChange])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && images.length > 0 && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/95 p-4"
          onClick={onClose}
        >
          <button
            type="button"
            className="absolute right-6 top-6 z-10 text-cream/70 transition-colors hover:text-gold"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <X size={30} />
          </button>

          <button
            type="button"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-cream/70 transition-colors hover:text-gold sm:left-8"
            onClick={(e) => {
              e.stopPropagation()
              onChange(-1)
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={images[active]}
              alt={`${title} — photo ${active + 1}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[min(90vw,1200px)] rounded-xl object-contain shadow-2xl"
            />
          </AnimatePresence>

          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-cream/70 transition-colors hover:text-gold sm:right-8"
            onClick={(e) => {
              e.stopPropagation()
              onChange(1)
            }}
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-sm uppercase tracking-widest text-cream/60">
            {active + 1} / {images.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
