import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A small circle that follows the mouse and scales up over interactive elements.
// Disabled on touch / coarse-pointer devices for performance and usability.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      const target = e.target
      const interactive = target.closest(
        'a, button, input, textarea, select, [data-cursor="hover"]',
      )
      setHovering(Boolean(interactive))
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [cursorX, cursorY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x, y }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-gold"
          animate={{
            width: hovering ? 56 : 28,
            height: hovering ? 56 : 28,
            backgroundColor: hovering
              ? 'rgba(184,147,90,0.12)'
              : 'rgba(184,147,90,0)',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold md:block"
        style={{ x: cursorX, y: cursorY }}
      />
    </>
  )
}
