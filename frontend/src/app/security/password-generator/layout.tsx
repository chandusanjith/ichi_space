import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Generator - Free Online Tool | Ichi Space',
  description: 'Generate strong, secure passwords',
  keywords: 'password, generate, secure, strong, random',
  openGraph: {
    title: 'Password Generator - Free Online Tool | Ichi Space',
    description: 'Generate strong, secure passwords',
    url: 'https://ichispace.tech/security/password-generator',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator - Ichi Space',
    description: 'Generate strong, secure passwords',
  },
  alternates: {
    canonical: 'https://ichispace.tech/security/password-generator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Password Generator',
  description: 'Generate strong, secure passwords',
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
