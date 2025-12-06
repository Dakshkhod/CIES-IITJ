import { neon } from '@neondatabase/serverless'

// Create a singleton database connection
export const sql = neon(process.env.DATABASE_URL!)

// Contact submission types
export interface ContactSubmission {
  id: number
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  ip_address?: string
  user_agent?: string
  is_read: boolean
  is_replied: boolean
  replied_at?: Date
  notes?: string
  created_at: Date
  updated_at: Date
}

// Database helper functions
export async function getContactSubmissions(
  page: number = 1,
  limit: number = 20
): Promise<{ submissions: ContactSubmission[]; total: number }> {
  const offset = (page - 1) * limit

  const submissions = await sql`
    SELECT * FROM contact_submissions
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `

  const countResult = await sql`
    SELECT COUNT(*) as total FROM contact_submissions
  `

  return {
    submissions: submissions as ContactSubmission[],
    total: parseInt(countResult[0].total),
  }
}

export async function markSubmissionAsRead(id: number): Promise<void> {
  await sql`
    UPDATE contact_submissions
    SET is_read = TRUE, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function markSubmissionAsReplied(id: number): Promise<void> {
  await sql`
    UPDATE contact_submissions
    SET is_replied = TRUE, replied_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function addNoteToSubmission(id: number, notes: string): Promise<void> {
  await sql`
    UPDATE contact_submissions
    SET notes = ${notes}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

