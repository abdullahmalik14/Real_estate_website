let assetsMap = null
const preloaded = new Set()

function resolvePath(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export async function loadAssetsMap() {
  if (assetsMap) return assetsMap
  const res = await fetch('/assets/assetsmap.json')
  if (!res.ok) throw new Error('Failed to load assets map')
  assetsMap = await res.json()
  return assetsMap
}

/** Resolve a dot-path key (e.g. "hero.home") to a URL from assetsmap.json */
export function asset(key) {
  if (!assetsMap) {
    console.warn(`Assets map not loaded yet. Key: ${key}`)
    return ''
  }
  const value = resolvePath(assetsMap.images, key)
  if (typeof value === 'string') return value
  if (value?.main) return value.main
  console.warn(`Asset not found: ${key}`)
  return ''
}

export function assetGallery(key) {
  if (!assetsMap) return []
  const value = resolvePath(assetsMap.images, key)
  if (Array.isArray(value?.gallery)) return value.gallery
  if (typeof value?.main === 'string') return [value.main]
  return []
}

export function getCriticalAssetKeys() {
  return assetsMap?.critical ?? []
}

function preloadImage(url) {
  if (!url || preloaded.has(url)) return Promise.resolve()
  preloaded.add(url)
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = () => resolve()
    img.src = url
  })
}

/** Preload images by dot-path keys from assetsmap.json */
export async function preloadAssets(keys = []) {
  await loadAssetsMap()
  const urls = keys.map((k) => asset(k)).filter(Boolean)
  await Promise.all(urls.map(preloadImage))
}

/** Preload all critical + route-specific images */
export async function preloadForRoute(pathname = '/') {
  await loadAssetsMap()
  const keys = [...getCriticalAssetKeys()]

  const routeMap = {
    '/': ['sections.storyTeaser', 'sections.ctaDefault'],
    '/properties': ['pages.properties'],
    '/about': ['pages.about', 'sections.aboutStory'],
    '/agents': ['pages.agents', 'sections.ctaAgents'],
    '/services': ['pages.services', 'sections.ctaServices'],
    '/blog': ['pages.blog'],
    '/contact': ['pages.contact', 'sections.mapPlaceholder'],
  }

  if (routeMap[pathname]) keys.push(...routeMap[pathname])

  if (pathname.startsWith('/properties/')) {
    const id = pathname.split('/')[2]
    keys.push(`properties.${id}`)
  }
  if (pathname.startsWith('/agents/')) {
    const id = pathname.split('/')[2]
    keys.push(`agents.${id}`)
  }
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.split('/')[2]
    keys.push(`blog.${slug}`)
  }

  await preloadAssets(keys)
}

/** Warm cache for featured property thumbnails on first load */
export async function preloadFeaturedProperties() {
  await loadAssetsMap()
  const keys = Object.keys(assetsMap.images.properties ?? {}).map(
    (id) => `properties.${id}`,
  )
  await preloadAssets(keys.slice(0, 6))
}
