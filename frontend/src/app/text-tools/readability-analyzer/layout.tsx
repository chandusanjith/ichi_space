import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Readability Analyzer - Flesch-Kincaid Score | Ichi Space',
  description: 'Analyze any text for readability. Get Flesch-Kincaid reading ease, grade level, passive voice percentage, and sentence statistics.',
  keywords: 'readability analyzer, flesch kincaid, grade level, passive voice, text analysis, writing score',
  openGraph: { title: 'Readability Analyzer - Ichi Space', description: 'Get Flesch-Kincaid score, grade level, passive voice % and more.', url: 'https://ichispace.tech/text-tools/readability-analyzer', siteName: 'Ichi Space', type: 'website' },
  alternates: { canonical: 'https://ichispace.tech/text-tools/readability-analyzer' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
