import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter & Editor - Free Online Tool | Ichi Space',
  description: 'Modern JSON explorer with Tree, Table, and Text modes. Edit, format, validate and search through complex data structures effortlessly.',
  keywords: 'json, format, validate, minify, prettify, parse, editor, explorer',
  openGraph: {
    title: 'JSON Formatter & Editor - Ichi Space',
    description: 'Modern JSON explorer with Tree, Table, and Text modes. Edit, format, validate and search through complex data structures effortlessly.',
    url: 'https://ichispace.tech/developer-tools/json-formatter',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter & Editor - Ichi Space',
    description: 'Modern JSON explorer with Tree, Table, and Text modes. Edit, format, validate and search through complex data structures effortlessly.',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/json-formatter',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JSON Formatter & Editor',
  description: 'Modern JSON explorer with Tree, Table, and Text modes. Edit, format, validate and search through complex data structures effortlessly.',
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
