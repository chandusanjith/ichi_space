import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Compressor - Free Online Tool | Ichi Space',
  description: 'Compress images while maintaining quality',
  keywords: 'image, compress, resize, optimize, photo',
  openGraph: {
    title: 'Image Compressor - Free Online Tool | Ichi Space',
    description: 'Compress images while maintaining quality',
    url: 'https://ichispace.tech/file-tools/image-compressor',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Compressor - Ichi Space',
    description: 'Compress images while maintaining quality',
  },
  alternates: {
    canonical: 'https://ichispace.tech/file-tools/image-compressor',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Image Compressor',
  description: 'Compress images while maintaining quality',
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
