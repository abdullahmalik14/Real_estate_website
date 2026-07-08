import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import BlogCard from '../components/BlogCard'
import NotFound from './NotFound'
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts'
import { getAgentById } from '../data/agents'
import { fadeUp, staggerContainer, viewportOnce, EASE } from '../utils/motion'
import { asset } from '../utils/assets'

function renderBlock(block, i) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i}>{block.text}</h2>
    case 'h3':
      return <h3 key={i}>{block.text}</h3>
    case 'quote':
      return <blockquote key={i}>{block.text}</blockquote>
    case 'list':
      return (
        <ul key={i}>
          {block.items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      )
    default:
      return <p key={i}>{block.text}</p>
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <NotFound />

  const related = getRelatedPosts(slug, 3)
  const author = getAgentById(post.authorId)

  return (
    <>
      <header className="relative flex min-h-[70vh] items-end overflow-hidden">
        <motion.img
          src={asset(`blog.${post.slug}`)}
          alt={post.title}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
        <div className="container-luxe relative z-10 pb-16 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: EASE }}
            className="mb-6"
          >
            <Breadcrumb
              items={[
                { label: 'Home', to: '/' },
                { label: 'Blog', to: '/blog' },
                { label: post.title },
              ]}
              light
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ease: EASE }}
            className="eyebrow mb-4 block"
          >
            {post.category}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
            className="max-w-4xl font-display text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl"
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, ease: EASE }}
            className="mt-6 flex flex-wrap items-center gap-6 text-sm text-cream/70"
          >
            <span className="flex items-center gap-2">
              <User size={15} className="text-gold" /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={15} className="text-gold" /> {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={15} className="text-gold" /> {post.readTime}
            </span>
          </motion.div>
        </div>
      </header>

      {/* Article body */}
      <section className="bg-cream py-20 lg:py-24">
        <div className="container-luxe">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE }}
            className="prose-luxe mx-auto max-w-3xl"
          >
            <p className="!text-xl !leading-relaxed !text-charcoal">
              {post.excerpt}
            </p>
            {post.content.map(renderBlock)}
          </motion.article>

          {/* Author card */}
          {author && (
            <div className="mx-auto mt-16 max-w-3xl">
              <div className="flex items-center gap-5 rounded-2xl border border-charcoal/10 bg-white p-7">
                <img
                  src={asset(`agents.${author.id}`)}
                  alt={author.name}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-gold/40"
                />
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/50">
                    Written by
                  </p>
                  <Link
                    to={`/agents/${author.id}`}
                    className="font-display text-2xl text-charcoal hover:text-gold-dark"
                  >
                    {author.name}
                  </Link>
                  <p className="text-sm text-charcoal/60">{author.title}</p>
                </div>
              </div>
              <div className="mt-10 text-center">
                <Link to="/blog" className="link-underline text-charcoal">
                  <ArrowLeft size={15} /> Back to Journal
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      <section className="bg-charcoal py-24 lg:py-28">
        <div className="container-luxe">
          <div className="mb-14">
            <span className="eyebrow mb-4 block">Keep Reading</span>
            <h2 className="font-display text-3xl text-cream sm:text-4xl">
              Related Insights
            </h2>
          </div>
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} dark />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
