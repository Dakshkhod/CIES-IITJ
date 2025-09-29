// Type definitions for CIES IIT Jodhpur Homepage

export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  dropdown?: NavigationSubItem[];
}

export interface NavigationSubItem {
  name: string;
  href: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  href: string;
  featured?: boolean;
  tags?: string[];
  date?: Date;
  author?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  location: string;
  imageUrl?: string;
  registrationUrl?: string;
  category: 'workshop' | 'seminar' | 'competition' | 'site-visit' | 'other';
  featured?: boolean;
  capacity?: number;
  registeredCount?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department?: string;
  year?: number;
  imageUrl?: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  category: 'executive-board' | 'faculty-advisor' | 'student-chapter';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: 'award' | 'recognition' | 'publication' | 'competition' | 'other';
  imageUrl?: string;
  link?: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: Date;
  imageUrl?: string;
  tags?: string[];
  slug: string;
  featured?: boolean;
  readTime?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  featured?: boolean;
}

export interface Internship {
  id: string;
  company: string;
  position: string;
  description: string;
  requirements: string[];
  location: string;
  duration: string;
  stipend?: string;
  applicationDeadline: Date;
  applyUrl: string;
  featured?: boolean;
  type: 'internship' | 'full-time' | 'part-time';
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category: string;
  date: Date;
  photographer?: string;
  tags?: string[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  socialMedia: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
  };
}

// CMS-related types
export interface CMSResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CMSError {
  message: string;
  code: string;
  details?: any;
}

// Component prop types
export interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isSticky: boolean;
}

export interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export interface AnimatedBridgeProps {
  className?: string;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy?: 'date' | 'title' | 'relevance';
  sortOrder?: 'asc' | 'desc';
}

// API response types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Theme types
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Animation types
export interface AnimationVariants {
  hidden: any;
  visible: any;
  exit?: any;
}

// Utility types
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Environment variables
export interface EnvironmentVariables {
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_CONTACT_EMAIL: string;
  NEXT_PUBLIC_SANITY_PROJECT_ID?: string;
  NEXT_PUBLIC_SANITY_DATASET?: string;
  SANITY_API_TOKEN?: string;
  NEXT_PUBLIC_ANALYTICS_ID?: string;
}
