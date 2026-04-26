import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Resume ATS Score Checker - Keyword Match | Ichi Space',
  description: 'Paste a job description and your resume text to get an ATS keyword match score. Identify missing keywords and improve your chances.',
  keywords: 'ats checker, resume score, job description match, keyword analysis, cv checker, resume optimizer',
  openGraph: { title: 'Resume ATS Checker - Ichi Space', description: 'Get your resume ATS keyword match score instantly.', url: 'https://ichispace.tech/text-tools/ats-checker', siteName: 'Ichi Space', type: 'website' },
  alternates: { canonical: 'https://ichispace.tech/text-tools/ats-checker' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
