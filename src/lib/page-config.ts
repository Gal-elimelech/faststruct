export type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export interface PageConfig {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

/**
 * Central configuration for all pages in the site.
 * This is the single source of truth for page settings.
 */
export const PAGES_CONFIG: PageConfig[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/modules', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/the-system', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/module', changeFrequency: 'monthly', priority: 0.8 }, // Dynamic route prefix
];

/**
 * List of enabled pages that are accessible to clients.
 * Simply add or remove page paths to toggle pages on/off.
 */
const ENABLED_PAGES = [
  '/',
  '/contact',
  '/about',
  '/module',
  '/modules',
  '/the-system',
];

/**
 * Check if a page path is enabled
 */
export function isPageEnabled(path: string): boolean {
  // Normalize path (remove trailing slashes except for root)
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');
  return ENABLED_PAGES.includes(normalizedPath);
}

/**
 * Get page configuration for sitemap
 */
export function getPageConfig(path: string): PageConfig | undefined {
  return PAGES_CONFIG.find((page) => page.path === path);
}

/**
 * Get all enabled static pages for sitemap (excluding dynamic routes)
 */
export function getEnabledStaticPages(): PageConfig[] {
  return PAGES_CONFIG.filter(
    (page) => isPageEnabled(page.path) && page.path !== '/module'
  );
}

/**
 * Check if a module detail page should be accessible
 * Module pages are accessible if the homepage is enabled
 * Supports dynamic routes like /module/[slug]
 */
export function isModulePageEnabled(): boolean {
  return isPageEnabled('/module');
}
