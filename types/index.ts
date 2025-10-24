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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  committee: string;
  batch: string;
  photo: string;
  bio: string;
  socials: {
    linkedin: string;
    email: string;
    instagram: string;
  };
  featured?: boolean;
  isHOD?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  category: 'workshop' | 'seminar' | 'site-visit' | 'competition' | 'edificio' | 'other';
  attendees?: string;
  speaker?: string;
  images?: string[];
  status?: 'completed' | 'upcoming' | 'ongoing';
}

// Theme types
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
