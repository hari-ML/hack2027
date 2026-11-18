'use client'

/**
 * Standard Next.js custom image loader.
 * Adds w/q sizing params to relative Payload /api/.../file/... URLs
 * and passes all other src values through unchanged.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  // Relative Payload upload URLs — append sizing params
  if (src.startsWith('/api/') || src.startsWith('/media/')) {
    const q = quality ?? 75
    const sep = src.includes('?') ? '&' : '?'
    return `${src}${sep}w=${width}&q=${q}`
  }
  // All other URLs (absolute, CDN, external) — pass through unchanged
  return src
}
