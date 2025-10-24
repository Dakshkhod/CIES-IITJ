'use client';

import React, { useMemo, useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Calendar, Clock, MapPin, Users, Camera, ChevronRight, Filter, Grid, List } from 'lucide-react';

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{ eventId: string; photoIndex: number } | null>(null);

  const categories = ['all', 'orientation', 'celebration', 'academic', 'cultural', 'workshop'];

  type EventItem = {
    id: string;
    title: string;
    date: string;
    category: 'orientation' | 'celebration' | 'academic' | 'cultural' | 'workshop';
    description: string;
    location: string;
    attendees?: string;
    photos: string[];
    status: 'completed' | 'upcoming';
  };

  const events: EventItem[] = useMemo(
    () => [
      {
        id: '1',
        title: 'Orientation of Batch 25 (PG)',
        date: '2025-07-15',
        category: 'orientation',
        description: 'Welcome session for new postgraduate students joining the Civil & Infrastructure Engineering program.',
        location: 'IIT Jodhpur Campus',
        attendees: '50+ Students',
        photos: [],
        status: 'completed'
      },
      {
        id: '2',
        title: 'Orientation of Batch 25 (UG)',
        date: '2025-07-20',
        category: 'orientation',
        description: 'Welcome session for new undergraduate students joining the Civil & Infrastructure Engineering program.',
        location: 'IIT Jodhpur Campus',
        attendees: '100+ Students',
        photos: ['/Other images/WhatsApp Image 2025-10-24 at 14.29.02.jpeg'],
        status: 'completed'
      },
      {
        id: '3',
        title: 'Merchandise Release for Students, Staff and Faculties',
        date: '2025-08-12',
        category: 'celebration',
        description: 'Launch of new CIES merchandise including t-shirts, hoodies, and accessories for the CIES community.',
        location: 'CIES Office',
        attendees: '200+ Members',
        photos: ['/logo.jpg', '/CIE Design.png'],
        status: 'completed'
      },
      {
        id: '4',
        title: 'Freshers (PG)',
        date: '2025-08-31',
        category: 'cultural',
        description: 'Welcome party for postgraduate students with cultural performances, games, and networking.',
        location: 'IIT Jodhpur Auditorium',
        attendees: '60+ Students',
        photos: [],
        status: 'completed'
      },
      {
        id: '5',
        title: 'Teacher\'s Day (Community Gathering/Sports Event)',
        date: '2025-09-05',
        category: 'celebration',
        description: 'Annual celebration honoring our faculty members with sports activities and community gathering.',
        location: 'IIT Jodhpur Sports Complex',
        attendees: '150+ Faculty & Students',
        photos: ['/Other images/DSC01359.JPG'],
        status: 'completed'
      },
      {
        id: '6',
        title: 'Engineer\'s Day',
        date: '2025-09-15',
        category: 'celebration',
        description: 'Celebration of engineering excellence with technical talks, competitions, and recognition of outstanding engineers.',
        location: 'IIT Jodhpur Campus',
        attendees: '200+ Engineers',
        photos: ['/Other images/1757908205139.jpeg', '/Other images/1757908205720.jpeg'],
        status: 'completed'
      },
      {
        id: '7',
        title: 'Freshers (UG)',
        date: '2025-10-05',
        category: 'cultural',
        description: 'Welcome celebration for undergraduate students featuring cultural performances and interactive sessions.',
        location: 'IIT Jodhpur Auditorium',
        attendees: '120+ Students',
        photos: ['/Other images/abba8bc8-136f-4b63-aa87-af5b605cd971.jpeg'],
        status: 'completed'
      },
      {
        id: '8',
        title: 'Guest Lecture by Prof. Ligy (IITM)',
        date: '2025-10-13',
        category: 'academic',
        description: 'Expert lecture on advanced topics in civil engineering by distinguished professor from IIT Madras.',
        location: 'IIT Jodhpur Lecture Hall',
        attendees: '80+ Students & Faculty',
        photos: ['/Other images/1759303624829.jpeg', '/Other images/1760253687978.jpeg'],
        status: 'completed'
      },
      {
        id: '9',
        title: 'Workshop on Geospatial (Compulsory for Geoinformatics Students)',
        date: '2025-10-11',
        category: 'workshop',
        description: 'Hands-on workshop covering geospatial technologies, GIS applications, and remote sensing techniques.',
        location: 'IIT Jodhpur Computer Lab',
        attendees: '40+ Students',
        photos: ['/Other images/PXL_20251011_075907856.jpg'],
        status: 'completed'
      },
      {
        id: '10',
        title: 'Diwali Celebration',
        date: '2025-10-14',
        category: 'cultural',
        description: 'Festive celebration of Diwali with traditional decorations, sweets, and cultural performances.',
        location: 'IIT Jodhpur Campus',
        attendees: '300+ Community Members',
        photos: ['/Other images/DSC03840.JPG'],
        status: 'completed'
      }
    ],
    []
  );

  const filteredEvents = useMemo(() => {
    if (activeCategory === 'all') return events;
    return events.filter(event => event.category === activeCategory);
  }, [activeCategory, events]);

  const selected = useMemo(() => events.find(e => e.id === selectedEvent) || null, [events, selectedEvent]);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (selected || selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selected, selectedPhoto]);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      orientation: 'from-blue-500 to-cyan-500',
      celebration: 'from-purple-500 to-pink-500',
      academic: 'from-green-500 to-emerald-500',
      cultural: 'from-orange-500 to-red-500',
      workshop: 'from-yellow-500 to-amber-500',
    };
    return colors[category] || 'from-slate-500 to-gray-500';
  };

  const getCategoryBadge = (category: string) => {
    const badges: { [key: string]: string } = {
      orientation: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-500/30',
      celebration: 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-500/30',
      academic: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-300 dark:border-green-500/30',
      cultural: 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-500/30',
      workshop: 'bg-amber-100 dark:bg-yellow-500/20 text-amber-700 dark:text-yellow-300 border-amber-300 dark:border-yellow-500/30',
    };
    return badges[category] || 'bg-slate-100 dark:bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-500/30';
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
          {/* Hero Section */}
          <section className="relative px-6 py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-400/40 dark:border-blue-500/30 bg-slate-500/10 dark:bg-blue-500/10 px-4 py-2 text-sm text-slate-700 dark:text-blue-300 backdrop-blur-sm shadow-sm">
                  <Camera className="h-4 w-4" />
                  <span className="font-medium">Events Gallery 2025</span>
                </div>
                <h1 className="text-5xl font-bold tracking-tight md:text-7xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                  Past Events
                </h1>
                <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                  Relive the memorable moments from our events throughout 2025. Browse through photos and stories from our community gatherings.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-4xl mx-auto">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-4 text-center backdrop-blur shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-slate-700 dark:text-blue-400">{events.length}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Total Events</div>
                </div>
                <div className="rounded-xl border border-purple-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-4 text-center backdrop-blur shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{events.filter(e => e.category === 'cultural').length}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Cultural Events</div>
                </div>
                <div className="rounded-xl border border-green-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-4 text-center backdrop-blur shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{events.filter(e => e.category === 'academic').length}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Academic Events</div>
                </div>
                <div className="rounded-xl border border-amber-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-4 text-center backdrop-blur shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-amber-600 dark:text-yellow-400">{events.filter(e => e.category === 'celebration').length}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Celebrations</div>
                </div>
              </div>
            </div>
          </section>

          {/* Filter Bar */}
          <div className="sticky top-16 z-30 border-y border-slate-200 dark:border-slate-800/50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-sm" style={{ zIndex: 30 }}>
            <div className="mx-auto max-w-7xl px-6 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Filter:</span>
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
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">View:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`rounded-lg p-2 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
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
                        : 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                    }`}
                    aria-label="Timeline view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Events Display */}
          <section className="px-6 py-12">
            <div className="mx-auto max-w-7xl">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-20">
                  <Camera className="h-16 w-16 mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400">No events found</h3>
                  <p className="text-slate-500 dark:text-slate-500 mt-2">Try adjusting your filters</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map(event => (
                    <article
                      key={event.id}
                      className="group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500/50 shadow-sm"
                    >
                      {/* Event Image */}
                      <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img 
                          src={event.photos[0]} 
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{ 
                            objectPosition: 'center center',
                            objectFit: 'cover',
                            minHeight: '224px' // Ensure consistent height
                          }}
                          onError={(e) => {
                            // Fallback to a default image if the photo fails to load
                            e.currentTarget.src = '/logo.jpg';
                            e.currentTarget.onerror = null; // Prevent infinite loop
                          }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getCategoryBadge(event.category)}`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {event.category.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-white/90">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={event.date}>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
                          </div>
                        </div>
                        {/* Photo count indicator */}
                        {event.photos.length > 1 && (
                          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                            +{event.photos.length - 1} more
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          {event.attendees && (
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <Users className="h-4 w-4" />
                              <span>{event.attendees}</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedEvent(event.id)}
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
                  {Object.entries(
                    filteredEvents.reduce((groups, event) => {
                      const month = new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                      if (!groups[month]) groups[month] = [];
                      groups[month].push(event);
                      return groups;
                    }, {} as { [key: string]: typeof filteredEvents })
                  ).map(([month, monthEvents]) => (
                    <div key={month} className="relative">
                      <div className="sticky top-32 z-10 mb-6 flex items-center gap-4">
                        <div className="rounded-xl border border-blue-400/40 dark:border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/10 px-6 py-3 backdrop-blur-sm shadow-sm">
                          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300">{month}</h2>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-blue-400/30 dark:from-blue-500/30 to-transparent" />
                      </div>

                      <div className="space-y-4 pl-4 border-l-2 border-slate-300 dark:border-slate-800">
                        {monthEvents.map((event) => (
                          <div key={event.id} className="relative pl-8 pb-8 group">
                            <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 bg-gradient-to-br ${getCategoryColor(event.category)} group-hover:scale-125 transition-transform shadow-sm`} />
                            
                            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 backdrop-blur transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 shadow-sm">
                              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getCategoryBadge(event.category)}`}>
                                      {event.category.replace('-', ' ').toUpperCase()}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                                      <Clock className="h-3 w-3" />
                                      <time dateTime={event.date}>{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</time>
                                    </div>
                                  </div>
                                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                                    {event.title}
                                  </h3>
                                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                    {event.description}
                                  </p>
                                </div>
                                <button
                                  onClick={() => setSelectedEvent(event.id)}
                                  className="rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:bg-blue-500 hover:text-white whitespace-nowrap shadow-sm flex items-center gap-2"
                                >
                                  <Camera className="h-4 w-4" />
                                  View Photos
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Photo Gallery Modal */}
          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 50 }}>
              <div className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} aria-hidden="true" />
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
                      onClick={() => setSelectedEvent(null)}
                      className="rounded-full bg-slate-100 dark:bg-slate-800/80 p-2 text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white backdrop-blur shadow-sm"
                      aria-label="Close"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selected.photos.map((photo, index) => (
                        <div 
                          key={index} 
                          className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-slate-100 dark:bg-slate-800"
                          onClick={() => setSelectedPhoto({ eventId: selected.id, photoIndex: index })}
                        >
                          <img 
                            src={photo} 
                            alt={`${selected.title} - Photo ${index + 1}`}
                            className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            style={{ 
                              objectPosition: 'center center',
                              minHeight: '192px' // Ensure consistent height
                            }}
                            onError={(e) => {
                              e.currentTarget.src = '/logo.jpg';
                              e.currentTarget.onerror = null;
                            }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/90 dark:bg-black/90 rounded-full p-2">
                                <Camera className="h-5 w-5 text-slate-700 dark:text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-4">
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
                          <div className="font-medium text-slate-900 dark:text-slate-200">{selected.location}</div>
                        </div>
                      </div>

                      {selected.attendees && (
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-50 dark:bg-slate-800/50 border border-purple-200 dark:border-slate-700 shadow-sm">
                          <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          <div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Attendees</div>
                            <div className="font-medium text-slate-900 dark:text-slate-200">{selected.attendees}</div>
                          </div>
                        </div>
                      )}

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {selected.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Photo Expansion Modal */}
          {selectedPhoto && (
            <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 60 }}>
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedPhoto(null)} aria-hidden="true" />
              <div className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-10 rounded-full bg-white/10 backdrop-blur-sm p-3 text-white transition-all hover:bg-white/20"
                  aria-label="Close"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {selectedPhoto && (
                  <img 
                    src={events.find(e => e.id === selectedPhoto.eventId)?.photos[selectedPhoto.photoIndex]} 
                    alt={`${events.find(e => e.id === selectedPhoto.eventId)?.title} - Photo ${selectedPhoto.photoIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    style={{
                      maxWidth: '90vw',
                      maxHeight: '90vh',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = '/logo.jpg';
                      e.currentTarget.onerror = null;
                    }}
                  />
                )}
                
                {/* Navigation arrows */}
                {selectedPhoto && (() => {
                  const event = events.find(e => e.id === selectedPhoto.eventId);
                  const currentIndex = selectedPhoto.photoIndex;
                  const totalPhotos = event?.photos.length || 0;
                  
                  return (
                    <>
                      {currentIndex > 0 && (
                        <button
                          onClick={() => setSelectedPhoto({ eventId: selectedPhoto.eventId, photoIndex: currentIndex - 1 })}
                          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-sm p-3 text-white transition-all hover:bg-white/20"
                          aria-label="Previous photo"
                        >
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      )}
                      
                      {currentIndex < totalPhotos - 1 && (
                        <button
                          onClick={() => setSelectedPhoto({ eventId: selectedPhoto.eventId, photoIndex: currentIndex + 1 })}
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-sm p-3 text-white transition-all hover:bg-white/20"
                          aria-label="Next photo"
                        >
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                      
                      {/* Photo counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                        {currentIndex + 1} of {totalPhotos}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </main>
      </div>
    </AppLayout>
  );
}
