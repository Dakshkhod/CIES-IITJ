import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Announcements',
  description: 'Latest announcements and notices from CIES IIT Jodhpur.',
  alternates: {
    canonical: '/announcements',
  },
};

export default function AnnouncementsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
