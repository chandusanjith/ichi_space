import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMI Calculator - Free Online Tool | Ichi Space',
  description: 'Calculate your Body Mass Index and health category',
  keywords: 'bmi, bodymassindex, weight, height, health, obesity',
  openGraph: {
    title: 'BMI Calculator - Free Online Tool | Ichi Space',
    description: 'Calculate your Body Mass Index and health category',
    url: 'https://ichispace.tech/calculators/bmi',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator - Ichi Space',
    description: 'Calculate your Body Mass Index and health category',
  },
  alternates: {
    canonical: 'https://ichispace.tech/calculators/bmi',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'BMI Calculator',
  description: 'Calculate your Body Mass Index and health category',
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
