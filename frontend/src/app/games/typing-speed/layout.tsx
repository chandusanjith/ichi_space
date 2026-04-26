import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Typing Speed Test - WPM on Code & Quotes | Ichi Space',
  description: 'Test your typing speed with code snippets, inspiring quotes, and random facts. Get your WPM score and share your results.',
  keywords: 'typing speed test, wpm, words per minute, typing test, code typing, keyboard speed',
  openGraph: {
    title: 'Typing Speed Test - Ichi Space',
    description: 'Test your WPM on code snippets, quotes and random facts.',
    url: 'https://ichispace.tech/games/typing-speed',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Typing Speed Test - Ichi Space',
    description: 'Test your WPM on code snippets, quotes and random facts.',
  },
  alternates: { canonical: 'https://ichispace.tech/games/typing-speed' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
