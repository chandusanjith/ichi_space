import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Take-Home Salary Calculator - Free Online Tool | Ichi Space',
  description: 'Calculate your net take-home pay from gross salary',
  keywords: 'salary, takehome, netpay, grossincome, paycheck, calculator',
  openGraph: {
    title: 'Take-Home Salary Calculator - Free Online Tool | Ichi Space',
    description: 'Calculate your net take-home pay from gross salary',
    url: 'https://ichispace.tech/finance/take-home-salary',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Take-Home Salary Calculator - Ichi Space',
    description: 'Calculate your net take-home pay from gross salary',
  },
  alternates: {
    canonical: 'https://ichispace.tech/finance/take-home-salary',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Take-Home Salary Calculator',
  description: 'Calculate your net take-home pay from gross salary',
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
