'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useIsTablet } from '@/hooks/useIsTablet';
import { useToggle } from '@/hooks/useToggle';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { AnimatePresence } from 'motion/react';
import FastructLogo from '../FastructLogo';
import HamburgerButton from './HamburgerButton';
import { useMounted } from '@/hooks/useMounted';
import NavLink from './NavLink';
import { Phone } from 'lucide-react';

interface NavbarProps {
  phone?: { display: string; link: string };
}

export default function Navbar({ phone }: NavbarProps) {
  const [isMobileMenuOpen, toggleIsMobileMenuOpen] = useToggle(false);
  const isTablet = useIsTablet();
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const hasMounted = useMounted();

  const closeMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      toggleIsMobileMenuOpen();
    }
  }, [isMobileMenuOpen, toggleIsMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen || !isTablet) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        headerRef.current &&
        !headerRef.current.contains(target)
      ) {
        closeMobileMenu();
      }
    };

    // Use capture phase to catch clicks before they bubble
    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [isMobileMenuOpen, isTablet, closeMobileMenu]);

  if (!hasMounted) return null;

  return (
    <header ref={headerRef} className='fixed top-0 z-20 w-full'>
      <div className='bg-dark absolute z-10 h-full w-full'></div>

      <div className='container-padding relative z-20 flex items-center justify-between border-b py-4'>
        <NavLink href='/'>
          <FastructLogo
            color='light'
            className='h-[25px] md:h-[35px] lg:h-[40px]'
          />
        </NavLink>
        {!isTablet ? (
          <DesktopNavbar phone={phone} />
        ) : (
          <div className='flex items-center gap-3'>
            {phone && (
              <a
                href={`tel:${phone.link}`}
                aria-label={`Call Fast Struct at ${phone.display}`}
                className='btn btn-outline-call-dark btn-sm gap-2'>
                <Phone size={14} aria-hidden />
                Call
              </a>
            )}
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              toggleMenu={toggleIsMobileMenuOpen}
            />
          </div>
        )}
      </div>
      {isTablet && (
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileNavbar
              key='mobile-menu'
              menuRef={menuRef}
              onNavigate={closeMobileMenu}
            />
          )}
        </AnimatePresence>
      )}
    </header>
  );
}
