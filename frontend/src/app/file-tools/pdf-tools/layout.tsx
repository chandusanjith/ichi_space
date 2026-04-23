import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Merge & Split - Free Online Tool | Ichi Space',
  description: 'Merge multiple PDFs or split pages',
  keywords: 'pdf, merge, split, combine, document',
  openGraph: {
    title: 'PDF Merge & Split - Free Online Tool | Ichi Space',
    description: 'Merge multiple PDFs or split pages',
    url: 'https://ichispace.tech/file-tools/pdf-tools',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Merge & Split - Ichi Space',
    description: 'Merge multiple PDFs or split pages',
  },
  alternates: {
    canonical: 'https://ichispace.tech/file-tools/pdf-tools',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PDF Merge & Split',
  description: 'Merge multiple PDFs or split pages',
  applicationCategory: 'UtilitiesApplication',
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
