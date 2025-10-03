'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInOnScroll from '@/components/layout/FadeInOnScroll';
import AppLayout from '@/components/layout/AppLayout';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// --- Main Page Component ---
export default function HomePage() {
  return (
    <AppLayout>
    <div
      className={`bg-gray-50 font-sans text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200`}
    >
      {/* Blueprint background pattern */}
      <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"></div>

      <main className="isolate pt-24">
        <HeroSection />
        <RecentActivities />
      </main>
    </div>
    </AppLayout>
  );
}

// --- Ultra-Detailed Animated CIES Logo Component ---
const AnimatedCIESLogo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const letterVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 2.2, ease: 'easeInOut' } 
    },
  };

  const structureVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.8, ease: 'easeInOut', delay: 0.3 } 
    },
  };

  const circuitVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 2, ease: 'easeInOut', delay: 0.6 } 
    },
  };

  const detailVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.5, ease: 'easeInOut', delay: 0.9 } 
    },
  };

  const baseVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.8, ease: 'easeInOut', delay: 1.2 } 
    },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 700 320"
      className="mx-auto h-auto w-full text-[#0b3d91] dark:text-cyan-400 drop-shadow-[0_0_30px_rgba(11,61,145,0.3)] dark:drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {/* Shift the CIES lettering slightly to the right for centering */}
      <motion.g transform="translate(20,0)">
      {/* Letter C - Enhanced with detailed internal systems */}
      <motion.path
        className="text-[#0b3d91] dark:text-cyan-200"
        variants={letterVariants}
        d="M90 90 Q35 90 35 160 Q35 230 90 230 L130 230"
        strokeWidth="8"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      {/* C structural framework */}
      <motion.path
        variants={structureVariants}
        d="M50 110 L85 110 M50 130 L75 130 M50 150 L85 150 M50 170 L75 170 M50 190 L85 190 M50 210 L85 210"
        strokeWidth="3"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      {/* C complex circuit patterns */}
      <motion.path
        variants={circuitVariants}
        d="M55 115 L75 115 L75 125 L65 125 L65 135 L80 135 M55 140 L65 140 L65 150 L80 150 M55 165 L70 165 L70 175 L60 175 L60 185 L85 185 M55 200 L85 200 L85 210 L70 210"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      {/* C mechanical components - gears and systems */}
      <motion.circle variants={detailVariants} cx="65" cy="125" r="10" strokeWidth="2.5" stroke="currentColor" fill="none" />
      <motion.path variants={detailVariants} d="M58 120 L72 120 M58 130 L72 130 M65 113 L65 137 M60 118 L70 118 M60 132 L70 132" strokeWidth="1.5" stroke="currentColor" />
      <motion.circle variants={detailVariants} cx="75" cy="180" r="8" strokeWidth="2" stroke="currentColor" fill="none" />
      <motion.path variants={detailVariants} d="M70 175 L80 175 M70 185 L80 185 M75 172 L75 188 M72 177 L78 177 M72 183 L78 183" strokeWidth="1" stroke="currentColor" />
      {/* C additional technical details */}
      <motion.rect variants={detailVariants} x="58" y="195" width="12" height="8" strokeWidth="1.5" stroke="currentColor" fill="none" />
      <motion.path variants={detailVariants} d="M60 197 L68 197 M60 201 L68 201" strokeWidth="0.8" stroke="currentColor" />

      {/* Letter I - Enhanced tower with complex truss system */}
      <motion.path
        className="text-[#0b3d91] dark:text-cyan-200"
        variants={letterVariants}
        d="M200 90 L200 230 M165 90 L235 90 M165 230 L235 230"
        strokeWidth="8"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      {/* I enhanced tower framework */}
      <motion.path
        variants={structureVariants}
        d="M175 105 L225 105 M180 120 L220 120 M175 135 L225 135 M180 150 L220 150 M175 165 L225 165 M180 180 L220 180 M175 195 L225 195 M180 210 L220 210"
        strokeWidth="3"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      {/* I complex cross-bracing system */}
      <motion.path
        variants={circuitVariants}
        d="M175 110 L220 125 M220 110 L175 125 M175 140 L220 155 M220 140 L175 155 M175 170 L220 185 M220 170 L175 185 M175 200 L220 215 M220 200 L175 215"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      {/* I rivets and connection details */}
      <motion.circle variants={detailVariants} cx="177" cy="107" r="3" fill="currentColor" />
      <motion.circle variants={detailVariants} cx="223" cy="107" r="3" fill="currentColor" />
      <motion.circle variants={detailVariants} cx="177" cy="213" r="3" fill="currentColor" />
      <motion.circle variants={detailVariants} cx="223" cy="213" r="3" fill="currentColor" />
      <motion.circle variants={detailVariants} cx="200" cy="135" r="2" fill="currentColor" />
      <motion.circle variants={detailVariants} cx="200" cy="165" r="2" fill="currentColor" />
      {/* I internal mechanical systems */}
      <motion.path variants={detailVariants} d="M185 115 L215 115 L210 125 L190 125 Z M185 145 L215 145 L210 155 L190 155 Z M185 175 L215 175 L210 185 L190 185 Z" strokeWidth="1.5" stroke="currentColor" fill="none" />
      {/* I additional structural details */}
      <motion.path variants={circuitVariants} d="M190 130 L210 130 M195 140 L205 140 M190 160 L210 160 M195 170 L205 170 M190 190 L210 190 M195 200 L205 200" strokeWidth="1" stroke="currentColor" />

      {/* Letter E - Enhanced with complex structural grid */}
      <motion.path
        className="text-[#0b3d91] dark:text-cyan-200"
        variants={letterVariants}
        d="M300 90 L300 230 M300 90 L390 90 M300 160 L370 160 M300 230 L390 230"
        strokeWidth="8"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      {/* E enhanced structural framework */}
      <motion.path
        variants={structureVariants}
        d="M315 105 L380 105 M320 115 L360 115 M315 125 L380 125 M320 135 L350 135 M315 145 L350 145 M315 175 L350 175 M320 185 L350 185 M315 195 L380 195 M320 205 L360 205 M315 215 L380 215"
        strokeWidth="3"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      {/* E complex circuit and connection patterns */}
      <motion.path
        variants={circuitVariants}
        d="M325 110 L340 110 L340 120 L355 120 L355 130 L370 130 M325 140 L345 140 L345 150 L365 150 M325 180 L340 180 L340 190 L355 190 L355 200 L370 200 M325 210 L365 210"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      {/* E mechanical components and systems */}
      <motion.rect variants={detailVariants} x="330" y="110" width="12" height="10" strokeWidth="2" stroke="currentColor" fill="none" />
      <motion.rect variants={detailVariants} x="345" y="180" width="8" height="8" strokeWidth="1.5" stroke="currentColor" fill="none" />
      <motion.circle variants={detailVariants} cx="355" cy="135" r="6" strokeWidth="2" stroke="currentColor" fill="none" />
      <motion.path variants={detailVariants} d="M352 130 L358 130 M352 140 L358 140 M355 127 L355 143" strokeWidth="1" stroke="currentColor" />
      {/* E additional technical details */}
      <motion.path variants={circuitVariants} d="M310 100 L385 100 M310 120 L375 120 M310 170 L375 170 M310 190 L385 190 M310 220 L385 220" strokeWidth="1" stroke="currentColor" opacity="0.7" />

      {/* Letter S - Enhanced with complex curved systems (scaled up slightly) */}
      <motion.g transform="translate(20,0) translate(450,160) scale(1.12) translate(-450,-160)">
        <motion.path
          className="text-[#0b3d91] dark:text-cyan-200"
          variants={letterVariants}
          d="M480 110 Q445 90 410 110 Q390 130 410 150 Q430 165 455 165 Q480 165 490 185 Q500 205 480 220 Q445 235 410 215"
          strokeWidth="8"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
        />
        {/* S internal curved structural systems */}
        <motion.path
          variants={structureVariants}
          d="M425 105 Q415 100 405 105 M475 200 Q465 205 455 200 M420 120 L435 135 L450 145 M470 180 L455 195 L440 205"
          strokeWidth="3"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
        />
        {/* S complex internal circuits */}
        <motion.path
          variants={circuitVariants}
          d="M430 115 Q420 110 410 115 M470 190 Q460 195 450 190 M425 125 L440 140 L455 150 M465 175 L450 190 L435 200"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
        />
        {/* S mechanical gears and systems */}
        <motion.circle variants={detailVariants} cx="425" cy="130" r="9" strokeWidth="2.5" stroke="currentColor" fill="none" />
        <motion.path variants={detailVariants} d="M418 125 L432 125 M418 135 L432 135 M425 121 L425 139 M420 127 L430 127 M420 133 L430 133" strokeWidth="1.5" stroke="currentColor" />
        <motion.circle variants={detailVariants} cx="465" cy="190" r="8" strokeWidth="2" stroke="currentColor" fill="none" />
        <motion.path variants={detailVariants} d="M460 185 L470 185 M460 195 L470 195 M465 182 L465 198 M462 187 L468 187 M462 193 L468 193" strokeWidth="1" stroke="currentColor" />
        {/* S additional curved details */}
        <motion.path variants={detailVariants} d="M415 120 Q425 115 435 120 M455 195 Q465 190 475 195" strokeWidth="1.5" stroke="currentColor" />
      </motion.g>

      </motion.g>

      {/* Compact foundation structure */}
      <motion.path
        variants={baseVariants}
        d="M60 250 L640 250"
        strokeWidth="4"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      <motion.path
        variants={baseVariants}
        d="M90 265 L610 265 M130 275 L570 275 M170 285 L530 285 M210 295 L490 295"
        strokeWidth="2.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Compact foundation elements */}
      <motion.path
        variants={baseVariants}
        d="M350 305 L340 315 L350 325 L360 315 Z"
        strokeWidth="2"
        stroke="currentColor"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <motion.path
        variants={baseVariants}
        d="M310 310 L305 315 L310 320 L315 315 Z M390 310 L385 315 L390 320 L395 315 Z"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="currentColor"
        fillOpacity="0.3"
      />

      {/* Compact blueprint corner frames */}
      <motion.path
        variants={baseVariants}
        d="M20 20 L20 45 M20 20 L45 20 M655 20 L655 45 M655 20 L630 20 M20 300 L20 275 M20 300 L45 300 M655 300 L655 275 M655 300 L630 300"
        strokeWidth="2.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Enhanced technical connection network */}
      <motion.path
        variants={circuitVariants}
        d="M120 100 L160 100 M120 240 L160 240 M240 100 L290 100 M240 240 L290 240 M400 100 L440 120 M400 240 L440 220 M140 160 L280 160 M420 160 L560 160"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      
      {/* Additional micro-details and connection points */}
      <motion.circle variants={detailVariants} cx="140" cy="160" r="2" fill="currentColor" opacity="0.7" />
      <motion.circle variants={detailVariants} cx="280" cy="160" r="2" fill="currentColor" opacity="0.7" />
      <motion.circle variants={detailVariants} cx="420" cy="160" r="2" fill="currentColor" opacity="0.7" />
      <motion.circle variants={detailVariants} cx="560" cy="160" r="2" fill="currentColor" opacity="0.7" />
    </motion.svg>
  );
};

// --- CIE Hero Design Component ---
const CIEHeroDesign = () => {
  return (
    <div className="relative">
      {/* Decorative diamond in bottom right */}
    <motion.div
        className="absolute bottom-8 right-8 h-16 w-16 rotate-45 bg-gradient-to-br from-gray-400 to-gray-600 opacity-30"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.3, rotate: 45 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
        }}
      />
      
      <div className="space-y-6">
        {/* Animated CIES Logo at the top - smaller size */}
        <div className="max-w-2xl mx-auto">
          <AnimatedCIESLogo />
        </div>

        {/* Text content below logo - more compact */}
        <div className="space-y-3">
          <motion.h1 
            className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Civil & Infrastructure Engineering
            <br />
            <span className="block">Society</span>
          </motion.h1>
          
          <motion.h2 
            className="text-2xl font-bold text-[#0b3d91] dark:text-blue-400 md:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
          IIT Jodhpur
          </motion.h2>
          
          <motion.p 
            className="text-base text-gray-700 dark:text-gray-300 md:text-lg lg:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Building Futures, Strengthening Foundations
          </motion.p>
        </div>
      </div>
    </div>
  );
};

// --- Hero Section ---
const HeroSection = () => (
  <section className="relative mx-auto flex min-h-[calc(100vh-6rem)] w-full items-center justify-center overflow-hidden px-6 pb-12 pt-16">
    {/* Theme-aware background overlay */}
    <div className="absolute inset-0 bg-white dark:bg-slate-900/80 z-0"></div>
    
    {/* Engineering Grid Background - Dark blue-gray for light mode */}
    <div className="absolute inset-0 z-0">
      {/* Main grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,41,59,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.15)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      {/* Secondary grid - finer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,41,59,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
      {/* Major grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,41,59,0.25)_2px,transparent_2px),linear-gradient(to_bottom,rgba(30,41,59,0.25)_2px,transparent_2px)] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.15)_2px,transparent_2px),linear-gradient(to_bottom,rgba(56,189,248,0.15)_2px,transparent_2px)] bg-[size:200px_200px]"></div>
    </div>
    
    {/* Subtle background effects - Dark navy tones for light mode */}
    <div className="absolute inset-0 z-0 opacity-12 dark:opacity-20">
      <div className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-slate-800/8 dark:bg-blue-500/10 blur-3xl"></div>
      <div className="absolute left-1/4 top-1/3 h-[40rem] w-[40rem] animate-pulse rounded-full bg-slate-900/6 dark:bg-cyan-500/8 blur-3xl [animation-delay:-3s]"></div>
    </div>
    
    <div className="relative z-10 w-full max-w-6xl text-center">
      <CIEHeroDesign />
      </div>
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
    <section id="activities" className="relative overflow-hidden py-16 -mt-4">
      {/* Theme-aware overlay to match hero tone */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-slate-900/80 dark:via-slate-900 dark:to-slate-900/80"></div>
      {/* Theme-aware engineering grid background with dark blue-gray */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,61,145,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,61,145,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,61,145,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,61,145,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,61,145,0.12)_2px,transparent_2px),linear-gradient(to_bottom,rgba(11,61,145,0.12)_2px,transparent_2px)] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.12)_2px,transparent_2px),linear-gradient(to_bottom,rgba(56,189,248,0.12)_2px,transparent_2px)] bg-[size:200px_200px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        <FadeInOnScroll>
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            Recent Activities
            <span className="mx-auto mt-3 block h-1 w-24 rounded-full bg-[#0b3d91] dark:bg-cyan-400"></span>
          </h2>
        </FadeInOnScroll>
        
        <FadeInOnScroll>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.3 }} 
            className="bg-white/90 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700/80 p-6 md:p-8 max-w-6xl mx-auto overflow-hidden relative"
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10 shadow-xl border border-gray-200 dark:border-gray-700"
              aria-label="Previous Activity"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-gray-300" />
            </button>
            <button 
              onClick={nextActivity} 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10 shadow-xl border border-gray-200 dark:border-gray-700"
              aria-label="Next Activity"
            >
              <ChevronRight className="h-6 w-6 text-gray-800 dark:text-gray-300" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {recentActivities.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => goToActivity(index)} 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-[#0b3d91] dark:bg-cyan-400 w-8' 
                      : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 w-3'
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

