import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Past Teams',
  description: 'Explore previous CIES IIT Jodhpur teams from 2025 onward.',
  alternates: { canonical: '/team/past' },
};

export default function PastTeamsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
