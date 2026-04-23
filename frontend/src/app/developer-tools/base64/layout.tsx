import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Encode/Decode - Free Online Tool | Ichi Space',
  description: 'Encode and decode Base64 strings',
  keywords: 'base64, encode, decode, binary',
  openGraph: {
    title: 'Base64 Encode/Decode - Free Online Tool | Ichi Space',
    description: 'Encode and decode Base64 strings',
    url: 'https://ichispace.tech/developer-tools/base64',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encode/Decode - Ichi Space',
    description: 'Encode and decode Base64 strings',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/base64',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Base64 Encode/Decode',
  description: 'Encode and decode Base64 strings',
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
