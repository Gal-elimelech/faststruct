'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../Button';
import { useAppNavigation } from '@/contexts/AppNavigationProvider';
import { useRef } from 'react';

interface INavLinkProps {
  href: string;
  children: React.ReactNode;
  onNavigate?: () => void;
  button?: boolean;
  style?: boolean;
  className?: string;
}

const NavLink = ({
  href,
  children,
  onNavigate,
  button = false,
  style = true,
  className = '',
}: INavLinkProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { startTransition } = useAppNavigation();
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  const classes = style
    ? clsx(
        'hover:opacity-80 transition-all font-semibold',
        isActive ? 'text-accent underline' : 'text-light ',
        className
      )
    : className;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isActive) return;
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    startTransition(href);
    timeoutRef.current = setTimeout(() => {
      router.push(href);
    }, 800);
    onNavigate?.();
  };

  return (
    <Link href={href} className={classes} onClick={handleClick}>
      {button ? (
        <Button variant='primary' size='lg' hoverTransition='lift'>
          {children}
        </Button>
      ) : (
        children
      )}
    </Link>
  );
};

export default NavLink;
