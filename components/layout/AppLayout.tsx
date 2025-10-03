'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  Building2,
} from 'lucide-react';

// --- Navigation Data ---
// CMS Hook: This navigation data should be fetched from a headless CMS (e.g., Sanity, Strapi).
const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
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
  { name: 'Events', href: '/#activities', icon: Briefcase },
  { name: 'Edificio', href: '/about#edificio', icon: Building2 },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Roadmap and Calendar', href: '#achievements', icon: Award },
  { name: 'Gallery', href: '#gallery', icon: GalleryHorizontal },
  { name: 'Contact Us', href: '/#contact', icon: Mail },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

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
    <>
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isSticky={isSticky}
        pathname={pathname}
      />
      {children}
      <Footer />
    </>
  );
}

// --- Header Component ---
interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isSticky: boolean;
  pathname: string | null;
}

const Header = ({ isMenuOpen, setIsMenuOpen, isDarkMode, toggleTheme, isSticky, pathname }: HeaderProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (!href.startsWith('/')) return false; // ignore hash links
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

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
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isSticky ? 'bg-white/95 shadow-lg backdrop-blur-xl dark:bg-gray-900/90' : 'bg-white/80 backdrop-blur-sm dark:bg-transparent'}`}
    >
      <nav className="max-w-7xl w-full mx-auto flex items-center justify-between px-2 md:px-4 py-2.5 md:py-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 md:gap-3 group -ml-2 md:-ml-2 lg:-ml-2" aria-label="Homepage">
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
          <div className="flex flex-col justify-center min-w-fit">
            <span className="text-sm font-bold leading-tight whitespace-nowrap text-gray-800 dark:text-white">
              CIES
            </span>
            <span className="text-xs leading-tight whitespace-nowrap text-gray-500 dark:text-gray-400">
              IIT Jodhpur
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-1 md:space-x-1 rounded-full border border-gray-300 bg-white/90 px-1.5 md:px-2 py-1.5 shadow-md dark:border-gray-700/50 dark:bg-gray-800/50 lg:flex ml-0 md:ml-2 lg:ml-3 xl:ml-4">
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
                  className="flex items-center whitespace-nowrap rounded-full px-3 md:px-4 py-2 text-[14px] md:text-sm font-medium tracking-tight text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3d91] dark:text-gray-300 dark:hover:bg-gray-700"
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
              className={`whitespace-nowrap rounded-full px-3 md:px-4 py-2 text-[14px] md:text-sm font-medium tracking-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3d91] ${
                isActive(item.href)
                  ? 'bg-[#0b3d91] text-white shadow-md'
                  : 'text-gray-800 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
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
            className="rounded-full p-2 text-gray-800 transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3d91] focus-visible:ring-offset-2 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus-visible:ring-offset-gray-900"
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
              className="rounded-md p-2 text-gray-800 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3d91] dark:text-gray-300 dark:hover:bg-gray-800"
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
            className="border-t border-gray-300 bg-white/95 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/95 lg:hidden"
          >
            <MobileNav pathname={pathname} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Mobile Navigation Component ---
interface MobileNavProps { pathname: string | null }
const MobileNav = ({ pathname }: MobileNavProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const isActive = (href: string) => {
    if (!href.startsWith('/')) return false;
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col space-y-1 px-4 pb-4 pt-2">
      {navItems.map(item => (
        <div key={item.name}>
          {item.dropdown ? (
            <>
              <button
                onClick={() => setOpenAccordion(openAccordion === item.name ? null : item.name)}
                className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
              className={`flex items-center whitespace-nowrap rounded-md px-4 py-3 font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-white bg-[#0b3d91] shadow-md dark:text-white'
                  : 'text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
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


