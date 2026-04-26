import { getImageProps } from 'next/image';

type ArtDirectedHeroImageProps = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  desktopWidth?: number;
  desktopHeight?: number;
  mobileWidth?: number;
  mobileHeight?: number;
};

const ArtDirectedHeroImage = ({
  desktopSrc,
  mobileSrc,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '100vw',
  desktopWidth = 1920,
  desktopHeight = 1080,
  mobileWidth = 750,
  mobileHeight = 1334,
}: ArtDirectedHeroImageProps) => {
  const common = {
    alt,
    sizes,
    priority,
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: desktopSrc,
    width: desktopWidth,
    height: desktopHeight,
  });

  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({
    ...common,
    src: mobileSrc || desktopSrc,
    width: mobileSrc ? mobileWidth : desktopWidth,
    height: mobileSrc ? mobileHeight : desktopHeight,
  });

  return (
    <picture className={className}>
      {mobileSrc ? (
        <source media='(max-width: 767px)' srcSet={mobileSrcSet} />
      ) : null}
      <source media='(min-width: 768px)' srcSet={desktopSrcSet} />
      <img
        {...imgProps}
        className={imgClassName}
      />
    </picture>
  );
};

export default ArtDirectedHeroImage;
