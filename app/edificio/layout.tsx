import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EDIFICIO - Flagship Technical Festival',
    description:
        'EDIFICIO is the flagship technical festival of the Department of Civil & Infrastructure Engineering at IIT Jodhpur, organized by CIES. Hackathons, design competitions, workshops, expert lectures, and 1000+ participants.',
    keywords: [
        'EDIFICIO',
        'EDIFICIO IIT Jodhpur',
        'EDIFICIO fest',
        'civil engineering festival india',
        'IIT Jodhpur technical festival',
        'CIES EDIFICIO',
        'engineering hackathon jodhpur',
    ],
    alternates: {
        canonical: '/edificio',
    },
    openGraph: {
        title: 'EDIFICIO - Flagship Technical Festival | CIES IIT Jodhpur',
        description:
            'EDIFICIO — the premier civil engineering technical festival at IIT Jodhpur. Hackathons, competitions, workshops, and 1000+ participants.',
        url: 'https://cies.iitj.ac.in/edificio',
    },
};

export default function EdificioLayout({ children }: { children: React.ReactNode }) {
    return children;
}
