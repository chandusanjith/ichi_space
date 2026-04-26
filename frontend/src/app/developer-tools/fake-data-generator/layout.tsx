import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Fake Data Generator India - Names, Emails, Addresses | Ichi Space',
  description: 'Generate realistic Indian fake data: names, emails, phone numbers, addresses, and Aadhaar-format IDs. Bulk export as CSV or JSON.',
  keywords: 'fake data generator, indian names, mock data, test data, random data, indian locale, dummy data',
  openGraph: { title: 'Indian Fake Data Generator - Ichi Space', description: 'Generate Indian fake names, emails, phone numbers and addresses in bulk.', url: 'https://ichispace.tech/developer-tools/fake-data-generator', siteName: 'Ichi Space', type: 'website' },
  alternates: { canonical: 'https://ichispace.tech/developer-tools/fake-data-generator' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
