import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UUID / GUID Generator - Free Online Tool | Ichi Space',
  description: 'Generate bulk v4 UUIDs instantly',
  keywords: 'uuid, guid, generator, unique, id, v4',
  openGraph: {
    title: 'UUID / GUID Generator - Free Online Tool | Ichi Space',
    description: 'Generate bulk v4 UUIDs instantly',
    url: 'https://ichispace.tech/developer-tools/uuid-generator',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UUID / GUID Generator - Ichi Space',
    description: 'Generate bulk v4 UUIDs instantly',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/uuid-generator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UUID / GUID Generator',
  description: 'Generate bulk v4 UUIDs instantly',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'Ichi Space',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
