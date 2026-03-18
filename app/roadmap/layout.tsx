import { Metadata } from 'next';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cies.iitj.ac.in' },
    { '@type': 'ListItem', position: 2, name: 'Roadmap', item: 'https://cies.iitj.ac.in/roadmap' },
  ],
};

export const metadata: Metadata = {
    title: 'Roadmap & Calendar - Academic Year 2025-26',
    description:
        'View the CIES IIT Jodhpur roadmap and event calendar for academic year 2025-26. Seminars, workshops, competitions, site visits, guest lectures, and EDIFICIO timeline.',
    keywords: [
        'CIES roadmap',
        'IIT Jodhpur civil engineering calendar',
        'CIES events 2025 2026',
        'civil engineering event timeline',
        'academic calendar iitj civil',
    ],
    alternates: {
        canonical: 'https://cies.iitj.ac.in/roadmap',
    },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Roadmap & Calendar - CIES IIT Jodhpur',
        description:
            'CIES IIT Jodhpur roadmap and event calendar for academic year 2025-26.',
        url: 'https://cies.iitj.ac.in/roadmap',
    },
};

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
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
