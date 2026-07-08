import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import BlogCard from '../components/BlogCard'
import FilterTabs from '../components/FilterTabs'
import { blogPosts, blogCategories } from '../data/blogPosts'
import { staggerContainer, viewportOnce, fadeUp, EASE } from '../utils/motion'
import { asset } from '../utils/assets'

export default function Blog() {
  const [category, setCategory] = useState('All')
  const featured = blogPosts[0]

  const filtered =
    category === 'All'
      ? blogPosts.slice(1)
      : blogPosts.filter((p) => p.category === category)

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="The Journal"
        subtitle="Perspectives on the market, design, and the art of extraordinary living."
        imageKey="pages.blog"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Blog' }]}
      />

      <section className="bg-cream py-20 lg:py-24">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid items-center gap-10 lg:grid-cols-2"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
                <img
                  src={asset(`blog.${featured.slug}`)}
                  alt={featured.title}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-gold px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-widest text-charcoal">
                  Featured
                </span>
              </div>
              <div>
                <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-charcoal/50">
                  <span className="text-gold-dark">{featured.category}</span>
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-gold" /> {featured.readTime}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-charcoal/60">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-gold-dark">
                  Read Article <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-cream pb-24 lg:pb-32">
        <div className="container-luxe">
          <div className="mb-12 flex flex-col gap-6 border-t border-charcoal/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-display text-2xl text-charcoal">Latest Articles</h3>
            <FilterTabs
              tabs={blogCategories}
              active={category}
              onChange={setCategory}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate="show"
              className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="py-16 text-center font-serif text-xl text-charcoal/50"
            >
              No articles in this category yet.
            </motion.p>
          )}
        </div>
      </section>
    </>
  )
}
