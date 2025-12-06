/**
 * Migration Script: Update Daksh's Role
 * Updates Daksh's role to "Tech-Lead (UG)-Web Dev Executive"
 * Run: SANITY_API_TOKEN=your_token node scripts/update-daksh-role.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'py29aahl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function updateDakshRole() {
  console.log('╔═══════════════════════════════════════╗')
  console.log('║   Update Daksh Role                   ║')
  console.log('╚═══════════════════════════════════════╝')
  console.log('\n🚀 Updating Daksh role...\n')

  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ Error: SANITY_API_TOKEN is required.')
    process.exit(1)
  }

  try {
    // Find Daksh
    const members = await client.fetch(`
      *[_type == "teamMember" && name == "Daksh"]{
        _id,
        name,
        role
      }
    `)

    if (members.length === 0) {
      console.log('⚠️  Daksh not found in Sanity')
      process.exit(0)
    }

    for (const member of members) {
      if (member.role === 'Tech-Lead (UG)-Web Dev Executive') {
        console.log(`⏭️  ${member.name}: Already has correct role "${member.role}"`)
        continue
      }

      await client
        .patch(member._id)
        .set({ role: 'Tech-Lead (UG)-Web Dev Executive' })
        .commit()

      console.log(`✅ ${member.name}: "${member.role}" → "Tech-Lead (UG)-Web Dev Executive"`)
    }

    console.log('\n╔═══════════════════════════════════════╗')
    console.log('║   ✅ Update Complete!                  ║')
    console.log('╚═══════════════════════════════════════╝')
  } catch (error) {
    console.error('\n❌ Script failed:', error)
    process.exit(1)
  }
}

updateDakshRole().catch((err) => {
  console.error('\n❌ Script failed:', err)
  process.exit(1)
})

