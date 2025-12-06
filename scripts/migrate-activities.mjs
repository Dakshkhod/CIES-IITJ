/**
 * Migration Script: Move activities to separate Activity schema
 * Run: SANITY_API_TOKEN=your_token node scripts/migrate-activities.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'py29aahl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Activities to create in new schema
const activities = [
  {
    title: 'Research Presentation - Saran Kumar Aatrey',
    date: '2025-05-09',
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
    category: 'workshop',
    status: 'completed',
    description: 'Hands-on workshop on geospatial technologies and their applications in civil engineering.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 60,
  },
  {
    title: 'Guest Lecture by Prof. Ligy (IITM)',
    date: '2025-10-13',
    category: 'guest-lecture',
    status: 'completed',
    description: 'Guest lecture by Prof. Ligy from IIT Madras on environmental engineering.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 80,
    speakerName: 'Prof. Ligy (IIT Madras)',
  },
  {
    title: 'EDIFICIO - Hackathon & Ideathon',
    date: '2025-12-01',
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
    category: 'site-visit',
    status: 'upcoming',
    description: 'Industrial site visit to understand real-world civil engineering practices.',
    location: 'TBD',
    attendeesCount: 40,
  },
]

async function deleteOldActivities() {
  console.log('\n🗑️  Deleting old activities from Event schema...')
  try {
    // Find all events that were activities
    const oldActivities = await client.fetch('*[_type == "event" && eventCategory == "activity"]._id')
    
    for (const id of oldActivities) {
      await client.delete(id)
      console.log(`✅ Deleted: ${id}`)
    }
    console.log(`Deleted ${oldActivities.length} old activities`)
  } catch (error) {
    console.error('❌ Error deleting old activities:', error.message)
  }
}

async function createNewActivities() {
  console.log('\n🎯 Creating activities in new Activity schema...')
  
  for (const activity of activities) {
    try {
      await client.create({
        _type: 'activity',
        title: activity.title,
        slug: { 
          _type: 'slug', 
          current: activity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') 
        },
        date: activity.date,
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
  console.log('║   Migrate Activities to New Schema    ║')
  console.log('╚═══════════════════════════════════════╝')
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ Error: SANITY_API_TOKEN is required.')
    process.exit(1)
  }
  
  await deleteOldActivities()
  await createNewActivities()
  
  console.log('\n╔═══════════════════════════════════════╗')
  console.log('║   ✅ Migration Complete!               ║')
  console.log('╚═══════════════════════════════════════╝')
}

main().catch(console.error)

