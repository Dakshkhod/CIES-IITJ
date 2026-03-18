import { Metadata } from 'next';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cies.iitj.ac.in' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://cies.iitj.ac.in/about' },
  ],
};

export const metadata: Metadata = {
    title: 'About CIES - Civil Engineering Society',
    description:
        'Learn about the Civil & Infrastructure Engineering Society (CIES) at IIT Jodhpur. Our mission, vision, pillars, EDIFICIO festival, and community of 500+ active members building futures in civil engineering.',
    keywords: [
        'about CIES IIT Jodhpur',
        'civil engineering society about',
        'CIES mission vision',
        'EDIFICIO IIT Jodhpur',
        'civil engineering community iitj',
    ],
    alternates: {
        canonical: 'https://cies.iitj.ac.in/about',
    },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'About CIES - Civil Engineering Society | IIT Jodhpur',
        description:
            'Learn about CIES IIT Jodhpur — our mission, vision, pillars, and 500+ member community.',
        url: 'https://cies.iitj.ac.in/about',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
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
