/**
 * Migration Script: Upload frontend data to Sanity CMS
 * Run: SANITY_API_TOKEN=your_token node scripts/migrate-to-sanity.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'py29aahl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ==========================================
// TEAM MEMBERS DATA
// ==========================================
const teamMembers = [
  { name: "Ashwani", role: "Secretary", committee: "Coordination Committee", batch: "UG 2024", bio: "Secretary — coordinates society operations.", featured: true, displayOrder: 1 },
  { name: "Mayank Tiwari", role: "PG Representative", committee: "Coordination Committee", batch: "PG 2024", bio: "Postgraduate representative connecting PG students with society activities.", displayOrder: 2 },
  { name: "Shashank", role: "Joint Secretary", committee: "Coordination Committee", batch: "UG 2024", bio: "Joint Secretary.", displayOrder: 3 },
  { name: "Saurabh", role: "Events & Community Engagement Lead", committee: "Events & Community Engagement Committee", batch: "PG 2024", bio: "Leading events and community outreach initiatives.", displayOrder: 4 },
  { name: "Vikas", role: "Executive", committee: "Events & Community Engagement Committee", batch: "UG 2024", bio: "Executive member supporting event organization.", displayOrder: 5 },
  { name: "Manish", role: "Executive", committee: "Events & Community Engagement Committee", batch: "UG 2024", bio: "Executive member contributing to society events.", displayOrder: 6 },
  { name: "Keshav Saini", role: "Technical Lead", committee: "Technical Committee", batch: "PG 2024", bio: "Technical lead managing web development and digital initiatives.", displayOrder: 7 },
  { name: "Daksh", role: "Tech-Lead (UG)-Web Dev Executive", committee: "Technical Committee", batch: "UG 2024", bio: "Web dev and technical executive.", featured: true, displayOrder: 8 },
  { name: "Falak Khan", role: "Seminars & Academic Engagement Lead", committee: "Seminars & Academic Engagement Committee", batch: "PG 2024", bio: "Organizing seminars and academic engagement programs.", displayOrder: 9 },
  { name: "Faizah Wani", role: "PG Lead", committee: "Seminars & Academic Engagement Committee", batch: "PG 2024", bio: "PG lead for academic seminars and research engagement.", displayOrder: 10 },
  { name: "Sri Raghava", role: "Executive", committee: "Seminars & Academic Engagement Committee", batch: "UG 2024", bio: "Executive coordinating academic activities.", displayOrder: 11 },
  { name: "Deepali", role: "Media & Design Lead", committee: "Media & Design Committee", batch: "PG 2024", bio: "Leading design and media content creation.", displayOrder: 12 },
  { name: "Nitesh", role: "Media & Design Executive", committee: "Media & Design Committee", batch: "UG 2024", bio: "Supporting design and media initiatives.", displayOrder: 13 },
  { name: "Harsh", role: "Media & Design Executive", committee: "Media & Design Committee", batch: "UG 2024", bio: "Design & media executive.", displayOrder: 14 },
  { name: "Simran Sehgal", role: "Media & Design Executive", committee: "Media & Design Committee", batch: "PG 2024", bio: "Creative executive handling visual content.", displayOrder: 15 },
  { name: "Simranjit Kaur", role: "Documentation Lead", committee: "Documentation Committee", batch: "PG 2024", bio: "Leading documentation and record-keeping.", displayOrder: 16 },
  { name: "Nishant", role: "Executive", committee: "Documentation Committee", batch: "UG 2024", bio: "Executive managing documentation tasks.", displayOrder: 17 },
  { name: "Ram Kunawar", role: "Outreach Lead", committee: "Outreach Committee", batch: "PG 2024", bio: "Leading outreach and external relations.", displayOrder: 18 },
]

// ==========================================
// EVENTS DATA (from events page)
// ==========================================
const events = [
  {
    title: 'Orientation of Batch 25 (PG)',
    date: '2025-07-15',
    eventCategory: 'event',
    category: 'other',
    status: 'completed',
    description: 'Welcome session for new postgraduate students joining the Civil & Infrastructure Engineering program.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
    featured: true,
  },
  {
    title: 'Orientation of Batch 25 (UG)',
    date: '2025-08-05',
    eventCategory: 'event',
    category: 'other',
    status: 'completed',
    description: 'Welcome session for new undergraduate students joining the Civil & Infrastructure Engineering program.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 80,
    featured: true,
  },
  {
    title: 'Freshers (UG)',
    date: '2025-10-05',
    eventCategory: 'event',
    category: 'edificio',
    status: 'completed',
    description: 'Welcome celebration for undergraduate students featuring cultural performances and interactive activities.',
    location: 'IIT Jodhpur Auditorium',
    attendeesCount: 120,
    featured: true,
  },
  {
    title: "Teacher's Day Celebration",
    date: '2025-09-05',
    eventCategory: 'event',
    category: 'other',
    status: 'completed',
    description: "Celebrating Teacher's Day with the Civil Engineering faculty and students.",
    location: 'IIT Jodhpur Campus',
    attendeesCount: 80,
  },
  {
    title: "Engineer's Day",
    date: '2025-09-15',
    eventCategory: 'event',
    category: 'other',
    status: 'completed',
    description: "Celebrating Engineer's Day with technical activities and discussions.",
    location: 'IIT Jodhpur Campus',
    attendeesCount: 100,
  },
  {
    title: 'Diwali Celebration',
    date: '2025-10-14',
    eventCategory: 'event',
    category: 'other',
    status: 'completed',
    description: 'Annual Diwali celebration with the Civil Engineering community.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 150,
    featured: true,
  },
]

// ==========================================
// ACTIVITIES DATA (from activities/roadmap pages)
// ==========================================
const activities = [
  {
    title: 'Research Presentation - Saran Kumar Aatrey',
    date: '2025-05-09',
    eventCategory: 'activity',
    category: 'seminar',
    status: 'completed',
    description: 'Research presentation by P21CI002 on advanced civil engineering methodologies.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
    speakerName: 'Saran Kumar Aatrey (P21CI002)',
  },
  {
    title: 'Research Presentation - Aparna Singh',
    date: '2025-05-23',
    eventCategory: 'activity',
    category: 'seminar',
    status: 'completed',
    description: 'Research presentation on civil engineering innovations.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 45,
    speakerName: 'Aparna Singh',
  },
  {
    title: 'Seminar by Prof. Ravindra Gettu',
    date: '2025-06-10',
    eventCategory: 'activity',
    category: 'seminar',
    status: 'completed',
    description: 'Expert talk on sustainable concrete technology by Prof. Ravindra Gettu from IIT Madras.',
    location: 'IIT Jodhpur Auditorium',
    attendeesCount: 100,
    speakerName: 'Prof. Ravindra Gettu (IIT Madras)',
    featured: true,
  },
  {
    title: 'Workshop on Geospatial Technologies',
    date: '2025-10-11',
    eventCategory: 'activity',
    category: 'workshop',
    status: 'completed',
    description: 'Hands-on workshop on geospatial technologies and their applications in civil engineering.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 60,
  },
  {
    title: 'Guest Lecture by Prof. Ligy (IITM)',
    date: '2025-10-13',
    eventCategory: 'activity',
    category: 'seminar',
    status: 'completed',
    description: 'Guest lecture by Prof. Ligy from IIT Madras on environmental engineering.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 80,
    speakerName: 'Prof. Ligy (IIT Madras)',
  },
  {
    title: 'EDIFICIO - Hackathon & Ideathon',
    date: '2025-12-01',
    eventCategory: 'activity',
    category: 'edificio',
    status: 'upcoming',
    description: 'Annual technical festival featuring hackathon, ideathon, and competitions for civil engineering students.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 500,
    featured: true,
  },
  {
    title: 'Industry Visit',
    date: '2026-03-20',
    eventCategory: 'activity',
    category: 'site-visit',
    status: 'upcoming',
    description: 'Industrial site visit to understand real-world civil engineering practices.',
    location: 'TBD',
    attendeesCount: 40,
  },
]

// ==========================================
// CONTACT INFORMATION
// ==========================================
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
  },
}

// ==========================================
// MIGRATION FUNCTIONS
// ==========================================

async function migrateContactInfo() {
  console.log('\n📋 Migrating Contact Information...')
  try {
    const existing = await client.fetch('*[_type == "contactInfo"][0]')
    if (existing) {
      await client.patch(existing._id).set(contactInfo).commit()
      console.log(`✅ Updated contact info`)
    } else {
      await client.create({ _type: 'contactInfo', ...contactInfo })
      console.log(`✅ Created contact info`)
    }
  } catch (error) {
    console.error('❌ Failed:', error.message)
  }
}

async function migrateTeamMembers() {
  console.log('\n👥 Migrating Team Members...')
  for (const member of teamMembers) {
    try {
      await client.create({
        _type: 'teamMember',
        name: member.name,
        role: member.role,
        committee: member.committee,
        batch: member.batch,
        bio: member.bio,
        featured: member.featured || false,
        isHOD: false,
        isFaculty: false,
        isActive: true,
        displayOrder: member.displayOrder,
      })
      console.log(`✅ ${member.name}`)
    } catch (error) {
      console.error(`❌ ${member.name}: ${error.message}`)
    }
  }
}

async function migrateEvents() {
  console.log('\n📅 Migrating Events...')
  for (const event of events) {
    try {
      await client.create({
        _type: 'event',
        title: event.title,
        slug: { _type: 'slug', current: event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') },
        date: event.date,
        eventCategory: event.eventCategory,
        category: event.category,
        status: event.status,
        description: event.description,
        location: event.location,
        attendeesCount: event.attendeesCount,
        featured: event.featured || false,
      })
      console.log(`✅ ${event.title}`)
    } catch (error) {
      console.error(`❌ ${event.title}: ${error.message}`)
    }
  }
}

async function migrateActivities() {
  console.log('\n🎯 Migrating Activities...')
  for (const activity of activities) {
    try {
      await client.create({
        _type: 'event',
        title: activity.title,
        slug: { _type: 'slug', current: activity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') },
        date: activity.date,
        eventCategory: activity.eventCategory,
        category: activity.category,
        status: activity.status,
        description: activity.description,
        location: activity.location,
        attendeesCount: activity.attendeesCount,
        speakerName: activity.speakerName || null,
        featured: activity.featured || false,
      })
      console.log(`✅ ${activity.title}`)
    } catch (error) {
      console.error(`❌ ${activity.title}: ${error.message}`)
    }
  }
}

async function main() {
  console.log('╔═══════════════════════════════════════╗')
  console.log('║   CIES IITJ - Sanity Migration        ║')
  console.log('╚═══════════════════════════════════════╝')
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ Error: SANITY_API_TOKEN is required.')
    console.log('\n📌 To create a token:')
    console.log('1. Go to: https://www.sanity.io/manage/project/py29aahl/api')
    console.log('2. Scroll to "Tokens" → "Add API token"')
    console.log('3. Name: "Migration", Permissions: "Editor"')
    console.log('4. Run: SANITY_API_TOKEN=your_token node scripts/migrate-to-sanity.mjs')
    process.exit(1)
  }
  
  console.log('\n🚀 Starting migration...')
  
  await migrateContactInfo()
  await migrateTeamMembers()
  await migrateEvents()
  await migrateActivities()
  
  console.log('\n╔═══════════════════════════════════════╗')
  console.log('║   ✅ Migration Complete!               ║')
  console.log('╚═══════════════════════════════════════╝')
  console.log('\n📌 Check your data at: https://cies.iitj.ac.in/studio')
}

main().catch(console.error)
