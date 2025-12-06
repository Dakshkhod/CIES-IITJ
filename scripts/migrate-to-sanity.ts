/**
 * Migration Script: Upload frontend data to Sanity CMS
 * Run this script with: npx ts-node scripts/migrate-to-sanity.ts
 */

import { createClient } from '@sanity/client'

// Sanity client configuration
const client = createClient({
  projectId: 'py29aahl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You need to create this token
  useCdn: false,
})

// Team Members Data (from frontend)
const teamMembers = [
  { 
    name: "Ashwani", 
    role: "Secretary", 
    committee: "Coordination Committee", 
    batch: "UG 2024", 
    bio: "Secretary — coordinates society operations.", 
    featured: true,
    displayOrder: 1,
    isActive: true,
  },
  { 
    name: "Mayank Tiwari", 
    role: "PG Representative", 
    committee: "Coordination Committee", 
    batch: "PG 2024", 
    bio: "Postgraduate representative connecting PG students with society activities.",
    displayOrder: 2,
    isActive: true,
  },
  { 
    name: "Shashank", 
    role: "Joint Secretary", 
    committee: "Coordination Committee", 
    batch: "UG 2024", 
    bio: "Joint Secretary.",
    displayOrder: 3,
    isActive: true,
  },
  { 
    name: "Saurabh", 
    role: "Events & Community Engagement Lead", 
    committee: "Events & Community Engagement Committee", 
    batch: "PG 2024", 
    bio: "Leading events and community outreach initiatives.",
    displayOrder: 4,
    isActive: true,
  },
  { 
    name: "Vikas", 
    role: "Executive", 
    committee: "Events & Community Engagement Committee", 
    batch: "UG 2024", 
    bio: "Executive member supporting event organization and community engagement.",
    displayOrder: 5,
    isActive: true,
  },
  { 
    name: "Manish", 
    role: "Executive", 
    committee: "Events & Community Engagement Committee", 
    batch: "UG 2024", 
    bio: "Executive member contributing to society events and activities.",
    displayOrder: 6,
    isActive: true,
  },
  { 
    name: "Keshav Saini", 
    role: "Technical Lead", 
    committee: "Technical Committee", 
    batch: "PG 2024",
    bio: "Technical lead managing web development and digital initiatives.",
    displayOrder: 7,
    isActive: true,
  },
  { 
    name: "Daksh", 
    role: "Tech-Lead (UG)-Web Dev Executive",
    committee: "Technical Committee", 
    batch: "UG 2024",
    bio: "Web dev and technical executive.", 
    featured: true,
    displayOrder: 8,
    isActive: true,
  },
  { 
    name: "Falak Khan", 
    role: "Seminars & Academic Engagement Lead", 
    committee: "Seminars & Academic Engagement Committee", 
    batch: "PG 2024", 
    bio: "Organizing seminars and academic engagement programs.",
    displayOrder: 9,
    isActive: true,
  },
  { 
    name: "Faizah Wani", 
    role: "PG Lead", 
    committee: "Seminars & Academic Engagement Committee", 
    batch: "PG 2024", 
    bio: "PG lead for academic seminars and research engagement.",
    displayOrder: 10,
    isActive: true,
  },
  { 
    name: "Sri Raghava", 
    role: "Executive", 
    committee: "Seminars & Academic Engagement Committee", 
    batch: "UG 2024", 
    bio: "PG lead coordinating academic and research activities.",
    displayOrder: 11,
    isActive: true,
  },
  { 
    name: "Deepali", 
    role: "Media & Design Lead", 
    committee: "Media & Design Committee", 
    batch: "PG 2024", 
    bio: "Leading design and media content creation for the society.",
    displayOrder: 12,
    isActive: true,
  },
  { 
    name: "Nitesh", 
    role: "Media & Design Executive", 
    committee: "Media & Design Committee", 
    batch: "UG 2024", 
    bio: "Supporting design and media initiatives for society events.",
    displayOrder: 13,
    isActive: true,
  },
  { 
    name: "Simran Sehgal", 
    role: "Media & Design Executive", 
    committee: "Media & Design Committee", 
    batch: "PG 2024", 
    bio: "Creative executive handling visual content and media.",
    displayOrder: 14,
    isActive: true,
  },
  { 
    name: "Simranjit Kaur", 
    role: "Documentation Lead", 
    committee: "Documentation Committee", 
    batch: "PG 2024", 
    bio: "Leading documentation and record-keeping for the society.",
    displayOrder: 15,
    isActive: true,
  },
  { 
    name: "Nishant", 
    role: "Executive", 
    committee: "Documentation Committee", 
    batch: "UG 2024", 
    bio: "Executive member managing documentation tasks.",
    displayOrder: 16,
    isActive: true,
  },
  { 
    name: "Ram Kunawar", 
    role: "Outreach Lead", 
    committee: "Outreach Committee", 
    batch: "PG 2024", 
    bio: "Leading outreach and external relations for the society.",
    displayOrder: 17,
    isActive: true,
  },
]

// Events Data (from frontend)
const events = [
  {
    title: 'Orientation of Batch 25 (PG)',
    date: '2025-07-15',
    eventCategory: 'event',
    category: 'other',
    status: 'upcoming',
    description: 'Welcome session for new postgraduate students joining the Civil & Infrastructure Engineering program.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
    featured: true,
  },
  {
    title: 'Diwali Celebration',
    date: '2024-10-31',
    eventCategory: 'event',
    category: 'other',
    status: 'completed',
    description: 'Annual Diwali celebration with the Civil Engineering community.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 100,
    featured: true,
  },
]

// Contact Information (singleton)
const contactInfo = {
  departmentName: 'Civil & Infrastructure Engineering Society (CIES)',
  institutionName: 'Indian Institute of Technology Jodhpur',
  address: 'NH 62, Nagaur Road, Karwar, Jodhpur, Rajasthan 342030, India',
  email: 'cies@iitj.ac.in',
  phone: '+91-291-280-1234',
  officeHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/cies-iitj',
    instagram: 'https://www.instagram.com/cies_iitj',
    twitter: null,
    youtube: null,
    facebook: null,
    website: 'https://iitj.ac.in',
  },
}

async function migrateTeamMembers() {
  console.log('Migrating Team Members...')
  
  for (const member of teamMembers) {
    try {
      const doc = {
        _type: 'teamMember',
        name: member.name,
        role: member.role,
        committee: member.committee,
        batch: member.batch,
        bio: member.bio,
        featured: member.featured || false,
        isHOD: false,
        isFaculty: false,
        isActive: member.isActive,
        displayOrder: member.displayOrder,
        socials: {
          linkedin: null,
          email: null,
          instagram: null,
        },
      }
      
      const result = await client.create(doc)
      console.log(`✓ Created: ${member.name} (${result._id})`)
    } catch (error) {
      console.error(`✗ Failed to create ${member.name}:`, error)
    }
  }
}

async function migrateEvents() {
  console.log('\nMigrating Events...')
  
  for (const event of events) {
    try {
      const doc = {
        _type: 'event',
        title: event.title,
        slug: {
          _type: 'slug',
          current: event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        },
        date: event.date,
        eventCategory: event.eventCategory,
        category: event.category,
        status: event.status,
        description: event.description,
        location: event.location,
        attendeesCount: event.attendeesCount,
        featured: event.featured,
      }
      
      const result = await client.create(doc)
      console.log(`✓ Created: ${event.title} (${result._id})`)
    } catch (error) {
      console.error(`✗ Failed to create ${event.title}:`, error)
    }
  }
}

async function migrateContactInfo() {
  console.log('\nMigrating Contact Information...')
  
  try {
    // Check if contact info already exists
    const existing = await client.fetch('*[_type == "contactInfo"][0]')
    
    if (existing) {
      console.log('Contact info already exists, updating...')
      await client.patch(existing._id).set(contactInfo).commit()
      console.log(`✓ Updated contact info (${existing._id})`)
    } else {
      const doc = {
        _type: 'contactInfo',
        ...contactInfo,
      }
      const result = await client.create(doc)
      console.log(`✓ Created contact info (${result._id})`)
    }
  } catch (error) {
    console.error('✗ Failed to create/update contact info:', error)
  }
}

async function main() {
  console.log('=================================')
  console.log('CIES IITJ - Sanity Migration')
  console.log('=================================\n')
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN environment variable is required.')
    console.log('\nTo create a token:')
    console.log('1. Go to: https://www.sanity.io/manage/project/py29aahl/api')
    console.log('2. Click "Add API token"')
    console.log('3. Name: "Migration Script"')
    console.log('4. Permissions: "Editor"')
    console.log('5. Copy the token and run:')
    console.log('   SANITY_API_TOKEN=your_token npx ts-node scripts/migrate-to-sanity.ts')
    process.exit(1)
  }
  
  await migrateContactInfo()
  await migrateTeamMembers()
  await migrateEvents()
  
  console.log('\n=================================')
  console.log('Migration Complete!')
  console.log('=================================')
}

main().catch(console.error)

