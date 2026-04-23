import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word Counter - Free Online Tool | Ichi Space',
  description: 'Count words, characters, sentences, and reading time',
  keywords: 'wordcount, charactercount, textlength, readingtime',
  openGraph: {
    title: 'Word Counter - Free Online Tool | Ichi Space',
    description: 'Count words, characters, sentences, and reading time',
    url: 'https://ichispace.tech/text-tools/word-counter',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Counter - Ichi Space',
    description: 'Count words, characters, sentences, and reading time',
  },
  alternates: {
    canonical: 'https://ichispace.tech/text-tools/word-counter',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Word Counter',
  description: 'Count words, characters, sentences, and reading time',
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
