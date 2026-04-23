import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hash Generator - Free Online Tool | Ichi Space',
  description: 'Generate MD5, SHA-256, and SHA-512 hashes',
  keywords: 'hash, md5, sha256, sha512, checksum, encrypt',
  openGraph: {
    title: 'Hash Generator - Free Online Tool | Ichi Space',
    description: 'Generate MD5, SHA-256, and SHA-512 hashes',
    url: 'https://ichispace.tech/security/hash-generator',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hash Generator - Ichi Space',
    description: 'Generate MD5, SHA-256, and SHA-512 hashes',
  },
  alternates: {
    canonical: 'https://ichispace.tech/security/hash-generator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Hash Generator',
  description: 'Generate MD5, SHA-256, and SHA-512 hashes',
  applicationCategory: 'SecurityApplication',
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
