import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SVG to JSX - Free Online Tool | Ichi Space',
  description: 'Convert SVG code into React/Next.js components',
  keywords: 'svg, jsx, react, nextjs, converter, component',
  openGraph: {
    title: 'SVG to JSX - Free Online Tool | Ichi Space',
    description: 'Convert SVG code into React/Next.js components',
    url: 'https://ichispace.tech/developer-tools/svg-to-jsx',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SVG to JSX - Ichi Space',
    description: 'Convert SVG code into React/Next.js components',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/svg-to-jsx',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SVG to JSX',
  description: 'Convert SVG code into React/Next.js components',
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
