/**
 * Seed Script: Bulk-import 2025-26 activities & events into Sanity CMS
 *
 * Usage (set SANITY_API_TOKEN first):
 *
 *   Linux / Mac / Git Bash (one line):
 *     export SANITY_API_TOKEN=your_token
 *     node scripts/seed-2025-26-content.mjs
 *   Or: SANITY_API_TOKEN=your_token node scripts/seed-2025-26-content.mjs
 *
 *   Windows CMD:
 *     set SANITY_API_TOKEN=your_token
 *     node scripts/seed-2025-26-content.mjs
 *
 *   Windows PowerShell:
 *     $env:SANITY_API_TOKEN="your_token"; node scripts/seed-2025-26-content.mjs
 *
 *   Or: put SANITY_API_TOKEN=your_token in .env.local (gitignored), then run:
 *     node scripts/seed-2025-26-content.mjs
 *
 * Token: Sanity Manage → Project (py29aahl) → API → Tokens → Add (Editor).
 */

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')

// Load SANITY_API_TOKEN from .env.local if not set (helps on Windows)
if (!process.env.SANITY_API_TOKEN) {
    const envPath = resolve(projectRoot, '.env.local')
    if (existsSync(envPath)) {
        const content = readFileSync(envPath, 'utf8')
        const match = content.match(/SANITY_API_TOKEN\s*=\s*["']?([^\s"']+)["']?/)
        if (match) {
            process.env.SANITY_API_TOKEN = match[1].trim()
        }
    }
}

const client = createClient({
    projectId: 'py29aahl',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

// ═══════════════════════════════════════
//  ACTIVITIES (18 items → Activity schema)
// ═══════════════════════════════════════
const activities = [
    {
        title: 'PG Seminar Series 2025',
        date: '2025-05-15',
        category: 'seminar',
        status: 'completed',
        description: 'PhD scholars presented ongoing research in various domains of Civil and Infrastructure Engineering, initiated in collaboration with CIES.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 50,
    },
    {
        title: 'Seminar by Prof. Ravindra Gettu – Technology Implementation in Concrete Research',
        date: '2025-06-30',
        category: 'seminar',
        status: 'completed',
        description: 'Prof. Ravindra Gettu (IIT Madras) delivered a seminar titled "Technology Implementation as a Primary Aim of Research: Examples from Concrete Research." The hybrid session featured active participation from students and faculty.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 100,
        speakerName: 'Prof. Ravindra Gettu (IIT Madras)',
        featured: true,
    },
    {
        title: 'Prof. Akshay Gupta – Excellence in Doctoral Research Award',
        date: '2025-09-05',
        category: 'other',
        status: 'completed',
        description: 'CIES congratulated Prof. Akshay Gupta for receiving the Excellence in Doctoral Research Award at IIT Roorkee for his contributions to Transportation Engineering.',
        location: 'IIT Roorkee',
    },
    {
        title: 'Plantation Drive with Green Cell',
        date: '2025-09-20',
        category: 'other',
        status: 'completed',
        description: 'Organized on campus with the Green Cell. Prof. Mitali Mukerji (PIC-Green Cell) promoted the initiative, which saw active participation from postgraduate members.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 40,
    },
    {
        title: 'Online Talk – Prof. Masiur Rahaman on Julia for Numerical Computations',
        date: '2025-09-27',
        category: 'seminar',
        status: 'completed',
        description: 'Online talk by Prof. Mohammad Masiur Rahaman (IIT Bhubaneswar) on "Julia for efficient numerical computations," focusing on applications in structural engineering research.',
        location: 'Online (IIT Jodhpur)',
        attendeesCount: 60,
        speakerName: 'Prof. Mohammad Masiur Rahaman (IIT Bhubaneswar)',
    },
    {
        title: 'Guest Lecture – Prof. Ligy Philip on Sustainable Wastewater Treatment',
        date: '2025-10-03',
        category: 'seminar',
        status: 'completed',
        description: 'Guest lecture by Prof. Ligy Philip (IIT Madras) on "Integrating sustainability and circular economy principles in wastewater treatment," highlighting innovative environmental engineering solutions.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 80,
        speakerName: 'Prof. Ligy Philip (IIT Madras)',
    },
    {
        title: 'Survey of India Workshop on Geospatial Technologies',
        date: '2025-10-11',
        category: 'workshop',
        status: 'completed',
        description: 'Collaborative workshop on modern geospatial technologies, introduced participants to CORS, geoid models, and the Survey of India Map Portal.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 60,
    },
    {
        title: 'PG Seminar – Keshav Saini on Hybrid High Strength Steel I-Beams',
        date: '2025-10-20',
        category: 'seminar',
        status: 'completed',
        description: 'Mr. Keshav Saini presented on "Structural Performance of Hybrid High Strength Steel I-Beams," highlighting lighter and more efficient structural systems.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 40,
        speakerName: 'Keshav Saini',
    },
    {
        title: 'PG Seminar – Koduru Sandeep on Moisture Resistance of Cold Mix Asphalt',
        date: '2025-10-25',
        category: 'seminar',
        status: 'completed',
        description: 'Mr. Koduru Sandeep presented on "Improving Moisture Resistance of Cold Mix Asphalt through Aggregate Surface Modification," emphasizing sustainable pavement solutions.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 40,
        speakerName: 'Koduru Sandeep',
    },
    {
        title: 'Seminar – Dr. Ashutosh Kumar on Climate Resilience in Geotechnical Engineering',
        date: '2026-01-03',
        category: 'seminar',
        status: 'completed',
        description: 'Seminar by Dr. Ashutosh Kumar (IIT Mandi) on "Climate Resilience in Geotechnical Engineering: Why It Matters and How to Achieve It."',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 70,
        speakerName: 'Dr. Ashutosh Kumar (IIT Mandi)',
    },
    {
        title: 'Seminar – Shri S.L. Kapil on Geophysical Technologies for Dam Projects',
        date: '2026-01-07',
        category: 'seminar',
        status: 'completed',
        description: 'Seminar by Shri S. L. Kapil on "Cutting Edge Geophysical Technologies for Dam and Infrastructure Projects."',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 60,
        speakerName: 'Shri S. L. Kapil',
    },
    {
        title: 'Seminar – Prof. Animesh Das on Studying Pavement Materials Through Imaging',
        date: '2026-01-09',
        category: 'seminar',
        status: 'completed',
        description: 'Seminar by Prof. Animesh Das (IIT Kanpur) on "Studying Pavement Materials Through Imaging," highlighting advanced techniques to understand material behavior like bitumen bonding.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 70,
        speakerName: 'Prof. Animesh Das (IIT Kanpur)',
    },
    {
        title: 'Seminar – Dr. Deeksha Arya on Multinational Road Damage Detection AI',
        date: '2026-01-29',
        category: 'seminar',
        status: 'completed',
        description: 'Seminar by Dr. Deeksha Arya (University of Tokyo) on "Can One Country\'s AI Work Elsewhere? Evidence from Multinational Road Damage Detection Research."',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 60,
        speakerName: 'Dr. Deeksha Arya (University of Tokyo)',
    },
    {
        title: 'Seminar – Prof. Nemkumar Banthia on Nano-Materials in Concrete',
        date: '2026-02-03',
        category: 'seminar',
        status: 'completed',
        description: 'Technical talk by Prof. Nemkumar Banthia (University of British Columbia) on "The Promise of Nano-Materials as Functional Additives in Concrete," focusing on UHPC and sustainable infrastructure.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 80,
        speakerName: 'Prof. Nemkumar Banthia (University of British Columbia)',
        featured: true,
    },
    {
        title: 'BIS Essay Competition – Role of Standards in Engineering Life',
        date: '2026-02-13',
        category: 'competition',
        status: 'completed',
        description: 'Essay writing competition on "Role of Standards in Engineering Life" in collaboration with the Bureau of Indian Standards (BIS).',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 50,
    },
    {
        title: 'Seminar – Dr. Sarath Chandra Reddy on Multiscale Landslide Dynamics',
        date: '2026-02-27',
        category: 'seminar',
        status: 'completed',
        description: 'Technical seminar on "Multiscale Mechanisms of Landslide Dynamics," presenting experimental and simulation-based studies.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 60,
        speakerName: 'Dr. Sarath Chandra Reddy Nallala',
    },
    {
        title: 'Alumni Meet – Abhinav Singh Tawar on Placement Preparation',
        date: '2026-02-28',
        category: 'other',
        status: 'completed',
        description: 'Interaction session with Abhinav Singh Tawar focused on placement preparation, resume building, and aligning academic profiles.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 40,
        speakerName: 'Abhinav Singh Tawar',
    },
    {
        title: 'M.Tech Alumni Meet – Batch 2020 on Industry Expectations',
        date: '2026-02-28',
        category: 'other',
        status: 'completed',
        description: 'Alumni interaction session with M.Tech CIE (Environment) Batch 2020, focusing on industry expectations and placement readiness.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 30,
    },
]

// ═══════════════════════════════════════
//  EVENTS (Past & upcoming → Event schema)
// ═══════════════════════════════════════
const events = [
    {
        title: 'Congratulations to Class of 2025',
        date: '2025-06-01',
        eventCategory: 'event',
        category: 'other',
        status: 'completed',
        description: 'CIES congratulated the Class of 2025 (B.Tech 2021 & M.Tech 2023) on their convocation. Graduates were encouraged to carry forward the community spirit of CIES.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 200,
    },
    {
        title: 'Farewell – Class of 2025 (B.Tech 2021 & M.Tech 2023)',
        date: '2025-06-14',
        eventCategory: 'event',
        category: 'other',
        status: 'completed',
        description: 'CIES organized a farewell for the graduating Class of 2025 (B.Tech 2021 & M.Tech 2023). The department celebrated their journey at IIT Jodhpur and wished them success in their careers and future endeavors.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 180,
    },
    {
        title: 'UG Orientation – Batch of 2025',
        date: '2025-08-05',
        eventCategory: 'event',
        category: 'other',
        status: 'completed',
        description: 'CIES conducted the Undergraduate Orientation for the 2025 batch. The session included a welcome by the HoD, academic guidance by the Batch Faculty Advisor, and interactions with the Student Council. Activities like hometown-mapping helped incoming students connect with peers.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 80,
    },
    {
        title: 'Freshers (UG) – Batch of 2025',
        date: '2025-10-05',
        eventCategory: 'event',
        category: 'other',
        status: 'completed',
        description: 'Welcome celebration for the undergraduate Batch of 2025. The event featured cultural performances, ice-breakers, and introductions to CIES and department life, helping freshers feel at home in the CIE community.',
        location: 'IIT Jodhpur Auditorium',
        attendeesCount: 120,
    },
    {
        title: "Engineer's Day 2025",
        date: '2025-09-15',
        eventCategory: 'event',
        category: 'other',
        status: 'completed',
        description: 'Observed in honor of Sir M. Visvesvaraya, recognizing his legacy and contributions to civil engineering in India. CIES organized talks and activities celebrating engineering excellence.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 100,
    },
    {
        title: "Teacher's Day 2025",
        date: '2025-09-05',
        eventCategory: 'event',
        category: 'other',
        status: 'completed',
        description: "Teacher's Day 2025 was celebrated with a community gathering and sports event. Students honored department faculty and expressed gratitude for their guidance and support throughout the academic journey.",
        location: 'IIT Jodhpur Campus',
        attendeesCount: 150,
    },
    {
        title: 'Diwali Celebration 2025',
        date: '2025-10-20',
        eventCategory: 'event',
        category: 'other',
        status: 'completed',
        description: 'CIES organized a vibrant Diwali celebration bringing together students and faculty to celebrate the festival of lights. The event included traditional rituals, sweets, and cultural activities on campus.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 150,
    },
    {
        title: 'Diwali Celebration 2024',
        date: '2024-11-01',
        eventCategory: 'event',
        category: 'other',
        status: 'completed',
        description: 'CIES celebrated Diwali 2024 on campus with students and faculty. The festival of lights was marked by cultural programs, rangoli, and community bonding within the CIE department.',
        location: 'IIT Jodhpur Campus',
        attendeesCount: 140,
    },
    {
        title: "Teacher's Day 2024",
        date: '2024-09-05',
        eventCategory: 'event',
        category: 'other',
        status: 'completed',
        description: "Teacher's Day 2024 was observed by CIES with tributes to department faculty. Students organized a community gathering and sports activities to honor and thank their teachers.",
        location: 'IIT Jodhpur Campus',
        attendeesCount: 120,
    },
    {
        title: 'Departmental Cricket Match 2024',
        date: '2024-10-12',
        eventCategory: 'event',
        category: 'other',
        status: 'completed',
        description: 'A friendly departmental cricket match organized by CIES, bringing together students and faculty of the Civil and Infrastructure Engineering department for a day of sports, teamwork, and camaraderie.',
        location: 'IIT Jodhpur Sports Ground',
        attendeesCount: 80,
    },
]

// ═══════════════════════════════════════
//  HELPER FUNCTIONS
// ═══════════════════════════════════════
function makeSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

async function seedActivities() {
    console.log('\n🎯 Seeding Activities into Sanity...')
    let success = 0
    let failed = 0

    for (const activity of activities) {
        try {
            await client.create({
                _type: 'activity',
                title: activity.title,
                slug: { _type: 'slug', current: makeSlug(activity.title) },
                date: activity.date,
                category: activity.category,
                status: activity.status,
                description: activity.description,
                location: activity.location,
                attendeesCount: activity.attendeesCount || null,
                speakerName: activity.speakerName || null,
                featured: activity.featured || false,
            })
            console.log(`  ✅ ${activity.title}`)
            success++
        } catch (error) {
            console.error(`  ❌ ${activity.title}: ${error.message}`)
            failed++
        }
    }

    console.log(`\n  Activities: ${success} created, ${failed} failed`)
}

async function seedEvents() {
    console.log('\n🎉 Seeding Events into Sanity...')
    let success = 0
    let failed = 0

    for (const event of events) {
        try {
            await client.create({
                _type: 'event',
                title: event.title,
                slug: { _type: 'slug', current: makeSlug(event.title) },
                date: event.date,
                eventCategory: event.eventCategory,
                category: event.category,
                status: event.status,
                description: event.description,
                location: event.location,
                attendeesCount: event.attendeesCount || null,
                featured: false,
            })
            console.log(`  ✅ ${event.title}`)
            success++
        } catch (error) {
            console.error(`  ❌ ${event.title}: ${error.message}`)
            failed++
        }
    }

    console.log(`\n  Events: ${success} created, ${failed} failed`)
}

// ═══════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════
async function checkToken() {
    try {
        await client.fetch('count(*)')
        return true
    } catch (e) {
        if (e.message && (e.message.includes('Unauthorized') || e.message.includes('Session not found'))) {
            console.error('\n❌ Sanity API token was rejected (Unauthorized / Session not found).')
            console.error('   • Use a token from project py29aahl with "Editor" permission.')
            console.error('   • Create one: https://www.sanity.io/manage/project/py29aahl → API → Tokens → Add API Token.')
            console.error('   • On Windows, set the variable in a separate command, then run the script.')
            process.exit(1)
        }
        throw e
    }
}

async function main() {
    console.log('╔══════════════════════════════════════════════════╗')
    console.log('║  Seed CIES 2025-26 Content into Sanity CMS      ║')
    console.log('╠══════════════════════════════════════════════════╣')
    console.log('║  18 Activities + 10 Events = 28 total items      ║')
    console.log('╚══════════════════════════════════════════════════╝')

    if (!process.env.SANITY_API_TOKEN) {
        console.error('\n❌ Error: SANITY_API_TOKEN is required.')
        console.error('\n   Option A – Environment variable:')
        console.error('     Windows CMD:  set SANITY_API_TOKEN=your_token')
        console.error('     PowerShell:  $env:SANITY_API_TOKEN="your_token"')
        console.error('     Git Bash:    export SANITY_API_TOKEN=your_token')
        console.error('     Then run:    node scripts/seed-2025-26-content.mjs')
        console.error('\n   Option B – .env.local:')
        console.error('     Add line:    SANITY_API_TOKEN=your_token')
        console.error('     In project root file .env.local (gitignored), then run the script.')
        console.error('\n   Get token: https://www.sanity.io/manage/project/py29aahl → API → Tokens → Add (Editor)')
        process.exit(1)
    }

    // Warn if token might not be passed (e.g. Windows one-liner)
    const token = process.env.SANITY_API_TOKEN
    if (!token || token.length < 20) {
        console.error('\n❌ SANITY_API_TOKEN looks missing or too short. On Windows, use two commands:')
        console.error('   set SANITY_API_TOKEN=your_token_here')
        console.error('   node scripts/seed-2025-26-content.mjs')
        process.exit(1)
    }

    await checkToken()

    await seedActivities()
    await seedEvents()

    console.log('\n╔══════════════════════════════════════════════════╗')
    console.log('║  ✅ Seeding Complete!                            ║')
    console.log('║  Content is now available in Sanity Studio.      ║')
    console.log('║  Visit /studio to manage your content.           ║')
    console.log('╚══════════════════════════════════════════════════╝')
}

main().catch(console.error)
