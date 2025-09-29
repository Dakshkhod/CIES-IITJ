'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInOnScroll from '@/components/layout/FadeInOnScroll';
import {
  Home,
  Info,
  Briefcase,
  Users,
  Award,
  GalleryHorizontal,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// --- Main Page Component ---
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // CMS Hook: Check user's saved theme preference from a CMS or localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div
      className={`bg-gray-50 font-sans text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200`}
    >
      {/* Blueprint background pattern */}
      <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"></div>

      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isSticky={isSticky}
      />

      <main className="isolate pt-24">
        <HeroSection />
        <RecentActivities />
      </main>

      <Footer />
    </div>
  );
}

// --- Navigation Data ---
// CMS Hook: This navigation data should be fetched from a headless CMS (e.g., Sanity, Strapi).
const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/#about', icon: Info },
  {
    name: 'Activities',
    href: '#activities',
    icon: Briefcase,
    dropdown: [
      { name: 'Workshops', href: '#/workshops' },
      { name: 'Site Visits', href: '#/site-visits' },
      { name: 'Competitions', href: '#/competitions' },
      { name: 'Seminars', href: '#/seminars' },
    ],
  },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Achievements', href: '#achievements', icon: Award },
  { name: 'Gallery', href: '#gallery', icon: GalleryHorizontal },
  { name: 'Contact Us', href: '/#contact', icon: Mail },
];

// --- Header Component ---
interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isSticky: boolean;
}

const Header = ({ isMenuOpen, setIsMenuOpen, isDarkMode, toggleTheme, isSticky }: HeaderProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Enhanced keyboard navigation for dropdowns
  const handleKeyDown = (event: React.KeyboardEvent, itemName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpenDropdown(openDropdown === itemName ? null : itemName);
    } else if (event.key === 'Escape') {
      setOpenDropdown(null);
    }
  };

  const handleDropdownKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = href;
    } else if (event.key === 'Escape') {
      setOpenDropdown(null);
      // Focus back to the dropdown trigger
      const trigger = (event.target as HTMLElement).closest('[role="menu"]')?.previousElementSibling as HTMLElement;
      trigger?.focus();
    }
  };

  return (
    <header
      id="home"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isSticky ? 'bg-white/80 shadow-lg backdrop-blur-xl dark:bg-gray-900/80' : 'bg-transparent'}`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" aria-label="Homepage">
          <img
            src={isDarkMode ? "/iitj-logo-white-outline.png" : "/iitj-logo-transparent.png"}
            alt="IIT Jodhpur Logo"
            className="h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
          <img
            src="/logo.jpg"
            alt="CIES Logo"
            className="h-12 w-12 rounded-full object-cover shadow-lg"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-gray-800 dark:text-white">
              CIES
            </span>
            <span className="text-xs leading-tight text-gray-500 dark:text-gray-400">
              IIT Jodhpur
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-1 rounded-full border border-gray-200 bg-white/50 px-2 py-1.5 shadow-inner dark:border-gray-700/50 dark:bg-gray-800/50 lg:flex">
          {navItems.map(item =>
            item.dropdown ? (
              <div
                key={item.name}
                className="group relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                  onKeyDown={e => handleKeyDown(e, item.name)}
                  className="flex items-center rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3d91] dark:text-gray-300 dark:hover:bg-gray-700"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === item.name}
                  aria-controls={`dropdown-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {item.name}
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : 'group-hover:rotate-180'}`}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute left-0 top-full z-20 mt-3 w-48 rounded-lg border bg-white py-1 shadow-xl dark:border-gray-700 dark:bg-gray-800"
                      role="menu"
                      id={`dropdown-${item.name.toLowerCase().replace(' ', '-')}`}
                      aria-labelledby={`dropdown-trigger-${item.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0b3d91] dark:text-gray-300 dark:hover:bg-gray-700"
                          role="menuitem"
                          tabIndex={0}
                          onKeyDown={e => handleDropdownKeyDown(e, subItem.href)}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3d91] ${
                  item.name === 'Home' 
                    ? 'bg-[#0b3d91] text-white' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {item.name}
              </a>
            )
          )}
        </div>

        {/* Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3d91] focus-visible:ring-offset-2 dark:hover:bg-gray-700 dark:focus-visible:ring-offset-gray-900"
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDarkMode ? 'moon' : 'sun'}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3d91] dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900/95 lg:hidden"
          >
            <MobileNav />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Mobile Navigation Component ---
const MobileNav = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  return (
    <div className="flex flex-col space-y-1 px-4 pb-4 pt-2">
      {navItems.map(item => (
        <div key={item.name}>
          {item.dropdown ? (
            <>
              <button
                onClick={() => setOpenAccordion(openAccordion === item.name ? null : item.name)}
                className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-expanded={openAccordion === item.name}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5 text-[#0b3d91] dark:text-blue-400" />
                  <span>{item.name}</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${openAccordion === item.name ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openAccordion === item.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-8"
                  >
                    <div className="ml-5 space-y-1 border-l-2 border-gray-200 py-2 dark:border-gray-700">
                      {item.dropdown.map(subItem => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block rounded-r-md py-2 pl-4 pr-2 text-gray-600 hover:bg-gray-100 hover:text-[#0b3d91] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <a
              href={item.href}
              className="flex items-center rounded-md px-4 py-3 font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <item.icon className="mr-3 h-5 w-5 text-[#0b3d91] dark:text-blue-400" />
              <span>{item.name}</span>
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

// --- Animated SVG Line Drawing ---
const AnimatedBridge = () => {
  const SvgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };
  const PathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100"
      className="mx-auto h-auto w-full max-w-lg text-[#0b3d91] dark:text-blue-400"
      variants={SvgVariants}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      <motion.path
        variants={PathVariants}
        d="M10 90 H190"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
      />
      <motion.path
        variants={PathVariants}
        d="M20 90 V40 A30 30 0 0 1 80 40 V90"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
      />
      <motion.path
        variants={PathVariants}
        d="M120 90 V40 A30 30 0 0 1 180 40 V90"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
      />
      <motion.path
        variants={PathVariants}
        d="M10 50 Q100 10 190 50"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
      />
      <motion.path
        variants={PathVariants}
        d="M50 90 V55"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
      />
      <motion.path
        variants={PathVariants}
        d="M75 90 V42"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
      />
      <motion.path
        variants={PathVariants}
        d="M100 90 V30"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
      />
      <motion.path
        variants={PathVariants}
        d="M125 90 V42"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
      />
      <motion.path
        variants={PathVariants}
        d="M150 90 V55"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
      />
    </motion.svg>
  );
};

// --- Hero Section ---
const HeroSection = () => (
  <section className="container relative mx-auto overflow-hidden px-6 pb-24 pt-16 text-center">
    <div className="absolute inset-0 z-0 opacity-50">
      <div className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#0b3d91]/10 blur-3xl dark:bg-[#0b3d91]/20"></div>
      <div className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-y-1/4 translate-x-1/4 animate-pulse rounded-full bg-blue-500/5 blur-3xl [animation-delay:-3s] dark:bg-blue-400/10"></div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
      className="relative z-10"
    >
      <AnimatedBridge />
      <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tighter text-gray-900 dark:text-white md:text-6xl">
        Civil & Infrastructure Engineering Society
        <span className="block bg-gradient-to-r from-[#0b3d91] to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
          IIT Jodhpur
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
        Building Futures, Strengthening Foundations
      </p>
    </motion.div>
  </section>
);


// --- Recent Activities Section ---
const RecentActivities = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // CMS Hook: Data for Recent Activities
  const recentActivities = [
    {
      id: 1,
      title: 'Informal Session - for Y24s',
      date: 'August 12, 2025',
      description: 'We conducted an informal session for Y24s, organized by Y23s, on the theme "How to Master the 3rd Semester." We discussed effective time management, balancing academics with extracurriculars, and tips for excelling in core courses.',
      image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230b3d91;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%239b2b2b;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='48' fill='white' text-anchor='middle' dy='.3em'%3EInformal Session%3C/text%3E%3C/svg%3E`,
      link: '#'
    },
    {
      id: 2,
      title: 'Site Visit to Jodhpur Metro Project',
      date: 'July 28, 2025',
      description: 'An insightful visit to the ongoing Jodhpur Metro construction site. Students got a firsthand look at tunnel boring machines, station construction, and project management on a large scale.',
      image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234a5568;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%232d3748;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='48' fill='white' text-anchor='middle' dy='.3em'%3ESite Visit%3C/text%3E%3C/svg%3E`,
      link: '#'
    },
    {
      id: 3,
      title: 'Workshop on STAAD.Pro',
      date: 'June 15, 2025',
      description: 'A hands-on workshop covering the fundamentals of structural analysis and design using STAAD.Pro. Participants learned to model, analyze, and design a G+3 building from scratch.',
      image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23718096;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23a0aec0;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='48' fill='white' text-anchor='middle' dy='.3em'%3ESTAAD.Pro Workshop%3C/text%3E%3C/svg%3E`,
      link: '#'
    }
  ];

  const nextActivity = () => setCurrentIndex((prev) => (prev + 1) % recentActivities.length);
  const prevActivity = () => setCurrentIndex((prev) => (prev - 1 + recentActivities.length) % recentActivities.length);
  const goToActivity = (index: number) => setCurrentIndex(index);

  const activity = recentActivities[currentIndex];

  return (
    <section id="activities" className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeInOnScroll>
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            Recent Activities
            <span className="mx-auto mt-3 block h-1 w-24 rounded-full bg-[#0b3d91]"></span>
          </h2>
        </FadeInOnScroll>
        
        <FadeInOnScroll>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.3 }} 
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700/80 p-6 md:p-8 max-w-6xl mx-auto overflow-hidden relative"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center min-h-[28rem]">
              <div className="w-full lg:w-2/5 flex-shrink-0 h-64 lg:h-80 relative">
                <AnimatePresence initial={false}>
                  <motion.img 
                    key={activity.id}
                    src={activity.image}
                    alt={activity.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl w-full h-full object-cover absolute top-0 left-0"
                  />
                </AnimatePresence>
              </div>
              <div className="w-full lg:w-3/5 relative h-64 lg:h-80 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex flex-col flex-grow"
                  >
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 dark:text-white">{activity.title}</h3>
                    <p className="text-sm text-[#0b3d91] dark:text-blue-400 font-semibold mb-4">{activity.date}</p>
                    <div className="text-gray-600 dark:text-gray-300 mb-6 flex-grow pr-2 overflow-y-auto text-base lg:text-lg leading-relaxed" style={{ scrollbarWidth: 'thin' }}>
                      <p>{activity.description}</p>
                    </div>
                    <div className="mt-auto">
                      <motion.a 
                        href={activity.link} 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-[#0b3d91] text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors shadow-lg"
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-3 hover:bg-white dark:hover:bg-gray-800 transition-colors z-10 shadow-lg"
              aria-label="Previous Activity"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button 
              onClick={nextActivity} 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-3 hover:bg-white dark:hover:bg-gray-800 transition-colors z-10 shadow-lg"
              aria-label="Next Activity"
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {recentActivities.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => goToActivity(index)} 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-[#0b3d91] w-8' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 w-3'
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
};


// --- Footer Component ---
const Footer = () => (
  <footer className="border-t-4 border-[#0b3d91] bg-slate-900 text-slate-300">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
        {/* IITJ Logo (Left) */}
        <div className="flex justify-center md:col-span-2 md:justify-start">
          <img
            src="/iitj-logo-white-outline.png"
            alt="IIT Jodhpur Logo"
            className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Quick Links */}
        <div className="text-center md:col-span-3 md:text-left">
          <h3 className="mb-4 text-lg font-bold text-blue-400">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://www.iitj.ac.in/main/en/iitj" className="transition-colors hover:text-white" target="_blank" rel="noopener noreferrer">
                IIT Jodhpur
              </a>
            </li>
            <li>
              <a href="https://www.iitj.ac.in/civil-and-infrastructure-engineering" className="transition-colors hover:text-white" target="_blank" rel="noopener noreferrer">
                CIE-IIT Jodhpur
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:col-span-5 md:text-left">
          <h3 className="mb-4 text-lg font-bold text-blue-400">Contact</h3>
          <p className="text-sm font-semibold">
            Department of Civil and Infrastructure Engineering
          </p>
          <p className="text-sm text-slate-400">Indian Institute of Technology Jodhpur</p>
          <p className="text-sm text-slate-400">NH-62, Nagour Road</p>
          <p className="text-sm text-slate-400">Karwar (342030)</p>
          <p className="text-sm text-slate-400">Jodhpur </p>
          <p className="mt-2 text-sm text-slate-400">Email: office@civil.iitj.ac.in</p>
          <p className="text-sm text-slate-400">Phone:</p>
        </div>

        {/* CIES Logo (Right) */}
        <div className="flex justify-center md:col-span-2 md:justify-end">
          <img
            src="/logo.jpg"
            alt="CIES Logo"
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-12 flex justify-center space-x-6">
        <a
          href="https://www.instagram.com/cies_iitj/"
          className="text-slate-400 transition-all duration-300 hover:scale-110 hover:text-pink-500"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919 4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/company/107540236/admin/notifications/all/"
          className="text-slate-400 transition-all duration-300 hover:scale-110 hover:text-blue-400"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065c0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>

      <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} Civil & Infrastructure Engineering Society, IIT Jodhpur.
          All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);
