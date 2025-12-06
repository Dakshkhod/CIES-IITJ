/**
 * Migration Script: Update Committee Names in Sanity
 * Maps old committee names to new organizational chart structure
 * Run: SANITY_API_TOKEN=your_token node scripts/update-committees.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'py29aahl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Mapping old committee names to new ones
const committeeMapping = {
  'Core Team': 'Coordination Committee',
  'Technical': 'Technical Committee',
  'Design': 'Media & Design Committee',
  'Content': 'Media & Design Committee',
  'PR & Outreach': 'Outreach & Publicity Committee',
  'Events': 'Events & Community Engagement Committee',
  'Faculty': 'Faculty Leadership',
}

// Also handle if some already have new names
const newCommittees = [
  'Faculty Leadership',
  'Coordination Committee',
  'Events & Community Engagement Committee',
  'Technical Committee',
  'Seminars & Academic Engagement Committee',
  'Media & Design Committee',
  'Outreach & Publicity Committee',
]

async function updateCommittees() {
  console.log('╔═══════════════════════════════════════╗')
  console.log('║   Update Committee Names in Sanity     ║')
  console.log('╚═══════════════════════════════════════╝')
  console.log('\n🚀 Starting committee update...\n')

  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ Error: SANITY_API_TOKEN is required.')
    console.error('Run: SANITY_API_TOKEN=your_token node scripts/update-committees.mjs')
    process.exit(1)
  }

  try {
    // Fetch all team members
    const allMembers = await client.fetch(`
      *[_type == "teamMember"]{
        _id,
        name,
        committee
      }
    `)

    console.log(`Found ${allMembers.length} team members\n`)

    let updatedCount = 0
    let skippedCount = 0
    let errorCount = 0

    for (const member of allMembers) {
      try {
        const oldCommittee = member.committee
        let newCommittee = null

        // Check if already using new committee name
        if (newCommittees.includes(oldCommittee)) {
          console.log(`⏭️  ${member.name}: Already has new committee "${oldCommittee}"`)
          skippedCount++
          continue
        }

        // Map old committee to new one
        if (oldCommittee && committeeMapping[oldCommittee]) {
          newCommittee = committeeMapping[oldCommittee]
        } else if (!oldCommittee) {
          console.log(`⚠️  ${member.name}: No committee set, skipping`)
          skippedCount++
          continue
        } else {
          console.log(`⚠️  ${member.name}: Unknown committee "${oldCommittee}", skipping`)
          skippedCount++
          continue
        }

        // Update the member
        await client
          .patch(member._id)
          .set({ committee: newCommittee })
          .commit()

        console.log(`✅ ${member.name}: "${oldCommittee}" → "${newCommittee}"`)
        updatedCount++
      } catch (error) {
        console.error(`❌ ${member.name}: ${error.message}`)
        errorCount++
      }
    }

    console.log('\n╔═══════════════════════════════════════╗')
    console.log('║   ✅ Update Complete!                  ║')
    console.log(`║   Updated: ${updatedCount} members        ║`)
    console.log(`║   Skipped: ${skippedCount} members       ║`)
    if (errorCount > 0) {
      console.log(`║   Errors: ${errorCount} members          ║`)
    }
    console.log('╚═══════════════════════════════════════╝')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

updateCommittees().catch((err) => {
  console.error('\n❌ Script failed:', err)
  process.exit(1)
})

