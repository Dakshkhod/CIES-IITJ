/**
 * API Service for CIES Backend
 * 
 * This module provides functions to fetch data from the Django backend API.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

// ============== Types ==============

export interface Activity {
  uuid: string;
  title: string;
  date: string;
  event_category: string;
  category: 'workshop' | 'seminar' | 'site-visit' | 'competition' | 'edificio' | 'other';
  activity_status: string;
  status: 'completed' | 'upcoming' | 'ongoing';
  description: string | null;
  location: string | null;
  attendees_count: number | null;
  featured: boolean;
  image_url: string | null;
  slug: string | null;
}

export interface Event {
  uuid: string;
  title: string;
  date: string;
  end_date: string | null;
  event_category: string;
  category: string;
  activity_status: string;
  status: 'completed' | 'upcoming' | 'ongoing';
  description: string | null;
  location: string | null;
  additional_details: Record<string, unknown> | null;
  attendees_count: number | null;
  featured: boolean;
  speaker_name: string | null;
  speaker_info: string | null;
  registration_link: string | null;
  time_start: string | null;
  time_end: string | null;
  slug: string | null;
  images: EventImage[];
  cover_image: { url: string; uuid: string } | null;
  image_url: string | null;
}

export interface EventImage {
  uuid: string;
  image: { url: string; uuid: string; alt_text: string | null } | null;
  caption: string | null;
  display_order: number;
  is_cover: boolean;
}

export interface TeamMember {
  uuid: string;
  name: string;
  role_label: string | null;
  committee_label: string | null;
  photo: string | null;
  bio: string | null;
  batch: string | null;
  featured: boolean;
  is_hod: boolean;
  is_faculty: boolean;
  socials: {
    linkedin: string | null;
    email: string | null;
    instagram: string | null;
    twitter?: string | null;
    github?: string | null;
    website?: string | null;
  };
}

export interface ContactInfo {
  department_name: string;
  institution_name: string;
  address: string;
  email: string;
  phone: string | null;
  office_hours: string | null;
  map_embed_url: string | null;
  social_links: {
    linkedin: string | null;
    instagram: string | null;
    twitter: string | null;
    youtube: string | null;
    facebook: string | null;
    website: string | null;
  };
}

export interface Announcement {
  uuid: string;
  title: string;
  content: string;
  is_active: boolean;
  is_pinned: boolean;
  priority: number;
  publish_date: string;
  expiry_date: string | null;
  target_audience: string;
  link_url: string | null;
  link_text: string | null;
  is_expired: boolean;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  total_pages: number;
  current_page: number;
  results: T[];
}

export interface ApiResponse<T> {
  data: T;
}

// ============== API Functions ==============

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ============== Activities ==============

export async function getActivities(params?: {
  page?: number;
  page_size?: number;
  category?: string;
  status?: string;
  search?: string;
  featured?: boolean;
}): Promise<PaginatedResponse<Activity>> {
  const searchParams = new URLSearchParams();
  
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.page_size) searchParams.set('page_size', params.page_size.toString());
  if (params?.category) searchParams.set('category', params.category);
  if (params?.status) searchParams.set('status', params.status);
  if (params?.search) searchParams.set('search', params.search);
  if (params?.featured !== undefined) searchParams.set('featured', params.featured.toString());

  const query = searchParams.toString();
  return fetchApi<PaginatedResponse<Activity>>(`/events/activities/${query ? `?${query}` : ''}`);
}

export async function getRecentActivities(limit: number = 5): Promise<ApiResponse<Activity[]>> {
  return fetchApi<ApiResponse<Activity[]>>(`/events/activities/recent/?limit=${limit}`);
}

// ============== Events ==============

export async function getEvents(params?: {
  page?: number;
  page_size?: number;
  type?: 'event' | 'activity' | 'roadmap';
  category?: string;
  status?: string;
  featured?: boolean;
  search?: string;
  date_from?: string;
  date_to?: string;
  ordering?: string;
}): Promise<PaginatedResponse<Event>> {
  const searchParams = new URLSearchParams();
  
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.page_size) searchParams.set('page_size', params.page_size.toString());
  if (params?.type) searchParams.set('type', params.type);
  if (params?.category) searchParams.set('category', params.category);
  if (params?.status) searchParams.set('status', params.status);
  if (params?.featured !== undefined) searchParams.set('featured', params.featured.toString());
  if (params?.search) searchParams.set('search', params.search);
  if (params?.date_from) searchParams.set('date_from', params.date_from);
  if (params?.date_to) searchParams.set('date_to', params.date_to);
  if (params?.ordering) searchParams.set('ordering', params.ordering);

  const query = searchParams.toString();
  return fetchApi<PaginatedResponse<Event>>(`/events/events/${query ? `?${query}` : ''}`);
}

export async function getEventByUuid(uuid: string): Promise<ApiResponse<Event>> {
  return fetchApi<ApiResponse<Event>>(`/events/events/${uuid}/`);
}

// ============== Roadmap ==============

export async function getRoadmap(params?: {
  page?: number;
  page_size?: number;
  year?: number;
  month?: number;
}): Promise<PaginatedResponse<Event>> {
  const searchParams = new URLSearchParams();
  
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.page_size) searchParams.set('page_size', params.page_size.toString());
  if (params?.year) searchParams.set('year', params.year.toString());
  if (params?.month) searchParams.set('month', params.month.toString());

  const query = searchParams.toString();
  return fetchApi<PaginatedResponse<Event>>(`/events/roadmap/${query ? `?${query}` : ''}`);
}

// ============== Team ==============

export async function getTeamMembers(params?: {
  page?: number;
  page_size?: number;
  committee?: string;
  role?: string;
  batch?: string;
  featured?: boolean;
  is_faculty?: boolean;
  search?: string;
  group_by?: 'committee' | 'role' | 'batch';
}): Promise<PaginatedResponse<TeamMember>> {
  const searchParams = new URLSearchParams();
  
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.page_size) searchParams.set('page_size', params.page_size.toString());
  if (params?.committee) searchParams.set('committee', params.committee);
  if (params?.role) searchParams.set('role', params.role);
  if (params?.batch) searchParams.set('batch', params.batch);
  if (params?.featured !== undefined) searchParams.set('featured', params.featured.toString());
  if (params?.is_faculty !== undefined) searchParams.set('is_faculty', params.is_faculty.toString());
  if (params?.search) searchParams.set('search', params.search);
  if (params?.group_by) searchParams.set('group_by', params.group_by);

  const query = searchParams.toString();
  return fetchApi<PaginatedResponse<TeamMember>>(`/team/members/${query ? `?${query}` : ''}`);
}

export async function getTeamMemberByUuid(uuid: string): Promise<ApiResponse<TeamMember>> {
  return fetchApi<ApiResponse<TeamMember>>(`/team/members/${uuid}/`);
}

export async function getFeaturedTeam(limit: number = 10): Promise<ApiResponse<TeamMember[]>> {
  return fetchApi<ApiResponse<TeamMember[]>>(`/team/featured/?limit=${limit}`);
}

export async function getTeamByCommittee(): Promise<ApiResponse<{ committee: string; members: TeamMember[] }[]>> {
  return fetchApi<ApiResponse<{ committee: string; members: TeamMember[] }[]>>('/team/by-committee/');
}

// ============== Contact ==============

export async function getContactInfo(): Promise<ApiResponse<ContactInfo>> {
  return fetchApi<ApiResponse<ContactInfo>>('/core/contact/info/');
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  recaptcha_token?: string;
}): Promise<{ success: boolean; message: string }> {
  return fetchApi<{ success: boolean; message: string }>('/core/contact/submit/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============== Announcements ==============

export async function getAnnouncements(params?: {
  page?: number;
  page_size?: number;
  active_only?: boolean;
  audience?: string;
}): Promise<PaginatedResponse<Announcement>> {
  const searchParams = new URLSearchParams();
  
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.page_size) searchParams.set('page_size', params.page_size.toString());
  if (params?.active_only !== undefined) searchParams.set('active_only', params.active_only.toString());
  if (params?.audience) searchParams.set('audience', params.audience);

  const query = searchParams.toString();
  return fetchApi<PaginatedResponse<Announcement>>(`/core/announcements/${query ? `?${query}` : ''}`);
}

// ============== Helper to fetch all pages ==============

export async function fetchAllPages<T>(
  fetchFn: (params: { page: number; page_size: number }) => Promise<PaginatedResponse<T>>,
  pageSize: number = 100
): Promise<T[]> {
  const allResults: T[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetchFn({ page, page_size: pageSize });
    allResults.push(...response.results);
    hasMore = response.next !== null;
    page++;
  }

  return allResults;
}

