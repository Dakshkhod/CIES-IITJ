import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Team - Meet the Members',
    description:
        'Meet the team behind CIES IIT Jodhpur — faculty leadership, coordination committee, technical committee, media & design, seminars & academic engagement, and outreach members of the Civil Engineering Society.',
    keywords: [
        'CIES team',
        'IIT Jodhpur civil engineering society team',
        'CIES IITJ members',
        'civil engineering society committee',
        'student society team iitj',
    ],
    alternates: {
        canonical: '/team',
    },
    openGraph: {
        title: 'Our Team - CIES IIT Jodhpur | Meet the Members',
        description:
            'Meet the faculty and student leaders driving the Civil Engineering Society at IIT Jodhpur.',
        url: 'https://cies.iitj.ac.in/team',
    },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
    return children;
}
