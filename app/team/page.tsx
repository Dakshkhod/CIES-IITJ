'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, Instagram, Loader2, X } from 'lucide-react';
import { getTeamMembers as getSanityTeamMembers, subscribeToSanityQuery } from '@/lib/sanity';
import AppLayout from '@/components/layout/AppLayout';

/* =========================
   TEAM MEMBER TYPE
   ========================= */
type TeamMemberLocal = {
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
  featured?: boolean;
  isHOD?: boolean;
  is_faculty?: boolean;
};

/* =========================
   LEGACY TEAM DATA (Fallback)
   ========================= */
const LEGACY_TEAM_DATA: TeamMemberLocal[] = [
  {
    id: 'hod_main',
    name: 'Dr. A. B. C.',
    role: 'Head of Department',
    committee: 'Faculty Leadership',
    batch: 'Faculty',
    photo:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3E%3C/text%3E%3C/svg%3E",
    bio: 'Head of the Civil & Infrastructure Engineering Department.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
    featured: true,
    isHOD: true,
  },
  {
    id: 'advisor',
    name: 'Dr. X. Y. Z.',
    role: 'Faculty Advisor',
    committee: 'Faculty Leadership',
    batch: 'Faculty',
    photo:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3E%3C/text%3E%3C/svg%3E",
    bio: 'Faculty advisor for the Civil Engineering Society.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
    featured: true,
  },
  {
    id: 'advisor2',
    name: 'Dr. P. Q. R.',
    role: 'Faculty Advisor',
    committee: 'Faculty Leadership',
    batch: 'Faculty',
    photo:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3E%3C/text%3E%3C/svg%3E",
    bio: 'Faculty advisor for the Civil Engineering Society.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
    featured: true,
  },
  {
    id: 'advisor3',
    name: 'Dr. M. N. O.',
    role: 'Faculty Advisor',
    committee: 'Faculty Leadership',
    batch: 'Faculty',
    photo:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3E%3C/text%3E%3C/svg%3E",
    bio: 'Faculty advisor for the Civil Engineering Society.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
    featured: true,
  },
  {
    id: 'ashwani',
    name: 'Ashwani',
    role: 'Secretary',
    committee: 'Coordination Committee',
    batch: 'UG 2024',
    photo:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3EA%3C/text%3E%3C/svg%3E",
    bio: 'Secretary — coordinates society operations.',
    socials: { linkedin: '#', email: 'mailto:ashwani@iitj.ac.in', instagram: '#' },
    featured: true,
  },
  {
    id: 'mayank',
    name: 'Mayank Tiwari',
    role: 'PG Representative',
    committee: 'Coordination Committee',
    batch: 'PG 2024',
    photo: '/Team images/Mayank.jpeg',
    bio: 'Postgraduate representative connecting PG students with society activities.',
    socials: { linkedin: '#', email: 'mailto:mayank@iitj.ac.in', instagram: '#' },
  },
  {
    id: 'shashank',
    name: 'Shashank',
    role: 'Joint Secretary',
    committee: 'Coordination Committee',
    batch: 'UG 2024',
    photo: '/Team images/Shashank.jpeg',
    bio: 'Joint Secretary.',
    socials: { linkedin: '#', email: 'mailto:shashank@iitj.ac.in', instagram: '#' },
  },
  {
    id: 'saurabh',
    name: 'Saurabh',
    role: 'Executive',
    committee: 'Events & Community Engagement Committee',
    batch: 'PG 2024',
    photo: '/Team images/Saurabh.jpeg',
    bio: 'Executive member supporting events and community engagement initiatives.',
    socials: { linkedin: '#', email: 'mailto:saurabh@iitj.ac.in', instagram: '#' },
  },
  {
    id: 'vikas',
    name: 'Vikas',
    role: 'Executive',
    committee: 'Events & Community Engagement Committee',
    batch: 'UG 2024',
    photo: '/Team images/Vikas.jpeg',
    bio: 'Executive member supporting event organization and community engagement.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'manish',
    name: 'Manish',
    role: 'Executive',
    committee: 'Events & Community Engagement Committee',
    batch: 'UG 2024',
    photo: '/Team images/Manish.jpg',
    bio: 'Executive member contributing to society events and activities.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'keshav',
    name: 'Keshav Saini',
    role: 'Executive',
    committee: 'Technical Committee',
    batch: 'PG 2024',
    photo: '/Team images/Keshav.jpeg',
    bio: 'Executive member managing web development and digital initiatives.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'daksh',
    name: 'Daksh',
    role: 'Web Dev Executive',
    committee: 'Technical Committee',
    batch: 'UG 2024',
    photo: '/Other images/1759265474674~3.jpg',
    bio: 'Tech-Lead (UG) handling web development and technical initiatives.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
    featured: true,
  },
  {
    id: 'falak',
    name: 'Falak Khan',
    role: 'Executive',
    committee: 'Seminars & Academic Engagement Committee',
    batch: 'PG 2024',
    photo: '/Team images/Falak.jpeg',
    bio: 'Executive member organizing seminars and academic engagement programs.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'faizah',
    name: 'Faizah Wani',
    role: 'Executive',
    committee: 'Seminars & Academic Engagement Committee',
    batch: 'PG 2024',
    photo: '/Team images/Faizah.jpeg',
    bio: 'Executive member coordinating academic seminars and research engagement.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'sri',
    name: 'Sri Raghava',
    role: 'Executive',
    committee: 'Seminars & Academic Engagement Committee',
    batch: 'UG 2024',
    photo: '/Team images/Sri Raghava.jpeg',
    bio: 'Executive member supporting academic and research activities.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'deepali',
    name: 'Deepali',
    role: 'Executive',
    committee: 'Media & Design Committee',
    batch: 'PG 2024',
    photo: '/Team images/Deepali.jpeg',
    bio: 'Executive member leading design and media content creation for the society.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'nitesh',
    name: 'Nitesh',
    role: 'Executive',
    committee: 'Media & Design Committee',
    batch: 'UG 2024',
    photo: '/Team images/Nitesh.jpeg',
    bio: 'Executive member supporting design and media initiatives for society events.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'harsh',
    name: 'Harsh',
    role: 'Executive',
    committee: 'Media & Design Committee',
    batch: 'UG 2024',
    photo:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3EH%3C/text%3E%3C/svg%3E",
    bio: 'Executive member handling design and media activities.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'simran_sehgal',
    name: 'Simran Sehgal',
    role: 'Executive',
    committee: 'Media & Design Committee',
    batch: 'PG 2024',
    photo: '/Team images/Simran Sehgal.jpeg',
    bio: 'Executive member handling visual content and media.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'simranjit_kaur',
    name: 'Simranjit Kaur',
    role: 'Executive',
    committee: 'Media & Design Committee',
    batch: 'PG 2024',
    photo: '/Team images/Simranjit Kaur.jpeg',
    bio: 'Executive member supporting media and design activities for society outreach.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'ram',
    name: 'Ram Kunawar',
    role: 'Executive',
    committee: 'Outreach & Publicity Committee',
    batch: 'PG 2024',
    photo: '/Team images/Ram.jpeg',
    bio: 'Executive member leading outreach and publicity efforts for society events.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'nishant',
    name: 'Nishant',
    role: 'Executive',
    committee: 'Outreach & Publicity Committee',
    batch: 'UG 2024',
    photo: '/Team images/Nishant.jpeg',
    bio: 'Executive member supporting outreach initiatives and event promotion.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
  {
    id: 'manas',
    name: 'Manas',
    role: 'Mentor',
    committee: 'Coordination Committee',
    batch: 'Alumni',
    photo:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3EM%3C/text%3E%3C/svg%3E",
    bio: 'Mentor (Ex-Secretary) - Providing guidance and support to the society.',
    socials: { linkedin: '#', email: '#', instagram: '#' },
  },
];

// Fallback photos for team members when API doesn't provide one
const TEAM_FALLBACK_PHOTOS: Record<string, string> = {
  // Coordination & core
  'Mayank Tiwari': '/Team images/Mayank.jpeg',
  Shashank: '/Team images/Shashank.jpeg',

  // Events & community
  Saurabh: '/Team images/Saurabh.jpeg',
  Vikas: '/Team images/Vikas.jpeg',
  Manish: '/Team images/Manish.jpg',

  // Technical
  'Keshav Saini': '/Team images/Keshav.jpeg',
  Daksh: '/Other images/1759265474674~3.jpg',

  // Seminars & academic
  'Falak Khan': '/Team images/Falak.jpeg',
  'Faizah Wani': '/Team images/Faizah.jpeg',
  'Sri Raghava': '/Team images/Sri Raghava.jpeg',

  // Media & design
  Deepali: '/Team images/Deepali.jpeg',
  Nitesh: '/Team images/Nitesh.jpeg',
  'Simran Sehgal': '/Team images/Simran Sehgal.jpeg',
  'Simranjit Kaur': '/Team images/Simranjit Kaur.jpeg',

  // Outreach & publicity
  'Ram Kunawar': '/Team images/Ram.jpeg',
  Nishant: '/Team images/Nishant.jpeg',
};

/* =========================
   UTILITIES
   ========================= */
const committeeColors: Record<string, string> = {
  'Faculty Leadership': 'border-red-700',
  'Coordination Committee': 'border-blue-700',
  'Events & Community Engagement Committee': 'border-green-600',
  'Technical Committee': 'border-purple-600',
  'Seminars & Academic Engagement Committee': 'border-yellow-500',
  'Media & Design Committee': 'border-pink-500',
  'Outreach & Publicity Committee': 'border-teal-500',
};

/* =========================
   TEAM PAGE COMPONENTS
   ========================= */

// Note: Header and Footer are now provided by AppLayout

const TeamHeader = () => (
  <div className="px-4 pb-8 pt-10 text-center sm:pb-12 sm:pt-16">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-extrabold leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl md:text-6xl"
    >
      Meet the Team
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mx-auto mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:mt-4 sm:text-lg md:text-xl"
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
    isHOD?: boolean;
  };
}

const MemberCard = ({
  member,
  setSelectedImage,
}: MemberCardProps & { setSelectedImage: (image: string | null) => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-t-4 bg-white p-4 text-center shadow-lg dark:border-gray-700/80 dark:bg-gray-800/50 sm:p-6 ${committeeColors[member.committee] || 'border-gray-300'}`}
  >
    <Image
      src={member.photo}
      alt={member.name}
      width={112}
      height={112}
      className="mx-auto h-20 w-20 cursor-pointer rounded-full object-cover object-[center_20%] ring-4 ring-gray-200 ring-offset-2 ring-offset-white transition-transform duration-200 hover:scale-105 dark:ring-gray-700 dark:ring-offset-gray-800 sm:h-28 sm:w-28 sm:ring-offset-4"
      loading="lazy"
      onClick={() => setSelectedImage(member.photo)}
    />
    <div className="mt-3 flex-grow sm:mt-4">
      <h3 className="line-clamp-2 text-base font-bold text-gray-900 dark:text-white sm:text-lg">
        {member.name}
      </h3>
      <p className="mt-0.5 whitespace-pre-line text-xs font-semibold text-slate-700 dark:text-blue-400 sm:text-sm">
        {(member.role || '').replace('Tech-Lead (UG)-Web Dev Executive', 'Web Dev Executive')}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{member.batch}</p>
    </div>
    <div className="mt-3 flex justify-center space-x-3 sm:mt-4 sm:space-x-4">
      <a
        href={member.socials.linkedin}
        className="p-1 text-gray-400 transition-colors hover:text-[#0077b5]"
      >
        <Linkedin size={18} />
      </a>
      {member.committee !== 'Faculty Leadership' && (
        <a
          href={member.socials.instagram}
          className="p-1 text-gray-400 transition-colors hover:text-[#E1306C]"
        >
          <Instagram size={18} />
        </a>
      )}
      <a
        href={member.socials.email}
        className="p-1 text-gray-400 transition-colors hover:text-[#9b2b2b]"
      >
        <Mail size={18} />
      </a>
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
    isHOD?: boolean;
  }>;
}

const TeamGrid = ({
  members,
  setSelectedImage,
}: TeamGridProps & { setSelectedImage: (image: string | null) => void }) => (
  <AnimatePresence>
    <motion.div layout className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-6">
      {members.map(member => (
        <div
          key={member.id}
          className="w-[calc(50%-0.375rem)] max-w-[280px] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] xl:w-[calc(20%-1.2rem)]"
        >
          <MemberCard member={member} setSelectedImage={setSelectedImage} />
        </div>
      ))}
    </motion.div>
  </AnimatePresence>
);

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => (
  <h2 className="mb-3 px-2 text-center text-xl font-bold text-gray-900 dark:text-white sm:mb-4 sm:text-2xl md:text-3xl">
    {children}
  </h2>
);

function TeamPageContent({
  setSelectedImage,
  teamData,
}: {
  setSelectedImage: (image: string | null) => void;
  teamData: TeamMemberLocal[];
}) {
  const facultyLeadership = useMemo(
    () => teamData.filter(m => m.committee === 'Faculty Leadership'),
    [teamData]
  );
  const hodMember = useMemo(() => facultyLeadership.find(m => m.isHOD), [facultyLeadership]);
  const otherFaculty = useMemo(() => facultyLeadership.filter(m => !m.isHOD), [facultyLeadership]);
  const coordinationCommittee = useMemo(
    () => teamData.filter(m => m.committee === 'Coordination Committee'),
    [teamData]
  );
  const committeeMembers = useMemo(
    () =>
      teamData.filter(
        m => m.committee !== 'Faculty Leadership' && m.committee !== 'Coordination Committee'
      ),
    [teamData]
  );

  const groupedAndSortedCommittees = useMemo(() => {
    const committeeOrder = [
      'Events & Community Engagement Committee',
      'Technical Committee',
      'Seminars & Academic Engagement Committee',
      'Media & Design Committee',
      'Outreach & Publicity Committee',
    ];

    const groups = committeeMembers.reduce(
      (acc, member) => {
        const committee = member.committee;
        if (!acc[committee]) {
          acc[committee] = [];
        }
        acc[committee].push(member);
        return acc;
      },
      {} as Record<string, typeof committeeMembers>
    );

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

      <section className="container mx-auto px-3 py-8 sm:px-6 sm:py-12">
        <SectionTitle>Faculty Leadership</SectionTitle>

        {/* HOD Card - Centered */}
        {hodMember && (
          <div className="mb-8 mt-6 flex justify-center sm:mb-12 sm:mt-10">
            <div className="w-full max-w-[280px] sm:max-w-sm">
              <MemberCard member={hodMember} setSelectedImage={setSelectedImage} />
            </div>
          </div>
        )}

        {/* Other Faculty Cards */}
        <div
          className="mx-auto mt-6 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-6"
          style={{ maxWidth: '1100px' }}
        >
          {otherFaculty.map(member => (
            <div
              key={member.id}
              className="w-[calc(50%-0.375rem)] max-w-[320px] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <MemberCard member={member} setSelectedImage={setSelectedImage} />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-2 mx-auto my-6 px-3 py-8 sm:mx-auto sm:my-12 sm:px-6 sm:py-12">
        <SectionTitle>Coordination Committee</SectionTitle>
        <div
          className="mx-auto mt-6 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-6"
          style={{ maxWidth: '1100px' }}
        >
          {coordinationCommittee.map(member => (
            <div
              key={member.id}
              className="w-[calc(50%-0.375rem)] max-w-[320px] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <MemberCard member={member} setSelectedImage={setSelectedImage} />
            </div>
          ))}
        </div>
      </section>

      <section id="student-committees" className="py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-6">
          <SectionTitle>Committee Members</SectionTitle>
          <div className="mt-6 space-y-12 sm:mt-10 sm:space-y-20">
            {groupedAndSortedCommittees.map(([committeeName, members]) => (
              <div key={committeeName}>
                <h3 className="mb-4 px-2 text-center text-lg font-semibold text-gray-800 dark:text-gray-200 sm:mb-8 sm:text-xl md:text-2xl">
                  {committeeName.replace(' Committee', '')}
                </h3>
                <TeamGrid members={members} setSelectedImage={setSelectedImage} />
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [teamData, setTeamData] = useState<TeamMemberLocal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team data from Sanity
  useEffect(() => {
    async function fetchTeamData(showLoading = false) {
      try {
        if (showLoading) setLoading(true);
        setError(null);

        const allMembers = await getSanityTeamMembers();

        // Transform Sanity data to component format with local photo fallbacks
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedData: TeamMemberLocal[] = allMembers.map((member: any) => {
          const nameKey = (member.name || '').trim();
          const fallbackPhoto = TEAM_FALLBACK_PHOTOS[nameKey];
          const photo =
            member.photo ||
            fallbackPhoto ||
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3E%3C/text%3E%3C/svg%3E";

          return {
            id: member._id,
            name: member.name,
            role: member.role || 'Member',
            committee: member.committee || 'Other',
            batch: member.batch || '',
            photo,
            bio: member.bio || '',
            socials: {
              linkedin: member.socials?.linkedin || '#',
              email: member.socials?.email || '#',
              instagram: member.socials?.instagram || '#',
            },
            featured: member.featured || false,
            isHOD: member.isHOD || false,
            is_faculty: member.isFaculty || false,
          };
        });

        // Always include Faculty Leadership from legacy data (HOD + 3 Advisors)
        const facultyLeadershipFromLegacy = LEGACY_TEAM_DATA.filter(
          m => m.committee === 'Faculty Leadership'
        );

        // Check if Sanity has Faculty Leadership members
        const sanityHasFacultyLeadership = transformedData.some(
          m => m.committee === 'Faculty Leadership'
        );

        if (transformedData.length > 0) {
          // If Sanity doesn't have Faculty Leadership, add them from legacy
          if (!sanityHasFacultyLeadership) {
            setTeamData([...facultyLeadershipFromLegacy, ...transformedData]);
          } else {
            setTeamData(transformedData);
          }
        } else {
          // Fallback to legacy data if Sanity is empty
          setTeamData(LEGACY_TEAM_DATA);
        }
      } catch (err) {
        console.error('Failed to fetch team data from Sanity:', err);
        setError('Failed to load team data.');
        // Fallback to legacy data
        setTeamData(LEGACY_TEAM_DATA);
      } finally {
        if (showLoading) setLoading(false);
      }
    }

    void fetchTeamData(true);
    return subscribeToSanityQuery(
      '*[_type in ["teamMember", "teamSettings"]]',
      () => void fetchTeamData(),
      subscriptionError =>
        console.warn('Sanity team live updates are unavailable:', subscriptionError)
    );
  }, []);

  // Loading state
  if (loading) {
    return (
      <AppLayout>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark-bg">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" />
            <p className="text-gray-600 dark:text-gray-400">Loading team...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className={`bg-gray-50 font-sans text-gray-800 dark:bg-dark-bg dark:text-gray-200`}>
        <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"></div>
        <main className="isolate pt-24">
          {error && (
            <div className="bg-yellow-100 py-4 text-center text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
              <p>{error} Using cached data.</p>
            </div>
          )}
          <TeamPageContent setSelectedImage={setSelectedImage} teamData={teamData} />
          <section className="px-4 pb-16 pt-8 text-center sm:pb-20 sm:pt-12">
            <Link
              href="/team/past"
              className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-slate-900 px-12 py-5 text-xl font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-slate-800 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/50 dark:bg-slate-800 dark:hover:bg-slate-700 sm:min-w-[280px] sm:text-2xl"
            >
              Past Teams
            </Link>
          </section>
        </main>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-h-[90vh] max-w-4xl p-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -right-4 -top-4 z-10 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
              <img
                src={selectedImage}
                alt="Expanded profile"
                className="max-h-full max-w-full rounded-lg object-contain object-center shadow-2xl"
                style={{ maxWidth: '90vw', maxHeight: '90vh' }}
              />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
