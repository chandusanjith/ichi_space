import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMI Calculator - Free Online Tool | Ichi Space',
  description: 'Calculate your monthly loan EMI with amortization schedule',
  keywords: 'emi, loan, mortgage, interest, monthlypayment, amortization',
  openGraph: {
    title: 'EMI Calculator - Free Online Tool | Ichi Space',
    description: 'Calculate your monthly loan EMI with amortization schedule',
    url: 'https://ichispace.tech/calculators/emi',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMI Calculator - Ichi Space',
    description: 'Calculate your monthly loan EMI with amortization schedule',
  },
  alternates: {
    canonical: 'https://ichispace.tech/calculators/emi',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'EMI Calculator',
  description: 'Calculate your monthly loan EMI with amortization schedule',
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
