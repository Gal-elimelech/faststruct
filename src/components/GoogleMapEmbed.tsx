import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface GoogleMapEmbedProps
  extends Omit<HTMLAttributes<HTMLIFrameElement>, 'src'> {
  /** Full place string for the embed (e.g. landing headquarters). */
  mapQuery?: string;
  /** Used with `city` when `mapQuery` is omitted (e.g. contact page). */
  address?: string;
  city?: string;
}

const GoogleMapEmbed = ({
  mapQuery,
  address,
  city,
  className,
  title = 'Fast Struct Location',
  ...props
}: GoogleMapEmbedProps) => {
  const query =
    mapQuery ??
    (address != null && city != null ? `${address}, ${city}` : null);
  if (query == null) {
    throw new Error('GoogleMapEmbed: pass mapQuery or both address and city');
  }

  return (
    <iframe
      src={`https://www.google.com/maps?q=${encodeURIComponent(
        query
      )}&output=embed`}
      width='100%'
      height='100%'
      style={{ border: 0 }}
      allowFullScreen
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'
      className={clsx('h-full w-full', className)}
      title={title}
      {...props}
    />
  );
};

export default GoogleMapEmbed;
