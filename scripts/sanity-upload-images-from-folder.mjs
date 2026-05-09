/**
 * Upload all images from a local folder to Sanity assets, then set coverImage + images
 * on existing documents resolved by slug (no document IDs or event titles in this file).
 *
 * Cover: basename matches /^cover_image/i, else first file after numeric sort.
 * HEIC → JPEG via heic-convert. Requires SANITY_API_TOKEN (or .env.local).
 *
 * Usage (from repo root, after npm install):
 *   node scripts/sanity-upload-images-from-folder.mjs \
 *     --folder "public/images/<your-folder>" \
 *     --activity-slug "your-activity-slug-current" \
 *     --event-slug "your-event-slug-current"
 *
 * Pass only the slug flags for document types you want patched (at least one required).
 *
 *   npm run sanity:upload-images -- --folder "public/images/<folder>" --activity-slug ... --event-slug ...
 */

import { createClient } from '@sanity/client'
import convert from 'heic-convert'
import { existsSync, readFileSync, readdirSync } from 'fs'
import { readFile } from 'fs/promises'
import { basename, dirname, extname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')

function parseArgs(argv) {
  const out = { folder: null, activitySlug: null, eventSlug: null }
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--folder') out.folder = argv[++i]
    else if (a === '--activity-slug') out.activitySlug = argv[++i]
    else if (a === '--event-slug') out.eventSlug = argv[++i]
  }
  return out
}

function usage() {
  console.error(`
Usage:
  node scripts/sanity-upload-images-from-folder.mjs \\
    --folder <path-relative-to-repo-root-or-absolute> \\
    [--activity-slug <slug.current>] \\
    [--event-slug <slug.current>]

At least one of --activity-slug or --event-slug is required.
Slugs must match the document slug in Sanity Studio.
`)
}

if (!process.env.SANITY_API_TOKEN) {
  const envPath = resolve(projectRoot, '.env.local')
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf8')
    const match = content.match(/SANITY_API_TOKEN\s*=\s*["']?([^\s"']+)["']?/)
    if (match) process.env.SANITY_API_TOKEN = match[1].trim()
  }
}

const client = createClient({
  projectId: 'py29aahl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const IMAGE_EXT = /\.(heic|HEIC|jpg|jpeg|JPG|JPEG|png|PNG|webp|WEBP)$/

function isCoverFile(name) {
  return /^cover_image/i.test(basename(name, extname(name)))
}

async function prepareUploadBuffer(absPath) {
  const ext = extname(absPath).toLowerCase()
  const base = basename(absPath, extname(absPath))
  if (ext === '.jpg' || ext === '.jpeg') {
    return {
      buffer: await readFile(absPath),
      filename: basename(absPath),
      contentType: 'image/jpeg',
    }
  }
  if (ext === '.png') {
    return {
      buffer: await readFile(absPath),
      filename: basename(absPath),
      contentType: 'image/png',
    }
  }
  if (ext === '.webp') {
    return {
      buffer: await readFile(absPath),
      filename: basename(absPath),
      contentType: 'image/webp',
    }
  }
  if (ext === '.heic') {
    const buf = await readFile(absPath)
    const jpeg = await convert({
      buffer: buf,
      format: 'JPEG',
      quality: 0.92,
    })
    return {
      buffer: Buffer.from(jpeg),
      filename: `${base}.jpg`,
      contentType: 'image/jpeg',
    }
  }
  throw new Error(`Unsupported extension: ${ext} (${absPath})`)
}

async function uploadImage(buffer, filename, contentType) {
  return client.assets.upload('image', buffer, { filename, contentType })
}

function imageFieldFromAsset(asset) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  }
}

async function resolveDocId(type, slug) {
  const id = await client.fetch(
    `*[_type == $type && slug.current == $slug][0]._id`,
    { type, slug }
  )
  return id || null
}

async function main() {
  const args = parseArgs(process.argv)

  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN.length < 20) {
    console.error('\n❌ SANITY_API_TOKEN is required.\n')
    process.exit(1)
  }

  if (!args.folder || (!args.activitySlug && !args.eventSlug)) {
    usage()
    process.exit(1)
  }

  const sourceDir = resolve(projectRoot, args.folder)
  if (!existsSync(sourceDir)) {
    console.error(`\n❌ Folder not found: ${sourceDir}\n`)
    process.exit(1)
  }

  const targets = []
  if (args.activitySlug) {
    const id = await resolveDocId('activity', args.activitySlug)
    if (!id) {
      console.error(`\n❌ No activity with slug.current == "${args.activitySlug}"\n`)
      process.exit(1)
    }
    targets.push(['Activity', id])
  }
  if (args.eventSlug) {
    const id = await resolveDocId('event', args.eventSlug)
    if (!id) {
      console.error(`\n❌ No event with slug.current == "${args.eventSlug}"\n`)
      process.exit(1)
    }
    targets.push(['Event', id])
  }

  const names = readdirSync(sourceDir).filter((n) => IMAGE_EXT.test(n))
  if (names.length === 0) {
    console.error('\n❌ No image files in folder.\n')
    process.exit(1)
  }

  const sorted = [...names].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  )
  const coverName = sorted.find(isCoverFile) ?? sorted[0]
  const galleryNames = sorted.filter((n) => n !== coverName)

  console.log(`\n📷 ${sourceDir}`)
  console.log(`   Cover: ${coverName}${sorted.find(isCoverFile) ? '' : ' (first by sort)'}\n`)

  const coverPrepared = await prepareUploadBuffer(join(sourceDir, coverName))
  const coverAsset = await uploadImage(
    coverPrepared.buffer,
    coverPrepared.filename,
    coverPrepared.contentType
  )
  console.log(`  ✅ Cover → ${coverAsset._id}`)

  const galleryAssets = []
  for (const n of galleryNames) {
    const prepared = await prepareUploadBuffer(join(sourceDir, n))
    const asset = await uploadImage(
      prepared.buffer,
      prepared.filename,
      prepared.contentType
    )
    galleryAssets.push(asset)
    console.log(`  ✅ Gallery → ${n}`)
  }

  const coverImage = imageFieldFromAsset(coverAsset)
  const images = galleryAssets.map((a) => imageFieldFromAsset(a))

  for (const [label, id] of targets) {
    await client.patch(id).set({ coverImage, images }).commit()
    console.log(`\n  ✅ Patched ${label} (${id})`)
  }

  console.log('\n✅ Done.\n')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
