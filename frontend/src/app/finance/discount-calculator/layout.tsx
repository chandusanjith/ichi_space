import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discount Calculator - Free Online Tool | Ichi Space',
  description: 'Calculate discounts and savings instantly',
  keywords: 'discount, sale, savings, price, deal',
  openGraph: {
    title: 'Discount Calculator - Free Online Tool | Ichi Space',
    description: 'Calculate discounts and savings instantly',
    url: 'https://ichispace.tech/finance/discount-calculator',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discount Calculator - Ichi Space',
    description: 'Calculate discounts and savings instantly',
  },
  alternates: {
    canonical: 'https://ichispace.tech/finance/discount-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Discount Calculator',
  description: 'Calculate discounts and savings instantly',
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
