/**
 * Migration Script: Add Calendar Events for Academic Year 2025-26
 * Based on CIES Calendar (2025-26)_Final.xlsx
 * Run: SANITY_API_TOKEN=your_token node scripts/migrate-calendar-2025-26.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'

const client = createClient({
  projectId: 'py29aahl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Calendar Events for Academic Year 2025-26
// Based on the PDF calendar structure
const calendarEvents = [
  // May 2025
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-05-15',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-05-29',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  
  // June 2025
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-06-12',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-06-26',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  
  // July 2025
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-07-10',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-07-24',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  
  // August 2025
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-08-07',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-08-21',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  
  // September 2025
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-09-04',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-09-18',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  
  // October 2025
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-10-02',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-10-16',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Guest Lecture by Dr. Mohamed Shader Kahanun',
    date: '2025-10-20',
    category: 'seminar',
    status: 'upcoming',
    description: 'Guest lecture by Dr. Mohamed Shader Kahanun on advanced topics in civil engineering.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 100,
    speakerName: 'Dr. Mohamed Shader Kahanun',
    featured: true,
  },
  {
    title: 'Guest Lecture by Dr. Alkhair',
    date: '2025-10-25',
    category: 'seminar',
    status: 'upcoming',
    description: 'In-person guest lecture by Dr. Alkhair on insights of civil engineering.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 100,
    speakerName: 'Dr. Alkhair',
    featured: true,
  },
  
  // November 2025
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-11-06',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-11-20',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Insights of Civil Engineering - First Issue Launch',
    date: '2025-11-28',
    category: 'other',
    status: 'upcoming',
    description: 'Launch event for the first issue of "Insights of Civil Engineering" magazine (Issue 1800-1801).',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 80,
    featured: true,
  },
  
  // December 2025
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-12-04',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2025-12-18',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  
  // January 2026
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2026-01-08',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2026-01-22',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  
  // February 2026
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2026-02-05',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2026-02-19',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  
  // March 2026
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2026-03-05',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2026-03-19',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  
  // April 2026
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2026-04-02',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2026-04-16',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
  {
    title: 'Research Presentation - PhD Scholar',
    date: '2026-04-30',
    category: 'research',
    status: 'upcoming',
    description: 'Monthly research presentation by PhD scholars showcasing their research progress.',
    location: 'IIT Jodhpur Campus',
    attendeesCount: 50,
  },
]

async function uploadImage(imagePath, documentName) {
  if (!imagePath || imagePath.startsWith('data:image/svg+xml')) {
    return null
  }

  try {
    const absolutePath = path.resolve(process.cwd(), 'public', imagePath)
    await fsp.access(absolutePath) // Check if file exists
    
    const imageAsset = await client.assets.upload('image', fs.createReadStream(absolutePath), {
      filename: path.basename(imagePath),
      contentType: `image/${path.extname(imagePath).substring(1)}`,
    })
    
    console.log(`  - Uploaded image for ${documentName}: ${imageAsset.url}`)
    return {
      _type: 'image',
      asset: {
        _ref: imageAsset._id,
        _type: 'reference',
      },
    }
  } catch (error) {
    console.warn(`  ⚠️ Warning: Could not upload image ${imagePath} for ${documentName}. Error: ${error.message}`)
    return null
  }
}

async function migrateCalendarEvents() {
  console.log('╔═══════════════════════════════════════╗')
  console.log('║   CIES Calendar 2025-26 Migration    ║')
  console.log('╚═══════════════════════════════════════╝')
  console.log('\n🚀 Starting calendar migration...\n')

  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ Error: SANITY_API_TOKEN is required.')
    console.error('Run: SANITY_API_TOKEN=your_token node scripts/migrate-calendar-2025-26.mjs')
    process.exit(1)
  }

  let successCount = 0
  let errorCount = 0

  for (const event of calendarEvents) {
    try {
      // Check if event already exists
      const existing = await client.fetch(
        `*[_type == "activity" && title == $title && date == $date][0]`,
        { title: event.title, date: event.date }
      )

      if (existing) {
        console.log(`⏭️  Skipping (already exists): ${event.title} - ${event.date}`)
        continue
      }

      const coverImage = await uploadImage('/CIE Design.png', event.title)

      const doc = {
        _type: 'activity',
        title: event.title,
        slug: {
          _type: 'slug',
          current: event.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        },
        date: event.date,
        category: event.category,
        status: event.status,
        description: event.description,
        location: event.location,
        attendeesCount: event.attendeesCount,
        coverImage: coverImage,
        featured: event.featured || false,
      }

      // Add speaker if available
      if (event.speakerName) {
        doc.speakerName = event.speakerName
      }

      await client.create(doc)
      console.log(`✅ ${event.title} - ${event.date}`)
      successCount++
    } catch (error) {
      console.error(`❌ ${event.title}: ${error.message}`)
      errorCount++
    }
  }

  console.log('\n╔═══════════════════════════════════════╗')
  console.log('║   ✅ Migration Complete!               ║')
  console.log(`║   Success: ${successCount} events        ║`)
  if (errorCount > 0) {
    console.log(`║   Errors: ${errorCount} events          ║`)
  }
  console.log('╚═══════════════════════════════════════╝')
}

migrateCalendarEvents().catch((err) => {
  console.error('\n❌ Migration failed:', err)
  process.exit(1)
})

