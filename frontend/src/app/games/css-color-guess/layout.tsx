import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guess the CSS Color - Hex Code Game for Designers & Devs | Ichi Space',
  description: 'A color swatch is shown — type the hex code as close as possible. Score points based on accuracy. Perfect for designers and developers.',
  keywords: 'css color game, hex code game, color quiz, designer game, web design game, color challenge',
  openGraph: {
    title: 'Guess the CSS Color - Ichi Space',
    description: 'A color block is shown — type the hex code as close as possible.',
    url: 'https://ichispace.tech/games/css-color-guess',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guess the CSS Color - Ichi Space',
    description: 'A color block is shown — type the hex code as close as possible.',
  },
  alternates: { canonical: 'https://ichispace.tech/games/css-color-guess' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
