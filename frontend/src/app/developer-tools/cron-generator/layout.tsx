import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cron Generator - Free Online Tool | Ichi Space',
  description: 'Generate and translate cron schedule expressions',
  keywords: 'cron, generator, schedule, expression, crontab, parser',
  openGraph: {
    title: 'Cron Generator - Free Online Tool | Ichi Space',
    description: 'Generate and translate cron schedule expressions',
    url: 'https://ichispace.tech/developer-tools/cron-generator',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cron Generator - Ichi Space',
    description: 'Generate and translate cron schedule expressions',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/cron-generator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Cron Generator',
  description: 'Generate and translate cron schedule expressions',
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
