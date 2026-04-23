import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regex Tester - Free Online Tool | Ichi Space',
  description: 'Test regular expressions with live matching',
  keywords: 'regex, regularexpression, pattern, match, test',
  openGraph: {
    title: 'Regex Tester - Free Online Tool | Ichi Space',
    description: 'Test regular expressions with live matching',
    url: 'https://ichispace.tech/developer-tools/regex-tester',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regex Tester - Ichi Space',
    description: 'Test regular expressions with live matching',
  },
  alternates: {
    canonical: 'https://ichispace.tech/developer-tools/regex-tester',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Regex Tester',
  description: 'Test regular expressions with live matching',
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
