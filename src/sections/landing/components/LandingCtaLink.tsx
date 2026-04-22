import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@/components/Button';

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

  return (
    <Link href={href} className={linkClassName}>
      <Button
        variant={isCall ? 'outline' : 'primary'}
        outlineTone={isCall ? (surface === 'hero' ? 'hero' : 'dark') : 'default'}
        size={size}
        hoverTransition='lift'
        className={clsx(fullWidth ? 'w-full' : 'w-full sm:w-auto', buttonClassName)}
      >
        {children}
      </Button>
    </Link>
  );
}
