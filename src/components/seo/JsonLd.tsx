interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

function sanitizeJsonLd(value: string): string {
  return value.replace(/</g, '\\u003c');
}

export default function JsonLd({ data }: JsonLdProps) {
  const json = sanitizeJsonLd(JSON.stringify(data));

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
