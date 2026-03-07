'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeInOnScroll from '@/components/layout/FadeInOnScroll';
import AppLayout from '@/components/layout/AppLayout';
import {
  Users,
  Target,
  Download,
  BookOpen,
  Rocket,
  Calendar,
  MapPin,
  Trophy,
  Zap,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function EdificioPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Blueprint background pattern */}
        <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"></div>

        <main className="pt-20">
          <EdificioHeroSection />
          <EdificioAboutSection />
          <EdificioHighlights />
          <EdificioPhotoGallery />
          <EdificioCTA />
        </main>
      </div>
    </AppLayout>
  );
}

// --- Edificio Hero Section ---
const EdificioHeroSection = () => (
  <section className="relative min-h-[60vh] sm:min-h-[70vh] overflow-hidden flex items-center">
    {/* Background */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b3d91] via-blue-800 to-cyan-700 dark:via-blue-900 dark:to-slate-900"></div>
      
      {/* Engineering Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_2px,transparent_2px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_2px,transparent_2px)] bg-[size:60px_60px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Animated particles */}
      <motion.div
        className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-cyan-400"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[15%] top-[30%] h-3 w-3 rounded-full bg-yellow-400"
        animate={{ y: [0, 40, 0], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50"></div>

    {/* Corner frames - Desktop only */}
    <div className="hidden sm:block absolute left-8 top-8 h-24 w-24 border-l-4 border-t-4 border-cyan-300/60"></div>
    <div className="hidden sm:block absolute right-8 top-8 h-24 w-24 border-r-4 border-t-4 border-cyan-300/60"></div>
    <div className="hidden sm:block absolute bottom-8 left-8 h-24 w-24 border-b-4 border-l-4 border-cyan-300/60"></div>
    <div className="hidden sm:block absolute bottom-8 right-8 h-24 w-24 border-b-4 border-r-4 border-cyan-300/60"></div>
    
    {/* Mobile corner frames */}
    <div className="sm:hidden absolute left-4 top-4 h-12 w-12 border-l-2 border-t-2 border-cyan-300/60"></div>
    <div className="sm:hidden absolute right-4 top-4 h-12 w-12 border-r-2 border-t-2 border-cyan-300/60"></div>
    <div className="sm:hidden absolute bottom-4 left-4 h-12 w-12 border-b-2 border-l-2 border-cyan-300/60"></div>
    <div className="sm:hidden absolute bottom-4 right-4 h-12 w-12 border-b-2 border-r-2 border-cyan-300/60"></div>

    {/* Content */}
    <div className="relative z-10 w-full px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
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
            className="mb-4 sm:mb-6 inline-block"
          >
            <span className="rounded-full border-2 border-yellow-400/50 bg-yellow-400/10 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-yellow-300 backdrop-blur-sm">
              🏗️ Flagship Technical Festival
            </span>
          </motion.div>

          <h1 className="mb-4 sm:mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white drop-shadow-lg">
            <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              EDIFICIO
            </span>
          </h1>
          
          <div className="mx-auto mb-4 sm:mb-8 h-1 sm:h-1.5 w-32 sm:w-40 rounded-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-100 drop-shadow-md px-2"
          >
            The premier technical festival of the Department of Civil & Infrastructure Engineering, 
            bringing together <span className="font-semibold text-yellow-300">innovation</span>, 
            <span className="font-semibold text-cyan-300"> learning</span>, and 
            <span className="font-semibold text-green-300"> collaboration</span>.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 sm:mt-12 flex justify-center gap-4 sm:gap-8 flex-wrap"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-yellow-400">1000+</div>
              <div className="text-xs sm:text-sm text-gray-200">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-cyan-400">20+</div>
              <div className="text-xs sm:text-sm text-gray-200">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-green-400">50+</div>
              <div className="text-xs sm:text-sm text-gray-200">Institutions</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

// --- Edificio About Section ---
const EdificioAboutSection = () => (
  <section className="relative overflow-hidden bg-white py-12 sm:py-20 dark:bg-gray-900">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"></div>
    
    <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
      <FadeInOnScroll>
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-amber-700 dark:from-yellow-900/50 dark:to-orange-900/50 dark:text-yellow-300 mb-4">
            About The Festival
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6">
            What is <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">EDIFICIO</span>?
          </h2>
          <div className="mx-auto h-1 w-20 sm:w-24 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mb-6 sm:mb-8"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6 text-center">
            <span className="font-semibold text-amber-600 dark:text-yellow-400">EDIFICIO</span> is the flagship technical festival of the Department of Civil & Infrastructure Engineering at IIT Jodhpur, organized entirely by the student society CIES.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-400 text-center">
            It offers budding civil engineers a national platform to explore and innovate through design challenges, workshops, lectures, panel discussions, and collaborative problem-solving. EDIFICIO continues to evolve as a space for experiential learning, interdisciplinary dialogue, and industry-academia synergy.
          </p>
        </div>
      </FadeInOnScroll>
    </div>
  </section>
);

// --- Edificio Highlights Section ---
const EdificioHighlights = () => {
  const highlights = [
    { 
      icon: <Rocket className="h-6 w-6 sm:h-8 sm:w-8" />, 
      title: 'Hackathon & Ideathon',
      description: 'Compete in innovative problem-solving challenges',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />, 
      title: 'Technical Workshops',
      description: 'Hands-on learning with industry experts',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" />, 
      title: 'Expert Lectures',
      description: 'Insights from renowned professionals',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: <Trophy className="h-6 w-6 sm:h-8 sm:w-8" />, 
      title: 'Design Competitions',
      description: 'Showcase your engineering creativity',
      color: 'from-orange-500 to-red-500'
    },
    { 
      icon: <Target className="h-6 w-6 sm:h-8 sm:w-8" />, 
      title: 'Panel Discussions',
      description: 'Engage in industry discourse',
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" />, 
      title: 'Networking',
      description: 'Connect with peers and professionals',
      color: 'from-yellow-500 to-amber-500'
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-12 sm:py-20 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <FadeInOnScroll>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Festival <span className="text-amber-500">Highlights</span>
            </h2>
            <div className="mx-auto h-1 w-20 sm:w-24 rounded-full bg-amber-500"></div>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {highlights.map((item, index) => (
            <FadeInOnScroll key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all dark:border-gray-700 dark:bg-gray-800"
              >
                <div className={`mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white text-center mb-1 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center hidden sm:block">
                  {item.description}
                </p>
              </motion.div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Edificio Photo Gallery ---
const EdificioPhotoGallery = () => {
  const photos = [
    { id: 1, alt: 'Design Competition', gradient: 'from-[#0b3d91] to-blue-600', icon: <Rocket className="h-12 w-12 sm:h-20 sm:w-20" />, src: '/images/edificio/design-competition.jpg' },
    { id: 2, alt: 'Technical Workshop', gradient: 'from-blue-600 to-cyan-600', icon: <BookOpen className="h-12 w-12 sm:h-20 sm:w-20" />, src: '/images/edificio/technical-workshop.jpg' },
    { id: 3, alt: 'Guest Lecture', gradient: 'from-cyan-600 to-teal-600', icon: <Users className="h-12 w-12 sm:h-20 sm:w-20" />, src: '/images/edificio/guest-lecture.jpg' },
    { id: 4, alt: 'Panel Discussion', gradient: 'from-teal-600 to-green-600', icon: <Target className="h-12 w-12 sm:h-20 sm:w-20" />, src: '/images/edificio/panel-discussion.jpg' },
    { id: 5, alt: 'Site Visit', gradient: 'from-green-600 to-emerald-600', icon: <MapPin className="h-12 w-12 sm:h-20 sm:w-20" />, src: '/images/edificio/IMG_9348.JPG' },
    { id: 6, alt: 'Quiz Competition', gradient: 'from-emerald-600 to-teal-600', icon: <HelpCircle className="h-12 w-12 sm:h-20 sm:w-20" />, src: '/images/edificio/GOPR4016.JPG' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-amber-50 to-slate-100 py-12 sm:py-24 text-gray-900 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 dark:text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_2px,transparent_2px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_2px,transparent_2px)] bg-[size:50px_50px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_2px,transparent_2px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_2px,transparent_2px)]"></div>
      
      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeInOnScroll>
          <div className="mb-8 sm:mb-16 text-center">
            <span className="inline-block rounded-full border-2 border-amber-500/30 bg-amber-500/10 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-300 mb-4">
              Visual Journey
            </span>
            
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl md:text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                EDIFICIO
              </span>{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Gallery
              </span>
            </h2>
            
            <div className="mx-auto mb-4 sm:mb-8 h-1 sm:h-1.5 w-28 sm:w-40 rounded-full bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            
            <p className="mx-auto max-w-2xl text-sm sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Explore the highlights of our flagship technical festival through this curated gallery.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Photo Grid */}
        <FadeInOnScroll delay={0.2}>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl"
              >
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`}>
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:24px_24px]"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    {photo.icon}
                  </div>

                  <div className="absolute left-2 top-2 sm:left-3 sm:top-3 h-6 w-6 sm:h-12 sm:w-12 border-l sm:border-l-2 border-t sm:border-t-2 border-white/30"></div>
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 h-6 w-6 sm:h-12 sm:w-12 border-b sm:border-b-2 border-r sm:border-r-2 border-white/30"></div>
                </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 sm:opacity-0 transition-all duration-300 sm:group-hover:opacity-100">
                  <div className="flex h-full flex-col items-center justify-end sm:justify-center p-3 sm:p-6 text-center text-white">
                    <p className="text-sm sm:text-xl font-bold">{photo.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeInOnScroll>

        {/* Download Brochure */}
        <FadeInOnScroll delay={0.4}>
          <div className="mt-10 sm:mt-16 text-center">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 sm:px-10 py-3 sm:py-5 text-sm sm:text-lg font-bold text-white shadow-xl sm:shadow-2xl transition-all hover:shadow-amber-500/50"
            >
              <Download className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-y-1" />
              Download Brochure
            </motion.a>
            <p className="mt-3 sm:mt-5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-amber-600 dark:text-amber-400">PDF</span> · 5.2 MB · Complete Event Details
            </p>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

// --- Edificio CTA Section ---
const EdificioCTA = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-[#0b3d91] via-blue-800 to-cyan-700 py-12 sm:py-20">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    
    <div className="container relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
      <FadeInOnScroll>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6">
            Ready to be part of <span className="text-yellow-400">EDIFICIO</span>?
          </h2>
          
          <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join us for the next edition of our flagship technical festival. 
            Register now to participate in exciting events and workshops!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-yellow-300 hover:scale-105"
            >
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              Register Now
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white"
            >
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              Learn More About CIES
            </Link>
          </div>
        </motion.div>
      </FadeInOnScroll>
    </div>
  </section>
);

