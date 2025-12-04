'use client';

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, Instagram, Loader2, X } from 'lucide-react';
import { getTeamMembers, fetchAllPages, TeamMember } from '@/lib/api';
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
      id: "hod_main", 
      name: "Dr. A. B. C.", 
      role: "Head of Department", 
      committee: "Faculty Leadership", 
      batch: "Faculty", 
      photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3E%3C/text%3E%3C/svg%3E", 
      bio: "Head of the Civil & Infrastructure Engineering Department.", 
      socials: { linkedin: "#", email: "#", instagram: "#" }, 
      featured: true,
      isHOD: true
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
      id: "advisor3", 
      name: "Dr. M. N. O.", 
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
      id: "saurabh", 
      name: "Saurabh", 
      role: "Events & Community Engagement Lead", 
      committee: "Events & Community Engagement Committee", 
      batch: "PG 2024", 
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
      batch: "PG 2024",
      photo: "/Team images/Keshav.jpeg", 
      bio: "Technical lead managing web development and digital initiatives.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "daksh", 
      name: "Daksh", 
      role: "Tech-Lead (UG)-Web Dev Executive",
      committee: "Technical Committee", 
      batch: "UG 2024",
      photo: "/Other images/1759265474674~3.jpg", 
      bio: "Web dev and technical executive.", 
      socials: { linkedin: "#", email: "#", instagram: "#" }, 
      featured: true 
    },
    { 
      id: "falak", 
      name: "Falak Khan", 
      role: "Seminars & Academic Engagement", 
      committee: "Seminars & Academic Engagement Committee", 
      batch: "PG 2024", 
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
      role: "Executive", 
      committee: "Seminars & Academic Engagement Committee", 
      batch: "UG 2024", 
      photo: "/Team images/Sri Raghava.jpeg", 
      bio: "PG lead coordinating academic and research activities.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "deepali", 
      name: "Deepali", 
      role: "Media & Design Lead", 
      committee: "Media & Design Committee", 
      batch: "PG 2024", 
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
      batch: "PG 2024", 
      photo: "/Team images/Simran Sehgal.jpeg", 
      bio: "Creative executive handling visual content and media.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "simranjit_kaur", 
      name: "Simranjit Kaur", 
      role: "Media & Design Executive", 
      committee: "Media & Design Committee", 
      batch: "PG 2024", 
      photo: "/Team images/Simranjit Kaur.jpeg", 
      bio: "Supporting media and design activities for society outreach.", 
      socials: { linkedin: "#", email: "#", instagram: "#" } 
    },
    { 
      id: "ram", 
      name: "Ram Kunawar", 
      role: "Outreach & Publicity Lead", 
      committee: "Outreach & Publicity Committee", 
      batch: "PG 2024", 
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

// Fallback photos for team members when API doesn't provide one
const TEAM_FALLBACK_PHOTOS: Record<string, string> = {
  // Coordination & core
  'Mayank Tiwari': '/Team images/Mayank.jpeg',
  'Shashank': '/Team images/Shashank.jpeg',

  // Events & community
  'Saurabh': '/Team images/Saurabh.jpeg',
  'Vikas': '/Team images/Vikas.jpeg',
  'Manish': '/Team images/Manish.jpg',

  // Technical
  'Keshav Saini': '/Team images/Keshav.jpeg',
  'Daksh': '/Other images/1759265474674~3.jpg',

  // Seminars & academic
  'Falak Khan': '/Team images/Falak.jpeg',
  'Faizah Wani': '/Team images/Faizah.jpeg',
  'Sri Raghava': '/Team images/Sri Raghava.jpeg',

  // Media & design
  'Deepali': '/Team images/Deepali.jpeg',
  'Nitesh': '/Team images/Nitesh.jpeg',
  'Simran Sehgal': '/Team images/Simran Sehgal.jpeg',
  'Simranjit Kaur': '/Team images/Simranjit Kaur.jpeg',

  // Outreach & publicity
  'Ram Kunawar': '/Team images/Ram.jpeg',
  'Nishant': '/Team images/Nishant.jpeg',
};

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
   TEAM PAGE COMPONENTS
   ========================= */

// Note: Header and Footer are now provided by AppLayout

const TeamHeader = () => (
    <div className="text-center pt-10 sm:pt-16 pb-8 sm:pb-12 px-4">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tighter"
        >
            Meet the Team
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
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

const MemberCard = ({ member, setSelectedImage }: MemberCardProps & { setSelectedImage: (image: string | null) => void }) => (
    <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg border dark:border-gray-700/80 overflow-hidden text-center group flex flex-col p-4 sm:p-6 w-full h-full border-t-4 ${committeeColors[member.committee] || 'border-gray-300'}`}
    >
        <img 
          src={member.photo} 
          alt={member.name} 
          className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-full object-cover object-[center_30%] ring-4 ring-offset-2 sm:ring-offset-4 ring-offset-white dark:ring-offset-gray-800 ring-gray-200 dark:ring-gray-700 cursor-pointer hover:scale-105 transition-transform duration-200" 
          loading="lazy"
          onClick={() => setSelectedImage(member.photo)}
        />
        <div className="mt-3 sm:mt-4 flex-grow">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-2">{member.name}</h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-blue-400 font-semibold mt-0.5">{member.role}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{member.batch}</p>
        </div>
        <div className="mt-3 sm:mt-4 flex justify-center space-x-3 sm:space-x-4">
            <a href={member.socials.linkedin} className="text-gray-400 hover:text-[#0077b5] transition-colors p-1"><Linkedin size={18} /></a>
            <a href={member.socials.instagram} className="text-gray-400 hover:text-[#E1306C] transition-colors p-1"><Instagram size={18} /></a>
            <a href={member.socials.email} className="text-gray-400 hover:text-[#9b2b2b] transition-colors p-1"><Mail size={18} /></a>
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

const TeamGrid = ({ members, setSelectedImage }: TeamGridProps & { setSelectedImage: (image: string | null) => void }) => (
    <AnimatePresence>
        <motion.div layout className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-6 sm:mt-10">
             {members.map(member => (
                <div key={member.id} className="w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] xl:w-[calc(20%-1.2rem)] max-w-[280px]">
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
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">{children}</h2>
);


function TeamPageContent({ setSelectedImage, teamData }: { setSelectedImage: (image: string | null) => void; teamData: TeamMemberLocal[] }) {
    const facultyLeadership = useMemo(() => teamData.filter(m => m.committee === 'Faculty Leadership'), [teamData]);
    const hodMember = useMemo(() => facultyLeadership.find(m => m.isHOD), [facultyLeadership]);
    const otherFaculty = useMemo(() => facultyLeadership.filter(m => !m.isHOD), [facultyLeadership]);
    const coordinationCommittee = useMemo(() => teamData.filter(m => m.committee === 'Coordination Committee'), [teamData]);
    const committeeMembers = useMemo(() => teamData.filter(m => m.committee !== 'Faculty Leadership' && m.committee !== 'Coordination Committee'), [teamData]);
    
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
            
            <section className="container mx-auto px-3 sm:px-6 py-8 sm:py-12">
                <SectionTitle>Faculty Leadership</SectionTitle>
                
                {/* HOD Card - Centered */}
                {hodMember && (
                    <div className="mt-6 sm:mt-10 flex justify-center mb-8 sm:mb-12">
                        <div className="w-full max-w-[280px] sm:max-w-sm">
                            <MemberCard member={hodMember} setSelectedImage={setSelectedImage} />
                        </div>
                    </div>
                )}
                
                {/* Other Faculty Cards */}
                <div className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-6 mx-auto" style={{ maxWidth: '1100px' }}>
                    {otherFaculty.map(member => (
                        <div key={member.id} className="w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[320px]">
                            <MemberCard member={member} setSelectedImage={setSelectedImage} />
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-3 sm:px-6 py-8 sm:py-12 bg-white/50 dark:bg-gray-800/30 rounded-2xl sm:rounded-3xl my-6 sm:my-12 mx-2 sm:mx-auto">
                <SectionTitle>Coordination Committee</SectionTitle>
                 <div className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-6 mx-auto" style={{ maxWidth: '1100px' }}>
                    {coordinationCommittee.map(member => (
                        <div key={member.id} className="w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[320px]">
                            <MemberCard member={member} setSelectedImage={setSelectedImage} />
                        </div>
                    ))}
                </div>
            </section>
            
            <section id="student-committees" className="py-8 sm:py-12">
                 <div className="container mx-auto px-3 sm:px-6">
                    <SectionTitle>Committee Members</SectionTitle>
                    <div className="mt-6 sm:mt-10 space-y-12 sm:space-y-20">
                        {groupedAndSortedCommittees.map(([committeeName, members]) => (
                            <div key={committeeName}>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-4 sm:mb-8 px-2">{committeeName.replace(" Committee", "")}</h3>
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

  // Fetch team data from API
  useEffect(() => {
    async function fetchTeamData() {
      try {
        setLoading(true);
        setError(null);
        
        const allMembers = await fetchAllPages<TeamMember>(
          (params) => getTeamMembers({ ...params }),
          100
        );
        
        // Transform API data to component format with local photo fallbacks
        const transformedData: TeamMemberLocal[] = allMembers.map((member) => {
          const nameKey = (member.name || '').trim();
          const fallbackPhoto = TEAM_FALLBACK_PHOTOS[nameKey];
          const photo =
            member.photo ||
            fallbackPhoto ||
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ctext x='50' y='55' font-size='50' text-anchor='middle' fill='%239e9e9e'%3E%3C/text%3E%3C/svg%3E";

          return {
            id: member.uuid,
            name: member.name,
            role: member.role_label || 'Member',
            committee: member.committee_label || 'Other',
            batch: member.batch || '',
            photo,
            bio: member.bio || '',
            socials: {
              linkedin: member.socials?.linkedin || '#',
              email: member.socials?.email || '#',
              instagram: member.socials?.instagram || '#',
            },
            featured: member.featured,
            isHOD: member.is_hod,
            is_faculty: member.is_faculty,
          };
        });
        
        setTeamData(transformedData);
      } catch (err) {
        console.error('Failed to fetch team data:', err);
        setError('Failed to load team data.');
        // Fallback to legacy data
        setTeamData(LEGACY_TEAM_DATA);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTeamData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading team...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className={`bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans`}>
        <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"></div>
        <main className="pt-24 isolate">
          {error && (
            <div className="text-center py-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
              <p>{error} Using cached data.</p>
            </div>
          )}
          <TeamPageContent setSelectedImage={setSelectedImage} teamData={teamData} />
        </main>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] p-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
              <img
                src={selectedImage}
                alt="Expanded profile"
                className="max-w-full max-h-full object-contain object-center rounded-lg shadow-2xl"
                style={{ maxWidth: '90vw', maxHeight: '90vh' }}
              />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
