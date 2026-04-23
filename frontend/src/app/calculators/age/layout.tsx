import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age Calculator - Free Online Tool | Ichi Space',
  description: 'Calculate exact age in years, months, and days',
  keywords: 'age, birthday, birthdate, howold',
  openGraph: {
    title: 'Age Calculator - Free Online Tool | Ichi Space',
    description: 'Calculate exact age in years, months, and days',
    url: 'https://ichispace.tech/calculators/age',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculator - Ichi Space',
    description: 'Calculate exact age in years, months, and days',
  },
  alternates: {
    canonical: 'https://ichispace.tech/calculators/age',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Age Calculator',
  description: 'Calculate exact age in years, months, and days',
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
