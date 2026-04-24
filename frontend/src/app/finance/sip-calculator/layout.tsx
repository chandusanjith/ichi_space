import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SIP Calculator - Free Online Tool | Ichi Space',
  description: 'Calculate mutual fund SIP returns and wealth generation',
  keywords: 'sip, mutualfund, investment, returns, calculator, wealth',
  openGraph: {
    title: 'SIP Calculator - Free Online Tool | Ichi Space',
    description: 'Calculate mutual fund SIP returns and wealth generation',
    url: 'https://ichispace.tech/finance/sip-calculator',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIP Calculator - Ichi Space',
    description: 'Calculate mutual fund SIP returns and wealth generation',
  },
  alternates: {
    canonical: 'https://ichispace.tech/finance/sip-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SIP Calculator',
  description: 'Calculate mutual fund SIP returns and wealth generation',
  applicationCategory: 'FinanceApplication',
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
