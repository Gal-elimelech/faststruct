'use client';

import Link from 'next/link';
import clsx from 'clsx';

export type LandingCtaSurface = 'hero' | 'dark';

export interface LandingCtaLinkProps {
  href: string;
  children: React.ReactNode;
  /** Hero glass card vs rest of landing (dark) — only affects call (`tel:`) outline styling. */
  surface?: LandingCtaSurface;
  size?: 'sm' | 'md' | 'lg';
  /** Fill parent width (e.g. sticky bar flex slots); skips `sm:w-auto`. */
  fullWidth?: boolean;
  linkClassName?: string;
  buttonClassName?: string;
}

function isCallHref(href: string) {
  return href.trim().toLowerCase().startsWith('tel:');
}

function isHashHref(href: string) {
  return href.trim().startsWith('#');
}

/**
 * Landing marketing CTAs: `tel:` → outline call style; anything else → primary (form / in-page targets).
 */
export function LandingCtaLink({
  href,
  children,
  surface = 'dark',
  size = 'lg',
  fullWidth,
  linkClassName,
  buttonClassName,
}: LandingCtaLinkProps) {
  const isCall = isCallHref(href);
  const isHashLink = isHashHref(href);
  const toneClass = isCall
    ? surface === 'hero'
      ? 'btn-outline-call-hero'
      : 'btn-outline-call-dark'
    : 'btn-primary';
  const sizeClass =
    size === 'sm' ? 'btn-sm' : size === 'md' ? 'btn-md' : 'btn-lg';

  const handleHashClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHashLink) return;

    event.preventDefault();
    const targetId = href.slice(1);
    if (!targetId) return;

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return false;

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${targetId}`);
      return true;
    };

    // Try immediately, then retry shortly for cases where content mounts after click.
    if (scrollToTarget()) return;
    requestAnimationFrame(() => {
      if (scrollToTarget()) return;
      window.setTimeout(scrollToTarget, 120);
    });
  };

  return (
    <Link href={href} className={linkClassName} onClick={handleHashClick}>
      <span
        className={clsx(fullWidth ? 'w-full' : 'w-full sm:w-auto', buttonClassName)}
      >
        <span
          className={clsx(
            'btn btn-hover-lift',
            toneClass,
            sizeClass,
            'w-full',
            isCall && 'gap-2',
          )}
        >
          {isCall ? (
            <span className='inline-flex items-center justify-center gap-2'>
              <i className='fa-solid fa-phone' aria-hidden />
              <span className='text-nowrap'>{children}</span>
            </span>
          ) : (
            children
          )}
        </span>
      </span>
    </Link>
  );
}
