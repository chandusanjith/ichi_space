import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Basic Calculator - Free Online Tool | Ichi Space',
  description: 'Perform basic arithmetic calculations with a clean interface',
  keywords: 'calculate, math, add, subtract, multiply, divide, arithmetic',
  openGraph: {
    title: 'Basic Calculator - Free Online Tool | Ichi Space',
    description: 'Perform basic arithmetic calculations with a clean interface',
    url: 'https://ichispace.tech/calculators/basic',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basic Calculator - Ichi Space',
    description: 'Perform basic arithmetic calculations with a clean interface',
  },
  alternates: {
    canonical: 'https://ichispace.tech/calculators/basic',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Basic Calculator',
  description: 'Perform basic arithmetic calculations with a clean interface',
  applicationCategory: 'Calculators',
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
