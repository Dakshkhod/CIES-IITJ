'use client';

import React, { useMemo, useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Calendar, Clock, MapPin, Filter, Grid, List, Loader2, Camera, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { getActivities as getSanityActivities } from '@/lib/sanity';

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
  { id: '1', title: 'PG Seminar Series 2025', date: '2025-05-15', category: 'seminar', imageUrl: '/CIE Design.png' },
  { id: '2', title: 'Seminar by Prof. Ravindra Gettu – Technology Implementation in Concrete Research', date: '2025-06-30', category: 'seminar', imageUrl: '/CIE Design.png' },
  { id: '3', title: 'Prof. Akshay Gupta – Excellence in Doctoral Research Award', date: '2025-09-05', category: 'other', imageUrl: '/CIE Design.png' },
  { id: '4', title: 'Plantation Drive with Green Cell', date: '2025-09-20', category: 'other', imageUrl: '/CIE Design.png' },
  { id: '5', title: 'Online Talk – Prof. Masiur Rahaman on Julia for Numerical Computations', date: '2025-09-27', category: 'seminar', imageUrl: '/CIE Design.png' },
  { id: '6', title: 'Guest Lecture – Prof. Ligy Philip on Sustainable Wastewater Treatment', date: '2025-10-03', category: 'seminar', imageUrl: '/Other images/1759303624829.jpeg' },
  { id: '7', title: 'Survey of India Workshop on Geospatial Technologies', date: '2025-10-11', category: 'workshop', imageUrl: '/Other images/PXL_20251011_075907856.jpg' },
  { id: '8', title: 'PG Seminar – Keshav Saini on Hybrid High Strength Steel I-Beams', date: '2025-10-20', category: 'seminar', imageUrl: '/CIE Design.png' },
  { id: '9', title: 'PG Seminar – Koduru Sandeep on Moisture Resistance of Cold Mix Asphalt', date: '2025-10-25', category: 'seminar', imageUrl: '/CIE Design.png' },
  { id: '10', title: 'Seminar – Dr. Ashutosh Kumar on Climate Resilience in Geotechnical Engineering', date: '2026-01-03', category: 'seminar', imageUrl: '/CIE Design.png' },
  { id: '11', title: 'Seminar – Shri S.L. Kapil on Geophysical Technologies for Dam Projects', date: '2026-01-07', category: 'seminar', imageUrl: '/CIE Design.png' },
  { id: '12', title: 'Seminar – Prof. Animesh Das on Studying Pavement Materials Through Imaging', date: '2026-01-09', category: 'seminar', imageUrl: '/CIE Design.png' },
  { id: '13', title: 'Seminar – Dr. Deeksha Arya on Multinational Road Damage Detection AI', date: '2026-01-29', category: 'seminar', imageUrl: '/CIE Design.png' },
  { id: '14', title: 'Seminar – Prof. Nemkumar Banthia on Nano-Materials in Concrete', date: '2026-02-03', category: 'seminar', imageUrl: '/CIE Design.png' },
  { id: '15', title: 'BIS Essay Competition – Role of Standards in Engineering Life', date: '2026-02-13', category: 'competition', imageUrl: '/CIE Design.png' },
  { id: '16', title: 'Seminar – Dr. Sarath Chandra Reddy on Multiscale Landslide Dynamics', date: '2026-02-27', category: 'seminar', imageUrl: '/CIE Design.png' },
  { id: '17', title: 'Alumni Meet – Abhinav Singh Tawar on Placement Preparation', date: '2026-02-28', category: 'other', imageUrl: '/CIE Design.png' },
  { id: '18', title: 'M.Tech Alumni Meet – Batch 2020 on Industry Expectations', date: '2026-02-28', category: 'other', imageUrl: '/CIE Design.png' },
];

export default function ActivitiesPage() {
  const categories = ['all', 'upcoming', 'workshop', 'seminar', 'site-visit', 'competition', 'edificio'];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [items, setItems] = useState<GalleryItem[]>(FALLBACK_ACTIVITIES);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Fetch activities from Sanity
  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true);

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
          images: Array.isArray(activity.images) ? activity.images.filter((u: unknown) => u && typeof u === 'string') : [],
          status: (activity.status === 'completed' ? 'completed' : activity.status === 'upcoming' ? 'upcoming' : 'ongoing') as 'completed' | 'upcoming' | 'ongoing',
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
        setLoading(false);
      }
    }

    fetchActivities();
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
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
      workshop: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-500/50',
      seminar: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-500/50',
      'site-visit': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-500/50',
      competition: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-500/50',
      edificio: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-yellow-300 border-amber-300 dark:border-yellow-500/50',
      other: 'bg-slate-100 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-500/50',
    };
    return badges[category] || badges.other;
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg text-slate-900 dark:text-slate-100 relative transition-colors duration-300">
        {/* Animated background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,100,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,255,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(100,100,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-400/10 dark:bg-blue-500/5 blur-3xl animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-purple-400/10 dark:bg-purple-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <main className="pt-20">
          {/* Hero Section - Mobile Optimized */}
          <section className="relative px-4 sm:px-6 py-10 sm:py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-slate-400/40 bg-slate-500/10 dark:border-blue-500/30 dark:bg-blue-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 dark:text-blue-300 backdrop-blur-sm shadow-sm">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="font-medium">Academic Year 2025-26</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight md:text-7xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                  Activities & Events
                </h1>
                <p className="mt-4 sm:mt-6 mx-auto max-w-2xl text-sm sm:text-lg text-slate-500 dark:text-slate-300 px-2">
                  Explore our calendar of workshops, seminars, competitions, site visits, and EDIFICIO initiatives.
                </p>
              </div>

              {/* Stats - Compact on mobile */}
              <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4 max-w-4xl mx-auto">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-3 sm:p-4 text-center backdrop-blur shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-blue-400">{items.length}</div>
                  <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-300">Total</div>
                </div>
                <div className="rounded-xl border border-purple-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-3 sm:p-4 text-center backdrop-blur shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{items.filter(i => i.category === 'seminar').length}</div>
                  <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-300">Seminars</div>
                </div>
                <div className="rounded-xl border border-green-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-3 sm:p-4 text-center backdrop-blur shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{items.filter(i => i.category === 'workshop').length}</div>
                  <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-300">Workshops</div>
                </div>
                <div className="rounded-xl border border-amber-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-3 sm:p-4 text-center backdrop-blur shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-yellow-400">{items.filter(i => i.category === 'edificio').length}</div>
                  <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-300">EDIFICIO</div>
                </div>
              </div>
            </div>
          </section>

          {/* Filter Bar - Sticky & Mobile-Friendly */}
          <div className="sticky top-14 sm:top-16 z-30 border-y border-slate-200 dark:border-slate-800/50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-sm">
            <div className="mx-auto max-w-7xl px-3 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Filter buttons - Horizontal scroll on mobile */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-400 dark:text-slate-300 flex-shrink-0" />
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`rounded-lg px-3 sm:px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 touch-manipulation ${activeCategory === cat
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20'
                            : 'bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                          }`}
                      >
                        {cat === 'all' ? 'All' : cat.replace('-', ' ').replace(/^./, s => s.toUpperCase())}
                      </button>
                    ))}
                  </div>
                </div>
                {/* View toggle */}
                <div className="flex items-center justify-between sm:justify-end gap-2">
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 font-medium">View:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`rounded-lg p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center transition-all touch-manipulation ${viewMode === 'grid'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                      }`}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`rounded-lg p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center transition-all touch-manipulation ${viewMode === 'timeline'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
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
          {activeCategory === 'all' && (() => {
            const recentEvents = filteredItems.filter(item => {
              const daysDiff = (new Date().getTime() - new Date(item.date).getTime()) / (1000 * 60 * 60 * 24);
              return daysDiff >= 0 && daysDiff <= 30; // Within last 30 days
            }).slice(0, 3); // Show top 3 recent events

            if (recentEvents.length === 0) return null;

            return (
              <section className="px-3 sm:px-6 py-8 sm:py-12 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/5">
                <div className="mx-auto max-w-7xl">
                  {/* Section Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30">
                        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-slate-600 dark:from-blue-400 dark:via-cyan-400 dark:to-slate-400 bg-clip-text text-transparent">
                          Recent Events
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
                          Latest activities from the past 30 days
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-blue-300 dark:border-blue-500/30">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                        {recentEvents.length} New {recentEvents.length === 1 ? 'Event' : 'Events'}
                      </span>
                    </div>
                  </div>

                  {/* Featured Recent Events Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {recentEvents.map((event, idx) => (
                        <article
                          key={event.id}
                          className="group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500/50 shadow-sm"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          {/* Image */}
                          <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              style={{ objectPosition: 'center center', objectFit: 'cover', minHeight: '224px' }}
                              onError={(e) => {
                                e.currentTarget.src = '/CIE Design.png';
                                e.currentTarget.onerror = null;
                              }}
                              loading="eager"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute top-4 left-4">
                              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getCategoryBadge(event.category)}`}>
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {event.category.replace('-', ' ').toUpperCase()}
                              </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 pt-8 pb-4 px-4 bg-gradient-to-t from-black/75 to-transparent">
                              <h3 className="text-lg font-bold text-white/90 mb-1 line-clamp-2">
                                {event.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-white/80">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={event.date}>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
                              </div>
                            </div>
                          </div>

                          <div className="p-6">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                              {event.description || 'Explore this activity by the Civil & Infrastructure Engineering Society.'}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location || 'IIT Jodhpur Campus'}</span>
                            </div>
                            <button
                              onClick={() => setSelectedId(event.id)}
                              className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:bg-blue-500 hover:text-white shadow-sm"
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
                  <div className="mt-12 mb-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
                    <span className="text-sm font-medium text-slate-400 dark:text-slate-300 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      All Events
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
                  </div>
                </div>
              </section>
            );
          })()}

          {/* Events Display */}
          <section className="px-6 py-12">
            <div className="mx-auto max-w-7xl">
              {filteredItems.length === 0 ? (
                <div className="text-center py-20">
                  <Calendar className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-500 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-500 dark:text-slate-300">No events found</h3>
                  <p className="text-slate-400 dark:text-slate-400 mt-2">Try adjusting your filters</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((card) => (
                    <article
                        key={card.id}
                        className="group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500/50 shadow-sm"
                      >
                        {/* Activity Image */}
                        <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img
                            src={card.imageUrl}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            style={{ objectPosition: 'center center', objectFit: 'cover', minHeight: '224px' }}
                            onError={(e) => {
                              e.currentTarget.src = '/CIE Design.png';
                              e.currentTarget.onerror = null;
                            }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getCategoryBadge(card.category)}`}>
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                              {card.category.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 pt-8 pb-4 px-4 bg-gradient-to-t from-black/75 to-transparent">
                            <h3 className="text-lg font-bold text-white/90 mb-1 line-clamp-2">
                              {card.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-white/80">
                              <Calendar className="h-4 w-4" />
                              <time dateTime={card.date}>{new Date(card.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                            {card.description || 'Explore this activity by the Civil & Infrastructure Engineering Society.'}
                          </p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <MapPin className="h-4 w-4" />
                              <span>{card.location || 'IIT Jodhpur Campus'}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedId(card.id)}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:bg-blue-500 hover:text-white shadow-sm"
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
                        <div className="rounded-xl border border-slate-400/40 dark:border-blue-500/30 bg-slate-500/10 dark:bg-blue-500/10 px-6 py-3 backdrop-blur-sm shadow-sm">
                          <h2 className="text-xl font-bold text-slate-800 dark:text-blue-300">{month}</h2>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-slate-400/30 dark:from-blue-500/30 to-transparent" />
                      </div>

                      {/* Timeline Events */}
                      <div className="space-y-4 pl-4 border-l-2 border-slate-300 dark:border-slate-800">
                        {events.map((event) => {
                          return (
                            <div
                              key={event.id}
                              className="relative pl-8 pb-8 group"
                            >
                              {/* Timeline dot */}
                              <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 bg-gradient-to-br ${getCategoryColor(event.category)} group-hover:scale-125 transition-transform shadow-sm`} />

                              {/* Event Card */}
                              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 shadow-sm overflow-hidden">
                                <div className="flex flex-col sm:flex-row gap-4">
                                  {/* Image thumbnail */}
                                  <div className="relative sm:w-48 h-32 sm:h-auto overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex-shrink-0">
                                    <img
                                      src={event.imageUrl}
                                      alt={event.title}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                      onError={(e) => {
                                        e.currentTarget.src = '/CIE Design.png';
                                        e.currentTarget.onerror = null;
                                      }}
                                      loading="lazy"
                                    />
                                  </div>

                                  <div className="flex-1 p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getCategoryBadge(event.category)}`}>
                                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                          {event.category.replace('-', ' ').toUpperCase()}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                                          <Clock className="h-3 w-3" />
                                          <time dateTime={event.date}>{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                                        </div>
                                      </div>
                                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                                        {event.title}
                                      </h3>
                                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                                        {event.description || 'Explore this activity by CIES.'}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => setSelectedId(event.id)}
                                      className="rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:bg-blue-500 hover:text-white whitespace-nowrap shadow-sm flex items-center gap-2"
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
            <div id="event-dialog" role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <div className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />
              <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl">
                <div className="relative">
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-6 py-4">
                    <div>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getCategoryBadge(selected.category)}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {selected.category.replace('-', ' ').toUpperCase()}
                      </span>
                      <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                        {selected.title}
                      </h2>
                    </div>
                    <button
                      onClick={close}
                      className="rounded-full bg-slate-100 dark:bg-slate-800/80 p-2 text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white backdrop-blur shadow-sm"
                      aria-label="Close"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {/* Info sections first - events style */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700 shadow-sm">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Date</div>
                          <div className="font-medium text-slate-900 dark:text-slate-200">{new Date(selected.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 dark:bg-slate-800/50 border border-green-200 dark:border-slate-700 shadow-sm">
                        <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Location</div>
                          <div className="font-medium text-slate-900 dark:text-slate-200">{selected.location || 'IIT Jodhpur Campus'}</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">About this Event</h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {selected.description ||
                            'Join us for this exciting event organized by the Civil & Infrastructure Engineering Society. This activity is part of our commitment to fostering knowledge sharing and professional development in the field of civil engineering. More details will be announced soon. Stay tuned!'}
                        </p>
                      </div>
                    </div>

                    {/* Photos section at bottom - click to open zoom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div
                        className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-slate-100 dark:bg-slate-800"
                        onClick={() => setSelectedPhotoIndex(0)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setSelectedPhotoIndex(0)}
                        aria-label="View photo 1"
                      >
                        <img
                          src={selected.imageUrl}
                          alt={selected.title}
                          className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          style={{ objectPosition: 'center center', minHeight: '192px' }}
                          onError={(e) => {
                            e.currentTarget.src = '/CIE Design.png';
                            e.currentTarget.onerror = null;
                          }}
                          loading="lazy"
                        />
                      </div>
                      {selected.images?.map((url, idx) => (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-slate-100 dark:bg-slate-800"
                          onClick={() => setSelectedPhotoIndex(idx + 1)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && setSelectedPhotoIndex(idx + 1)}
                          aria-label={`View photo ${idx + 2}`}
                        >
                          <img
                            src={url}
                            alt={`${selected.title} – ${idx + 2}`}
                            className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            style={{ objectPosition: 'center center', minHeight: '192px' }}
                            onError={(e) => {
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
            <div className="fixed inset-0 flex items-center justify-center p-4 z-[60]" style={{ zIndex: 60 }}>
              <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-hidden="true"
              />
              <div className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center">
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="absolute top-4 right-4 z-10 rounded-full bg-transparent p-3 text-white transition-all hover:bg-white/10"
                  aria-label="Close"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <img
                  src={selectedAllPhotos[selectedPhotoIndex]}
                  alt={`${selected.title} – ${selectedPhotoIndex + 1}`}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                  style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.src = '/CIE Design.png';
                    e.currentTarget.onerror = null;
                  }}
                  onClick={(e) => e.stopPropagation()}
                />

                {selectedPhotoIndex > 0 && (
                  <button
                    onClick={(e) => {
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhotoIndex(selectedPhotoIndex + 1);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-3 text-white transition-all hover:bg-white/10"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
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


