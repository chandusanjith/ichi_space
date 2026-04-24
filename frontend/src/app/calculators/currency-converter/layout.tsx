import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Currency Converter - Free Online Tool | Ichi Space',
  description: 'Convert between 160+ world currencies with live rates',
  keywords: 'currency, exchangerate, forex, moneyconverter, usd, eur',
  openGraph: {
    title: 'Currency Converter - Free Online Tool | Ichi Space',
    description: 'Convert between 160+ world currencies with live rates',
    url: 'https://ichispace.tech/calculators/currency-converter',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Converter - Ichi Space',
    description: 'Convert between 160+ world currencies with live rates',
  },
  alternates: {
    canonical: 'https://ichispace.tech/calculators/currency-converter',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Currency Converter',
  description: 'Convert between 160+ world currencies with live rates',
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
