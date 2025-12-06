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

    // Check if any valid fields to update
    if (typeof is_read !== 'boolean' && typeof is_replied !== 'boolean' && typeof notes !== 'string') {
      return NextResponse.json(
        { success: false, message: 'No valid fields to update' },
        { status: 400 }
      )
    }

    // Build update query - update only provided fields
    let result
    
    // First, get current record
    const current = await client`
      SELECT * FROM contact_submissions WHERE id = ${submissionId}
    `
    
    if (current.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      )
    }
    
    const currentRecord = current[0]
    
    // Update only provided fields
    const finalIsRead = typeof is_read === 'boolean' ? is_read : currentRecord.is_read
    const finalIsReplied = typeof is_replied === 'boolean' ? is_replied : currentRecord.is_replied
    const finalNotes = typeof notes === 'string' ? notes : currentRecord.notes
    const finalRepliedAt = (typeof is_replied === 'boolean' && is_replied) 
      ? new Date() 
      : (currentRecord.replied_at || null)
    
    result = await client`
      UPDATE contact_submissions 
      SET 
        is_read = ${finalIsRead},
        is_replied = ${finalIsReplied},
        replied_at = ${finalRepliedAt},
        notes = ${finalNotes},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${submissionId}
      RETURNING *
    `

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

