import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <footer className="bg-charcoal text-cream/70">
      <div className="container-luxe grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-3 text-cream">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 font-display text-xl text-gold">
              A
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-wide">Aurelia</span>
              <span className="text-[0.6rem] uppercase tracking-luxe text-gold/80">
                Estates
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm font-serif text-lg leading-relaxed text-cream/60">
            Curating the world&rsquo;s most extraordinary homes for those who
            refuse to live ordinarily.
          </p>
          <div className="mt-8 flex gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.15, y: -3 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-6 text-xs font-semibold uppercase tracking-luxe text-gold">
            Explore
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              ['Home', '/'],
              ['Properties', '/properties'],
              ['About Us', '/about'],
              ['Our Agents', '/agents'],
              ['Services', '/services'],
            ].map(([label, to]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="transition-colors hover:text-gold"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-xs font-semibold uppercase tracking-luxe text-gold">
            Contact
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>9200 Sunset Blvd, Suite 400
                <br />Los Angeles, CA 90069</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-gold" />
              <a href="tel:+13105550142" className="hover:text-gold">
                +1 (310) 555-0142
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-gold" />
              <a href="mailto:hello@aureliaestates.com" className="hover:text-gold">
                hello@aureliaestates.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-xs font-semibold uppercase tracking-luxe text-gold">
            Newsletter
          </h4>
          <p className="mb-4 text-sm text-cream/60">
            Private listings and market insights, delivered discreetly.
          </p>
          <form onSubmit={subscribe} className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full rounded-full border border-cream/15 bg-transparent py-3 pl-5 pr-12 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-gold text-charcoal transition-transform hover:scale-105"
            >
              <ArrowRight size={16} />
            </button>
          </form>
          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs text-gold"
            >
              Thank you — you&rsquo;re on the list.
            </motion.p>
          )}
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream/40 md:flex-row">
          <p>© {new Date().getFullYear()} Aurelia Estates. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms of Service</a>
            <a href="#" className="hover:text-gold">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
