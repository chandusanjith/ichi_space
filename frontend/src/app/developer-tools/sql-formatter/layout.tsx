import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL Formatter - Free Online Tool | Ichi Space',
  description: 'Format and beautify SQL queries',
  keywords: 'sql, formatter, beautify, minify, sqleditor',
  openGraph: {
    title: 'SQL Formatter - Free Online Tool | Ichi Space',
    description: 'Format and beautify SQL queries',
    url: 'https://ichispace.tech/developer-tools/sql-formatter',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQL Formatter - Ichi Space',
    description: 'Format and beautify SQL queries',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/sql-formatter',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SQL Formatter',
  description: 'Format and beautify SQL queries',
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
