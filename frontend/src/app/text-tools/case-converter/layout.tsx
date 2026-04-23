import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Converter - Free Online Tool | Ichi Space',
  description: 'Convert text between different cases',
  keywords: 'uppercase, lowercase, titlecase, camelcase, snakecase',
  openGraph: {
    title: 'Case Converter - Free Online Tool | Ichi Space',
    description: 'Convert text between different cases',
    url: 'https://ichispace.tech/text-tools/case-converter',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Converter - Ichi Space',
    description: 'Convert text between different cases',
  },
  alternates: {
    canonical: 'https://ichispace.tech/text-tools/case-converter',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Case Converter',
  description: 'Convert text between different cases',
  applicationCategory: 'DesignApplication',
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
