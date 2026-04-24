import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grammar Checker - Free Online Tool | Ichi Space',
  description: 'Check and fix grammar mistakes in your text',
  keywords: 'grammar, spellcheck, writingassistant, correction, proofreading',
  openGraph: {
    title: 'Grammar Checker - Free Online Tool | Ichi Space',
    description: 'Check and fix grammar mistakes in your text',
    url: 'https://ichispace.tech/text-tools/grammar-checker',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grammar Checker - Ichi Space',
    description: 'Check and fix grammar mistakes in your text',
  },
  alternates: {
    canonical: 'https://ichispace.tech/text-tools/grammar-checker',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Grammar Checker',
  description: 'Check and fix grammar mistakes in your text',
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
