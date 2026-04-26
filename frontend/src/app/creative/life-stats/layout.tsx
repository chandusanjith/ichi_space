import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Life Stats Calculator - How Much Have You Lived? | Ichi Space',
  description: 'Enter your birthdate and discover mind-blowing stats: days lived, heartbeats, blinks, breaths, and more. Viral-worthy and shareable.',
  keywords: 'life stats calculator, days lived, heartbeats calculator, life calculator, birthdate stats, age calculator fun',
  openGraph: { title: 'Life Stats Calculator - Ichi Space', description: 'Discover mind-blowing stats about your life — days, heartbeats, blinks and more.', url: 'https://ichispace.tech/creative/life-stats', siteName: 'Ichi Space', type: 'website' },
  alternates: { canonical: 'https://ichispace.tech/creative/life-stats' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
