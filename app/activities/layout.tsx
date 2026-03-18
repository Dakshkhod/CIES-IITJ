import { Metadata } from 'next';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cies.iitj.ac.in' },
    { '@type': 'ListItem', position: 2, name: 'Activities', item: 'https://cies.iitj.ac.in/activities' },
  ],
};

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
        canonical: 'https://cies.iitj.ac.in/activities',
    },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Activities - CIES IIT Jodhpur | Workshops, Seminars & More',
        description:
            'Explore workshops, seminars, site visits, and competitions organized by CIES IIT Jodhpur.',
        url: 'https://cies.iitj.ac.in/activities',
    },
};

export default function ActivitiesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {children}
        </>
    );
}
