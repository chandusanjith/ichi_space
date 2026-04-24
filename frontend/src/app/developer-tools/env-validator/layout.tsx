import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Env File Validator - Free Online Tool | Ichi Space',
  description: 'Validate and format .env configuration files',
  keywords: 'env, validator, dotenv, environmentvariables, config',
  openGraph: {
    title: 'Env File Validator - Free Online Tool | Ichi Space',
    description: 'Validate and format .env configuration files',
    url: 'https://ichispace.tech/developer-tools/env-validator',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Env File Validator - Ichi Space',
    description: 'Validate and format .env configuration files',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/env-validator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Env File Validator',
  description: 'Validate and format .env configuration files',
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
