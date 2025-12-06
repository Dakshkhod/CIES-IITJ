'use client'

/**
 * This route is responsible for the built-in Sanity Studio that's available at /studio
 * Only accessible by admin users
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}

