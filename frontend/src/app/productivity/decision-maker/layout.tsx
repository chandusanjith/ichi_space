import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Decision Maker Pro - Spin Wheel & Pros Cons | Ichi Space',
  description: 'Settle any dilemma with a weighted spin wheel and pros/cons matrix. Add your options, set weights, and let it decide.',
  keywords: 'decision maker, spin wheel, pros cons, random choice, dilemma solver, decision tool',
  openGraph: { title: 'Decision Maker Pro - Ichi Space', description: 'Weighted spin wheel and pros/cons matrix to settle any dilemma.', url: 'https://ichispace.tech/productivity/decision-maker', siteName: 'Ichi Space', type: 'website' },
  alternates: { canonical: 'https://ichispace.tech/productivity/decision-maker' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
