import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IP & DNS Lookup - Free Online Tool | Ichi Space',
  description: 'Find location and DNS records for any IP or domain',
  keywords: 'ip, dns, lookup, location, whois, network',
  openGraph: {
    title: 'IP & DNS Lookup - Free Online Tool | Ichi Space',
    description: 'Find location and DNS records for any IP or domain',
    url: 'https://ichispace.tech/developer-tools/ip-lookup',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IP & DNS Lookup - Ichi Space',
    description: 'Find location and DNS records for any IP or domain',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/ip-lookup',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'IP & DNS Lookup',
  description: 'Find location and DNS records for any IP or domain',
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
