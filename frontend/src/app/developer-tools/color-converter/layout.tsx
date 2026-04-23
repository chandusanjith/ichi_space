import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Converter - Free Online Tool | Ichi Space',
  description: 'Convert colors between HEX, RGB, and HSL formats',
  keywords: 'color, converter, hex, rgb, hsl, palette',
  openGraph: {
    title: 'Color Converter - Free Online Tool | Ichi Space',
    description: 'Convert colors between HEX, RGB, and HSL formats',
    url: 'https://ichispace.tech/developer-tools/color-converter',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Converter - Ichi Space',
    description: 'Convert colors between HEX, RGB, and HSL formats',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/color-converter',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Color Converter',
  description: 'Convert colors between HEX, RGB, and HSL formats',
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
