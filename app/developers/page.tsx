'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Instagram, Github, Loader2 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { GradientBackground } from '@/components/ui/gradient-background';
import FadeInOnScroll from '@/components/layout/FadeInOnScroll';
import { getDevelopers } from '@/lib/sanity';

type Developer = {
  id: string;
  name: string;
  designation?: string;
  photo?: string;
  linkedin?: string;
  email?: string;
  instagram?: string;
  github?: string;
};

const PLACEHOLDER_PHOTO = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop';

function ensureUrl(url: string | undefined): string | undefined {
  if (!url?.trim()) return undefined;
  const u = url.trim();
  if (u.startsWith('http://') || u.startsWith('https://')) return u;
  return `https://${u}`;
}

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDevelopers()
      .then((data: { _id: string; name: string; designation?: string; photo?: string; socials?: { linkedin?: string; email?: string; instagram?: string; github?: string } }[]) => {
        const mapped: Developer[] = (data || []).map((d) => ({
          id: d._id,
          name: d.name,
          designation: d.designation,
          photo: d.photo || PLACEHOLDER_PHOTO,
          linkedin: ensureUrl(d.socials?.linkedin),
          email: d.socials?.email ? (d.socials.email.startsWith('mailto:') ? d.socials.email : `mailto:${d.socials.email}`) : undefined,
          instagram: ensureUrl(d.socials?.instagram),
          github: ensureUrl(d.socials?.github),
        }));
        setDevelopers(mapped);
      })
      .catch(() => setDevelopers([]))
      .finally(() => setLoading(false));
  }, []);

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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                Developed By
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/90">
                The developers who built and maintain the CIES IITJ website.
              </p>
            </div>
          </FadeInOnScroll>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-white/80" />
            </div>
          ) : developers.length === 0 ? (
            <p className="text-center text-white/80 py-8">
              No developers added yet. Add developers in Sanity Studio → Developer.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              {developers.map((dev, index) => (
                <FadeInOnScroll key={dev.id} delay={index * 0.15}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative flex flex-col items-center rounded-2xl bg-white/10 backdrop-blur-md p-6 sm:p-8 shadow-xl border border-white/20 w-full max-w-[280px] sm:max-w-[320px] min-w-0"
                  >
                    <div className="relative mb-4 h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden ring-4 ring-white/30">
                      <Image
                        src={dev.photo || PLACEHOLDER_PHOTO}
                        alt={dev.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                        unoptimized={dev.photo?.startsWith('data:')}
                      />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      {dev.name}
                    </h2>
                    {dev.designation && (
                      <p className="text-sm text-white/80 mb-4">{dev.designation}</p>
                    )}
                    <div className="flex gap-3">
                      {dev.linkedin && (
                        <a
                          href={dev.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/80 hover:text-white transition-colors"
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
                          className="text-white/80 hover:text-white transition-colors"
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
                          className="text-white/80 hover:text-white transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                        </a>
                      )}
                      {dev.email && (
                        <a
                          href={dev.email}
                          className="text-white/80 hover:text-white transition-colors"
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
          )}
        </div>
      </GradientBackground>
    </AppLayout>
  );
}
