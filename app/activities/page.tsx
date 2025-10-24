'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { formatDateShort, generateICS } from '@/lib/utils';
import AppLayout from '@/components/layout/AppLayout';
import { Calendar, Clock, MapPin, Filter, Grid, List, Users, Award, BookOpen, Hammer, Building2, TrendingUp, Sparkles } from 'lucide-react';

export default function ActivitiesPage() {
  const categories = ['all', 'upcoming', 'workshop', 'seminar', 'site-visit', 'competition', 'edificio'];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  type GalleryItem = {
    id: string;
    title: string;
    date: string;
    category: 'workshop' | 'seminar' | 'site-visit' | 'competition' | 'edificio' | 'other';
    imageUrl: string;
    colorUrl?: string; // full-color image for peel effect
    status?: 'completed' | 'upcoming' | 'ongoing';
  };

  const items: GalleryItem[] = useMemo(
    () => [
      // May
      {
        id: '1',
        title: 'Research Presentation (P21CI002) - Saran Kumar Aatrey',
        date: '2025-05-09',
        category: 'seminar',
        imageUrl: '/CIE Design.png',
      },
      {
        id: '2',
        title: 'Research Presentation (D20CI003) - Aparna Singh',
        date: '2025-05-23',
        category: 'seminar',
        imageUrl: '/logo.jpg',
      },
      // June
      {
        id: '3',
        title: 'Research Presentation (D20CI002) - Pranav Suraswat',
        date: '2025-06-06',
        category: 'seminar',
        imageUrl: '/iitj-logo.png',
      },
      {
        id: '4',
        title: 'Seminar/Talk by Experts (Prof. Ravindra Gettu)',
        date: '2025-06-10',
        category: 'seminar',
        imageUrl: '/CIE Design.png',
      },
      {
        id: '5',
        title: 'Seminar/Talk by Experts (Prof. Jitesh Monhot)',
        date: '2025-06-27',
        category: 'seminar',
        imageUrl: '/logo.jpg',
      },
      // July
      {
        id: '6',
        title: 'Research Presentation (D20CI003) - Sumrita Rathi',
        date: '2025-07-09',
        category: 'seminar',
        imageUrl: '/iitj-logo.png',
      },
      {
        id: '7',
        title: 'Research Presentation (D20CI051) - Shubham Bhakar',
        date: '2025-07-23',
        category: 'seminar',
        imageUrl: '/CIE Design.png',
      },
      // August
      {
        id: '8',
        title: 'Presentation (P21CI011) - Anand Kumar',
        date: '2025-08-13',
        category: 'seminar',
        imageUrl: '/logo.jpg',
      },
      {
        id: '9',
        title: 'Merchandise Release for Students, Staff and Faculties',
        date: '2025-08-12',
        category: 'other',
        imageUrl: '/iitj-logo.png',
      },
      {
        id: '10',
        title: 'Freshers (PG)',
        date: '2025-08-31',
        category: 'edificio',
        imageUrl: '',
      },
      // September
      {
        id: '11',
        title: 'Teacher\'s Day (Community Gathering/Sports Event)',
        date: '2025-09-05',
        category: 'other',
        imageUrl: '/Other images/DSC01359.JPG',
      },
      {
        id: '12',
        title: 'Engineer\'s Day',
        date: '2025-09-15',
        category: 'other',
        imageUrl: '/Other images/1757908205139.jpeg',
      },
      {
        id: '13',
        title: 'Research Presentation (P21CI002) - Ananya Srivastava',
        date: '2025-09-15',
        category: 'seminar',
        imageUrl: '/CIE Design.png',
      },
      {
        id: '14',
        title: 'Research Presentation (P21CI003) - Ashish Gupta',
        date: '2025-09-19',
        category: 'seminar',
        imageUrl: '/logo.jpg',
      },
      {
        id: '15',
        title: 'Industry Day (No Event)',
        date: '2025-09-26',
        category: 'seminar',
        imageUrl: '/iitj-logo.png',
      },
      {
        id: '16',
        title: 'Online Talk by Prof. Rajhaman',
        date: '2025-09-27',
        category: 'seminar',
        imageUrl: '/CIE Design.png',
      },
      // October
      {
        id: '17',
        title: 'Freshers (UG)',
        date: '2025-10-05',
        category: 'edificio',
        imageUrl: '/Other images/abba8bc8-136f-4b63-aa87-af5b605cd971.jpeg',
      },
      {
        id: '18',
        title: 'Sports Event (Dusshera)',
        date: '2025-10-02',
        category: 'competition',
        imageUrl: '/iitj-logo.png',
      },
      {
        id: '19',
        title: 'Guest Lecture by Prof. Ligy (IITM)',
        date: '2025-10-13',
        category: 'seminar',
        imageUrl: '/Other images/1759303624829.jpeg',
      },
      {
        id: '20',
        title: 'Research Presentation (P21CI005) - Keshav Saini',
        date: '2025-10-10',
        category: 'seminar',
        imageUrl: '/logo.jpg',
      },
      {
        id: '21',
        title: 'Workshop on Geospatial (Compulsory for Geoinformatics Students)',
        date: '2025-10-11',
        category: 'workshop',
        imageUrl: '/Other images/PXL_20251011_075907856.jpg',
      },
      {
        id: '22',
        title: 'Diwali Celebration',
        date: '2025-10-14',
        category: 'other',
        imageUrl: '/Other images/DSC03840.JPG',
      },
      // November
      {
        id: '23',
        title: 'Dr. Abhinav Session',
        date: '2025-11-01',
        category: 'seminar',
        imageUrl: '/logo.jpg',
      },
      {
        id: '24',
        title: 'Saturday Stories (UG/PG Seniors) - Dept. Open Mic',
        date: '2025-11-01',
        category: 'other',
        imageUrl: '/iitj-logo.png',
      },
      {
        id: '25',
        title: 'Research Presentation (P21CI006) - Koduru Sandeep',
        date: '2025-11-07',
        category: 'seminar',
        imageUrl: '/CIE Design.png',
      },
      {
        id: '26',
        title: 'Skill Development Session',
        date: '2025-11-14',
        category: 'workshop',
        imageUrl: '/logo.jpg',
      },
      {
        id: '27',
        title: 'Presentation (P21CI007) - Mohit Singh Parihar',
        date: '2025-11-21',
        category: 'seminar',
        imageUrl: '/iitj-logo.png',
      },
      // December
      {
        id: '28',
        title: 'Hackathon/Ideathon Problem Statement Release - EDIFICIO',
        date: '2025-12-01',
        category: 'edificio',
        imageUrl: '/CIE Design.png',
      },
      {
        id: '29',
        title: 'Research Presentation (P21CI009) - Santosh Bisayi',
        date: '2025-12-05',
        category: 'seminar',
        imageUrl: '/logo.jpg',
      },
      {
        id: '30',
        title: 'Hackathon & Ideathon Registration Close - EDIFICIO',
        date: '2025-12-10',
        category: 'edificio',
        imageUrl: '/iitj-logo.png',
      },
      {
        id: '31',
        title: 'Alumni Connect Online Edition (B20/B21)',
        date: '2025-12-20',
        category: 'other',
        imageUrl: '/CIE Design.png',
      },
      {
        id: '32',
        title: 'Seminar/Talk by Experts',
        date: '2025-12-12',
        category: 'seminar',
        imageUrl: '/logo.jpg',
      },
      {
        id: '33',
        title: 'Research Presentation (P21CI010) - Shahiq Ahmad Wani',
        date: '2025-12-19',
        category: 'seminar',
        imageUrl: '/iitj-logo.png',
      },
      // January
      {
        id: '34',
        title: 'EDIFICIO (CiviQ/Hackathon/Ideathon/Bridge Making)',
        date: '2026-01-05',
        category: 'edificio',
        imageUrl: '/CIE Design.png',
      },
      {
        id: '35',
        title: 'Research Presentation (P21CI011) - Sriram Monika devi',
        date: '2026-01-09',
        category: 'seminar',
        imageUrl: '/logo.jpg',
      },
      {
        id: '36',
        title: 'Interaction with New PG Students/Orientation',
        date: '2026-01-09',
        category: 'other',
        imageUrl: '/iitj-logo.png',
      },
      {
        id: '37',
        title: 'Sports Event',
        date: '2026-01-11',
        category: 'competition',
        imageUrl: '/CIE Design.png',
      },
      {
        id: '38',
        title: 'Research Scholars Day',
        date: '2026-01-17',
        category: 'other',
        imageUrl: '/logo.jpg',
      },
      {
        id: '39',
        title: 'Basanth Panchami',
        date: '2026-01-29',
        category: 'other',
        imageUrl: '/iitj-logo.png',
      },
      // February
      {
        id: '40',
        title: 'Research Presentation (D21CI051) - Vijesh Prajapat',
        date: '2026-02-06',
        category: 'seminar',
        imageUrl: '/CIE Design.png',
      },
      {
        id: '41',
        title: 'Seminar/Talk by Experts',
        date: '2026-02-13',
        category: 'seminar',
        imageUrl: '/logo.jpg',
      },
      {
        id: '42',
        title: 'Skill Development Workshop',
        date: '2026-02-20',
        category: 'workshop',
        imageUrl: '/iitj-logo.png',
      },
      // March
      {
        id: '43',
        title: 'Seniors Talk',
        date: '2026-03-02',
        category: 'seminar',
        imageUrl: '/CIE Design.png',
      },
      {
        id: '44',
        title: 'Research Presentation (P22CI001) - Ankit Kumar Maurya',
        date: '2026-03-13',
        category: 'seminar',
        imageUrl: '/logo.jpg',
      },
      {
        id: '45',
        title: 'Industry Visit',
        date: '2026-03-20',
        category: 'site-visit',
        imageUrl: '/iitj-logo.png',
      },
      {
        id: '46',
        title: 'Research Presentation (P22CI002) - Mayank Tiwari',
        date: '2026-03-27',
        category: 'seminar',
        imageUrl: '/CIE Design.png',
      },
      // April
      {
        id: '47',
        title: 'Farewell',
        date: '2026-04-05',
        category: 'other',
        imageUrl: '/logo.jpg',
      },
      {
        id: '48',
        title: 'Research Presentation (P22CI003) - Sumit',
        date: '2026-04-10',
        category: 'seminar',
        imageUrl: '/iitj-logo.png',
      },
      {
        id: '49',
        title: 'Seminar/Talk by Experts',
        date: '2026-04-15',
        category: 'seminar',
        imageUrl: '/CIE Design.png',
      },
    ],
    []
  );

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

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(() => items.find(i => i.id === selectedId) || null, [items, selectedId]);
  const close = () => setSelectedId(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selected]);

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

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: JSX.Element } = {
      workshop: <Hammer className="h-5 w-5" />,
      seminar: <BookOpen className="h-5 w-5" />,
      'site-visit': <Building2 className="h-5 w-5" />,
      competition: <Award className="h-5 w-5" />,
      edificio: <TrendingUp className="h-5 w-5" />,
      other: <Sparkles className="h-5 w-5" />,
    };
    return icons[category] || icons.other;
  };

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

  // Get event status based on date
  const getEventStatus = (date: string): 'completed' | 'upcoming' | 'ongoing' => {
    const eventDate = new Date(date);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    
    if (eventDay < today) return 'completed';
    if (eventDay.getTime() === today.getTime()) return 'ongoing';
    return 'upcoming';
  };

  // Get status badge styling
  const getStatusBadge = (status: 'completed' | 'upcoming' | 'ongoing') => {
    const badges = {
      completed: 'bg-gradient-to-r from-slate-500/30 to-slate-600/30 border border-slate-400/70 text-slate-100 dark:from-cyan-500/30 dark:to-blue-500/30 dark:border-cyan-400/70 dark:text-cyan-100',
      upcoming: 'bg-gradient-to-r from-slate-500/30 to-slate-600/30 border border-slate-400/70 text-slate-100 shadow-lg shadow-slate-500/30 dark:from-cyan-500/30 dark:to-blue-500/30 dark:border-cyan-400/70 dark:text-cyan-100 dark:shadow-cyan-500/30',
      ongoing: 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-400/70 text-amber-100 shadow-lg shadow-amber-500/30'
    };
    return badges[status];
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 relative transition-colors duration-300">
        {/* Animated background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,100,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,255,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(100,100,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-400/10 dark:bg-blue-500/5 blur-3xl animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-purple-400/10 dark:bg-purple-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

        <main className="pt-20">
          {/* Hero Section - Cleaner & Modern */}
          <section className="relative px-6 py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-400/40 bg-slate-500/10 dark:border-blue-500/30 dark:bg-blue-500/10 px-4 py-2 text-sm text-slate-700 dark:text-blue-300 backdrop-blur-sm shadow-sm">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Academic Year 2025-26</span>
                </div>
                <h1 className="text-5xl font-bold tracking-tight md:text-7xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                  Activities & Events
                </h1>
                <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-300">
                  Explore our calendar of workshops, seminars, competitions, site visits, and EDIFICIO initiatives throughout the year.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-4xl mx-auto">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-4 text-center backdrop-blur shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-slate-700 dark:text-blue-400">{items.length}</div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-300">Total Events</div>
                </div>
                <div className="rounded-xl border border-purple-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-4 text-center backdrop-blur shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{items.filter(i => i.category === 'seminar').length}</div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-300">Seminars</div>
                </div>
                <div className="rounded-xl border border-green-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-4 text-center backdrop-blur shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{items.filter(i => i.category === 'workshop').length}</div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-300">Workshops</div>
                </div>
                <div className="rounded-xl border border-amber-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-4 text-center backdrop-blur shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-amber-600 dark:text-yellow-400">{items.filter(i => i.category === 'edificio').length}</div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-300">EDIFICIO</div>
                </div>
              </div>
            </div>
          </section>

          {/* Filter Bar - Sticky & Modern */}
          <div className="sticky top-16 z-30 border-y border-slate-200 dark:border-slate-800/50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-sm">
            <div className="mx-auto max-w-7xl px-6 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter className="h-4 w-4 text-slate-400 dark:text-slate-300" />
                  <span className="text-sm text-slate-500 dark:text-slate-300 font-medium">Filter:</span>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        activeCategory === cat
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20'
                          : 'bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {cat === 'all' ? 'All Events' : cat.replace('-', ' ').replace(/^./, s => s.toUpperCase())}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 dark:text-slate-300 font-medium">View:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`rounded-lg p-2 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`rounded-lg p-2 transition-all ${
                      viewMode === 'timeline'
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
              <section className="px-6 py-12 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/5">
                <div className="mx-auto max-w-7xl">
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-slate-600 dark:from-blue-400 dark:via-cyan-400 dark:to-slate-400 bg-clip-text text-transparent">
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
                        className="group relative rounded-2xl border-2 border-blue-200 dark:border-blue-500/30 bg-white dark:bg-slate-900/80 overflow-hidden backdrop-blur transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/30 dark:hover:shadow-blue-500/20 hover:border-blue-400 dark:hover:border-blue-500/60 shadow-lg"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        {/* Spotlight effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-slate-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Featured badge */}
                        <div className="absolute top-0 right-0 z-10">
                          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-bl-xl rounded-tr-xl text-xs font-bold shadow-lg flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                            NEW
                          </div>
                        </div>

                        {/* Status badge */}
                        <div className="absolute top-0 left-0 z-10">
                          <span className={`px-3 py-1.5 rounded-br-xl rounded-tl-xl text-xs font-semibold backdrop-blur-sm ${getStatusBadge(getEventStatus(event.date))}`}>
                            {getEventStatus(event.date) === 'completed' ? 'Completed' : 
                             getEventStatus(event.date) === 'ongoing' ? 'Live Now' : 'Upcoming'}
                          </span>
                        </div>

                        {/* Image Section */}
                        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                          <img 
                            src={event.imageUrl} 
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.src = '/CIE Design.png';
                              e.currentTarget.onerror = null;
                            }}
                            loading="eager"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(event.category)} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <span className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-bold ${getCategoryBadge(event.category)}`}>
                              {getCategoryIcon(event.category)}
                              {event.category.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>

                          {/* Title overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 drop-shadow-2xl shadow-black/50">
                              {event.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-white/95 drop-shadow-lg">
                              <Calendar className="h-4 w-4" />
                              <time dateTime={event.date}>{formatDateShort(event.date)}</time>
                            </div>
                          </div>
                        </div>
                      
                        <div className="relative p-5">
                          {/* Action Button */}
                          <button
                            onClick={() => setSelectedId(event.id)}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-600 to-slate-600 hover:from-blue-600 hover:via-cyan-700 hover:to-slate-700 py-3 text-sm font-bold text-white transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
                          >
                            <Award className="h-4 w-4" />
                            Explore Event
                          </button>
                        </div>

                        {/* Decorative corner accent */}
                        <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 dark:opacity-20 pointer-events-none">
                          <Sparkles className="w-full h-full text-blue-500" />
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
                  {filteredItems.map((card) => {
                    return (
                      <article
                        key={card.id}
                        className="group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500/50 shadow-sm"
                      >
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                          <img 
                            src={card.imageUrl} 
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.src = '/CIE Design.png';
                              e.currentTarget.onerror = null;
                            }}
                            loading="lazy"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(card.category)} opacity-15 group-hover:opacity-25 transition-opacity duration-300`} />
                          
                          {/* Status badge */}
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(getEventStatus(card.date))}`}>
                              {getEventStatus(card.date) === 'completed' ? 'Completed' : 
                               getEventStatus(card.date) === 'ongoing' ? 'Live Now' : 'Upcoming'}
                            </span>
                          </div>
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${getCategoryBadge(card.category)}`}>
                              {getCategoryIcon(card.category)}
                              {card.category.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>

                          {/* Title overlay on image */}
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-base font-bold text-white mb-1 line-clamp-2 drop-shadow-2xl shadow-black/50">
                              {card.title}
                            </h3>
                          </div>
                        </div>
                      
                        <div className="relative p-5">
                          {/* Date */}
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300 mb-4">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={card.date}>{formatDateShort(card.date)}</time>
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() => setSelectedId(card.id)}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 py-2.5 text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg hover:shadow-slate-500/30 dark:hover:shadow-blue-500/30"
                          >
                            <MapPin className="h-4 w-4" />
                            View Details
                          </button>
                        </div>

                      </article>
                    );
                  })}
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
                                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(event.category)} opacity-20`} />
                                  </div>

                                  <div className="flex-1 p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getCategoryBadge(event.category)}`}>
                                          {getCategoryIcon(event.category)}
                                          {event.category.replace('-', ' ').toUpperCase()}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(getEventStatus(event.date))}`}>
                                          {getEventStatus(event.date) === 'completed' ? 'Completed' : 
                                           getEventStatus(event.date) === 'ongoing' ? 'Live Now' : 'Upcoming'}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300">
                                          <Clock className="h-3 w-3" />
                                          <time dateTime={event.date}>{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                                        </div>
                                      </div>
                                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-slate-700 dark:group-hover:text-blue-400 transition-colors">
                                        {event.title}
                                      </h3>
                                    </div>
                                    <button
                                      onClick={() => setSelectedId(event.id)}
                                      className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 px-5 py-2 text-sm font-semibold text-white transition-all whitespace-nowrap shadow-md hover:shadow-lg"
                                    >
                                      <MapPin className="h-4 w-4" />
                                      View Details
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

          {/* Modern Modal Dialog */}
          {selected && (
            <div id="event-dialog" role="dialog" aria-modal="true" className="fixed inset-0 flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 50 }}>
              <div className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />
              <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl">
                {/* Featured Image Header */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                  <img 
                    src={selected.imageUrl} 
                    alt={selected.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/CIE Design.png';
                      e.currentTarget.onerror = null;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(selected.category)} opacity-20`} />
                  
                  {/* Close button */}
                  <button
                    onClick={close}
                    className="absolute right-4 top-4 rounded-full bg-white/10 backdrop-blur-sm p-2.5 text-white transition-all hover:bg-white/20 shadow-lg z-10"
                    aria-label="Close"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${getCategoryBadge(selected.category)}`}>
                      {getCategoryIcon(selected.category)}
                      {selected.category.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Status badge */}
                  <div className="absolute top-16 right-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatusBadge(getEventStatus(selected.date))}`}>
                      {getEventStatus(selected.date) === 'completed' ? 'Completed' : 
                       getEventStatus(selected.date) === 'ongoing' ? 'Live Now' : 'Upcoming'}
                    </span>
                  </div>

                  {/* Title at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                      {selected.title}
                    </h2>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative">

                  {/* Body */}
                  <div className="p-6 space-y-5 max-h-[50vh] overflow-y-auto">
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Date & Time */}
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-blue-500/10 dark:to-blue-500/5 border border-slate-200 dark:border-blue-500/20 shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-2 rounded-lg bg-slate-800 dark:bg-blue-500 text-white">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-slate-700 dark:text-blue-400">Event Date</div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">{formatDateShort(selected.date)}</div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-500/10 dark:to-green-500/5 border border-green-200 dark:border-green-500/20 shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-2 rounded-lg bg-green-500 text-white">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-green-600 dark:text-green-400">Location</div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">IIT Jodhpur</div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-800/30 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <BookOpen className="h-5 w-5 text-slate-500 dark:text-slate-300 mt-0.5" />
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">About this Event</h3>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        Join us for this exciting event organized by the Civil & Infrastructure Engineering Society. 
                        This activity is part of our commitment to fostering knowledge sharing and professional development 
                        in the field of civil engineering. More details will be announced soon. Stay tuned!
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          const ics = generateICS({
                            title: selected.title,
                            description: `${selected.title} — CIES IITJ`,
                            location: 'IIT Jodhpur',
                            start: selected.date,
                          });
                          const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${selected.title.replace(/\s+/g, '_')}.ics`;
                          document.body.appendChild(a);
                          a.click();
                          a.remove();
                          URL.revokeObjectURL(url);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 px-6 py-3 font-semibold text-white transition-all shadow-lg hover:shadow-xl shadow-slate-500/30 dark:shadow-blue-500/30"
                      >
                        <Calendar className="h-5 w-5" />
                        Add to Calendar
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md">
                        <Users className="h-5 w-5" />
                        Share Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </AppLayout>
  );
}


