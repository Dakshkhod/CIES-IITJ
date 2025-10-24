'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  X,
  Zap,
  Activity,
  Hammer,
  BookOpen,
  Building2,
  Award,
  TrendingUp,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Types
type EventCategory = 'workshop' | 'seminar' | 'site-visit' | 'competition' | 'edificio' | 'research';

interface TimelineEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  description: string;
  location: string;
  attendees?: string;
  speaker?: string;
  images: string[];
}

export default function RoadmapPage() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<EventCategory | 'all'>('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Auto-update current month
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMonth(new Date());
    }, 1000 * 60 * 60); // Update every hour
    
    return () => clearInterval(interval);
  }, []);

  // Events data
  const events: TimelineEvent[] = useMemo(() => [
    {
      id: '1',
      title: 'Research Presentation - Saran Kumar Aatrey',
      category: 'research',
      date: '2025-05-09',
      description: 'Research presentation by P21CI002 on advanced civil engineering methodologies and structural analysis techniques.',
      location: 'IIT Jodhpur Campus',
      attendees: '50+ Faculty & Students',
      speaker: 'Saran Kumar Aatrey (P21CI002)',
      images: ['/CIE Design.png', '/logo.jpg']
    },
    {
      id: '2',
      title: 'Research Presentation - Aparna Singh',
      category: 'research',
      date: '2025-05-23',
      description: 'Doctoral research presentation on innovative methodologies in civil infrastructure.',
      location: 'IIT Jodhpur Campus',
      attendees: '40+ Participants',
      speaker: 'Aparna Singh (D20CI003)',
      images: ['/logo.jpg', '/CIE Design.png']
    },
    {
      id: '3',
      title: 'Seminar by Prof. Ravindra Gettu',
      category: 'seminar',
      date: '2025-06-10',
      description: 'Expert talk on sustainable concrete technology and green building materials for modern infrastructure.',
      location: 'IIT Jodhpur Auditorium',
      attendees: '100+ Attendees',
      speaker: 'Prof. Ravindra Gettu (IIT Madras)',
      images: ['/CIE Design.png']
    },
    {
      id: '4',
      title: 'Seminar by Prof. Jitesh Mohot',
      category: 'seminar',
      date: '2025-06-27',
      description: 'Keynote on modern transportation infrastructure and smart city development.',
      location: 'IIT Jodhpur Lecture Hall',
      attendees: '80+ Participants',
      speaker: 'Prof. Jitesh Mohot',
      images: ['/logo.jpg']
    },
    {
      id: '5',
      title: 'Merchandise Release',
      category: 'edificio',
      date: '2025-08-12',
      description: 'Official CIES merchandise launch for students, staff, and faculty members.',
      location: 'CIES Office',
      attendees: '200+ Community Members',
      images: ['/CIE Design.png', '/logo.jpg']
    },
    {
      id: '6',
      title: 'Freshers Welcome - PG Students',
      category: 'edificio',
      date: '2025-08-31',
      description: 'Orientation and welcome ceremony for incoming postgraduate students.',
      location: 'IIT Jodhpur Auditorium',
      attendees: '60+ Students',
      images: ['/iitj-logo.png']
    },
    {
      id: '7',
      title: 'Teacher\'s Day Celebration',
      category: 'competition',
      date: '2025-09-05',
      description: 'Community gathering and sports events honoring our faculty members.',
      location: 'IIT Jodhpur Sports Complex',
      attendees: '150+ Participants',
      images: ['/Other images/DSC01359.JPG']
    },
    {
      id: '8',
      title: 'Engineer\'s Day',
      category: 'competition',
      date: '2025-09-15',
      description: 'Annual celebration of engineering excellence with technical competitions and exhibitions.',
      location: 'IIT Jodhpur Campus',
      attendees: '200+ Engineers',
      images: ['/Other images/1757908205139.jpeg', '/Other images/1757908205720.jpeg']
    },
    {
      id: '9',
      title: 'Freshers Welcome - UG Students',
      category: 'edificio',
      date: '2025-10-05',
      description: 'Grand orientation and cultural program for undergraduate freshers.',
      location: 'IIT Jodhpur Auditorium',
      attendees: '120+ Students',
      images: ['/Other images/abba8bc8-136f-4b63-aa87-af5b605cd971.jpeg']
    },
    {
      id: '10',
      title: 'Guest Lecture - Prof. Ligy (IIT Madras)',
      category: 'seminar',
      date: '2025-10-13',
      description: 'Expert lecture on cutting-edge research in civil infrastructure.',
      location: 'IIT Jodhpur Lecture Hall',
      attendees: '80+ Attendees',
      speaker: 'Prof. Ligy',
      images: ['/Other images/1759303624829.jpeg', '/Other images/1760253687978.jpeg']
    },
    {
      id: '11',
      title: 'Geospatial Technology Workshop',
      category: 'workshop',
      date: '2025-10-11',
      description: 'Hands-on workshop on GIS applications and remote sensing for civil engineers.',
      location: 'IIT Jodhpur Computer Lab',
      attendees: '40+ Students',
      images: ['/Other images/PXL_20251011_075907856.jpg']
    },
    {
      id: '12',
      title: 'Skill Development Session',
      category: 'workshop',
      date: '2025-11-14',
      description: 'Professional development workshop on essential engineering skills and software tools.',
      location: 'IIT Jodhpur',
      attendees: '50+ Participants',
      images: ['/CIE Design.png']
    },
    {
      id: '13',
      title: 'EDIFICIO - Hackathon & Ideathon',
      category: 'edificio',
      date: '2025-12-01',
      description: 'Annual technical festival featuring hackathon, ideathon, bridge-making competition, and CiviQ quiz.',
      location: 'IIT Jodhpur Campus',
      attendees: '500+ Participants',
      images: ['/CIE Design.png', '/logo.jpg', '/iitj-logo.png']
    },
    {
      id: '14',
      title: 'Alumni Connect Session',
      category: 'seminar',
      date: '2025-12-20',
      description: 'Online edition connecting with B20/B21 alumni for knowledge sharing and networking.',
      location: 'Online',
      attendees: '100+ Alumni',
      images: ['/logo.jpg']
    },
    {
      id: '15',
      title: 'Industry Visit',
      category: 'site-visit',
      date: '2026-03-20',
      description: 'Educational site visit to major civil engineering projects and construction facilities.',
      location: 'To be announced',
      attendees: '60+ Students',
      images: ['/iitj-logo.png']
    },
    {
      id: '16',
      title: 'Farewell Ceremony',
      category: 'edificio',
      date: '2026-04-05',
      description: 'Grand farewell celebration for graduating students with cultural performances.',
      location: 'IIT Jodhpur Auditorium',
      attendees: '300+ Community Members',
      images: ['/CIE Design.png']
    }
  ], []);

  // Sort events by date
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return sortedEvents;
    return sortedEvents.filter(e => e.category === activeFilter);
  }, [sortedEvents, activeFilter]);

  // Check if event is in past, present, or future
  const getEventStatus = (eventDate: string) => {
    const now = new Date();
    const event = new Date(eventDate);
    const daysDiff = Math.floor((event.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < -7) return 'past';
    if (daysDiff > 7) return 'future';
    return 'present';
  };

  // Get current month events
  const currentMonthEvents = useMemo(() => {
    return sortedEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth.getMonth() && 
             eventDate.getFullYear() === currentMonth.getFullYear();
    });
  }, [sortedEvents, currentMonth]);

  // Get month name
  const getCurrentMonthName = () => {
    return currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Category config
  const categoryConfig = {
    workshop: { icon: Hammer, color: 'from-purple-500 to-pink-500', glow: 'shadow-purple-500/50' },
    seminar: { icon: BookOpen, color: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/50' },
    'site-visit': { icon: Building2, color: 'from-green-500 to-emerald-500', glow: 'shadow-green-500/50' },
    competition: { icon: Award, color: 'from-orange-500 to-red-500', glow: 'shadow-orange-500/50' },
    edificio: { icon: TrendingUp, color: 'from-yellow-500 to-amber-500', glow: 'shadow-yellow-500/50' },
    research: { icon: Sparkles, color: 'from-indigo-500 to-violet-500', glow: 'shadow-indigo-500/50' }
  };


  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedEvent) return;
      
      if (e.key === 'Escape') {
        setSelectedEvent(null);
      } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        setCurrentImageIndex(prev => prev - 1);
      } else if (e.key === 'ArrowRight' && selectedEvent.images && currentImageIndex < selectedEvent.images.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent, currentImageIndex]);

  // Reset image index
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedEvent]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
        {/* Static Blueprint Grid Background */}
        <div className="fixed inset-0 opacity-5 dark:opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(250,204,21,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(250,204,21,0.3)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(250,204,21,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(250,204,21,0.15)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        {/* Header */}
        <header className="relative pt-24 pb-16 px-6 z-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className="relative p-4 rounded-xl bg-yellow-500/10 dark:bg-cyan-500/10 border-2 border-yellow-500/40 dark:border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-yellow-500/10 dark:shadow-cyan-500/20"
                >
                  <Zap className="h-8 w-8 text-slate-700 dark:text-cyan-400" />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-yellow-400/20 dark:bg-cyan-400/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  />
                </motion.div>
                <div>
                  <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    Roadmap and Calendar
                  </h1>
                  <p className="text-slate-600 dark:text-cyan-300/70 mt-2 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                     Academic Year 2025-26
                  </p>
                </div>
              </div>

              {/* Time Status Indicator */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-slate-800/50 border border-slate-300 dark:border-cyan-500/30 backdrop-blur-sm shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-cyan-400 animate-pulse" />
                  <span className="text-sm text-slate-700 dark:text-cyan-300 font-medium">System Online</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-slate-800/50 border border-slate-300 dark:border-cyan-500/30 backdrop-blur-sm shadow-sm">
                  <Clock className="h-4 w-4 text-slate-600 dark:text-cyan-400" />
                  <span className="text-sm text-slate-700 dark:text-cyan-300 font-medium">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Timeline Beam with Current Month Events */}
        <section className="relative px-6 py-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-6">
              <motion.h2 
                className="text-3xl font-bold bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {getCurrentMonthName()} Timeline
              </motion.h2>
              <p className="text-slate-600 dark:text-cyan-400/70 mb-3 font-medium">
                {currentMonthEvents.length} {currentMonthEvents.length === 1 ? 'Event' : 'Events'} This Month
              </p>
              {currentMonthEvents.length > 0 && (
                <motion.p 
                  className="text-slate-500 dark:text-cyan-500/60 text-sm flex items-center justify-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="h-4 w-4" />
                  Hover over events for details • Click to view full information
                </motion.p>
              )}
            </div>

            {/* Diagonal Beam - Connecting Line Through Events */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
              {/* Main connecting beam */}
              <motion.div 
                className="w-[150%] h-[2px] bg-gradient-to-r from-transparent via-yellow-400 dark:via-cyan-400 to-transparent relative shadow-[0_0_20px_rgba(250,204,21,0.5)] dark:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                style={{ transform: 'rotate(-8deg) translateY(40%)' }}
              >
                {/* Traveling light */}
                <motion.div
                  className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                  animate={{
                    x: ['-100%', '1000%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1
                  }}
                  style={{
                    filter: 'blur(2px)',
                    boxShadow: '0 0 30px rgba(255,255,255,0.8)'
                  }}
                />
              </motion.div>
              {/* Glow layer */}
              <motion.div 
                className="absolute w-[150%] h-8 bg-gradient-to-r from-transparent via-yellow-400/30 dark:via-cyan-400/30 to-transparent blur-xl"
                style={{ transform: 'rotate(-8deg) translateY(40%)' }}
                animate={{
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>

            {/* Event Nodes Along Timeline */}
            <div className="relative h-[360px]">
              {currentMonthEvents.length > 0 ? (
                currentMonthEvents.map((event, index) => {
                  const config = categoryConfig[event.category];
                  const Icon = config.icon;
                  const status = getEventStatus(event.date);
                  
                  // Position events along the diagonal beam
                  // First event at bottom-left, progressing to top-right
                  const totalEvents = currentMonthEvents.length;
                  const progressPercent = index / Math.max(totalEvents - 1, 1);
                  
                  // Calculate position along diagonal beam
                  // For -8 degree rotation: tan(-8°) ≈ -0.14, so vertical change should be less than horizontal
                  const leftPercent = 10 + progressPercent * 70; // 10% to 80%
                  // For -8 degree slope, vertical movement = horizontal * 0.14
                  // Adjusted to match the rightmost node alignment
                  const bottomPercent = 36.5 + progressPercent * (70 * 0.14); // Following the -8deg beam slope

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.1, y: -8, zIndex: 50 }}
                      onClick={() => setSelectedEvent(event)}
                      className="absolute cursor-pointer group"
                      style={{
                        left: `${leftPercent}%`,
                        bottom: `${bottomPercent}%`,
                        transform: 'translate(-50%, 50%)'
                      }}
                    >

                      {/* Event Node */}
                      <div className="relative flex flex-col items-center">
                        {/* Connection point - outer ring */}
                        <motion.div
                          className="absolute w-20 h-20 rounded-full border-2 border-cyan-400/30 pointer-events-none"
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        />
                        
                        {/* Icon Container - Node */}
                        <motion.div
                          className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${config.color} border-2 ${
                            status === 'present' 
                              ? 'border-green-400' 
                              : status === 'past'
                              ? 'border-slate-600'
                              : 'border-cyan-400'
                          } backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-xl z-10`}
                          animate={status === 'present' ? {
                            boxShadow: [
                              '0 0 20px rgba(34,197,94,0.5)',
                              '0 0 40px rgba(34,197,94,0.7)',
                              '0 0 20px rgba(34,197,94,0.5)'
                            ],
                            borderColor: [
                              'rgba(34,197,94,1)',
                              'rgba(6,182,212,1)',
                              'rgba(34,197,94,1)'
                            ]
                          } : {
                            boxShadow: `0 0 25px ${config.glow}`
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        >
                          <Icon className={`h-7 w-7 ${
                            status === 'past' ? 'text-slate-500' : 'text-white'
                          }`} />
                          
                          {/* Live indicator */}
                          {status === 'present' && (
                            <motion.div
                              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-slate-900"
                              animate={{
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                              }}
                            />
                          )}
                        </motion.div>

                        {/* Event Title - Always Visible */}
                        <div className="mt-2 text-center max-w-[150px]">
                          <h4 className="text-[11px] font-bold text-slate-800 dark:text-white mb-1 line-clamp-2 leading-tight">
                            {event.title}
                          </h4>
                          <div className={`px-2 py-0.5 rounded-full text-[9px] font-semibold inline-block ${
                            status === 'present'
                              ? 'bg-green-500/30 border border-green-500/60 text-green-800 dark:bg-green-500/20 dark:border-green-400/50 dark:text-green-300'
                              : status === 'past'
                              ? 'bg-slate-200 border border-slate-400/50 text-slate-700 dark:bg-slate-800/50 dark:border-slate-600/30 dark:text-slate-500'
                              : 'bg-slate-100 border border-slate-400/60 text-slate-800 dark:bg-cyan-500/20 dark:border-cyan-400/50 dark:text-cyan-300'
                          } backdrop-blur-sm`}>
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric'
                            })}
                          </div>
                        </div>

                        {/* Detailed Info - Shows on hover */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="absolute top-full mt-2 w-72 pointer-events-none z-50"
                        >
                          <div className="bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-2 border-slate-300 dark:border-cyan-500/40 rounded-xl p-4 shadow-2xl">
                            <div className="flex items-start gap-3 mb-3">
                              <div className={`p-2.5 rounded-lg bg-gradient-to-br ${config.color} flex-shrink-0 shadow-lg`}>
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-base font-bold text-slate-800 dark:text-cyan-300 mb-1">
                                  {event.title}
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(event.date).toLocaleDateString('en-US', { 
                                    weekday: 'long',
                                    month: 'long', 
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 mb-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg p-2">
                              <MapPin className="h-4 w-4 text-slate-600 dark:text-cyan-400" />
                              <span>{event.location}</span>
                            </div>
                            {status === 'present' && (
                              <div className="flex items-center gap-2 text-xs text-green-800 dark:text-green-400 font-semibold bg-green-500/20 dark:bg-green-500/10 rounded-lg p-2 border border-green-500/50 dark:border-green-500/30">
                                <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
                                Happening Now - Click for Details
                              </div>
                            )}
                            {status === 'future' && (
                              <div className="text-xs text-slate-700 dark:text-cyan-400 font-medium bg-slate-100 dark:bg-cyan-500/10 rounded-lg p-2 border border-slate-300 dark:border-cyan-500/30">
                                Click to view full details
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-16 w-16 text-slate-400 dark:text-cyan-500/30 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-cyan-400/60 text-lg font-medium">No events scheduled for {getCurrentMonthName()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Legend */}
            {currentMonthEvents.length > 0 && (
              <motion.div 
                className="mt-6 flex justify-center gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600/30 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Past Event</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 dark:bg-green-500/10 border border-green-500/50 dark:border-green-400/50 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-green-800 dark:text-green-300 font-medium">Happening Now</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 dark:bg-cyan-500/10 border border-blue-400 dark:border-cyan-400/50 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-cyan-400"></div>
                  <span className="text-xs text-slate-800 dark:text-cyan-300 font-medium">Upcoming Event</span>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Filter Chips */}
        <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-y border-slate-200 dark:border-cyan-500/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  activeFilter === 'all'
                    ? 'bg-cyan-500/20 dark:bg-cyan-500/20 border-cyan-500/70 dark:border-cyan-500 text-cyan-700 dark:text-cyan-300 shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-100 dark:bg-slate-800/50 border-slate-300 dark:border-cyan-500/30 text-slate-700 dark:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                All Events
              </button>
              {(Object.entries(categoryConfig) as [EventCategory, typeof categoryConfig[EventCategory]][]).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      activeFilter === key
                        ? `bg-gradient-to-r ${config.color} border-transparent text-white shadow-lg ${config.glow}`
                        : 'bg-slate-100 dark:bg-slate-800/50 border-slate-300 dark:border-cyan-500/30 text-slate-700 dark:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm capitalize">{key.replace('-', ' ')}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Month Events Section - Hidden, timeline above shows this */}
        {false && currentMonthEvents.length > 0 && (
          <section className="relative px-6 py-12 z-20">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/40"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(6,182,212,0.3)',
                        '0 0 30px rgba(6,182,212,0.5)',
                        '0 0 20px rgba(6,182,212,0.3)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <Calendar className="h-6 w-6 text-cyan-400" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold text-cyan-300">This Month's Events</h2>
                    <p className="text-cyan-400/70 mt-1">{getCurrentMonthName()} • {currentMonthEvents.length} Events</p>
                  </div>
                </div>
                
                {/* Live Clock */}
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/30"
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(6,182,212,0.2)',
                      '0 0 15px rgba(6,182,212,0.4)',
                      '0 0 10px rgba(6,182,212,0.2)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-cyan-300 font-mono">
                    {currentMonth.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </span>
                </motion.div>
              </div>

              {/* Sequential Event Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentMonthEvents.map((event, index) => {
                  const config = categoryConfig[event.category];
                  const Icon = config.icon;
                  const status = getEventStatus(event.date);
                  
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      onClick={() => setSelectedEvent(event)}
                      className="relative group cursor-pointer"
                    >
                      <motion.div 
                        className={`relative rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                          status === 'past'
                            ? 'bg-slate-800/50 border-cyan-500/50 hover:border-cyan-400'
                            : status === 'present'
                            ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400 shadow-lg shadow-cyan-500/30'
                            : 'bg-slate-800/50 border-cyan-500/50 hover:border-cyan-400'
                        }`}
                        animate={status === 'present' ? {
                          borderColor: ['rgba(6,182,212,1)', 'rgba(34,197,94,1)', 'rgba(6,182,212,1)']
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        {/* Status indicator */}
                        {status === 'present' && (
                          <motion.div
                            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-400/50"
                            animate={{
                              boxShadow: [
                                '0 0 10px rgba(34,197,94,0.3)',
                                '0 0 20px rgba(34,197,94,0.6)',
                                '0 0 10px rgba(34,197,94,0.3)'
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          >
                            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs text-green-300 font-semibold">Live</span>
                          </motion.div>
                        )}

                        <div className="p-5">
                          {/* Icon and Category */}
                          <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${config.color} shadow-lg ${config.glow}`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xs text-slate-400">
                              {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                            {event.title}
                          </h3>

                          {/* Location */}
                          <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                            <MapPin className="h-4 w-4" />
                            <span className="truncate">{event.location}</span>
                          </div>

                          {/* Progress bar for sequential timing */}
                          <div className="relative h-1 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${config.color}`}
                              initial={{ width: '0%' }}
                              animate={{ width: status === 'past' ? '100%' : status === 'present' ? '50%' : '0%' }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Timeline */}
        <main className="relative px-6 py-16 z-20" ref={timelineRef}>
          <div className="max-w-7xl mx-auto">
            <div className="space-y-12">
              {filteredEvents.map((event, index) => {
                const status = getEventStatus(event.date);
                const config = categoryConfig[event.category];
                const Icon = config.icon;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline connector */}
                    {index < filteredEvents.length - 1 && (
                      <div className="absolute left-8 top-24 bottom-[-48px] w-px bg-gradient-to-b from-yellow-500/50 dark:from-cyan-500/50 via-yellow-500/20 dark:via-cyan-500/20 to-transparent" />
                    )}

                    {/* Event Card */}
                    <motion.button
                      onClick={() => setSelectedEvent(event)}
                      className="relative w-full group"
                      whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-500 ${
                        status === 'past'
                          ? 'bg-white/90 dark:bg-slate-900/50 border-cyan-500/60 dark:border-cyan-500/50 shadow-lg hover:shadow-2xl'
                          : status === 'future'
                          ? 'bg-white/90 dark:bg-slate-900/50 border-cyan-500/60 dark:border-cyan-500/50 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50'
                          : 'bg-white/95 dark:bg-slate-900/70 border-cyan-500/80 dark:border-cyan-500 shadow-2xl shadow-cyan-500/60'
                      }`}>
                        {/* Holographic effect for future events */}
                        {status === 'future' && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
                            animate={{
                              x: ['-100%', '200%']
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: 'easeInOut'
                            }}
                          />
                        )}

                        {/* Light trail for present events */}
                        {status === 'present' && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 blur-xl"
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          />
                        )}

                        <div className="relative p-6 flex items-start gap-6">
                          {/* Icon */}
                          <div className={`relative p-4 rounded-xl ${
                            status === 'past'
                              ? `bg-gradient-to-br ${config.color} shadow-lg`
                              : `bg-gradient-to-br ${config.color} shadow-lg ${config.glow}`
                          }`}>
                            <Icon className="h-8 w-8 text-white" />
                            
                            {/* Pulse effect for present */}
                            {status === 'present' && (
                              <motion.div
                                className="absolute inset-0 rounded-xl bg-white"
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.5, 0, 0.5]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: 'easeOut'
                                }}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 text-left">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <h3 className={`text-xl font-bold mb-2 ${
                                  status === 'past'
                                    ? 'text-slate-500 dark:text-slate-500'
                                    : status === 'future'
                                    ? 'text-slate-800 dark:text-cyan-300'
                                    : 'text-slate-800 dark:text-cyan-200'
                                }`}>
                                  {event.title}
                                </h3>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className={`flex items-center gap-2 ${
                                    status === 'past' ? 'text-slate-600 dark:text-slate-600' : 'text-slate-700 dark:text-cyan-400/70'
                                  }`}>
                                    <Calendar className="h-4 w-4" />
                                    {new Date(event.date).toLocaleDateString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric', 
                                      year: 'numeric' 
                                    })}
                                  </span>
                                  <span className={`flex items-center gap-2 ${
                                    status === 'past' ? 'text-slate-600 dark:text-slate-600' : 'text-slate-700 dark:text-cyan-400/70'
                                  }`}>
                                    <MapPin className="h-4 w-4" />
                                    {event.location}
                                  </span>
                                </div>
                              </div>

                              {/* Status badge */}
                              <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                status === 'past'
                                  ? 'bg-slate-200 dark:bg-slate-800/30 border-slate-400 dark:border-slate-700/30 text-slate-600 dark:text-slate-600'
                                  : status === 'future'
                                  ? 'bg-slate-100 dark:bg-cyan-500/20 border-slate-400 dark:border-cyan-500/50 text-slate-800 dark:text-cyan-300'
                                  : 'bg-green-500/30 dark:bg-cyan-500/30 border-green-500/60 dark:border-cyan-500 text-green-800 dark:text-cyan-200 animate-pulse'
                              }`}>
                                {status === 'past' ? 'Completed' : status === 'future' ? 'Upcoming' : 'Active'}
                              </div>
                            </div>

                            <p className={`text-sm leading-relaxed ${
                              status === 'past' ? 'text-slate-600 dark:text-slate-600' : 'text-slate-700 dark:text-cyan-300/60'
                            }`}>
                              {event.description}
                            </p>

                            {event.speaker && (
                              <div className={`mt-3 flex items-center gap-2 text-sm ${
                                status === 'past' ? 'text-slate-600 dark:text-slate-600' : 'text-slate-700 dark:text-cyan-400/80'
                              }`}>
                                <Users className="h-4 w-4" />
                                {event.speaker}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Corner accent */}
                        {status !== 'present' && (
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-3xl" />
                        )}
                      </div>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </main>

        {/* Holographic Detail Panel */}
        <AnimatePresence>
          {selectedEvent && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedEvent(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              />

              {/* Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: shouldReduceMotion ? 'tween' : 'spring', damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white dark:bg-slate-900 border-l-2 border-cyan-500/60 dark:border-cyan-500 shadow-2xl z-50 overflow-y-auto"
              >
                <div className="relative">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4 flex-1">
                        {(() => {
                          const config = categoryConfig[selectedEvent.category];
                          const Icon = config.icon;
                          return (
                            <motion.div 
                              className={`p-4 rounded-xl bg-gradient-to-br ${config.color} shadow-lg ${config.glow}`}
                              animate={{
                                boxShadow: [
                                  `0 0 20px ${config.glow.includes('purple') ? 'rgba(168, 85, 247, 0.5)' : 
                                              config.glow.includes('blue') ? 'rgba(59, 130, 246, 0.5)' :
                                              config.glow.includes('green') ? 'rgba(34, 197, 94, 0.5)' :
                                              config.glow.includes('orange') ? 'rgba(249, 115, 22, 0.5)' :
                                              config.glow.includes('yellow') ? 'rgba(234, 179, 8, 0.5)' :
                                              'rgba(99, 102, 241, 0.5)'}`,
                                  `0 0 40px ${config.glow.includes('purple') ? 'rgba(168, 85, 247, 0.8)' : 
                                              config.glow.includes('blue') ? 'rgba(59, 130, 246, 0.8)' :
                                              config.glow.includes('green') ? 'rgba(34, 197, 94, 0.8)' :
                                              config.glow.includes('orange') ? 'rgba(249, 115, 22, 0.8)' :
                                              config.glow.includes('yellow') ? 'rgba(234, 179, 8, 0.8)' :
                                              'rgba(99, 102, 241, 0.8)'}`,
                                  `0 0 20px ${config.glow.includes('purple') ? 'rgba(168, 85, 247, 0.5)' : 
                                              config.glow.includes('blue') ? 'rgba(59, 130, 246, 0.5)' :
                                              config.glow.includes('green') ? 'rgba(34, 197, 94, 0.5)' :
                                              config.glow.includes('orange') ? 'rgba(249, 115, 22, 0.5)' :
                                              config.glow.includes('yellow') ? 'rgba(234, 179, 8, 0.5)' :
                                              'rgba(99, 102, 241, 0.5)'}`
                                ]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                              }}
                            >
                              <Icon className="h-6 w-6 text-white" />
                            </motion.div>
                          );
                        })()}
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                            categoryConfig[selectedEvent.category].color.includes('purple') ? 'bg-purple-500/30 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/60 dark:border-purple-500/50' :
                            categoryConfig[selectedEvent.category].color.includes('blue') ? 'bg-slate-500/30 dark:bg-blue-500/20 text-slate-700 dark:text-blue-300 border border-slate-500/60 dark:border-blue-500/50' :
                            categoryConfig[selectedEvent.category].color.includes('green') ? 'bg-green-500/30 dark:bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/60 dark:border-green-500/50' :
                            categoryConfig[selectedEvent.category].color.includes('orange') ? 'bg-orange-500/30 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-500/60 dark:border-orange-500/50' :
                            categoryConfig[selectedEvent.category].color.includes('yellow') ? 'bg-yellow-500/30 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border border-yellow-500/60 dark:border-yellow-500/50' :
                            'bg-indigo-500/30 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/60 dark:border-indigo-500/50'
                          }`}>
                            {selectedEvent.category.replace('-', ' ').toUpperCase()}
                          </span>
                          <h2 className="text-2xl font-bold text-slate-800 dark:text-cyan-200">{selectedEvent.title}</h2>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(null)}
                        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-cyan-500/20 text-slate-700 dark:text-cyan-300 transition-all"
                        aria-label="Close panel"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Image Carousel */}
                    {selectedEvent.images && selectedEvent.images.length > 0 && (
                      <div className="relative mb-6 rounded-xl overflow-hidden border-2 border-cyan-500/40 dark:border-cyan-500/30">
                        <div className="aspect-video relative bg-slate-200 dark:bg-slate-800">
                          <img
                            src={selectedEvent.images[currentImageIndex]}
                            alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = '/CIE Design.png';
                            }}
                          />
                          
                          {selectedEvent.images.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex(Math.max(0, currentImageIndex - 1));
                                }}
                                disabled={currentImageIndex === 0}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white disabled:opacity-30 hover:bg-black/70 transition-all backdrop-blur-sm"
                                aria-label="Previous image"
                              >
                                <ChevronLeft className="h-6 w-6" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex(Math.min(selectedEvent.images.length - 1, currentImageIndex + 1));
                                }}
                                disabled={currentImageIndex === selectedEvent.images.length - 1}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white disabled:opacity-30 hover:bg-black/70 transition-all backdrop-blur-sm"
                                aria-label="Next image"
                              >
                                <ChevronRight className="h-6 w-6" />
                              </button>
                              
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {selectedEvent.images.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCurrentImageIndex(idx);
                                    }}
                                    className={`h-2 rounded-full transition-all ${
                                      idx === currentImageIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/50'
                                    }`}
                                    aria-label={`Go to image ${idx + 1}`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Event Details */}
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/30 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-700 dark:text-cyan-300 mb-2">
                          <Calendar className="h-5 w-5" />
                          <span className="font-semibold">Date</span>
                        </div>
                        <p className="text-slate-900 dark:text-white font-medium">
                          {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 shadow-sm">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-2">
                          <MapPin className="h-5 w-5" />
                          <span className="font-semibold">Location</span>
                        </div>
                        <p className="text-slate-900 dark:text-white font-medium">{selectedEvent.location}</p>
                      </div>


                      {selectedEvent.speaker && (
                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-blue-500/10 border border-purple-200 dark:border-blue-500/30 shadow-sm">
                          <div className="flex items-center gap-2 text-slate-700 dark:text-blue-300 mb-2">
                            <Award className="h-5 w-5" />
                            <span className="font-semibold">Speaker/Presenter</span>
                          </div>
                          <p className="text-slate-900 dark:text-white font-medium">{selectedEvent.speaker}</p>
                        </div>
                      )}

                      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-cyan-500/20 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-700 dark:text-cyan-300 mb-2">
                          <Sparkles className="h-5 w-5" />
                          <span className="font-semibold">Description</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{selectedEvent.description}</p>
                      </div>

                      {/* Action Button */}
                      <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/30">
                        <Calendar className="h-5 w-5" />
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}

