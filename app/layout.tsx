import { Inter } from 'next/font/google';
import { Metadata, Viewport } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Viewport configuration (separate from metadata in Next.js 14+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0b3d91',
};

// SEO and Meta Tags for Next.js 13+ App Router
export const metadata: Metadata = {
  metadataBase: new URL('https://cies.iitj.ac.in'),
  title: {
    default: 'Civil and Infrastructure Engineering Society | IIT Jodhpur',
    template: '%s | Civil and Infrastructure Engineering Society | IIT Jodhpur',
  },
  description:
    'CIES IIT Jodhpur – Official website of the Civil & Infrastructure Engineering Society at Indian Institute of Technology Jodhpur. Explore workshops, seminars, EDIFICIO fest, events, team, and student community initiatives in civil engineering.',
  keywords: [
    'CIES',
    'CIES IITJ',
    'CIES IIT Jodhpur',
    'Civil Engineering Society IIT Jodhpur',
    'civil engineering society iitj',
    'civil engineering iit jodhpur',
    'civil infrastructure engineering society',
    'IIT Jodhpur civil engineering',
    'EDIFICIO IIT Jodhpur',
    'EDIFICIO fest',
    'civil engineering student society',
    'IIT Jodhpur student society',
    'civil engineering workshops india',
    'civil engineering seminars IIT',
    'infrastructure engineering IIT Jodhpur',
    'engineering education jodhpur',
    'iitj civil',
    'cies_iitj',
  ],
  authors: [{ name: 'Civil Engineering Society, IIT Jodhpur' }],
  creator: 'CIES IIT Jodhpur',
  publisher: 'Civil & Infrastructure Engineering Society, IIT Jodhpur',

  // Canonical URL
  alternates: {
    canonical: '/',
  },

  // Open Graph Meta Tags
  openGraph: {
    title: 'Civil and Infrastructure Engineering Society | IIT Jodhpur',
    description:
      'Official website of the Civil & Infrastructure Engineering Society at IIT Jodhpur. Building Futures, Strengthening Foundations. Workshops, seminars, EDIFICIO fest, and more.',
    type: 'website',
    url: 'https://cies.iitj.ac.in',
    locale: 'en_IN',
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 800,
        alt: 'Civil and Infrastructure Engineering Society | IIT Jodhpur Logo',
      },
    ],
    siteName: 'Civil and Infrastructure Engineering Society | IIT Jodhpur',
  },

  // Twitter Card Meta Tags
  twitter: {
    card: 'summary_large_image',
    title: 'Civil and Infrastructure Engineering Society | IIT Jodhpur',
    description:
      'Official website of the Civil & Infrastructure Engineering Society at IIT Jodhpur. Workshops, seminars, EDIFICIO fest, and more.',
    images: ['/logo.jpg'],
  },

  // PWA and Theme
  applicationName: 'Civil and Infrastructure Engineering Society | IIT Jodhpur',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Civil and Infrastructure Engineering Society | IIT Jodhpur',
  },

  // Icons - circular CIES logo favicon (generated from logo.jpg)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/logo.jpg', sizes: '180x180', type: 'image/jpeg' }],
  },

  // Manifest
  manifest: '/manifest.json',

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification
  verification: {
    google: 'SVmhv2Ur6Yv0MwkpqDiHIxYxOsxpO0xK_hSmTXuSEbE',
  },

  // Additional Meta
  other: {
    'application-name': 'Civil and Infrastructure Engineering Society | IIT Jodhpur',
    'msapplication-TileColor': '#0b3d91',
  },
};

// JSON-LD Structured Data — Organization
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://cies.iitj.ac.in/#organization',
  name: 'Civil & Infrastructure Engineering Society - IIT Jodhpur',
  alternateName: ['CIES IIT Jodhpur', 'CIES IITJ', 'CIES', 'Civil Engineering Society IIT Jodhpur'],
  url: 'https://cies.iitj.ac.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://cies.iitj.ac.in/logo.jpg',
    width: 800,
    height: 800,
  },
  image: 'https://cies.iitj.ac.in/logo.jpg',
  description:
    'CIES is the official student society for the Department of Civil & Infrastructure Engineering at Indian Institute of Technology Jodhpur. It organizes workshops, seminars, EDIFICIO technical festival, site visits, and community engagement activities.',
  foundingLocation: {
    '@type': 'Place',
    name: 'IIT Jodhpur',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'NH-62, Nagaur Road, Karwar',
    addressLocality: 'Jodhpur',
    addressRegion: 'Rajasthan',
    postalCode: '342030',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'cies@iitj.ac.in',
    contactType: 'general inquiry',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://www.instagram.com/cies_iitj',
    'https://www.linkedin.com/company/107540236',
  ],
  memberOf: {
    '@type': 'EducationalOrganization',
    name: 'Indian Institute of Technology Jodhpur',
    alternateName: 'IIT Jodhpur',
    url: 'https://iitj.ac.in',
  },
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Technology Jodhpur',
    alternateName: 'IIT Jodhpur',
    url: 'https://iitj.ac.in',
  },
};

// JSON-LD Structured Data — WebSite (enables sitelinks search box in Google)
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://cies.iitj.ac.in/#website',
  name: 'Civil and Infrastructure Engineering Society | IIT Jodhpur',
  alternateName: ['CIES IITJ', 'Civil Engineering Society IIT Jodhpur', 'CIES IIT Jodhpur'],
  url: 'https://cies.iitj.ac.in',
  description: 'Official website of the Civil & Infrastructure Engineering Society at IIT Jodhpur',
  publisher: {
    '@id': 'https://cies.iitj.ac.in/#organization',
  },
  inLanguage: 'en-IN',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://cies.iitj.ac.in/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme initialization script - runs before React hydrates to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                // Always default to light mode on first visit (ignore system preference)
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  // Set light mode as default if no saved preference exists
                  if (!savedTheme) {
                    localStorage.setItem('theme', 'light');
                  }
                }
              })();
            `,
          }}
        />
        {/* Structured Data — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Structured Data — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
