import { MetadataRoute } from 'next';
import { getModules } from '@/lib/content';
import { env } from '@/lib/env';
import {
  getEnabledStaticPages,
  getPageConfig,
  isPageEnabled,
} from '@/lib/page-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.siteUrl;
  const currentDate = new Date();

  // Generate static pages from central configuration
  const staticPages = getEnabledStaticPages().map((page) => ({
    url: page.path === '/' ? baseUrl : `${baseUrl}${page.path}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Generate dynamic module pages - only if module pages are enabled
  const modulePages: MetadataRoute.Sitemap = [];
  if (isPageEnabled('/module')) {
    try {
      const moduleConfig = getPageConfig('/module');
      const modules = await getModules();
      modulePages.push(
        ...modules.map((module) => ({
          url: `${baseUrl}/module/${module.slug}`,
          lastModified: currentDate,
          changeFrequency: moduleConfig?.changeFrequency ?? 'monthly',
          priority: moduleConfig?.priority ?? 0.8,
        }))
      );
    } catch (error) {
      console.error('[Sitemap] Error fetching modules:', error);
    }
  }

  return [...staticPages, ...modulePages];
}
