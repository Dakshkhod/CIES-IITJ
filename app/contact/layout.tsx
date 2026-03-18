import { Metadata } from 'next';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cies.iitj.ac.in' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://cies.iitj.ac.in/contact' },
  ],
};

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
        canonical: 'https://cies.iitj.ac.in/contact',
    },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Contact Us - CIES IIT Jodhpur',
        description:
            'Get in touch with CIES IIT Jodhpur. Send us a message or connect on social media.',
        url: 'https://cies.iitj.ac.in/contact',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
