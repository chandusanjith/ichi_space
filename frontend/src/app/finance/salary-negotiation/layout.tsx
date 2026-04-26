import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Salary Negotiation Calculator India - CTC Hike Range | Ichi Space',
  description: 'Get a suggested salary negotiation range based on your current CTC, role, city, and years of experience in India.',
  keywords: 'salary negotiation, ctc calculator, hike calculator, india salary, offer negotiation, package negotiation',
  openGraph: { title: 'Salary Negotiation Calculator - Ichi Space', description: 'Get your recommended CTC negotiation range for Indian job market.', url: 'https://ichispace.tech/finance/salary-negotiation', siteName: 'Ichi Space', type: 'website' },
  alternates: { canonical: 'https://ichispace.tech/finance/salary-negotiation' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
