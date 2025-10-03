'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInOnScroll from '@/components/layout/FadeInOnScroll';
import AppLayout from '@/components/layout/AppLayout';
import {
  Building2,
  Users,
  Target,
  ChevronDown,
  Download,
  ExternalLink,
  Lightbulb,
  BookOpen,
  Rocket,
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Blueprint background pattern */}
        <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"></div>

        <main className="pt-20">
          <HeroSection />
          <Block1Section />
          <PillarPanelsSection />
          <EdificioPhotoEssay />
          <PartnerLogoStrip />
        </main>
      </div>
    </AppLayout>
  );
}

// --- Hero Section with Large Photo ---
const HeroSection = () => (
  <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
    {/* Background Image - CMS Placeholder */}
    <div className="absolute inset-0">
      {/* Primary gradient background - works for both light and dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b3d91] via-blue-800 to-blue-900 dark:via-blue-900 dark:to-slate-900"></div>
      
      {/* CIE Design background image */}
      <div 
        className="absolute inset-0 bg-[url('/CIE%20Design.png')] bg-cover bg-center opacity-20 mix-blend-overlay"
        style={{ backgroundPosition: 'center' }}
      ></div>
      
      {/* Engineering Grid Overlay - Enhanced */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_2px,transparent_2px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_2px,transparent_2px)] bg-[size:60px_60px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Animated particles/floating elements */}
      <motion.div
        className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-cyan-400"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[15%] top-[30%] h-3 w-3 rounded-full bg-blue-400"
        animate={{ y: [0, 40, 0], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute left-[20%] bottom-[25%] h-2 w-2 rounded-full bg-cyan-300"
        animate={{ y: [0, -25, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>

    {/* Overlay for Readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50 dark:from-black/50 dark:via-black/30 dark:to-black/60"></div>

    {/* Decorative corner frames */}
    <div className="absolute left-8 top-8 h-24 w-24 border-l-4 border-t-4 border-cyan-300/60 dark:border-cyan-400/50"></div>
    <div className="absolute right-8 top-8 h-24 w-24 border-r-4 border-t-4 border-cyan-300/60 dark:border-cyan-400/50"></div>
    <div className="absolute bottom-8 left-8 h-24 w-24 border-b-4 border-l-4 border-cyan-300/60 dark:border-cyan-400/50"></div>
    <div className="absolute bottom-8 right-8 h-24 w-24 border-b-4 border-r-4 border-cyan-300/60 dark:border-cyan-400/50"></div>

    {/* Hero Content */}
    <div className="relative z-10 flex h-full items-center justify-center px-6">
      <div className="max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 inline-block"
          >
            <span className="rounded-full border-2 border-cyan-300/60 bg-cyan-300/15 px-6 py-2 text-sm font-semibold text-white backdrop-blur-sm dark:border-cyan-400/50 dark:bg-cyan-400/10 dark:text-cyan-300">
              IIT Jodhpur
            </span>
          </motion.div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white drop-shadow-lg md:text-7xl lg:text-8xl">
            About <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-400">CIES</span>
          </h1>
          
          <div className="mx-auto mb-8 h-1.5 w-40 rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent dark:via-cyan-400"></div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-100 drop-shadow-md md:text-xl lg:text-2xl dark:text-gray-200"
          >
            Constructing a Better Future: <span className="font-semibold text-cyan-200 dark:text-cyan-300">Integrity in Design</span>,{' '}
            <span className="font-semibold text-cyan-200 dark:text-cyan-300">Sustainability in Action</span>,{' '}
            <span className="font-semibold text-cyan-200 dark:text-cyan-300">Cementing Community with Compassion</span>
          </motion.p>

          {/* Statistics Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 grid grid-cols-3 gap-6 text-white"
          >
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <div className="text-3xl font-bold text-cyan-300 drop-shadow-md md:text-4xl dark:text-cyan-400">500+</div>
              <div className="mt-1 text-sm text-gray-100 md:text-base dark:text-gray-300">Active Members</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <div className="text-3xl font-bold text-cyan-300 drop-shadow-md md:text-4xl dark:text-cyan-400">50+</div>
              <div className="mt-1 text-sm text-gray-100 md:text-base dark:text-gray-300">Events Annually</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <div className="text-3xl font-bold text-cyan-300 drop-shadow-md md:text-4xl dark:text-cyan-400">100+</div>
              <div className="mt-1 text-sm text-gray-100 md:text-base dark:text-gray-300">Industry Partners</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <motion.div
      className="absolute bottom-12 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, repeat: Infinity, repeatType: 'reverse' }}
    >
      <ChevronDown className="h-6 w-6 text-cyan-300 drop-shadow-lg dark:text-cyan-400" />
    </motion.div>
  </section>
);

// --- Block 1: Two-Column About Section ---
const Block1Section = () => (
  <section className="relative overflow-hidden bg-white py-20 dark:bg-gray-900 lg:py-32">
    {/* Subtle background pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"></div>
    
    <div className="container relative mx-auto max-w-7xl px-6">
      <FadeInOnScroll>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl"
            >
              {/* CMS Placeholder Image - Enhanced with better visuals */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b3d91] via-blue-700 to-cyan-600">
                {/* Engineering pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                
                {/* Central icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="h-40 w-40 text-white/20" strokeWidth={1.5} />
                </div>
                
                {/* Logo overlay */}
                <img
                  src="/CIE%20Design.png"
                  alt="CIES IIT Jodhpur"
                  className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-overlay"
                />
              </div>
              
              {/* Decorative Corner Frames - Enhanced */}
              <div className="absolute left-4 top-4 h-20 w-20 border-l-4 border-t-4 border-cyan-300/70"></div>
              <div className="absolute bottom-4 right-4 h-20 w-20 border-b-4 border-r-4 border-cyan-300/70"></div>
              
              {/* Additional decorative elements */}
              <motion.div
                className="absolute right-6 top-6 h-12 w-12 rounded-lg border-2 border-white/30 backdrop-blur-sm"
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-8 -left-8 max-w-xs rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-gray-900 dark:text-white">500+</p>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Members</p>
                </div>
              </div>
            </motion.div>

            {/* Background decorative blob */}
            <motion.div
              className="absolute -right-10 -top-10 -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Right Column - Content */}
          <div className="order-1 space-y-6 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-5 py-2 text-sm font-bold text-[#0b3d91] dark:from-blue-900/50 dark:to-cyan-900/50 dark:text-cyan-300">
                Who We Are
              </span>
              <h2 className="mt-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-extrabold text-transparent dark:from-white dark:to-gray-300 lg:text-5xl">
                Bridging Knowledge,{' '}
                <span className="bg-gradient-to-r from-[#0b3d91] to-cyan-600 bg-clip-text dark:from-cyan-400 dark:to-blue-400">
                  Building Community
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5 text-lg leading-relaxed"
            >
              <p className="text-gray-700 dark:text-gray-300">
                {/* CMS Placeholder: Block 1 Content */}
                The <span className="font-semibold text-[#0b3d91] dark:text-cyan-400">Civil & Infrastructure Engineering Society (CIES)</span> IIT Jodhpur 
                serves as a bridge between students, faculty, alumni, and industry, fostering a vibrant and collaborative 
                departmental community.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Functioning under the aegis of the Board of Departmental 
                Societies and the Department of Civil and Infrastructure Engineering, the society is 
                dedicated to cultivating <span className="font-semibold">meaningful interactions</span>, <span className="font-semibold">shared learning</span>, 
                and a <span className="font-semibold">strong sense of belonging</span> among all stakeholders.
              </p>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 py-6"
            >
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Lightbulb className="h-6 w-6 text-[#0b3d91] dark:text-cyan-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Innovation</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30">
                  <BookOpen className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Learning</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Users className="h-6 w-6 text-[#0b3d91] dark:text-cyan-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Community</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href="/team"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0b3d91] to-blue-700 px-7 py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                Meet Our Team
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0b3d91] px-7 py-3.5 font-semibold text-[#0b3d91] transition-all hover:bg-[#0b3d91] hover:text-white dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-gray-900"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  </section>
);

// --- Pillar Panels Section ---
interface PillarPanel {
  id: string;
  icon: React.ReactNode;
  title: string;
  stat: string;
  statLabel: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
}

const PillarPanelsSection = () => {
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

  // CMS Placeholder: Pillar Panel Data
  const pillars: PillarPanel[] = [
    {
      id: 'mission',
      icon: <Target className="h-8 w-8" />,
      title: 'Our Mission',
      stat: '50+',
      statLabel: 'Events Annually',
      shortDescription: 'Fostering technical growth, ethical practices, and industry-readiness through transformative initiatives.',
      fullDescription: 'CIES is committed to fostering technical growth, ethical practices, and industry-readiness through a range of initiatives such as seminars, workshops, technical sessions, and hands-on experiences. Through active student-faculty engagement, it also promotes leadership, collaboration, and sustainable thinking, in line with the society\'s guiding motto: "Constructing a Better Future: Integrity in Design, Sustainability in Action, Cementing Community with Compassion."',
      image: 'from-blue-600 to-purple-600',
    },
    {
      id: 'edificio',
      icon: <Building2 className="h-8 w-8" />,
      title: 'EDIFICIO',
      stat: '1000+',
      statLabel: 'Participants',
      shortDescription: 'Our flagship technical festival—a national platform for innovation and experiential learning.',
      fullDescription: 'EDIFICIO is the flagship technical festival of the department, organized entirely by the student society. It offers budding civil engineers a national platform to explore and innovate through design challenges, workshops, lectures, panel discussions, and collaborative problem-solving. EDIFICIO continues to evolve as a space for experiential learning, interdisciplinary dialogue, and industry-academia synergy.',
      image: 'from-cyan-600 to-blue-600',
    },
    {
      id: 'vision',
      icon: <Users className="h-8 w-8" />,
      title: 'Our Vision',
      stat: '100+',
      statLabel: 'Industry Partners',
      shortDescription: 'Building a nationally collaborative platform that catalyzes innovation and professional development.',
      fullDescription: 'The society aspires to foster a nationally collaborative platform for the Civil Engineering discipline—bringing together academic institutions, industry stakeholders, and research partners to catalyze innovation, professional development, and cross-institute engagement. It envisions infrastructure as a true driver of human progress, bridging academia and industry, and empowering all who pursue excellence in this vital domain.',
      image: 'from-indigo-600 to-cyan-600',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeInOnScroll>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Our <span className="text-blue-600">Pillars</span>
            </h2>
            <div className="mx-auto h-1.5 w-24 rounded-full bg-blue-600"></div>
          </div>
        </FadeInOnScroll>

        <div className="space-y-6">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              isExpanded={expandedPanel === pillar.id}
              onToggle={() => setExpandedPanel(expandedPanel === pillar.id ? null : pillar.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Pillar Card Component ---
interface PillarCardProps {
  pillar: PillarPanel;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

const PillarCard: React.FC<PillarCardProps> = ({ pillar, isExpanded, onToggle, index }) => (
  <FadeInOnScroll delay={index * 0.1}>
    <motion.div
      layout
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl transition-all hover:shadow-2xl hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
    >
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-12 lg:gap-10">
        {/* Image Section */}
        <div className="lg:col-span-4">
          <motion.div 
            className={`relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${pillar.image} shadow-lg`}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {pillar.icon}
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6"
                >
                  <div className="text-5xl font-extrabold tracking-tight">{pillar.stat}</div>
                  <div className="mt-2 text-base font-medium opacity-95">{pillar.statLabel}</div>
                </motion.div>
              </div>
            </div>
            
            {/* Decorative Elements - Enhanced */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Animated overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />

            {/* Corner accents */}
            <div className="absolute left-3 top-3 h-12 w-12 border-l-2 border-t-2 border-white/40"></div>
            <div className="absolute bottom-3 right-3 h-12 w-12 border-b-2 border-r-2 border-white/40"></div>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col lg:col-span-8">
          <div className="flex-1">
            <h3 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white lg:text-4xl">
              {pillar.title}
            </h3>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {pillar.shortDescription}
            </p>
          </div>

          {/* Expand Button */}
          <button
            onClick={onToggle}
            className="group/btn mt-8 inline-flex items-center gap-2 self-start rounded-full border-2 border-[#0b3d91] bg-transparent px-8 py-3 font-semibold text-[#0b3d91] transition-all hover:bg-[#0b3d91] hover:text-white hover:shadow-lg dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-gray-900"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${pillar.title}`}
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 transition-transform group-hover/btn:translate-y-0.5" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white px-8 py-8 dark:border-gray-700 dark:from-gray-900/50 dark:to-gray-800/50">
              <div className="mx-auto max-w-4xl">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {pillar.fullDescription}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </FadeInOnScroll>
);

// --- EDIFICIO Photo Essay Section ---
const EdificioPhotoEssay = () => {
  // CMS Placeholder: Photo Essay Images
  const photos = [
    { id: 1, alt: 'Design Competition', gradient: 'from-[#0b3d91] to-blue-600', icon: <Rocket className="h-20 w-20" /> },
    { id: 2, alt: 'Technical Workshop', gradient: 'from-blue-600 to-cyan-600', icon: <BookOpen className="h-20 w-20" /> },
    { id: 3, alt: 'Guest Lecture', gradient: 'from-cyan-600 to-teal-600', icon: <Users className="h-20 w-20" /> },
    { id: 4, alt: 'Panel Discussion', gradient: 'from-teal-600 to-green-600', icon: <Target className="h-20 w-20" /> },
    { id: 5, alt: 'Innovation Showcase', gradient: 'from-green-600 to-emerald-600', icon: <Lightbulb className="h-20 w-20" /> },
    { id: 6, alt: 'Networking Session', gradient: 'from-emerald-600 to-cyan-600', icon: <Building2 className="h-20 w-20" /> },
  ];

  return (
    <section id="edificio" className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-blue-50 to-slate-100 py-24 text-gray-900 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 dark:text-white">
      {/* Background Pattern - Enhanced */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_2px,transparent_2px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_2px,transparent_2px)] bg-[size:50px_50px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_2px,transparent_2px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_2px,transparent_2px)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,61,145,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,61,145,0.03)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.05)_1px,transparent_1px)]"></div>
      
      {/* Gradient orbs */}
      <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl dark:bg-cyan-600/10"></div>
      <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl dark:bg-blue-600/10"></div>

      <div className="container relative mx-auto max-w-7xl px-6">
        <FadeInOnScroll>
          <div className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full border-2 border-[#0b3d91]/30 bg-[#0b3d91]/10 px-6 py-2 text-sm font-semibold text-[#0b3d91] backdrop-blur-sm dark:border-cyan-400/50 dark:bg-cyan-400/10 dark:text-cyan-300">
                Our Flagship Event
              </span>
            </motion.div>
            
            <h2 className="mb-6 mt-6 text-5xl font-extrabold md:text-6xl">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-slate-800 bg-clip-text text-transparent dark:from-white dark:via-cyan-200 dark:to-blue-200">
                EDIFICIO:
              </span>{' '}
              <span className="bg-gradient-to-r from-[#0b3d91] to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-400">
                A Visual Journey
              </span>
            </h2>
            
            <div className="mx-auto mb-8 h-1.5 w-40 rounded-full bg-gradient-to-r from-transparent via-[#0b3d91] to-transparent dark:via-cyan-400"></div>
            
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700 md:text-xl dark:text-gray-300">
              Explore the highlights of our flagship technical festival through this curated photo essay. 
              EDIFICIO brings together innovation, learning, and collaboration in civil engineering.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Photo Grid - Enhanced */}
        <FadeInOnScroll delay={0.2}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl"
              >
                {/* CMS Placeholder: Replace with actual images */}
                <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`}>
                  {/* Engineering grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                  
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    {photo.icon}
                  </div>

                  {/* Corner frames */}
                  <div className="absolute left-3 top-3 h-12 w-12 border-l-2 border-t-2 border-white/30"></div>
                  <div className="absolute bottom-3 right-3 h-12 w-12 border-b-2 border-r-2 border-white/30"></div>
                </div>
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b3d91]/90 via-blue-900/60 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100 dark:from-black/80 dark:via-black/50">
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center text-white">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-2xl font-bold">{photo.alt}</p>
                      <p className="mt-2 text-sm text-gray-200 dark:text-gray-300">Click to view gallery</p>
                    </motion.div>
                  </div>
                </div>

                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </FadeInOnScroll>

        {/* PDF Download - Enhanced */}
        <FadeInOnScroll delay={0.4}>
          <div className="mt-20 text-center">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#0b3d91] to-blue-600 px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all hover:shadow-blue-500/50 dark:from-cyan-500 dark:to-blue-500 dark:hover:shadow-cyan-500/50"
              aria-label="Download EDIFICIO Brochure PDF"
            >
              <Download className="h-6 w-6 transition-transform group-hover:translate-y-1" />
              Download EDIFICIO Brochure
            </motion.a>
            <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
              {/* CMS Placeholder: PDF size and format */}
              <span className="font-semibold text-[#0b3d91] dark:text-cyan-400">PDF</span> · 5.2 MB · Complete Event Highlights & Gallery
            </p>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

// --- Partner Logo Strip ---
const PartnerLogoStrip = () => {
  // CMS Placeholder: Partner Logos
  const partners = [
    { id: 1, name: 'Industry Partner 1', category: 'Construction' },
    { id: 2, name: 'Academic Partner 2', category: 'Research' },
    { id: 3, name: 'Tech Partner 3', category: 'Technology' },
    { id: 4, name: 'Industry Partner 4', category: 'Infrastructure' },
    { id: 5, name: 'Academic Partner 5', category: 'Education' },
    { id: 6, name: 'Corporate Partner 6', category: 'Innovation' },
  ];

  return (
    <section className="relative overflow-hidden border-t-2 border-gray-200 bg-gradient-to-b from-white to-gray-50 py-20 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"></div>

      <div className="container relative mx-auto max-w-7xl px-6">
        <FadeInOnScroll>
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-5 py-2 text-sm font-bold text-[#0b3d91] dark:from-blue-900/50 dark:to-cyan-900/50 dark:text-cyan-300">
                Our Network
              </span>
            </motion.div>
            
            <h2 className="mb-6 mt-6 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
              Trusted <span className="bg-gradient-to-r from-[#0b3d91] to-cyan-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-400">Partners</span>
            </h2>
            
            <div className="mx-auto mb-6 h-1.5 w-32 rounded-full bg-gradient-to-r from-transparent via-[#0b3d91] to-transparent dark:via-cyan-400"></div>
            
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Collaborating with industry leaders, academic institutions, and innovators to drive excellence in civil engineering.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group flex items-center justify-center"
              >
                {/* CMS Placeholder: Replace with actual partner logos */}
                <div className="relative flex h-32 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg transition-all hover:border-[#0b3d91] hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-400">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0b3d91]/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-cyan-400/10 dark:to-blue-400/10"></div>
                  
                  {/* Partner icon placeholder */}
                  <div className="relative z-10 mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0b3d91] to-cyan-600 dark:from-cyan-400 dark:to-blue-400">
                    <Building2 className="h-6 w-6 text-white dark:text-gray-900" />
                  </div>
                  
                  {/* Partner name */}
                  <span className="relative z-10 text-center text-xs font-bold text-gray-700 dark:text-gray-300">
                    {partner.name}
                  </span>
                  
                  {/* Category badge */}
                  <span className="relative z-10 mt-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    {partner.category}
                  </span>

                  {/* Corner accents */}
                  <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-gray-300 opacity-50 transition-colors group-hover:border-[#0b3d91] dark:border-gray-600 dark:group-hover:border-cyan-400"></div>
                  <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-gray-300 opacity-50 transition-colors group-hover:border-[#0b3d91] dark:border-gray-600 dark:group-hover:border-cyan-400"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeInOnScroll>

        {/* Partnership CTA */}
        <FadeInOnScroll delay={0.4}>
          <div className="mt-16 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-10 text-center backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0b3d91] to-cyan-600 dark:from-cyan-400 dark:to-blue-400">
                <Users className="h-8 w-8 text-white dark:text-gray-900" />
              </div>
              
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Interested in Partnering with Us?
              </h3>
              
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Join our network of industry leaders and academic institutions shaping the future of civil engineering.
              </p>
              
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0b3d91] to-blue-700 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Get in Touch
                <ExternalLink className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

