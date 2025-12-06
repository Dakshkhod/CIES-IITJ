/**
 * Migration Script: Fix Specific Committee Assignments
 * Updates specific members to correct committees based on organizational chart
 * Run: SANITY_API_TOKEN=your_token node scripts/fix-specific-committees.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'py29aahl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Specific member to committee mappings based on organizational chart
const memberCommitteeMapping = {
  'Falak Khan': 'Seminars & Academic Engagement Committee',
  'Faizah Wani': 'Seminars & Academic Engagement Committee',
  'Sri Raghava': 'Seminars & Academic Engagement Committee',
}

async function fixSpecificCommittees() {
  console.log('╔═══════════════════════════════════════╗')
  console.log('║   Fix Specific Committee Assignments  ║')
  console.log('╚═══════════════════════════════════════╝')
  console.log('\n🚀 Starting specific committee fixes...\n')

  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ Error: SANITY_API_TOKEN is required.')
    process.exit(1)
  }

  try {
    let updatedCount = 0
    let notFoundCount = 0

    for (const [memberName, correctCommittee] of Object.entries(memberCommitteeMapping)) {
      try {
        // Find member by name
        const members = await client.fetch(`
          *[_type == "teamMember" && name == $name]{
            _id,
            name,
            committee
          }
        `, { name: memberName })

        if (members.length === 0) {
          console.log(`⚠️  ${memberName}: Not found in Sanity`)
          notFoundCount++
          continue
        }

        for (const member of members) {
          if (member.committee === correctCommittee) {
            console.log(`⏭️  ${member.name}: Already in correct committee "${correctCommittee}"`)
            continue
          }

          await client
            .patch(member._id)
            .set({ committee: correctCommittee })
            .commit()

          console.log(`✅ ${member.name}: "${member.committee}" → "${correctCommittee}"`)
          updatedCount++
        }
      } catch (error) {
        console.error(`❌ ${memberName}: ${error.message}`)
      }
    }

    console.log('\n╔═══════════════════════════════════════╗')
    console.log('║   ✅ Fix Complete!                     ║')
    console.log(`║   Updated: ${updatedCount} members        ║`)
    if (notFoundCount > 0) {
      console.log(`║   Not Found: ${notFoundCount} members   ║`)
    }
    console.log('╚═══════════════════════════════════════╝')
  } catch (error) {
    console.error('\n❌ Script failed:', error)
    process.exit(1)
  }
}

fixSpecificCommittees().catch((err) => {
  console.error('\n❌ Script failed:', err)
  process.exit(1)
})

