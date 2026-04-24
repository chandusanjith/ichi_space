import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JWT Decoder - Free Online Tool | Ichi Space',
  description: 'Decode and inspect JSON Web Tokens locally',
  keywords: 'jwt, decoder, jsonwebtoken, auth, base64, inspect',
  openGraph: {
    title: 'JWT Decoder - Free Online Tool | Ichi Space',
    description: 'Decode and inspect JSON Web Tokens locally',
    url: 'https://ichispace.tech/developer-tools/jwt-decoder',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Decoder - Ichi Space',
    description: 'Decode and inspect JSON Web Tokens locally',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/jwt-decoder',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JWT Decoder',
  description: 'Decode and inspect JSON Web Tokens locally',
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
