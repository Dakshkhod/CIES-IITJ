import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'py29aahl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for faster reads in production
})

// Image URL builder (using named export to avoid deprecation warning)
const builder = createImageUrlBuilder({
  projectId: 'py29aahl',
  dataset: 'production',
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// ============== GROQ Queries ==============

// Team Members
export const teamMembersQuery = `*[_type == "teamMember" && isActive == true] | order(displayOrder asc, name asc) {
  _id,
  name,
  role,
  committee,
  batch,
  bio,
  "photo": profileImage.asset->url,
  featured,
  isHOD,
  isFaculty,
  displayOrder,
  socials {
    linkedin,
    email,
    instagram,
    twitter,
    github,
    website
  }
}`

export const featuredTeamQuery = `*[_type == "teamMember" && featured == true && isActive == true] | order(displayOrder asc) [0...10] {
  _id,
  name,
  role,
  committee,
  batch,
  bio,
  "photo": profileImage.asset->url,
  featured,
  isHOD,
  isFaculty,
  socials {
    linkedin,
    email,
    instagram
  }
}`

// Events
export const eventsQuery = `*[_type == "event"] | order(date desc) {
  _id,
  title,
  slug,
  date,
  endDate,
  eventCategory,
  category,
  status,
  description,
  location,
  attendeesCount,
  featured,
  speakerName,
  speakerInfo,
  registrationLink,
  timeStart,
  timeEnd,
  "coverImage": coverImage.asset->url,
  "images": images[].asset->url
}`

export const featuredEventsQuery = `*[_type == "event" && featured == true] | order(date desc) [0...6] {
  _id,
  title,
  slug,
  date,
  category,
  status,
  description,
  location,
  "coverImage": coverImage.asset->url
}`

export const upcomingEventsQuery = `*[_type == "event" && status == "upcoming"] | order(date asc) {
  _id,
  title,
  slug,
  date,
  category,
  status,
  description,
  location,
  timeStart,
  registrationLink,
  "coverImage": coverImage.asset->url
}`

// Activities (separate content type)
export const activitiesQuery = `*[_type == "activity"] | order(date desc) {
  _id,
  title,
  slug,
  date,
  category,
  status,
  description,
  location,
  attendeesCount,
  featured,
  speakerName,
  speakerInfo,
  registrationLink,
  "coverImage": coverImage.asset->url,
  "images": images[].asset->url
}`

// Contact Info (singleton)
export const contactInfoQuery = `*[_type == "contactInfo"][0] {
  departmentName,
  institutionName,
  address,
  email,
  phone,
  officeHours,
  mapEmbedUrl,
  socialLinks {
    linkedin,
    instagram,
    twitter,
    youtube,
    facebook,
    website
  }
}`

// Announcements
export const announcementsQuery = `*[_type == "announcement" && isActive == true && (expiryDate == null || expiryDate > now())] | order(isPinned desc, priority desc, publishDate desc) {
  _id,
  title,
  content,
  isPinned,
  priority,
  publishDate,
  expiryDate,
  targetAudience,
  linkUrl,
  linkText
}`

// Gallery
export const galleryQuery = `*[_type == "gallery"] | order(isFeatured desc, displayOrder asc) {
  _id,
  title,
  description,
  category,
  isFeatured,
  dateTaken,
  "images": images[] {
    "url": asset->url,
    caption,
    displayOrder
  }
}`

// Developers (Developers page)
export const developersQuery = `*[_type == "developer"] | order(displayOrder asc, name asc) {
  _id,
  name,
  designation,
  "photo": profileImage.asset->url,
  displayOrder,
  socials {
    linkedin,
    email,
    instagram,
    github
  }
}`

// ============== Fetch Functions ==============

export async function getTeamMembers() {
  return sanityClient.fetch(teamMembersQuery)
}

export async function getFeaturedTeam() {
  return sanityClient.fetch(featuredTeamQuery)
}

export async function getEvents() {
  return sanityClient.fetch(eventsQuery)
}

export async function getFeaturedEvents() {
  return sanityClient.fetch(featuredEventsQuery)
}

export async function getUpcomingEvents() {
  return sanityClient.fetch(upcomingEventsQuery)
}

export async function getActivities() {
  return sanityClient.fetch(activitiesQuery)
}

export async function getContactInfo() {
  return sanityClient.fetch(contactInfoQuery)
}

export async function getAnnouncements() {
  return sanityClient.fetch(announcementsQuery)
}

export async function getGallery() {
  return sanityClient.fetch(galleryQuery)
}

export async function getDevelopers() {
  return sanityClient.fetch(developersQuery)
}

