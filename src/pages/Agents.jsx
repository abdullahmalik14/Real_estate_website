import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import AgentCard from '../components/AgentCard'
import CTABanner from '../components/CTABanner'
import { agents } from '../data/agents'
import { staggerContainer, viewportOnce } from '../utils/motion'

export default function Agents() {
  return (
    <>
      <PageHeader
        eyebrow="The Team"
        title="Meet Our Advisors"
        subtitle="A collective of the industry's most trusted specialists, united by a singular standard of excellence."
        imageKey="pages.agents"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Agents' }]}
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our Partners"
            title="The People Behind the Portfolio"
            intro="Each of our advisors is a specialist in their market — and a master of their craft."
            className="mb-16"
          />
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {agents.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner
        eyebrow="Join Us"
        title="Represent the Extraordinary"
        text="We are always seeking exceptional talent to join our global team of advisors."
        buttonLabel="Get in Touch"
        buttonTo="/contact"
        imageKey="sections.ctaAgents"
      />
    </>
  )
}
