import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage Calculator - Free Online Tool | Ichi Space',
  description: 'Calculate percentages, increases, and decreases',
  keywords: 'percentage, percent, increase, decrease, ratio',
  openGraph: {
    title: 'Percentage Calculator - Free Online Tool | Ichi Space',
    description: 'Calculate percentages, increases, and decreases',
    url: 'https://ichispace.tech/calculators/percentage',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Calculator - Ichi Space',
    description: 'Calculate percentages, increases, and decreases',
  },
  alternates: {
    canonical: 'https://ichispace.tech/calculators/percentage',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Percentage Calculator',
  description: 'Calculate percentages, increases, and decreases',
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
