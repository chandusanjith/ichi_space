import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cURL Converter - Free Online Tool | Ichi Space',
  description: 'Convert cURL commands to Python, JS, and more',
  keywords: 'curl, converter, python, fetch, axios, requests',
  openGraph: {
    title: 'cURL Converter - Free Online Tool | Ichi Space',
    description: 'Convert cURL commands to Python, JS, and more',
    url: 'https://ichispace.tech/developer-tools/curl-converter',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cURL Converter - Ichi Space',
    description: 'Convert cURL commands to Python, JS, and more',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/curl-converter',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'cURL Converter',
  description: 'Convert cURL commands to Python, JS, and more',
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
