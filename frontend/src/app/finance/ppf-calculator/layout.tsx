import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PPF Calculator - Free Online Tool | Ichi Space',
  description: 'Estimate your Public Provident Fund maturity amount',
  keywords: 'ppf, providentfund, savings, taxfree, interest, maturity',
  openGraph: {
    title: 'PPF Calculator - Free Online Tool | Ichi Space',
    description: 'Estimate your Public Provident Fund maturity amount',
    url: 'https://ichispace.tech/finance/ppf-calculator',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPF Calculator - Ichi Space',
    description: 'Estimate your Public Provident Fund maturity amount',
  },
  alternates: {
    canonical: 'https://ichispace.tech/finance/ppf-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PPF Calculator',
  description: 'Estimate your Public Provident Fund maturity amount',
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
