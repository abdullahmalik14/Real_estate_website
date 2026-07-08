import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Check, Loader2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion'
import { asset } from '../utils/assets'

const offices = [
  {
    city: 'Los Angeles',
    address: '9200 Sunset Blvd, Suite 400',
    phone: '+1 (310) 555-0142',
    hours: 'Mon–Fri, 9am–6pm PST',
  },
  {
    city: 'New York',
    address: '1 Park Row, 40th Floor',
    phone: '+1 (212) 555-0199',
    hours: 'Mon–Fri, 9am–6pm EST',
  },
  {
    city: 'Lake Como',
    address: 'Via del Lago 12, Bellagio',
    phone: '+39 031 555 0170',
    hours: 'Mon–Fri, 9am–6pm CET',
  },
]

function FloatingInput({ label, type = 'text', value, onChange, textarea }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  const Comp = textarea ? 'textarea' : 'input'

  return (
    <div className="relative">
      <Comp
        type={type}
        required
        rows={textarea ? 5 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer w-full resize-none rounded-xl border bg-white px-4 pb-3 pt-6 text-sm text-charcoal transition-all duration-300 focus:outline-none ${
          focused
            ? 'border-gold shadow-[0_0_0_3px_rgba(184,147,90,0.15)]'
            : 'border-charcoal/15'
        }`}
      />
      <label
        className={`pointer-events-none absolute left-4 origin-left transition-all duration-300 ${
          active
            ? 'top-2 text-[0.65rem] uppercase tracking-widest text-gold'
            : 'top-4 text-sm text-charcoal/40'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [state, setState] = useState('idle') // idle | loading | done

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    setState('loading')
    setTimeout(() => setState('done'), 1600)
  }

  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Let's Begin a Conversation"
        subtitle="Whether you're buying, selling, or simply exploring, our advisors are here to help."
        imageKey="pages.contact"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Form */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.span variants={fadeUp} className="eyebrow mb-4 block">
              Send a Message
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl text-charcoal sm:text-4xl"
            >
              Book a Consultation
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-charcoal/60"
            >
              Tell us a little about what you&rsquo;re looking for, and we&rsquo;ll
              be in touch within one business day.
            </motion.p>

            {state === 'done' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-2xl border border-gold/30 bg-gold/10 p-10 text-center"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-charcoal">
                  <Check size={26} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-charcoal">
                  Thank You
                </h3>
                <p className="mt-2 text-charcoal/60">
                  Your message has been received. An advisor will reach out to you
                  personally very soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeUp}
                onSubmit={submit}
                className="mt-8 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FloatingInput
                    label="Full Name"
                    value={form.name}
                    onChange={set('name')}
                  />
                  <FloatingInput
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                  />
                </div>
                <FloatingInput
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                />
                <FloatingInput
                  label="How can we help?"
                  value={form.message}
                  onChange={set('message')}
                  textarea
                />
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="btn-gold w-full disabled:opacity-80"
                >
                  {state === 'loading' ? (
                    <>
                      <Loader2 size={17} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </motion.form>
            )}
          </motion.div>

          {/* Info + map */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-8"
          >
            <motion.div
              variants={fadeUp}
              className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-charcoal/10"
            >
              <img
                src={asset('sections.mapPlaceholder')}
                alt="Office location map"
                className="h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 grid place-items-center bg-charcoal/25">
                <div className="flex flex-col items-center gap-2 text-cream">
                  <MapPin size={30} className="text-gold" />
                  <p className="font-medium">Los Angeles Headquarters</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-white p-5">
                <Phone size={18} className="mt-0.5 text-gold" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/50">
                    Call
                  </p>
                  <p className="text-sm text-charcoal">+1 (310) 555-0142</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-white p-5">
                <Mail size={18} className="mt-0.5 text-gold" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/50">
                    Email
                  </p>
                  <p className="text-sm text-charcoal">hello@aurelia.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-white p-5">
                <Clock size={18} className="mt-0.5 text-gold" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/50">
                    Hours
                  </p>
                  <p className="text-sm text-charcoal">Mon–Fri, 9–6</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-charcoal py-24 lg:py-28">
        <div className="container-luxe">
          <div className="mb-14 text-center">
            <span className="eyebrow mb-4 block">Global Presence</span>
            <h2 className="font-display text-3xl text-cream sm:text-4xl">
              Our Offices
            </h2>
          </div>
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-6 md:grid-cols-3"
          >
            {offices.map((o) => (
              <motion.div
                key={o.city}
                variants={fadeUp}
                className="rounded-2xl border border-cream/10 p-8 transition-colors duration-500 hover:border-gold/40"
              >
                <h3 className="font-display text-2xl text-cream">{o.city}</h3>
                <div className="mt-5 space-y-3 text-sm text-cream/60">
                  <p className="flex items-start gap-3">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                    {o.address}
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone size={16} className="shrink-0 text-gold" />
                    {o.phone}
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock size={16} className="shrink-0 text-gold" />
                    {o.hours}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
