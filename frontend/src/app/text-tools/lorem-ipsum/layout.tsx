import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Free Online Tool | Ichi Space',
  description: 'Generate custom placeholder text for your designs and mockups',
  keywords: 'loremipsum, placeholdertext, generator, dummytext, text',
  openGraph: {
    title: 'Lorem Ipsum Generator - Free Online Tool | Ichi Space',
    description: 'Generate custom placeholder text for your designs and mockups',
    url: 'https://ichispace.tech/text-tools/lorem-ipsum',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lorem Ipsum Generator - Ichi Space',
    description: 'Generate custom placeholder text for your designs and mockups',
  },
  alternates: {
    canonical: 'https://ichispace.tech/text-tools/lorem-ipsum',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lorem Ipsum Generator',
  description: 'Generate custom placeholder text for your designs and mockups',
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
