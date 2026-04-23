import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gold Price Tracker - Free Online Tool | Ichi Space',
  description: 'Track live gold prices and trends',
  keywords: 'gold, price, preciousmetal, investment',
  openGraph: {
    title: 'Gold Price Tracker - Free Online Tool | Ichi Space',
    description: 'Track live gold prices and trends',
    url: 'https://ichispace.tech/finance/gold-price',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price Tracker - Ichi Space',
    description: 'Track live gold prices and trends',
  },
  alternates: {
    canonical: 'https://ichispace.tech/finance/gold-price',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Gold Price Tracker',
  description: 'Track live gold prices and trends',
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
