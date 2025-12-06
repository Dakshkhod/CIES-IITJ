import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

// Initialize database connection lazily
let sql: ReturnType<typeof neon> | null = null

function getDbClient() {
  if (!sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set')
    }
    sql = neon(process.env.DATABASE_URL)
  }
  return sql
}

// PATCH - Update a submission (mark as read, replied, add notes)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const submissionId = parseInt(id)
    
    if (isNaN(submissionId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid submission ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { is_read, is_replied, notes } = body

    const client = getDbClient()

    // Build update query dynamically
    const updates: string[] = []
    const values: (boolean | string | number)[] = []
    let paramIndex = 1

    if (typeof is_read === 'boolean') {
      updates.push(`is_read = $${paramIndex++}`)
      values.push(is_read)
    }

    if (typeof is_replied === 'boolean') {
      updates.push(`is_replied = $${paramIndex++}`)
      values.push(is_replied)
      if (is_replied) {
        updates.push(`replied_at = CURRENT_TIMESTAMP`)
      }
    }

    if (typeof notes === 'string') {
      updates.push(`notes = $${paramIndex++}`)
      values.push(notes)
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No valid fields to update' },
        { status: 400 }
      )
    }

    updates.push('updated_at = CURRENT_TIMESTAMP')
    values.push(submissionId)

    const query = `
      UPDATE contact_submissions 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `

    const result = await client(query, values)

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    })
  } catch (error) {
    console.error('Update submission error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update submission' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a submission
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const submissionId = parseInt(id)
    
    if (isNaN(submissionId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid submission ID' },
        { status: 400 }
      )
    }

    const client = getDbClient()

    const result = await client`
      DELETE FROM contact_submissions
      WHERE id = ${submissionId}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Submission deleted successfully',
    })
  } catch (error) {
    console.error('Delete submission error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete submission' },
      { status: 500 }
    )
  }
}

