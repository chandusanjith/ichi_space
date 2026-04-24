import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mutual Fund Return Estimator - Free Online Tool | Ichi Space',
  description: 'Estimate returns on your lumpsum mutual fund investments',
  keywords: 'mutualfund, lumpsum, investment, return, cagr, estimator',
  openGraph: {
    title: 'Mutual Fund Return Estimator - Free Online Tool | Ichi Space',
    description: 'Estimate returns on your lumpsum mutual fund investments',
    url: 'https://ichispace.tech/finance/mutual-fund-return',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mutual Fund Return Estimator - Ichi Space',
    description: 'Estimate returns on your lumpsum mutual fund investments',
  },
  alternates: {
    canonical: 'https://ichispace.tech/finance/mutual-fund-return',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Mutual Fund Return Estimator',
  description: 'Estimate returns on your lumpsum mutual fund investments',
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
