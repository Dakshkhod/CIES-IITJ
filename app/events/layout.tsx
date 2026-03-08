import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Events - Past Events & Gallery',
    description:
        'Browse past events organized by CIES IIT Jodhpur — orientations, celebrations, cultural events, workshops, and academic gatherings. View photos and relive memorable moments from the Civil Engineering Society.',
    keywords: [
        'CIES events',
        'IIT Jodhpur civil engineering events',
        'CIES IITJ events gallery',
        'civil engineering celebrations',
        'IIT Jodhpur student events',
    ],
    alternates: {
        canonical: '/events',
    },
    openGraph: {
        title: 'Events - CIES IIT Jodhpur | Past Events & Gallery',
        description:
            'Browse past events and photo galleries from CIES IIT Jodhpur — orientations, celebrations, and academic gatherings.',
        url: 'https://cies.iitj.ac.in/events',
    },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
