# Aurelia Estates — Luxury Real Estate Website

A premium, multi-page real estate website for a fictional high-end property agency, **Aurelia Estates**. Built as a portfolio-quality, Awwwards-inspired experience with cinematic animation, elegant serif/sans typography, and a warm charcoal-and-gold palette.

![Aurelia Estates](public/favicon.svg)

## ✦ Tech Stack

- **React 18** + **Vite** — fast, modern build tooling
- **React Router v6** — multi-page routing with nested/dynamic routes
- **Tailwind CSS** — custom design system (no default blue/gray palette)
- **Framer Motion** — scroll-triggered, staggered, and page-transition animations
- **Lucide React** — crisp, consistent iconography
- **Google Fonts** — Playfair Display + Cormorant Garamond (serif) & Manrope (sans)

## ✦ Design Language

| Token | Value | Use |
| --- | --- | --- |
| Charcoal | `#161614` | Backgrounds, text |
| Cream | `#F5F1EA` | Light backgrounds |
| Gold / Bronze | `#B8935A` | Accent, CTAs |
| Sage | `#7C8471` | Secondary accent |
| Navy | `#1F2A38` | Tertiary accent |

- **Display serif** for headlines, **Manrope** for body
- Generous whitespace, full-bleed imagery with dark overlays
- Custom cubic-bezier easing `[0.6, 0.01, 0.05, 0.95]` throughout for a premium feel

## ✦ Pages & Routes

| Route | Page | Notes |
| --- | --- | --- |
| `/` | Home | Ken Burns hero, featured properties, animated stats, story teaser (parallax), testimonials carousel, CTA |
| `/properties` | Properties Listing | Sticky filters (type, price, beds, search), Buy/Rent/Sold tabs, Load More |
| `/properties/:id` | Property Detail | Image gallery + lightbox, specs, amenities, agent card, sticky viewing form, map, related |
| `/about` | About | Parallax story, values grid, animated counters, milestone timeline |
| `/agents` | Agents | Team grid with hover lift |
| `/agents/:id` | Agent Detail | Bio, stats, contact form, agent's active listings |
| `/services` | Services | Services grid, "How It Works" process timeline, CTA |
| `/blog` | Blog Listing | Featured post, category filter tabs, article grid |
| `/blog/:slug` | Blog Post | Editorial typography, author card, related posts |
| `/contact` | Contact | Floating-label form with loading state, map, office grid |
| `*` | 404 | Elegant not-found page |

All pages share a common **`MainLayout`** (Navbar + `<Outlet />` + Footer).

## ✦ Key Features

- **Shared Layout** via React Router `<Outlet />`
- **Scroll-aware Navbar** — transparent over heroes, blurred solid on scroll, animated active underline, slide-in mobile menu
- **Page transitions** with `AnimatePresence` (fade + slide)
- **Scroll-to-top** on every route change
- **Scroll-triggered animations** (`whileInView`) with staggered children on every section
- **Animated counters** that count up when scrolled into view
- **Parallax** imagery on story sections
- **Auto-playing testimonials** carousel with crossfade
- **Custom cursor** (desktop only) that scales over interactive elements
- **Fully responsive** — mobile, tablet, desktop; heavy effects simplified on touch devices
- **Mock data** for 8 properties, 6 agents, and 6 blog posts, with real Unsplash imagery

## ✦ Project Structure

```
src/
  layouts/
    MainLayout.jsx        # Navbar + <Outlet /> + Footer
  components/
    Navbar.jsx  Footer.jsx  ScrollToTop.jsx  PageTransition.jsx
    CustomCursor.jsx  PageHeader.jsx  SectionHeading.jsx  Breadcrumb.jsx
    FilterTabs.jsx  Hero.jsx  Stats.jsx  Testimonials.jsx  CTABanner.jsx
    PropertyCard.jsx  AgentCard.jsx  BlogCard.jsx
  pages/
    Home.jsx  Properties.jsx  PropertyDetail.jsx  About.jsx
    Agents.jsx  AgentDetail.jsx  Services.jsx  Blog.jsx
    BlogPost.jsx  Contact.jsx  NotFound.jsx
  data/
    properties.js  agents.js  blogPosts.js
  utils/
    motion.js             # Shared Framer Motion variants + easing
  App.jsx                 # Route definitions
  main.jsx                # Entry (BrowserRouter)
  index.css               # Tailwind + component classes
```

## ✦ Getting Started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

## ✦ Notes

- All imagery is loaded from Unsplash via direct URLs as placeholders.
- Forms are front-end only (simulated submit states); wire them to a backend or service (e.g. Formspree) for production use.
- The custom cursor and fixed-attachment parallax are automatically reduced/disabled on touch devices.

---

Built as a portfolio case study. Design, copy, and data are fictional.
