import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dev Jargon Word Puzzle - Daily Tech Wordle | Ichi Space',
  description: 'Guess the daily 5-letter tech or finance word in 6 attempts. A Wordle-style game with a developer twist. Build your streak!',
  keywords: 'wordle, word puzzle, tech words, dev jargon, daily game, finance words',
  openGraph: {
    title: 'Dev Jargon Word Puzzle - Ichi Space',
    description: 'Guess the daily 5-letter tech or finance word in 6 attempts.',
    url: 'https://ichispace.tech/games/word-puzzle',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Jargon Word Puzzle - Ichi Space',
    description: 'Guess the daily 5-letter tech or finance word in 6 attempts.',
  },
  alternates: { canonical: 'https://ichispace.tech/games/word-puzzle' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
