'use client';

import React, { useMemo, useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import {
  Calendar,
  Clock,
  MapPin,
  Filter,
  Grid,
  List,
  Loader2,
  Camera,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { getActivities as getSanityActivities, subscribeToSanityQuery } from '@/lib/sanity';

type GalleryItem = {
  id: string;
  title: string;
  date: string;
  category: 'workshop' | 'seminar' | 'site-visit' | 'competition' | 'edificio' | 'other';
  imageUrl: string;
  images?: string[]; // gallery images from Sanity (excluding cover)
  colorUrl?: string;
  status?: 'completed' | 'upcoming' | 'ongoing';
  description?: string;
  location?: string;
};

// Fallback data when API is unavailable — 2025-26 Academic Year Activities
const FALLBACK_ACTIVITIES: GalleryItem[] = [
  {
    id: '1',
    title: 'PG Seminar Series 2025',
    date: '2025-05-15',
    category: 'seminar',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '2',
    title: 'Seminar by Prof. Ravindra Gettu – Technology Implementation in Concrete Research',
    date: '2025-06-30',
    category: 'seminar',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '3',
    title: 'Prof. Akshay Gupta – Excellence in Doctoral Research Award',
    date: '2025-09-05',
    category: 'other',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '4',
    title: 'Plantation Drive with Green Cell',
    date: '2025-09-20',
    category: 'other',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '5',
    title: 'Online Talk – Prof. Masiur Rahaman on Julia for Numerical Computations',
    date: '2025-09-27',
    category: 'seminar',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '6',
    title: 'Guest Lecture – Prof. Ligy Philip on Sustainable Wastewater Treatment',
    date: '2025-10-03',
    category: 'seminar',
    imageUrl: '/Other images/1759303624829.jpeg',
  },
  {
    id: '7',
    title: 'Survey of India Workshop on Geospatial Technologies',
    date: '2025-10-11',
    category: 'workshop',
    imageUrl: '/Other images/PXL_20251011_075907856.jpg',
  },
  {
    id: '8',
    title: 'PG Seminar – Keshav Saini on Hybrid High Strength Steel I-Beams',
    date: '2025-10-20',
    category: 'seminar',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '9',
    title: 'PG Seminar – Koduru Sandeep on Moisture Resistance of Cold Mix Asphalt',
    date: '2025-10-25',
    category: 'seminar',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '10',
    title: 'Seminar – Dr. Ashutosh Kumar on Climate Resilience in Geotechnical Engineering',
    date: '2026-01-03',
    category: 'seminar',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '11',
    title: 'Seminar – Shri S.L. Kapil on Geophysical Technologies for Dam Projects',
    date: '2026-01-07',
    category: 'seminar',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '12',
    title: 'Seminar – Prof. Animesh Das on Studying Pavement Materials Through Imaging',
    date: '2026-01-09',
    category: 'seminar',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '13',
    title: 'Seminar – Dr. Deeksha Arya on Multinational Road Damage Detection AI',
    date: '2026-01-29',
    category: 'seminar',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '14',
    title: 'Seminar – Prof. Nemkumar Banthia on Nano-Materials in Concrete',
    date: '2026-02-03',
    category: 'seminar',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '15',
    title: 'BIS Essay Competition – Role of Standards in Engineering Life',
    date: '2026-02-13',
    category: 'competition',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '16',
    title: 'Seminar – Dr. Sarath Chandra Reddy on Multiscale Landslide Dynamics',
    date: '2026-02-27',
    category: 'seminar',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '17',
    title: 'Alumni Meet – Abhinav Singh Tawar on Placement Preparation',
    date: '2026-02-28',
    category: 'other',
    imageUrl: '/CIE Design.png',
  },
  {
    id: '18',
    title: 'M.Tech Alumni Meet – Batch 2020 on Industry Expectations',
    date: '2026-02-28',
    category: 'other',
    imageUrl: '/CIE Design.png',
  },
];

export default function ActivitiesPage() {
  const categories = [
    'all',
    'upcoming',
    'workshop',
    'seminar',
    'site-visit',
    'competition',
    'edificio',
  ];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [items, setItems] = useState<GalleryItem[]>(FALLBACK_ACTIVITIES);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Fetch activities from Sanity
  useEffect(() => {
    async function fetchActivities(showLoading = false) {
      try {
        if (showLoading) setLoading(true);

        // Fetch all activities (events with eventCategory = "activity")
        const allActivities = await getSanityActivities();

        // Transform Sanity data to component format
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedItems: GalleryItem[] = allActivities.map((activity: any) => ({
          id: activity._id,
          title: activity.title,
          date: activity.date,
          category: activity.category as GalleryItem['category'],
          imageUrl: activity.coverImage || '/CIE Design.png',
          images: Array.isArray(activity.images)
            ? activity.images.filter((u: unknown) => u && typeof u === 'string')
            : [],
          status: (activity.status === 'completed'
            ? 'completed'
            : activity.status === 'upcoming'
              ? 'upcoming'
              : 'ongoing') as 'completed' | 'upcoming' | 'ongoing',
          description: activity.description ?? undefined,
          location: activity.location ?? undefined,
        }));

        if (transformedItems.length > 0) {
          setItems(transformedItems);
        }
        // If Sanity fails or returns empty, keep using FALLBACK_ACTIVITIES
      } catch (err) {
        console.error('Failed to fetch activities from Sanity, using fallback data:', err);
        // Keep using fallback data - no error shown to user
      } finally {
        if (showLoading) setLoading(false);
      }
    }

    void fetchActivities(true);
    return subscribeToSanityQuery(
      '*[_type == "activity"]',
      () => void fetchActivities(),
      error => console.warn('Sanity activity live updates are unavailable:', error)
    );
  }, []);

  // All hooks must be called before any conditional returns
  const filteredItems = useMemo(() => {
    let filtered = items;

    if (activeCategory === 'all') {
      filtered = items;
    } else if (activeCategory === 'upcoming') {
      const now = new Date();
      filtered = items.filter(i => new Date(i.date) >= now);
    } else {
      filtered = items.filter(i => i.category === (activeCategory as GalleryItem['category']));
    }

    // Sort by date - most recent first
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeCategory, items]);

  const selected = useMemo(() => items.find(i => i.id === selectedId) || null, [items, selectedId]);
  const close = () => {
    setSelectedId(null);
    setSelectedPhotoIndex(null);
  };

  // All photos for selected activity (cover + gallery)
  const selectedAllPhotos = useMemo(() => {
    if (!selected) return [];
    return [selected.imageUrl, ...(selected.images || [])];
  }, [selected]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selected || selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selected, selectedPhotoIndex]);

  // Keyboard navigation for photo modal (Arrow keys to traverse, Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null || !selected) return;

      const totalPhotos = selectedAllPhotos.length;

      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      } else if (e.key === 'ArrowLeft' && selectedPhotoIndex > 0) {
        setSelectedPhotoIndex(selectedPhotoIndex - 1);
      } else if (e.key === 'ArrowRight' && selectedPhotoIndex < totalPhotos - 1) {
        setSelectedPhotoIndex(selectedPhotoIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, selected, selectedAllPhotos.length]);

  // Group items by month for timeline view
  const groupedByMonth = useMemo(() => {
    const groups: { [key: string]: typeof filteredItems } = {};
    filteredItems.forEach(item => {
      const date = new Date(item.date);
      const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(item);
    });
    return groups;
  }, [filteredItems]);

  // Show loading state
  if (loading) {
    return (
      <AppLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" />
            <p className="text-gray-600 dark:text-gray-400">Loading activities...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      workshop: 'from-purple-500 to-pink-500',
      seminar: 'from-blue-500 to-cyan-500',
      'site-visit': 'from-green-500 to-emerald-500',
      competition: 'from-orange-500 to-red-500',
      edificio: 'from-yellow-500 to-amber-500',
      other: 'from-slate-500 to-gray-500',
    };
    return colors[category] || colors.other;
  };

  // Get category badge color
  const getCategoryBadge = (category: string) => {
    const badges: { [key: string]: string } = {
      workshop:
        'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-500/50',
      seminar:
        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-500/50',
      'site-visit':
        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-500/50',
      competition:
        'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-500/50',
      edificio:
        'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-yellow-300 border-amber-300 dark:border-yellow-500/50',
      other:
        'bg-slate-100 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-500/50',
    };
    return badges[category] || badges.other;
  };

  return (
    <AppLayout>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 text-slate-900 transition-colors duration-300 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg dark:text-slate-100">
        {/* Animated background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,100,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,rgba(100,100,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,255,0.03)_1px,transparent_1px)]" />
          <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/5" />
          <div
            className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-purple-400/10 blur-3xl dark:bg-purple-500/5"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <main className="pt-20">
          {/* Hero Section - Mobile Optimized */}
          <section className="relative px-4 py-10 sm:px-6 sm:py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-400/40 bg-slate-500/10 px-3 py-1.5 text-xs text-slate-700 shadow-sm backdrop-blur-sm dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="font-medium">Academic Year 2025-26</span>
                </div>
                <h1 className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:via-blue-100 dark:to-purple-100 sm:text-5xl md:text-7xl">
                  Activities & Events
                </h1>
                <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-slate-500 dark:text-slate-300 sm:mt-6 sm:text-lg">
                  Explore our calendar of workshops, seminars, competitions, site visits, and
                  EDIFICIO initiatives.
                </p>
              </div>

              {/* Stats - Compact on mobile */}
              <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-2 sm:mt-12 sm:gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-white/80 p-3 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 sm:p-4">
                  <div className="text-2xl font-bold text-slate-700 dark:text-blue-400 sm:text-3xl">
                    {items.length}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-300 sm:mt-1 sm:text-sm">
                    Total
                  </div>
                </div>
                <div className="rounded-xl border border-purple-200 bg-white/80 p-3 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 sm:p-4">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 sm:text-3xl">
                    {items.filter(i => i.category === 'seminar').length}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-300 sm:mt-1 sm:text-sm">
                    Seminars
                  </div>
                </div>
                <div className="rounded-xl border border-green-200 bg-white/80 p-3 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 sm:p-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 sm:text-3xl">
                    {items.filter(i => i.category === 'workshop').length}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-300 sm:mt-1 sm:text-sm">
                    Workshops
                  </div>
                </div>
                <div className="rounded-xl border border-amber-200 bg-white/80 p-3 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 sm:p-4">
                  <div className="text-2xl font-bold text-amber-600 dark:text-yellow-400 sm:text-3xl">
                    {items.filter(i => i.category === 'edificio').length}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-300 sm:mt-1 sm:text-sm">
                    EDIFICIO
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Filter Bar - Sticky & Mobile-Friendly */}
          <div className="sticky top-14 z-30 border-y border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/95 sm:top-16">
            <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Filter buttons - Horizontal scroll on mobile */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 flex-shrink-0 text-slate-400 dark:text-slate-300" />
                  <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`min-h-[44px] flex-shrink-0 touch-manipulation whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:text-sm ${
                          activeCategory === cat
                            ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/30 dark:bg-white dark:text-gray-900 dark:shadow-white/20'
                            : 'border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700'
                        }`}
                      >
                        {cat === 'all'
                          ? 'All'
                          : cat.replace('-', ' ').replace(/^./, s => s.toUpperCase())}
                      </button>
                    ))}
                  </div>
                </div>
                {/* View toggle */}
                <div className="flex items-center justify-between gap-2 sm:justify-end">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-300 sm:text-sm">
                    View:
                  </span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-lg p-2.5 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-gray-900 text-white shadow-md dark:bg-white dark:text-gray-900'
                        : 'border border-slate-300 bg-slate-100 text-slate-500 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-lg p-2.5 transition-all ${
                      viewMode === 'timeline'
                        ? 'bg-gray-900 text-white shadow-md dark:bg-white dark:text-gray-900'
                        : 'border border-slate-300 bg-slate-100 text-slate-500 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                    aria-label="Timeline view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Events Showcase - Only show when "all" filter is active */}
          {activeCategory === 'all' &&
            (() => {
              const recentEvents = filteredItems
                .filter(item => {
                  const daysDiff =
                    (new Date().getTime() - new Date(item.date).getTime()) / (1000 * 60 * 60 * 24);
                  return daysDiff >= 0 && daysDiff <= 30; // Within last 30 days
                })
                .slice(0, 3); // Show top 3 recent events

              if (recentEvents.length === 0) return null;

              return (
                <section className="bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 px-3 py-8 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/5 sm:px-6 sm:py-12">
                  <div className="mx-auto max-w-7xl">
                    {/* Section Header */}
                    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 p-2 shadow-lg shadow-blue-500/30 sm:p-3">
                          <Sparkles className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                        </div>
                        <div>
                          <h2 className="bg-gradient-to-r from-blue-600 via-cyan-600 to-slate-600 bg-clip-text text-xl font-bold text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-slate-400 sm:text-3xl">
                            Recent Events
                          </h2>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                            Latest activities from the past 30 days
                          </p>
                        </div>
                      </div>
                      <div className="hidden items-center gap-2 rounded-full border border-blue-300 bg-blue-100 px-4 py-2 dark:border-blue-500/30 dark:bg-blue-500/20 sm:flex">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                          {recentEvents.length} New {recentEvents.length === 1 ? 'Event' : 'Events'}
                        </span>
                      </div>
                    </div>

                    {/* Featured Recent Events Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                      {recentEvents.map((event, idx) => (
                        <article
                          key={event.id}
                          className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-blue-500/50 dark:hover:shadow-blue-500/10"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          {/* Image */}
                          <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              style={{
                                objectPosition: 'center center',
                                objectFit: 'cover',
                                minHeight: '224px',
                              }}
                              onError={e => {
                                e.currentTarget.src = '/CIE Design.png';
                                e.currentTarget.onerror = null;
                              }}
                              loading="eager"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute left-4 top-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getCategoryBadge(event.category)}`}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {event.category.replace('-', ' ').toUpperCase()}
                              </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-8">
                              <h3 className="mb-1 line-clamp-2 text-lg font-bold text-white/90">
                                {event.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-white/80">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={event.date}>
                                  {new Date(event.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </time>
                              </div>
                            </div>
                          </div>

                          <div className="p-6">
                            <p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                              {event.description ||
                                'Explore this activity by the Civil & Infrastructure Engineering Society.'}
                            </p>
                            <div className="mb-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location || 'IIT Jodhpur Campus'}</span>
                            </div>
                            <button
                              onClick={() => setSelectedId(event.id)}
                              className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:text-slate-300"
                            >
                              <Camera className="h-4 w-4" />
                              View Photos
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="mb-8 mt-12 flex items-center gap-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />
                      <span className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        All Events
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />
                    </div>
                  </div>
                </section>
              );
            })()}

          {/* Events Display */}
          <section className="px-6 py-12">
            <div className="mx-auto max-w-7xl">
              {filteredItems.length === 0 ? (
                <div className="py-20 text-center">
                  <Calendar className="mx-auto mb-4 h-16 w-16 text-slate-300 dark:text-slate-500" />
                  <h3 className="text-xl font-semibold text-slate-500 dark:text-slate-300">
                    No events found
                  </h3>
                  <p className="mt-2 text-slate-400 dark:text-slate-400">
                    Try adjusting your filters
                  </p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredItems.map(card => (
                    <article
                      key={card.id}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-blue-500/50 dark:hover:shadow-blue-500/10"
                    >
                      {/* Activity Image */}
                      <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={card.imageUrl}
                          alt={card.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{
                            objectPosition: 'center center',
                            objectFit: 'cover',
                            minHeight: '224px',
                          }}
                          onError={e => {
                            e.currentTarget.src = '/CIE Design.png';
                            e.currentTarget.onerror = null;
                          }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute left-4 top-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getCategoryBadge(card.category)}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {card.category.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-8">
                          <h3 className="mb-1 line-clamp-2 text-lg font-bold text-white/90">
                            {card.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-white/80">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={card.date}>
                              {new Date(card.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </time>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                          {card.description ||
                            'Explore this activity by the Civil & Infrastructure Engineering Society.'}
                        </p>

                        <div className="mb-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <MapPin className="h-4 w-4" />
                            <span>{card.location || 'IIT Jodhpur Campus'}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedId(card.id)}
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:text-slate-300"
                        >
                          <Camera className="h-4 w-4" />
                          View Photos
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedByMonth).map(([month, events]) => (
                    <div key={month} className="relative">
                      {/* Month Header */}
                      <div className="sticky top-32 z-10 mb-6 flex items-center gap-4">
                        <div className="rounded-xl border border-slate-400/40 bg-slate-500/10 px-6 py-3 shadow-sm backdrop-blur-sm dark:border-blue-500/30 dark:bg-blue-500/10">
                          <h2 className="text-xl font-bold text-slate-800 dark:text-blue-300">
                            {month}
                          </h2>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-slate-400/30 to-transparent dark:from-blue-500/30" />
                      </div>

                      {/* Timeline Events */}
                      <div className="space-y-4 border-l-2 border-slate-300 pl-4 dark:border-slate-800">
                        {events.map(event => {
                          return (
                            <div key={event.id} className="group relative pb-8 pl-8">
                              {/* Timeline dot */}
                              <div
                                className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white bg-gradient-to-br dark:border-slate-900 ${getCategoryColor(event.category)} shadow-sm transition-transform group-hover:scale-125`}
                              />

                              {/* Event Card */}
                              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm backdrop-blur transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-blue-500/50 dark:hover:shadow-blue-500/10">
                                <div className="flex flex-col gap-4 sm:flex-row">
                                  {/* Image thumbnail */}
                                  <div className="relative h-32 flex-shrink-0 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 sm:h-auto sm:w-48">
                                    <img
                                      src={event.imageUrl}
                                      alt={event.title}
                                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                      onError={e => {
                                        e.currentTarget.src = '/CIE Design.png';
                                        e.currentTarget.onerror = null;
                                      }}
                                      loading="lazy"
                                    />
                                  </div>

                                  <div className="flex flex-1 flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex-1">
                                      <div className="mb-2 flex flex-wrap items-center gap-3">
                                        <span
                                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getCategoryBadge(event.category)}`}
                                        >
                                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                          {event.category.replace('-', ' ').toUpperCase()}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                                          <Clock className="h-3 w-3" />
                                          <time dateTime={event.date}>
                                            {new Date(event.date).toLocaleDateString('en-US', {
                                              day: 'numeric',
                                              month: 'short',
                                              year: 'numeric',
                                            })}
                                          </time>
                                        </div>
                                      </div>
                                      <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                                        {event.title}
                                      </h3>
                                      <p className="mb-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                                        {event.description || 'Explore this activity by CIES.'}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => setSelectedId(event.id)}
                                      className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:text-slate-300"
                                    >
                                      <Camera className="h-4 w-4" />
                                      View Photos
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Modal - Events-style gallery */}
          {selected && (
            <div
              id="event-dialog"
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm dark:bg-black/70"
                onClick={close}
                aria-hidden="true"
              />
              <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                <div className="relative">
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getCategoryBadge(selected.category)}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {selected.category.replace('-', ' ').toUpperCase()}
                      </span>
                      <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                        {selected.title}
                      </h2>
                    </div>
                    <button
                      onClick={close}
                      className="rounded-full bg-slate-100 p-2 text-slate-600 shadow-sm backdrop-blur transition-all hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                      aria-label="Close"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="max-h-[70vh] overflow-y-auto p-6">
                    {/* Info sections first - events style */}
                    <div className="mb-6 space-y-4">
                      <div className="flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Date</div>
                          <div className="font-medium text-slate-900 dark:text-slate-200">
                            {new Date(selected.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
                        <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Location</div>
                          <div className="font-medium text-slate-900 dark:text-slate-200">
                            {selected.location || 'IIT Jodhpur Campus'}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700/50 dark:bg-slate-800/30">
                        <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                          About this Event
                        </h3>
                        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                          {selected.description ||
                            'Join us for this exciting event organized by the Civil & Infrastructure Engineering Society. This activity is part of our commitment to fostering knowledge sharing and professional development in the field of civil engineering. More details will be announced soon. Stay tuned!'}
                        </p>
                      </div>
                    </div>

                    {/* Photos section at bottom - click to open zoom */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div
                        className="group relative cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
                        onClick={() => setSelectedPhotoIndex(0)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && setSelectedPhotoIndex(0)}
                        aria-label="View photo 1"
                      >
                        <img
                          src={selected.imageUrl}
                          alt={selected.title}
                          className="h-48 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          style={{ objectPosition: 'center center', minHeight: '192px' }}
                          onError={e => {
                            e.currentTarget.src = '/CIE Design.png';
                            e.currentTarget.onerror = null;
                          }}
                          loading="lazy"
                        />
                      </div>
                      {selected.images?.map((url, idx) => (
                        <div
                          key={idx}
                          className="group relative cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
                          onClick={() => setSelectedPhotoIndex(idx + 1)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={e => e.key === 'Enter' && setSelectedPhotoIndex(idx + 1)}
                          aria-label={`View photo ${idx + 2}`}
                        >
                          <img
                            src={url}
                            alt={`${selected.title} – ${idx + 2}`}
                            className="h-48 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            style={{ objectPosition: 'center center', minHeight: '192px' }}
                            onError={e => {
                              e.currentTarget.src = '/CIE Design.png';
                              e.currentTarget.onerror = null;
                            }}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Photo zoom modal - click image to open, arrows to traverse */}
          {selected && selectedPhotoIndex !== null && selectedAllPhotos.length > 0 && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
              style={{ zIndex: 60 }}
            >
              <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-hidden="true"
              />
              <div className="relative flex max-h-[90vh] w-full max-w-6xl items-center justify-center">
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="absolute right-4 top-4 z-10 rounded-full bg-transparent p-3 text-white transition-all hover:bg-white/10"
                  aria-label="Close"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <img
                  src={selectedAllPhotos[selectedPhotoIndex]}
                  alt={`${selected.title} – ${selectedPhotoIndex + 1}`}
                  className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
                  style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
                  onError={e => {
                    e.currentTarget.src = '/CIE Design.png';
                    e.currentTarget.onerror = null;
                  }}
                  onClick={e => e.stopPropagation()}
                />

                {selectedPhotoIndex > 0 && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedPhotoIndex(selectedPhotoIndex - 1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-3 text-white transition-all hover:bg-white/10"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                )}

                {selectedPhotoIndex < selectedAllPhotos.length - 1 && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedPhotoIndex(selectedPhotoIndex + 1);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-3 text-white transition-all hover:bg-white/10"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  {selectedPhotoIndex + 1} of {selectedAllPhotos.length}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </AppLayout>
  );
}
