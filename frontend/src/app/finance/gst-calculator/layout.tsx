import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GST Calculator - Free Online Tool | Ichi Space',
  description: 'Calculate GST inclusive and exclusive prices instantly',
  keywords: 'gst, tax, goodsandservicestax, inclusive, exclusive, calculator',
  openGraph: {
    title: 'GST Calculator - Free Online Tool | Ichi Space',
    description: 'Calculate GST inclusive and exclusive prices instantly',
    url: 'https://ichispace.tech/finance/gst-calculator',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GST Calculator - Ichi Space',
    description: 'Calculate GST inclusive and exclusive prices instantly',
  },
  alternates: {
    canonical: 'https://ichispace.tech/finance/gst-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'GST Calculator',
  description: 'Calculate GST inclusive and exclusive prices instantly',
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
