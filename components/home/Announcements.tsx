'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BellRing, CalendarDays, ExternalLink, Pin } from 'lucide-react';

import FadeInOnScroll from '@/components/layout/FadeInOnScroll';
import { getAnnouncements, subscribeToSanityQuery } from '@/lib/sanity';

type Announcement = {
  _id: string;
  title: string;
  content: string;
  isPinned?: boolean;
  priority?: number;
  publishDate?: string;
  expiryDate?: string;
  targetAudience?: 'all' | 'students' | 'faculty' | 'ug' | 'pg';
  linkUrl?: string;
  linkText?: string;
};

const audienceLabels: Record<NonNullable<Announcement['targetAudience']>, string> = {
  all: 'Everyone',
  students: 'Students',
  faculty: 'Faculty',
  ug: 'UG students',
  pg: 'PG students',
};

interface AnnouncementsProps {
  limit?: number;
  showAllLink?: boolean;
  showEmptyState?: boolean;
}

export default function Announcements({
  limit,
  showAllLink = false,
  showEmptyState = false,
}: AnnouncementsProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const refreshAnnouncements = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);

    try {
      const data = await getAnnouncements();
      setAnnouncements(Array.isArray(data) ? data : []);
      setError(false);
    } catch (refreshError) {
      console.error('Failed to fetch announcements from Sanity:', refreshError);
      setError(true);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshAnnouncements(true);

    const unsubscribe = subscribeToSanityQuery(
      '*[_type == "announcement"]',
      () => void refreshAnnouncements(),
      subscriptionError => {
        console.warn('Sanity announcement live updates are unavailable:', subscriptionError);
      }
    );

    // Also re-evaluate scheduled publish and expiry dates while the page is open.
    const scheduleTimer = window.setInterval(() => {
      void refreshAnnouncements();
    }, 60_000);

    return () => {
      unsubscribe();
      window.clearInterval(scheduleTimer);
    };
  }, [refreshAnnouncements]);

  const visibleAnnouncements = useMemo(
    () => (typeof limit === 'number' ? announcements.slice(0, limit) : announcements),
    [announcements, limit]
  );

  if (loading && !showEmptyState) return null;
  if (!loading && visibleAnnouncements.length === 0 && !showEmptyState) return null;

  return (
    <section
      id="announcements"
      aria-labelledby="announcements-heading"
      aria-live="polite"
      className="relative overflow-hidden border-y border-blue-100 bg-blue-50/70 py-10 dark:border-blue-950 dark:bg-slate-950/70 sm:py-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_45%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_45%)]" />
      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeInOnScroll>
          <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-cyan-300">
                <BellRing className="h-4 w-4" aria-hidden="true" />
                Notice board
              </div>
              <h2
                id="announcements-heading"
                className="text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl"
              >
                Announcements
              </h2>
            </div>
            {showAllLink && (
              <Link
                href="/announcements"
                className="inline-flex min-h-11 items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold text-blue-800 transition-colors hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 dark:text-cyan-300 dark:hover:bg-cyan-950/50"
              >
                View all announcements
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </FadeInOnScroll>

        {loading ? (
          <div className="rounded-2xl border border-blue-200 bg-white/80 p-8 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
            Loading announcements…
          </div>
        ) : error && visibleAnnouncements.length === 0 ? (
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-8 text-center text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
            Announcements could not be loaded. Please try again shortly.
          </div>
        ) : visibleAnnouncements.length === 0 ? (
          <div className="rounded-2xl border border-blue-200 bg-white/80 p-8 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
            There are no active announcements right now.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {visibleAnnouncements.map((announcement, index) => {
              const audience = announcement.targetAudience || 'all';
              const published = announcement.publishDate
                ? new Intl.DateTimeFormat('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  }).format(new Date(announcement.publishDate))
                : null;

              return (
                <motion.article
                  key={announcement._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="relative flex h-full flex-col rounded-2xl border border-blue-200 bg-white/95 p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 sm:p-6"
                >
                  {announcement.isPinned && (
                    <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800 dark:bg-cyan-950 dark:text-cyan-200">
                      <Pin className="h-3.5 w-3.5" aria-hidden="true" />
                      Pinned
                    </div>
                  )}

                  <div className="mb-3 flex flex-wrap items-center gap-2 pr-20 text-xs text-slate-500 dark:text-slate-400">
                    {published && (
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                        {published}
                      </span>
                    )}
                    <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {audienceLabels[audience]}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-slate-950 dark:text-white sm:text-xl">
                    {announcement.title}
                  </h3>
                  <p className="whitespace-pre-line text-sm leading-6 text-slate-700 dark:text-slate-300 sm:text-base">
                    {announcement.content}
                  </p>

                  {announcement.linkUrl && (
                    <a
                      href={announcement.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-blue-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                    >
                      {announcement.linkText || 'Learn more'}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
