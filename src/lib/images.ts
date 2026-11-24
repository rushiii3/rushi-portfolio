/**
 * Image Optimization Utilities for Cloudinary and External CDNs.
 *
 * Automatically injects responsive widths, modern formats (WebP/AVIF via f_auto),
 * and adaptive compression (q_auto) to achieve >90% payload reduction.
 */

export interface ImageOptimizationOptions {
  quality?: string;
  format?: string;
}

/**
 * Transforms a raw image URL (Cloudinary or Unsplash) into an optimized CDN URL.
 * Local/static assets or unsupported URLs are returned untouched.
 */
export function getOptimizedImageUrl(
  src: string | undefined | null,
  width?: number,
  options: ImageOptimizationOptions = {}
): string {
  if (!src) return '';

  const { quality = 'auto', format = 'auto' } = options;

  // Cloudinary Optimization
  if (src.includes('res.cloudinary.com') && src.includes('/image/upload/')) {
    const transformParts = [
      format ? `f_${format}` : null,
      quality ? `q_${quality}` : null,
      'c_limit',
      width ? `w_${width}` : null,
    ].filter(Boolean);

    const transform = transformParts.join(',');

    const match = src.match(/(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*)/);
    if (match) {
      const prefix = match[1];
      const rest = match[2];

      // Check if URL already has transformation segment before version/folder
      const versionMatch = rest.match(/^(?:([a-z]_[^/]+(?:,[a-z]_[^/]+)*)\/)?(v\d+\/.*|[a-zA-Z0-9_-]+\/.*)$/);
      if (versionMatch) {
        return `${prefix}${transform}/${versionMatch[2]}`;
      }
      return `${prefix}${transform}/${rest}`;
    }
  }

  // Unsplash Optimization
  if (src.includes('images.unsplash.com')) {
    try {
      const parsed = new URL(src);
      parsed.searchParams.set('auto', 'format');
      parsed.searchParams.set('fit', 'max');
      if (width) parsed.searchParams.set('w', String(width));
      parsed.searchParams.set('q', quality === 'auto' ? '75' : quality);
      return parsed.toString();
    } catch {
      return src;
    }
  }

  // Fallback for local assets or other external domains
  return src;
}

/**
 * Generates a standard responsive srcset string for supported CDN image URLs.
 * Returns undefined for local static images without multi-resolution generation.
 */
export function getImageSrcSet(
  src: string | undefined | null,
  widths: number[] = [640, 800, 1024, 1200],
  options: ImageOptimizationOptions = {}
): string | undefined {
  if (!src) return undefined;
  if (!src.includes('res.cloudinary.com') && !src.includes('images.unsplash.com')) {
    return undefined;
  }

  return widths
    .map((w) => `${getOptimizedImageUrl(src, w, options)} ${w}w`)
    .join(', ');
}
