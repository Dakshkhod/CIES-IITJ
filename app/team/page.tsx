'use client';

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, Users, Home, Info, Briefcase, Award, GalleryHorizontal, Menu, X, Sun, Moon, ChevronDown, Instagram } from 'lucide-react';

/* =========================
   SITE-WIDE NAVIGATION DATA (CMS Hook)
   ========================= */
const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  {
    name: 'Activities',
    href: '/#activities',
    icon: Briefcase,
    dropdown: [
      { name: 'Workshops', href: '#/workshops' },
      { name: 'Site Visits', href: '#/site-visits' },
      { name: 'Competitions', href: '#/competitions' },
      { name: 'Seminars', href: '#/seminars' },
    ],
  },
  { name: 'Events', href: '/#activities', icon: Briefcase },
  { name: 'Edificio', href: '/about#edificio', icon: Briefcase },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Roadmap and Calendar', href: '#achievements', icon: Award },
  { name: 'Gallery', href: '#gallery', icon: GalleryHorizontal },
  { name: 'Contact Us', href: '/#contact', icon: Mail },
];


/* =========================
   SAMPLE TEAM DATA (CMS Hook)
   ========================= */
// Team data - Replace with CMS/API integration in production
const TEAM_DATA = [
    { 
      id: "hod", 
      name: "Dr. A. B. C.", 
      role: "Head of Department", 
      committee: "Faculty Leadership", 
      batch: "Faculty", 
      photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3E%3C/text%3E%3C/svg%3E", 
      bio: "Head of the Civil & Infrastructure Engineering Department.", 
      socials: { linkedin: "#", email: "#", instagram: "#" }, 
      featured: true 
    },
    { 
      id: "advisor", 
      name: "Dr. X. Y. Z.", 
      role: "Faculty Advisor", 
      committee: "Faculty Leadership", 
      batch: "Faculty", 
      photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3E%3C/text%3E%3C/svg%3E", 
      bio: "Faculty advisor for the Civil Engineering Society.", 
      socials: { linkedin: "#", email: "#", instagram: "#" }, 
      featured: true 
    },
    { 
      id: "advisor2", 
      name: "Dr. P. Q. R.", 
      role: "Faculty Advisor", 
      committee: "Faculty Leadership", 
      batch: "Faculty", 
      photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3E%3C/text%3E%3C/svg%3E", 
      bio: "Faculty advisor for the Civil Engineering Society.", 
      socials: { linkedin: "#", email: "#", instagram: "#" }, 
      featured: true 
    },
    { 
      id: "ashwani", 
      name: "Ashwani", 
      role: "Secretary", 
      committee: "Coordination Committee", 
      batch: "UG 2024", 
      photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3EA%3C/text%3E%3C/svg%3E", 
      bio: "Secretary — coordinates society operations.", 
      socials: { linkedin: "#", email: "mailto:ashwani@iitj.ac.in", instagram: "#" }, 
      featured: true 
    },
    { 
      id: "shashank", 
      name: "Shashank", 
      role: "Joint Secretary", 
      committee: "Coordination Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Shashank.jpeg", 
      bio: "Joint Secretary.", 
      socials: { linkedin: "#", email: "mailto:shashank@iitj.ac.in", instagram: "#" } 
    },
    { 
      id: "mayank", 
      name: "Mayank Tiwari", 
      role: "PG Representative", 
      committee: "Coordination Committee", 
      batch: "PG 2024", 
      photo: "/Team images/Mayank.jpeg", 
      bio: "Postgraduate representative connecting PG students with society activities.", 
      socials: { linkedin: "#", email: "mailto:mayank@iitj.ac.in", instagram: "#" } 
    },
    { 
      id: "saurabh", 
      name: "Saurabh", 
      role: "Events & Community Engagement Lead", 
      committee: "Events & Community Engagement Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Saurabh.jpeg", 
      bio: "Leading events and community outreach initiatives.", 
      socials: { linkedin: "#", email: "mailto:saurabh@iitj.ac.in", instagram: "#" } 
    },
    { 
      id: "vikas", 
      name: "Vikas", 
      role: "Executive", 
      committee: "Events & Community Engagement Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Vikas.jpeg", 
      bio: "Executive member supporting event organization and community engagement.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "manish", 
      name: "Manish", 
      role: "Executive", 
      committee: "Events & Community Engagement Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Manish.jpg", 
      bio: "Executive member contributing to society events and activities.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "keshav", 
      name: "Keshav Saini", 
      role: "Technical Lead", 
      committee: "Technical Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Keshav.jpeg", 
      bio: "Technical lead managing web development and digital initiatives.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "daksh", 
      name: "Daksh", 
      role: "Technical Committee (PG) / Web Dev Executive", 
      committee: "Technical Committee", 
      batch: "PG 2024", 
      photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3ED%3C/text%3E%3C/svg%3E", 
      bio: "Web dev and technical executive.", 
      socials: { linkedin: "#", email: "#", instagram: "#" }, 
      featured: true 
    },
    { 
      id: "falak", 
      name: "Falak Khan", 
      role: "Seminars & Academic Engagement", 
      committee: "Seminars & Academic Engagement Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Falak.jpeg", 
      bio: "Organizing seminars and academic engagement programs.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "faizah", 
      name: "Faizah Wani", 
      role: "PG Lead", 
      committee: "Seminars & Academic Engagement Committee", 
      batch: "PG 2024", 
      photo: "/Team images/Faizah.jpeg", 
      bio: "PG lead for academic seminars and research engagement.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "sri", 
      name: "Sri Raghava", 
      role: "PG Lead", 
      committee: "Seminars & Academic Engagement Committee", 
      batch: "PG 2024", 
      photo: "/Team images/Sri Raghava.jpeg", 
      bio: "PG lead coordinating academic and research activities.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "deepali", 
      name: "Deepali", 
      role: "Media & Design Lead", 
      committee: "Media & Design Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Deepali.jpeg", 
      bio: "Leading design and media content creation for the society.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "nitesh", 
      name: "Nitesh", 
      role: "Media & Design Executive", 
      committee: "Media & Design Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Nitesh.jpeg", 
      bio: "Supporting design and media initiatives for society events.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "harsh", 
      name: "Harsh", 
      role: "Media & Design", 
      committee: "Media & Design Committee", 
      batch: "UG 2024", 
      photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3EH%3C/text%3E%3C/svg%3E", 
      bio: "Design & media.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "simran_sehgal", 
      name: "Simran Sehgal", 
      role: "Media & Design Executive", 
      committee: "Media & Design Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Simran Sehgal.jpeg", 
      bio: "Creative executive handling visual content and media.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "simranjit_kaur", 
      name: "Simranjit Kaur", 
      role: "Media & Design Executive", 
      committee: "Media & Design Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Simranjit Kaur.jpeg", 
      bio: "Supporting media and design activities for society outreach.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "ram", 
      name: "Ram Kunawar", 
      role: "Outreach & Publicity Lead", 
      committee: "Outreach & Publicity Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Ram.jpeg", 
      bio: "Leading outreach and publicity efforts for society events.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "nishant", 
      name: "Nishant", 
      role: "Outreach & Publicity Executive", 
      committee: "Outreach & Publicity Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Nishant.jpeg", 
      bio: "Supporting outreach initiatives and event promotion.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    }
];

/* =========================
   UTILITIES
   ========================= */
const committeeColors: Record<string, string> = {
  "Faculty Leadership": "border-red-700",
  "Coordination Committee": "border-blue-700",
  "Events & Community Engagement Committee": "border-green-600",
  "Technical Committee": "border-purple-600",
  "Seminars & Academic Engagement Committee": "border-yellow-500",
  "Media & Design Committee": "border-pink-500",
  "Outreach & Publicity Committee": "border-teal-500",
};

/* =========================
   SHARED COMPONENTS (Header/Footer)
   ========================= */

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isSticky: boolean;
}

const Header = ({ isMenuOpen, setIsMenuOpen, isDarkMode, toggleTheme, isSticky }: HeaderProps) => {

  return (
    <header id="home" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSticky ? 'bg-white/95 shadow-lg backdrop-blur-xl dark:bg-gray-900/90' : 'bg-white/80 backdrop-blur-sm dark:bg-transparent'}`}>
      <nav className="max-w-7xl w-full mx-auto flex items-center justify-between px-2 md:px-4 py-2.5 md:py-3">
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
        <div className="hidden items-center space-x-1 md:space-x-1 rounded-full border border-gray-300 bg-white/90 px-1.5 md:px-2 py-1.5 shadow-md dark:border-gray-700/50 dark:bg-gray-800/50 lg:flex ml-0 md:ml-2 lg:ml-3 xl:ml-4">
          {navItems.map((item) => (
            item.dropdown ? (
              <div key={item.name} className="group relative">
                <a href={item.href} className="flex items-center whitespace-nowrap rounded-full px-3 md:px-4 py-2 text-[14px] md:text-sm font-medium tracking-tight text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3d91] dark:text-gray-300 dark:hover:bg-gray-700">
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </a>
                <div className="absolute left-0 top-full z-20 mt-3 w-48 rounded-lg border bg-white py-1 shadow-xl opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800" role="menu">
                  {item.dropdown.map((subItem) => (
                    <a key={subItem.name} href={subItem.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" role="menuitem">{subItem.name}</a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.name} href={item.href} className={`whitespace-nowrap rounded-full px-3 md:px-4 py-2 text-[14px] md:text-sm font-medium tracking-tight transition-colors ${item.name === 'Team' ? 'bg-[#0b3d91] text-white shadow-md' : 'text-gray-800 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'}`}>{item.name}</a>
            )
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle dark mode">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-label="Open menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white dark:bg-gray-900/95">
            <MobileNav />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const MobileNav = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    return (
        <div className="flex flex-col px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
                <div key={item.name}>
                    {item.dropdown ? ( <>
                        <button onClick={() => setOpenAccordion(openAccordion === item.name ? null : item.name)} className="w-full flex justify-between items-center px-4 py-3 rounded-md text-left font-medium">
                           <span>{item.name}</span> <ChevronDown className={`transition-transform ${openAccordion === item.name ? 'rotate-180' : ''}`} />
                        </button>
                        {openAccordion === item.name && (
                            <div className="pl-8 py-2 space-y-1">
                              {item.dropdown.map((subItem) => <a key={subItem.name} href={subItem.href} className="block pl-4 pr-2 py-2 rounded-md">{subItem.name}</a>)}
                            </div>
                        )} </>
                    ) : ( <a href={item.href} className="block px-4 py-3 rounded-md font-medium">{item.name}</a>)}
                </div>
            ))}
        </div>
    );
};

const Footer = () => (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-[#0b3d91]">
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
                  <h3 className="mb-4 text-lg font-bold text-slate-700">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="/" className="transition-colors hover:text-white">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/team" className="transition-colors hover:text-white">
                        Team
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="text-center md:col-span-5 md:text-left">
                  <h3 className="mb-4 text-lg font-bold text-slate-700">Contact</h3>
                  <p className="text-sm font-semibold">
                    Department of Civil and Infrastructure Engineering
                  </p>
                  <p className="text-sm text-slate-400">Indian Institute of Technology Jodhpur</p>
                  <p className="text-sm text-slate-400">NH-62, Nagour Road</p>
                  <p className="text-sm text-slate-400">Karwar 342030</p>
                  <p className="text-sm text-slate-400">Jodhpur District</p>
                  <p className="mt-2 text-sm text-slate-400">eMail: office@civil.iitj.ac.in</p>
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
                <a href="#" aria-label="Instagram" className="text-slate-400 transition-transform hover:scale-110 hover:text-white">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919 4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/>
                    </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="text-slate-400 transition-transform hover:scale-110 hover:text-white">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.98v16h4.98v-8.396c0-2.002 1.806-3.604 3.968-3.604 2.162 0 3.968 1.602 3.968 3.604v8.396h4.98v-10.396c0-6.002-4.168-10.604-9.95-10.604-4.52 0-7.232 2.704-8.982 4.396v-3.396z" />
                    </svg>
                </a>
            </div>

            <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
                <p>&copy; {new Date().getFullYear()} Civil & Infrastructure Engineering Society, IIT Jodhpur. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

/* =========================
   TEAM PAGE COMPONENTS
   ========================= */

const TeamHeader = () => (
    <div className="text-center pt-16 pb-12">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tighter"
        >
            Meet the Team
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
            The driving force behind the Civil & Infrastructure Engineering Society.
        </motion.p>
    </div>
);

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    committee: string;
    batch: string;
    photo: string;
    bio: string;
    socials: {
      linkedin: string;
      email: string;
      instagram: string;
    };
  };
}

const MemberCard = ({ member }: MemberCardProps) => (
    <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg border dark:border-gray-700/80 overflow-hidden text-center group flex flex-col p-6 w-full h-full border-t-4 ${committeeColors[member.committee] || 'border-gray-300'}`}
    >
        <img src={member.photo} alt={member.name} className="w-28 h-28 mx-auto rounded-full object-cover ring-4 ring-offset-4 ring-offset-white dark:ring-offset-gray-800 ring-gray-200 dark:ring-gray-700" loading="lazy" />
        <div className="mt-4 flex-grow">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
            <p className="text-sm text-slate-700 dark:text-blue-400 font-semibold">{member.role}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{member.batch}</p>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
            <a href={member.socials.linkedin} className="text-gray-400 hover:text-[#0077b5] transition-colors"><Linkedin size={20} /></a>
            <a href={member.socials.instagram} className="text-gray-400 hover:text-[#E1306C] transition-colors"><Instagram size={20} /></a>
            <a href={member.socials.email} className="text-gray-400 hover:text-[#9b2b2b] transition-colors"><Mail size={20} /></a>
        </div>
    </motion.div>
);

interface TeamGridProps {
  members: Array<{
    id: string;
    name: string;
    role: string;
    committee: string;
    batch: string;
    photo: string;
    bio: string;
    socials: {
      linkedin: string;
      email: string;
      instagram: string;
    };
  }>;
}

const TeamGrid = ({ members }: TeamGridProps) => (
    <AnimatePresence>
        <motion.div layout className="flex flex-wrap justify-center items-stretch gap-8 mt-10">
             {members.map(member => (
                <div key={member.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-grow" style={{ minWidth: '18rem', maxWidth: '20rem' }}>
                     <MemberCard member={member} />
                </div>
            ))}
        </motion.div>
    </AnimatePresence>
);

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => (
    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">{children}</h2>
);


function TeamPageContent() {
    const facultyLeadership = useMemo(() => TEAM_DATA.filter(m => m.committee === 'Faculty Leadership'), []);
    const coordinationCommittee = useMemo(() => TEAM_DATA.filter(m => m.committee === 'Coordination Committee'), []);
    const committeeMembers = useMemo(() => TEAM_DATA.filter(m => m.committee !== 'Faculty Leadership' && m.committee !== 'Coordination Committee'), []);
    
    const groupedAndSortedCommittees = useMemo(() => {
        const committeeOrder = [
            "Events & Community Engagement Committee",
            "Technical Committee",
            "Seminars & Academic Engagement Committee",
            "Media & Design Committee",
            "Outreach & Publicity Committee",
        ];

        const groups = committeeMembers.reduce((acc, member) => {
            const committee = member.committee;
            if (!acc[committee]) {
                acc[committee] = [];
            }
            acc[committee].push(member);
            return acc;
        }, {} as Record<string, typeof committeeMembers>);

        return Object.entries(groups).sort(([a], [b]) => {
            const aIndex = committeeOrder.indexOf(a);
            const bIndex = committeeOrder.indexOf(b);
            if (aIndex === -1 && bIndex === -1) return 0;
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
        });
    }, [committeeMembers]);

    return (
        <>
            <TeamHeader />
            
            <section className="container mx-auto px-6 py-12">
                <SectionTitle>Faculty Leadership</SectionTitle>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto" style={{ maxWidth: '1100px' }}>
                    {facultyLeadership.map(member => (
                         <MemberCard key={member.id} member={member} />
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-6 py-12 bg-white/50 dark:bg-gray-800/30 rounded-3xl my-12">
                <SectionTitle>Coordination Committee</SectionTitle>
                 <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto" style={{ maxWidth: '1100px' }}>
                    {coordinationCommittee.map(member => (
                        <MemberCard key={member.id} member={member} />
                    ))}
                </div>
            </section>
            
            <section id="student-committees" className="py-12">
                 <div className="container mx-auto px-6">
                    <SectionTitle>Committee Members</SectionTitle>
                    <div className="mt-10 space-y-20">
                        {groupedAndSortedCommittees.map(([committeeName, members]) => (
                            <div key={committeeName}>
                                <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-8">{committeeName.replace(" Committee", "")}</h3>
                                <TeamGrid members={members} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}


/* =========================
   MAIN PAGE WRAPPER
   ========================= */
export default function TeamPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
    const handleScroll = () => setIsSticky(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans`}>
      <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"></div>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isDarkMode={isDarkMode} toggleTheme={toggleTheme} isSticky={isSticky} />
      <main className="pt-24 isolate">
        <TeamPageContent />
      </main>
      <Footer />
    </div>
  );
}
