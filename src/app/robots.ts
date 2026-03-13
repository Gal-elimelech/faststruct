import { MetadataRoute } from 'next';
import { env } from '@/lib/env';

/**
 * robots.txt configuration for search engine crawlers (Google, Bing, etc.)
 * Served at /robots.txt - helps crawlers discover and index the site efficiently
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.siteUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', // API routes - no SEO value, form endpoints
        '/coming-soon', // Placeholder/temporary page
        '/_next/', // Next.js build artifacts - no SEO value
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

