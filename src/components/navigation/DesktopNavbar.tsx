'use client';

import { ENABLED_ROUTES } from '@/lib/routes';
import NavLink from './NavLink';

const DesktopNavbar = () => {
  return (
    <nav className='flex items-center gap-6'>
      {ENABLED_ROUTES.map((route) => (
        <NavLink button={route.isButton} key={route.href} href={route.href}>
          {route.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default DesktopNavbar;
