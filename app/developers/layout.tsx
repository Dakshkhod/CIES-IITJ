import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Developers',
    description:
        'Meet the developers who built and maintain the CIES IIT Jodhpur website — the official online presence of the Civil & Infrastructure Engineering Society.',
    keywords: [
        'CIES website developers',
        'IIT Jodhpur website team',
        'CIES IITJ developers',
    ],
    alternates: {
        canonical: '/developers',
    },
    openGraph: {
        title: 'Developers - CIES IIT Jodhpur Website',
        description:
            'Meet the developers who built and maintain the CIES IIT Jodhpur website.',
        url: 'https://cies.iitj.ac.in/developers',
    },
};

export default function DevelopersLayout({ children }: { children: React.ReactNode }) {
    return children;
}
