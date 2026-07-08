import { useState } from 'react'

/**
 * Performance-focused image with optional priority preload, blur placeholder,
 * and lazy loading for below-the-fold content.
 */
export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  priority = false,
  aspectRatio,
  objectFit = 'cover',
  ...props
}) {
  const [loaded, setLoaded] = useState(false)

  if (!src) return null

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-charcoal/10"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ objectFit }}
        {...props}
      />
    </div>
  )
}
