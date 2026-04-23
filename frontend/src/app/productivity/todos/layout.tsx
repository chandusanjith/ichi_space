import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todo List - Free Online Tool | Ichi Space',
  description: 'Manage tasks with priorities and due dates',
  keywords: 'todo, task, checklist, to-do, list',
  openGraph: {
    title: 'Todo List - Free Online Tool | Ichi Space',
    description: 'Manage tasks with priorities and due dates',
    url: 'https://ichispace.tech/productivity/todos',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todo List - Ichi Space',
    description: 'Manage tasks with priorities and due dates',
  },
  alternates: {
    canonical: 'https://ichispace.tech/productivity/todos',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Todo List',
  description: 'Manage tasks with priorities and due dates',
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
