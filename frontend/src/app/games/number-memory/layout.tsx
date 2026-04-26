import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Number Memory Game - Test Your Recall | Ichi Space',
  description: 'Memorize increasingly long number sequences. A flash-and-recall memory game that gets harder every round. How far can you go?',
  keywords: 'number memory game, memory test, recall game, brain training, concentration, sequence memory',
  openGraph: {
    title: 'Number Memory Game - Ichi Space',
    description: 'Memorize increasingly long numbers — how far can you go?',
    url: 'https://ichispace.tech/games/number-memory',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Number Memory Game - Ichi Space',
    description: 'Memorize increasingly long numbers — how far can you go?',
  },
  alternates: { canonical: 'https://ichispace.tech/games/number-memory' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
