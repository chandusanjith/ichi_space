import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Random Idea Generator - Startup, Side Project & Writing Prompts | Ichi Space',
  description: 'Get instant startup ideas, side project prompts, and writing sparks at the click of a button. Overcome creative blocks now.',
  keywords: 'idea generator, startup ideas, side project ideas, writing prompts, random ideas, creativity tool',
  openGraph: { title: 'Random Idea Generator - Ichi Space', description: 'Instant startup ideas, side project prompts & writing sparks.', url: 'https://ichispace.tech/creative/idea-generator', siteName: 'Ichi Space', type: 'website' },
  alternates: { canonical: 'https://ichispace.tech/creative/idea-generator' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
