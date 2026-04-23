import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fuel Price Tracker - Free Online Tool | Ichi Space',
  description: 'Track fuel prices across cities',
  keywords: 'fuel, petrol, diesel, gas, price',
  openGraph: {
    title: 'Fuel Price Tracker - Free Online Tool | Ichi Space',
    description: 'Track fuel prices across cities',
    url: 'https://ichispace.tech/finance/fuel-price',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fuel Price Tracker - Ichi Space',
    description: 'Track fuel prices across cities',
  },
  alternates: {
    canonical: 'https://ichispace.tech/finance/fuel-price',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Fuel Price Tracker',
  description: 'Track fuel prices across cities',
  applicationCategory: 'FinanceApplication',
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
