import type { Metadata } from 'next';

const SITE_NAME = 'Fast Struct';
const TITLE_MAX_LENGTH = 60;
const DESCRIPTION_MAX_LENGTH = 155;

function truncateAtWord(value: string, maxLength: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  const truncated = normalized.slice(0, maxLength - 1);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > Math.floor(maxLength * 0.6)) {
    return `${truncated.slice(0, lastSpaceIndex)}...`;
  }

  return `${truncated}...`;
}

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
        : image.endsWith('.webp')
          ? 'image/webp'
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
  const sanitizedTitle = truncateAtWord(title, TITLE_MAX_LENGTH);
  const sanitizedDescription = truncateAtWord(description, DESCRIPTION_MAX_LENGTH);

  return {
    title: sanitizedTitle,
    description: sanitizedDescription,
    alternates: {
      canonical: url,
    },
    openGraph: generateOpenGraphMetadata({
      title: sanitizedTitle,
      description: sanitizedDescription,
      image,
      url,
    }),
    twitter: generateTwitterMetadata({
      title: sanitizedTitle,
      description: sanitizedDescription,
      image,
    }),
  };
}
