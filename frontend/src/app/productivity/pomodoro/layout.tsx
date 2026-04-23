import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pomodoro Timer - Boost Productivity | Ichi Space',
  description: 'Stay focused and productive with our Pomodoro Timer. Customizable work and break cycles, task tracking, and detailed focus analytics.',
  keywords: 'pomodoro, timer, focus, productivity, work, break, study timer, online timer',
  openGraph: {
    title: 'Pomodoro Timer - Ichi Space',
    description: 'Stay focused and productive with our Pomodoro Timer. Customizable work and break cycles, task tracking, and detailed focus analytics.',
    url: 'https://ichispace.tech/productivity/pomodoro',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pomodoro Timer - Ichi Space',
    description: 'Stay focused and productive with our Pomodoro Timer. Customizable work and break cycles, task tracking, and detailed focus analytics.',
  },
  alternates: {
    canonical: 'https://ichispace.tech/productivity/pomodoro',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pomodoro Timer',
  description: 'Focus timer with 25/5 minute work/break cycles. Track your tasks and analyze your productivity.',
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
