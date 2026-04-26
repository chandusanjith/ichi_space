import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Habit Streak Tracker - Daily Habits No Login | Ichi Space',
  description: 'Track your daily habits with streaks and a visual heatmap. No login required — all data stored in your browser.',
  keywords: 'habit tracker, streak tracker, daily habits, no login, browser habit tracker, goal tracker',
  openGraph: { title: 'Habit Streak Tracker - Ichi Space', description: 'Track daily habits with streaks. No login, just results.', url: 'https://ichispace.tech/productivity/habit-tracker', siteName: 'Ichi Space', type: 'website' },
  alternates: { canonical: 'https://ichispace.tech/productivity/habit-tracker' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
