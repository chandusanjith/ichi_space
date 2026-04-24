import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webhook Tester - Free Online Tool | Ichi Space',
  description: 'Catch and inspect incoming HTTP webhook requests',
  keywords: 'webhook, tester, http, catch, inspect, endpoint',
  openGraph: {
    title: 'Webhook Tester - Free Online Tool | Ichi Space',
    description: 'Catch and inspect incoming HTTP webhook requests',
    url: 'https://ichispace.tech/developer-tools/webhook-tester',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webhook Tester - Ichi Space',
    description: 'Catch and inspect incoming HTTP webhook requests',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/webhook-tester',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Webhook Tester',
  description: 'Catch and inspect incoming HTTP webhook requests',
  applicationCategory: 'DeveloperApplication',
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
