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

// This attribution is intentionally hardcoded. It must not depend on editable
// CMS content, so the site creator remains credited even if CMS data changes.
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
      <GradientBackground className="min-h-[calc(100vh-5rem)] pt-20" overlay overlayOpacity={0.25}>
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <FadeInOnScroll>
            <div className="mb-10 text-center sm:mb-16">
              <h1 className="text-3xl font-extrabold text-gray-900 drop-shadow-lg dark:text-white sm:text-4xl md:text-5xl">
                Developed By
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-700 dark:text-white/90 sm:text-base">
                The developers who built and maintain the CIES IITJ website.
              </p>
            </div>
          </FadeInOnScroll>

          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            {DEVELOPERS.map((dev, index) => (
              <FadeInOnScroll key={dev.id} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative flex w-full min-w-0 max-w-[280px] flex-col items-center rounded-2xl border border-gray-200/60 bg-white/70 p-6 shadow-xl backdrop-blur-md dark:border-white/20 dark:bg-white/10 sm:max-w-[320px] sm:p-8"
                >
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full ring-4 ring-gray-200 dark:ring-white/30 sm:h-28 sm:w-28">
                    <Image
                      src={dev.photo}
                      alt={dev.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                    {dev.name}
                  </h2>
                  <p className="mb-4 text-sm text-gray-600 dark:text-white/80">{dev.designation}</p>
                  <div className="flex gap-3">
                    {dev.linkedin && (
                      <a
                        href={dev.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 transition-colors hover:text-gray-900 dark:text-white/80 dark:hover:text-white"
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
                        className="text-gray-500 transition-colors hover:text-gray-900 dark:text-white/80 dark:hover:text-white"
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
                        className="text-gray-500 transition-colors hover:text-gray-900 dark:text-white/80 dark:hover:text-white"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                      </a>
                    )}
                    {dev.email && (
                      <a
                        href={dev.email}
                        className="text-gray-500 transition-colors hover:text-gray-900 dark:text-white/80 dark:hover:text-white"
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
