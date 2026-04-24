import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes - Free Online Tool | Ichi Space',
  description: 'Create and manage personal notes',
  keywords: 'notes, notepad, scratchpad, onlinenotes, texteditor',
  openGraph: {
    title: 'Notes - Free Online Tool | Ichi Space',
    description: 'Create and manage personal notes',
    url: 'https://ichispace.tech/productivity/notes',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notes - Ichi Space',
    description: 'Create and manage personal notes',
  },
  alternates: {
    canonical: 'https://ichispace.tech/productivity/notes',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Notes',
  description: 'Create and manage personal notes',
  applicationCategory: 'ProductivityApplication',
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
