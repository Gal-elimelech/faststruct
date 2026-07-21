'use client';

import { Fragment } from 'react';
import { ENABLED_ROUTES } from '@/lib/routes';
import NavLink from './NavLink';
import { Phone } from 'lucide-react';

interface DesktopNavbarProps {
  phone?: { display: string; link: string };
}

const DesktopNavbar = ({ phone }: DesktopNavbarProps) => {
  return (
    <nav className='flex items-center gap-6'>
      {ENABLED_ROUTES.map((route) => (
        <Fragment key={route.href}>
          {route.isButton && phone && (
            <a
              href={`tel:${phone.link}`}
              className='btn btn-outline-call-dark btn-sm gap-2 text-nowrap'>
              <Phone size={14} aria-hidden />
              {phone.display}
            </a>
          )}
          <NavLink button={route.isButton} href={route.href}>
            {route.title}
          </NavLink>
        </Fragment>
      ))}
    </nav>
  );
};

export default DesktopNavbar;
