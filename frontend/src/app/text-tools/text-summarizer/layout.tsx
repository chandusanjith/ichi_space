import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Summarizer - Free Online Tool | Ichi Space',
  description: 'Summarize long text using AI',
  keywords: 'summarize, textsummary, tl;dr, shortentext, aisummary',
  openGraph: {
    title: 'Text Summarizer - Free Online Tool | Ichi Space',
    description: 'Summarize long text using AI',
    url: 'https://ichispace.tech/text-tools/text-summarizer',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Summarizer - Ichi Space',
    description: 'Summarize long text using AI',
  },
  alternates: {
    canonical: 'https://ichispace.tech/text-tools/text-summarizer',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Text Summarizer',
  description: 'Summarize long text using AI',
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
