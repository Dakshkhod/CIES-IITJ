import { Metadata } from 'next';

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
        canonical: '/about',
    },
    openGraph: {
        title: 'About CIES - Civil Engineering Society | IIT Jodhpur',
        description:
            'Learn about CIES IIT Jodhpur — our mission, vision, pillars, and 500+ member community.',
        url: 'https://cies.iitj.ac.in/about',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
