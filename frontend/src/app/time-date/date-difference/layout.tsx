import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Date Difference - Free Online Tool | Ichi Space',
  description: 'Calculate the difference between two dates',
  keywords: 'date, difference, daysbetween, duration',
  openGraph: {
    title: 'Date Difference - Free Online Tool | Ichi Space',
    description: 'Calculate the difference between two dates',
    url: 'https://ichispace.tech/time-date/date-difference',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Date Difference - Ichi Space',
    description: 'Calculate the difference between two dates',
  },
  alternates: {
    canonical: 'https://ichispace.tech/time-date/date-difference',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Date Difference',
  description: 'Calculate the difference between two dates',
  applicationCategory: 'UtilitiesApplication',
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
