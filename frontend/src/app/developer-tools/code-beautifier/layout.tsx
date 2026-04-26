import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Code Snippet Beautifier - Syntax Highlight & Export PNG | Ichi Space',
  description: 'Paste code, choose a theme and language, then copy or download a beautiful syntax-highlighted image. No login required.',
  keywords: 'code beautifier, code screenshot, syntax highlight, code image, carbon alternative, code share',
  openGraph: { title: 'Code Snippet Beautifier - Ichi Space', description: 'Style your code with themes and download as a PNG image.', url: 'https://ichispace.tech/developer-tools/code-beautifier', siteName: 'Ichi Space', type: 'website' },
  alternates: { canonical: 'https://ichispace.tech/developer-tools/code-beautifier' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
