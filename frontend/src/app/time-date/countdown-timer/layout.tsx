import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Countdown Timer - Free Online Tool | Ichi Space',
  description: 'Set a countdown to any future date or event',
  keywords: 'countdown, timer, event, deadline',
  openGraph: {
    title: 'Countdown Timer - Free Online Tool | Ichi Space',
    description: 'Set a countdown to any future date or event',
    url: 'https://ichispace.tech/time-date/countdown-timer',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Countdown Timer - Ichi Space',
    description: 'Set a countdown to any future date or event',
  },
  alternates: {
    canonical: 'https://ichispace.tech/time-date/countdown-timer',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Countdown Timer',
  description: 'Set a countdown to any future date or event',
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
