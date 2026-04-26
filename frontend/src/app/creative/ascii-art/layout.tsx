import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ASCII Art Generator - Convert Text to ASCII Art | Ichi Space',
  description: 'Convert any text into stunning ASCII art with multiple font styles. Copy and share your retro terminal art.',
  keywords: 'ascii art, text to ascii, figlet, terminal art, ascii generator, text art, retro art',
  openGraph: { title: 'ASCII Art Generator - Ichi Space', description: 'Convert text into ASCII art with multiple font styles.', url: 'https://ichispace.tech/creative/ascii-art', siteName: 'Ichi Space', type: 'website' },
  alternates: { canonical: 'https://ichispace.tech/creative/ascii-art' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
