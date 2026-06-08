import { isPageEnabled, PagePath } from './page-config';

export type Route = {
  // Updated to allow both local PagePath and standard external URL strings
  href: PagePath | string; 
  title: string;
  isButton?: boolean;
};

export const ROUTES: Route[] = [
  { href: '/', title: 'Home' },
  { href: '/modules', title: 'Modules' },
  { href: '/about', title: 'About' },
  { href: '/the-system', title: 'The System' },
  // Added the external Blog link here
  { href: 'https://blog.faststruct.com/', title: 'Blog' }, 
  {
    href: '/contact',
    title: 'Contact Us',
    isButton: true,
  },
];

// Export filtered routes for navigation components
export const ENABLED_ROUTES = ROUTES.filter((route) => {
  // Always allow external links without passing them through isPageEnabled
  if (typeof route.href === 'string' && route.href.startsWith('http')) {
    return true; 
  }
  return isPageEnabled(route.href as PagePath);
});
