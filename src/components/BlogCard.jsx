import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { fadeUp } from '../utils/motion'
import { asset } from '../utils/assets'

export default function BlogCard({ post, dark = false }) {
  const imageSrc = post.image || asset(`blog.${post.slug}`)
  return (
    <motion.article variants={fadeUp}>
      <Link to={`/blog/${post.slug}`} className="group block">
        <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
          <img
            src={imageSrc}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-charcoal">
            {post.category}
          </span>
        </div>

        <div className="pt-5">
          <div
            className={`flex items-center gap-4 text-xs uppercase tracking-widest ${
              dark ? 'text-cream/50' : 'text-charcoal/50'
            }`}
          >
            <span>{post.date}</span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-gold" /> {post.readTime}
            </span>
          </div>
          <h3
            className={`mt-3 font-display text-2xl leading-snug transition-colors duration-300 group-hover:text-gold ${
              dark ? 'text-cream' : 'text-charcoal group-hover:text-gold-dark'
            }`}
          >
            {post.title}
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed line-clamp-2 ${
              dark ? 'text-cream/60' : 'text-charcoal/60'
            }`}
          >
            {post.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-gold-dark">
            Read Article <ArrowUpRight size={15} />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
