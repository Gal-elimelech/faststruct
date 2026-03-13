import type { Metadata } from 'next';

const SITE_NAME = 'Fast Struct';

export function generateOpenGraphMetadata({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image: string;
  url: string;
}): Metadata['openGraph'] {
  // Determine image type based on file extension
  const imageType =
    image.endsWith('.jpg') || image.endsWith('.jpeg')
      ? 'image/jpeg'
      : image.endsWith('.png')
        ? 'image/png'
        : 'image/jpeg';

  return {
    title,
    description,
    url: url,
    siteName: SITE_NAME,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
        type: imageType,
      },
    ],
    locale: 'en_US',
    type: 'website',
  };
}

export function generateTwitterMetadata({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}): Metadata['twitter'] {
  return {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
  };
}
export function generateSocialMetadata({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image: string;
  url: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: generateOpenGraphMetadata({ title, description, image, url }),
    twitter: generateTwitterMetadata({ title, description, image }),
  };
}
