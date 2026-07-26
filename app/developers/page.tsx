'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Instagram, Github } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { GradientBackground } from '@/components/ui/gradient-background';
import FadeInOnScroll from '@/components/layout/FadeInOnScroll';

type Developer = {
  id: string;
  name: string;
  designation: string;
  photo: string;
  linkedin?: string;
  email?: string;
  instagram?: string;
  github?: string;
};

const DEVELOPERS: Developer[] = [
  {
    id: 'daksh-khod',
    name: 'Daksh Khod',
    designation: "UG '24 Tech Executive | CIES",
    photo: '/developers/daksh-khod.jpg',
    linkedin: 'https://www.linkedin.com/in/daksh-khod-967b71326',
    email: 'mailto:b24ci1010@iitj.ac.in',
    instagram: 'https://www.instagram.com/daksh_k15/',
    github: 'https://github.com/Dakshkhod',
  },
];

export default function DevelopersPage() {
  return (
    <AppLayout>
      <GradientBackground
        className="min-h-[calc(100vh-5rem)] pt-20"
        overlay
        overlayOpacity={0.25}
      >
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <FadeInOnScroll>
            <div className="mb-10 sm:mb-16 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg">
                Developed By
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-700 dark:text-white/90">
                The developers who built and maintain the CIES IITJ website.
              </p>
            </div>
          </FadeInOnScroll>

          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            {DEVELOPERS.map((dev, index) => (
              <FadeInOnScroll key={dev.id} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative flex flex-col items-center rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-md p-6 sm:p-8 shadow-xl border border-gray-200/60 dark:border-white/20 w-full max-w-[280px] sm:max-w-[320px] min-w-0"
                >
                  <div className="relative mb-4 h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden ring-4 ring-gray-200 dark:ring-white/30">
                    <Image
                      src={dev.photo}
                      alt={dev.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    {dev.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-white/80 mb-4">{dev.designation}</p>
                  <div className="flex gap-3">
                    {dev.linkedin && (
                      <a
                        href={dev.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:text-white/80 dark:hover:text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                      </a>
                    )}
                    {dev.instagram && (
                      <a
                        href={dev.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:text-white/80 dark:hover:text-white transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
                      </a>
                    )}
                    {dev.github && (
                      <a
                        href={dev.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:text-white/80 dark:hover:text-white transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                      </a>
                    )}
                    {dev.email && (
                      <a
                        href={dev.email}
                        className="text-gray-500 hover:text-gray-900 dark:text-white/80 dark:hover:text-white transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </GradientBackground>
    </AppLayout>
  );
}
