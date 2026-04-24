import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Income Tax Calculator - Free Online Tool | Ichi Space',
  description: 'Compare tax liabilities under Old vs New tax regimes',
  keywords: 'incometax, taxcalculator, oldregime, newregime, deductions',
  openGraph: {
    title: 'Income Tax Calculator - Free Online Tool | Ichi Space',
    description: 'Compare tax liabilities under Old vs New tax regimes',
    url: 'https://ichispace.tech/finance/income-tax',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Income Tax Calculator - Ichi Space',
    description: 'Compare tax liabilities under Old vs New tax regimes',
  },
  alternates: {
    canonical: 'https://ichispace.tech/finance/income-tax',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Income Tax Calculator',
  description: 'Compare tax liabilities under Old vs New tax regimes',
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
