'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, Linkedin, Loader2, Mail } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { getAllTeamMembers, subscribeToSanityQuery } from '@/lib/sanity';

type ArchivedMember = {
  _id: string;
  name: string;
  teamYear: number;
  role?: string;
  committee?: string;
  batch?: string;
  photo?: string;
  socials?: { linkedin?: string; email?: string; instagram?: string };
};

const committeeOrder = [
  'Faculty Leadership',
  'Coordination Committee',
  'Events & Community Engagement Committee',
  'Technical Committee',
  'Seminars & Academic Engagement Committee',
  'Media & Design Committee',
  'Outreach & Publicity Committee',
];

const committeeColors: Record<string, string> = {
  'Faculty Leadership': 'border-red-700',
  'Coordination Committee': 'border-blue-700',
  'Events & Community Engagement Committee': 'border-green-600',
  'Technical Committee': 'border-purple-600',
  'Seminars & Academic Engagement Committee': 'border-yellow-500',
  'Media & Design Committee': 'border-pink-500',
  'Outreach & Publicity Committee': 'border-teal-500',
};

function placeholderFor(name: string) {
  const initial = encodeURIComponent((name.trim()[0] || 'C').toUpperCase());
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Ctext x='50' y='62' font-size='44' text-anchor='middle' fill='%2364748b'%3E${initial}%3C/text%3E%3C/svg%3E`;
}

export default function PastTeamsPage() {
  const [members, setMembers] = useState<ArchivedMember[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = (await getAllTeamMembers()) as ArchivedMember[];
      setMembers(data || []);
      const availableYears = Array.from(new Set((data || []).map(member => member.teamYear))).sort(
        (a, b) => b - a
      );
      setSelectedYear(current =>
        current && availableYears.includes(current) ? current : availableYears[0] || null
      );
    } catch (error) {
      console.error('Failed to load past teams:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    return subscribeToSanityQuery(
      '*[_type in ["teamMember", "teamSettings"]]',
      () => void refresh(),
      error => console.warn('Sanity team archive live updates are unavailable:', error)
    );
  }, [refresh]);

  const years = useMemo(
    () => Array.from(new Set(members.map(member => member.teamYear))).sort((a, b) => b - a),
    [members]
  );

  const groups = useMemo(() => {
    const grouped = members
      .filter(member => member.teamYear === selectedYear)
      .reduce<Record<string, ArchivedMember[]>>((acc, member) => {
        const committee = member.committee || 'Other Members';
        (acc[committee] ||= []).push(member);
        return acc;
      }, {});

    return Object.entries(grouped).sort(([a], [b]) => {
      const ai = committeeOrder.indexOf(a);
      const bi = committeeOrder.indexOf(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }, [members, selectedYear]);

  return (
    <AppLayout>
      <main className="min-h-screen bg-gray-50 px-4 pb-20 pt-32 text-gray-900 dark:bg-dark-bg dark:text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700 dark:text-cyan-400">
              CIES IIT Jodhpur
            </p>
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Past Teams</h1>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
              Celebrating the faculty and student teams who have shaped CIES since 2025.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-[360px] items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
          ) : years.length === 0 ? (
            <p className="py-24 text-center text-gray-500">No archived teams are available yet.</p>
          ) : (
            <>
              <div className="my-10 flex flex-wrap justify-center gap-3">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`rounded-full px-7 py-3 text-base font-bold transition-all ${
                      selectedYear === year
                        ? 'bg-slate-900 text-white shadow-lg dark:bg-cyan-500 dark:text-slate-950'
                        : 'border border-gray-300 bg-white text-gray-700 hover:border-slate-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
                    }`}
                  >
                    Team {year}
                  </button>
                ))}
              </div>

              <div className="space-y-16">
                {groups.map(([committee, committeeMembers]) => (
                  <section key={committee}>
                    <h2 className="mb-8 text-center text-2xl font-bold">
                      {committee.replace(' Committee', '')}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-5">
                      {committeeMembers.map((member, index) => (
                        <motion.article
                          key={member._id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: Math.min(index * 0.04, 0.3) }}
                          className={`w-[calc(50%-0.625rem)] max-w-[260px] rounded-2xl border border-t-4 bg-white p-5 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800/60 ${committeeColors[committee] || 'border-gray-400'}`}
                        >
                          <Image
                            src={member.photo || placeholderFor(member.name)}
                            alt={member.name}
                            width={112}
                            height={112}
                            className="mx-auto h-24 w-24 rounded-full object-cover object-[center_20%] ring-4 ring-gray-200 dark:ring-gray-700"
                          />
                          <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
                          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-blue-400">
                            {(member.role || 'Member').replace(
                              'Tech-Lead (UG)-Web Dev Executive',
                              'Web Dev Executive'
                            )}
                          </p>
                          {member.batch && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {member.batch}
                            </p>
                          )}
                          <div className="mt-4 flex justify-center gap-3 text-gray-400">
                            {member.socials?.linkedin && (
                              <a
                                href={member.socials.linkedin}
                                aria-label={`${member.name} LinkedIn`}
                              >
                                <Linkedin size={18} />
                              </a>
                            )}
                            {member.socials?.instagram && committee !== 'Faculty Leadership' && (
                              <a
                                href={member.socials.instagram}
                                aria-label={`${member.name} Instagram`}
                              >
                                <Instagram size={18} />
                              </a>
                            )}
                            {member.socials?.email && (
                              <a
                                href={
                                  member.socials.email.startsWith('mailto:')
                                    ? member.socials.email
                                    : `mailto:${member.socials.email}`
                                }
                                aria-label={`Email ${member.name}`}
                              >
                                <Mail size={18} />
                              </a>
                            )}
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </>
          )}

          <div className="mt-16 text-center">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-bold text-white shadow-lg transition-transform hover:-translate-y-1 dark:bg-slate-800"
            >
              <ArrowLeft size={18} /> Current Team
            </Link>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
