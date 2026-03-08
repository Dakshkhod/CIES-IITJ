import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description:
        'Get in touch with CIES IIT Jodhpur — the Civil & Infrastructure Engineering Society. Send us a message, find our address at NH 62 Nagaur Road Jodhpur, or connect on social media.',
    keywords: [
        'contact CIES IIT Jodhpur',
        'civil engineering society contact',
        'CIES email',
        'IIT Jodhpur civil engineering address',
        'cies iitj contact',
    ],
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact Us - CIES IIT Jodhpur',
        description:
            'Get in touch with CIES IIT Jodhpur. Send us a message or connect on social media.',
        url: 'https://cies.iitj.ac.in/contact',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
