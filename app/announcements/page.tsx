'use client';

import Announcements from '@/components/home/Announcements';
import AppLayout from '@/components/layout/AppLayout';

export default function AnnouncementsPage() {
  return (
    <AppLayout>
      <main className="min-h-screen bg-white pt-20 dark:bg-dark-bg">
        <Announcements showEmptyState />
      </main>
    </AppLayout>
  );
}
