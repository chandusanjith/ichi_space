import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Trivia Quiz - Tech, Finance & General Knowledge | Ichi Space',
  description: '5 fresh questions every day covering technology, finance, and general knowledge. Build your daily streak and challenge yourself.',
  keywords: 'daily trivia, tech quiz, finance quiz, general knowledge, daily challenge, quiz streak',
  openGraph: {
    title: 'Daily Trivia Quiz - Ichi Space',
    description: '5 daily questions on tech, finance & general knowledge. Build your streak!',
    url: 'https://ichispace.tech/games/daily-trivia',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Trivia Quiz - Ichi Space',
    description: '5 daily questions on tech, finance & general knowledge.',
  },
  alternates: { canonical: 'https://ichispace.tech/games/daily-trivia' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
