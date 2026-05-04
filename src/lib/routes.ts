import { isPageEnabled, PagePath } from './page-config';

export type Route = {
  href: PagePath;
  title: string;
  isButton?: boolean;
};
export const ROUTES: Route[] = [
  { href: '/', title: 'Home' },
  { href: '/modules', title: 'Modules' },
  { href: '/about', title: 'About' },
  { href: '/the-system', title: 'The System' },
  {
    href: '/contact',
    title: 'Contact Us',
    isButton: true,
  },
];

// Export filtered routes for navigation components
export const ENABLED_ROUTES = ROUTES.filter((route) =>
  isPageEnabled(route.href)
);
