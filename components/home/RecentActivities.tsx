'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInOnScroll from '@/components/layout/FadeInOnScroll';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getActivities as getSanityActivities, subscribeToSanityQuery } from '@/lib/sanity';

const FALLBACK_ACTIVITIES = [
  {
    id: 1,
    title: 'M.Tech Alumni Meet – Batch 2020 on Industry Expectations',
    date: 'February 28, 2026',
    description:
      'Alumni interaction session with M.Tech CIE (Environment) Batch 2020, focusing on industry expectations, placement readiness, and career guidance for current students.',
    image: '/CIE Design.png',
    link: '/activities',
  },
  {
    id: 2,
    title: 'Alumni Meet – Abhinav Singh Tawar on Placement Preparation',
    date: 'February 28, 2026',
    description:
      'Interaction session with Abhinav Singh Tawar focused on placement preparation, resume building, and aligning academic profiles with industry demands.',
    image: '/CIE Design.png',
    link: '/activities',
  },
  {
    id: 3,
    title: 'Seminar – Dr. Sarath Chandra Reddy on Multiscale Landslide Dynamics',
    date: 'February 27, 2026',
    description:
      'Technical seminar on "Multiscale Mechanisms of Landslide Dynamics," presenting experimental and simulation-based studies by Dr. Sarath Chandra Reddy Nallala.',
    image: '/CIE Design.png',
    link: '/activities',
  },
  {
    id: 4,
    title: 'BIS Essay Competition – Role of Standards in Engineering Life',
    date: 'February 13, 2026',
    description:
      'Essay writing competition on "Role of Standards in Engineering Life" organized in collaboration with the Bureau of Indian Standards (BIS).',
    image: '/CIE Design.png',
    link: '/activities',
  },
  {
    id: 5,
    title: 'Seminar – Prof. Nemkumar Banthia on Nano-Materials in Concrete',
    date: 'February 3, 2026',
    description:
      'Technical talk by Prof. Nemkumar Banthia (University of British Columbia) on "The Promise of Nano-Materials as Functional Additives in Concrete," focusing on UHPC and sustainable infrastructure.',
    image: '/CIE Design.png',
    link: '/activities',
  },
];

export default function RecentActivities() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recentActivities, setRecentActivities] = useState<
    Array<{
      id: number;
      title: string;
      date: string;
      description: string;
      image: string;
      link: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent activities from Sanity
  useEffect(() => {
    async function fetchRecentActivities(showLoading = false) {
      try {
        if (showLoading) setLoading(true);
        const allActivities = await getSanityActivities();

        const recent = allActivities.slice(0, 5);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedActivities = recent.map((activity: any, index: number) => ({
          id: activity._id || `activity-${index}`,
          title: activity.title,
          date: new Date(activity.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          description: activity.description || 'Details coming soon.',
          image: activity.coverImage || '/CIE Design.png',
          link: `/activities#${activity._id || index}`,
        }));

        setRecentActivities(
          transformedActivities.length > 0 ? transformedActivities : FALLBACK_ACTIVITIES
        );
      } catch (err) {
        console.error('Failed to fetch recent activities from Sanity:', err);
        setRecentActivities(FALLBACK_ACTIVITIES);
      } finally {
        if (showLoading) setLoading(false);
      }
    }

    void fetchRecentActivities(true);
    return subscribeToSanityQuery(
      '*[_type == "activity"]',
      () => void fetchRecentActivities(),
      error => console.warn('Sanity recent-activity live updates are unavailable:', error)
    );
  }, []);

  if (loading) {
    return (
      <section id="activities" className="relative -mt-4 overflow-hidden py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-500" />
              <p className="text-gray-600 dark:text-gray-400">Loading activities...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const activitiesToShow = recentActivities.length > 0 ? recentActivities : FALLBACK_ACTIVITIES;

  const nextActivity = () => setCurrentIndex(prev => (prev + 1) % activitiesToShow.length);
  const prevActivity = () =>
    setCurrentIndex(prev => (prev - 1 + activitiesToShow.length) % activitiesToShow.length);
  const goToActivity = (index: number) => setCurrentIndex(index);

  const activity = activitiesToShow[currentIndex];

  return (
    <section id="activities" className="relative -mt-4 overflow-hidden py-10 sm:py-16">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark-bg/80 dark:via-dark-bg dark:to-dark-bg/80"></div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,61,145,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,61,145,0.08)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.08)_1px,transparent_1px)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,61,145,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,61,145,0.04)_1px,transparent_1px)] bg-[size:10px_10px] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,61,145,0.12)_2px,transparent_2px),linear-gradient(to_bottom,rgba(11,61,145,0.12)_2px,transparent_2px)] bg-[size:200px_200px] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.12)_2px,transparent_2px),linear-gradient(to_bottom,rgba(56,189,248,0.12)_2px,transparent_2px)]"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <FadeInOnScroll>
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white sm:mb-12 sm:text-3xl md:text-4xl lg:text-5xl">
            Recent Activities
            <span className="mx-auto mt-2 block h-1 w-16 rounded-full bg-[#0b3d91] dark:bg-cyan-400 sm:mt-3 sm:w-24"></span>
          </h2>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mx-auto max-w-6xl overflow-hidden rounded-xl border border-gray-300 bg-white/90 p-4 shadow-2xl backdrop-blur-md dark:border-dark-bg-elevated/80 dark:bg-dark-bg-elevated/50 sm:rounded-2xl sm:p-6 md:p-8"
          >
            <div className="flex min-h-[24rem] flex-col items-center gap-4 sm:min-h-[28rem] sm:gap-8 lg:flex-row">
              <div className="relative h-48 w-full flex-shrink-0 sm:h-64 lg:h-80 lg:w-2/5">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={activity.id}
                    src={activity.image}
                    alt={activity.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-0 top-0 h-full w-full rounded-lg object-cover sm:rounded-xl"
                  />
                </AnimatePresence>
              </div>
              <div className="relative flex min-h-[12rem] w-full flex-col sm:h-64 lg:h-80 lg:w-3/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="flex flex-grow flex-col"
                  >
                    <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 dark:text-white sm:mb-3 sm:text-2xl lg:text-3xl">
                      {activity.title}
                    </h3>
                    <p className="mb-3 text-xs font-semibold text-slate-700 dark:text-blue-400 sm:mb-4 sm:text-sm">
                      {activity.date}
                    </p>
                    <div
                      className="mb-4 line-clamp-4 flex-grow overflow-y-auto pr-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:mb-6 sm:line-clamp-none sm:text-base lg:text-lg"
                      style={{ scrollbarWidth: 'thin' }}
                    >
                      <p>{activity.description}</p>
                    </div>
                    <div className="mt-auto">
                      <motion.a
                        href={activity.link}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block rounded-full bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-slate-700 dark:bg-[#0b3d91] dark:hover:bg-blue-800 sm:px-8 sm:py-3 sm:text-base"
                      >
                        View More
                      </motion.a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <button
              onClick={prevActivity}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white/95 p-2 shadow-xl backdrop-blur-sm transition-colors hover:bg-gray-100 dark:border-dark-bg-elevated dark:bg-dark-bg/80 dark:hover:bg-dark-bg-elevated sm:left-4 sm:p-3"
              aria-label="Previous Activity"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800 dark:text-gray-300 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={nextActivity}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white/95 p-2 shadow-xl backdrop-blur-sm transition-colors hover:bg-gray-100 dark:border-dark-bg-elevated dark:bg-dark-bg/80 dark:hover:bg-dark-bg-elevated sm:right-4 sm:p-3"
              aria-label="Next Activity"
            >
              <ChevronRight className="h-5 w-5 text-gray-800 dark:text-gray-300 sm:h-6 sm:w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-6 sm:gap-2">
              {activitiesToShow.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToActivity(index)}
                  className={`h-3 w-3 flex-shrink-0 touch-manipulation rounded-full transition-all duration-300 sm:h-4 sm:w-4 ${
                    currentIndex === index
                      ? 'w-6 bg-[#0b3d91] dark:bg-cyan-400 sm:w-8'
                      : 'w-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 sm:w-3'
                  }`}
                  aria-label={`Go to activity ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
