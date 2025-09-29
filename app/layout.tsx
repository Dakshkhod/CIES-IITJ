import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// SEO and Meta Tags for Next.js 13+ App Router
export const metadata: Metadata = {
  title: 'Civil Engineering Society - IIT Jodhpur | Building Futures, Strengthening Foundations',
  description:
    'Official homepage of the Civil & Infrastructure Engineering Society at IIT Jodhpur. Explore our workshops, projects, events, and student community initiatives.',
  keywords:
    'civil engineering, IIT Jodhpur, student society, infrastructure, construction, engineering education, workshops, competitions',
  authors: [{ name: 'Civil Engineering Society, IIT Jodhpur' }],
  viewport: 'width=device-width, initial-scale=1.0',

  // Open Graph Meta Tags
  openGraph: {
    title: 'Civil Engineering Society - IIT Jodhpur',
    description:
      'Building Futures, Strengthening Foundations - Official homepage of CIES IIT Jodhpur',
    type: 'website',
    url: 'https://cies.iitj.ac.in',
    images: [
      {
        url: 'https://cies.iitj.ac.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Civil Engineering Society - IIT Jodhpur',
      },
    ],
    siteName: 'Civil Engineering Society - IIT Jodhpur',
  },

  // Twitter Card Meta Tags
  twitter: {
    card: 'summary_large_image',
    title: 'Civil Engineering Society - IIT Jodhpur',
    description:
      'Building Futures, Strengthening Foundations - Official homepage of CIES IIT Jodhpur',
    images: ['https://cies.iitj.ac.in/og-image.jpg'],
  },

  // PWA and Theme
  themeColor: '#0b3d91',
  applicationName: 'CIES IIT Jodhpur',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CIES IIT Jodhpur',
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },

  // Manifest
  manifest: '/manifest.json',

  // Additional Meta
  other: {
    'application-name': 'CIES IIT Jodhpur',
  },
};

// JSON-LD Structured Data
const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Civil Engineering Society - IIT Jodhpur',
  alternateName: 'CIES IIT Jodhpur',
  url: 'https://cies.iitj.ac.in',
  logo: 'https://cies.iitj.ac.in/logo.jpg',
  description:
    'Student society for Civil & Infrastructure Engineering at Indian Institute of Technology Jodhpur',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'NH-62, Nagour Road, Karwar',
    addressLocality: 'Jodhpur',
    addressRegion: 'Rajasthan',
    postalCode: '342030',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'office@civil.iitj.ac.in',
    contactType: 'customer service',
  },
  sameAs: ['https://www.instagram.com/cies_iitj', 'https://www.linkedin.com/company/cies-iitj'],
  parentOrganization: {
    '@type': 'EducationalOrganization',
    name: 'Indian Institute of Technology Jodhpur',
    url: 'https://iitj.ac.in',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
