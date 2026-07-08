import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  loadAssetsMap,
  preloadFeaturedProperties,
  preloadForRoute,
} from '../utils/assets'

/** Loads assetsmap.json and preloads images for the current route. */
export default function AssetPreloader() {
  const { pathname } = useLocation()

  useEffect(() => {
    loadAssetsMap()
      .then(() => preloadFeaturedProperties())
      .catch(console.error)
  }, [])

  useEffect(() => {
    preloadForRoute(pathname).catch(console.error)
  }, [pathname])

  return null
}
