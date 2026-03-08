import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Activities - Workshops, Seminars & More',
    description:
        'Explore activities by CIES IIT Jodhpur — technical seminars, workshops, site visits, competitions, and EDIFICIO events. Academic year 2025-26 calendar of civil engineering activities at IIT Jodhpur.',
    keywords: [
        'CIES activities',
        'IIT Jodhpur civil engineering workshops',
        'CIES seminars 2025',
        'civil engineering site visits',
        'EDIFICIO activities',
        'IIT Jodhpur workshops',
    ],
    alternates: {
        canonical: '/activities',
    },
    openGraph: {
        title: 'Activities - CIES IIT Jodhpur | Workshops, Seminars & More',
        description:
            'Explore workshops, seminars, site visits, and competitions organized by CIES IIT Jodhpur.',
        url: 'https://cies.iitj.ac.in/activities',
    },
};

export default function ActivitiesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
