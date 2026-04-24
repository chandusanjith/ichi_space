import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'World Clock - Free Online Tool | Ichi Space',
  description: 'View current time across multiple time zones',
  keywords: 'worldclock, timezones, localtime, globaltime, utc',
  openGraph: {
    title: 'World Clock - Free Online Tool | Ichi Space',
    description: 'View current time across multiple time zones',
    url: 'https://ichispace.tech/time-date/world-clock',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Clock - Ichi Space',
    description: 'View current time across multiple time zones',
  },
  alternates: {
    canonical: 'https://ichispace.tech/time-date/world-clock',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'World Clock',
  description: 'View current time across multiple time zones',
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
