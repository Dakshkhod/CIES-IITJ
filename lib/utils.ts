import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to short string
 */
export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Generate a basic ICS file content string for calendar events
 */
export function generateICS(options: {
  title: string;
  description?: string;
  location?: string;
  start: Date | string;
  end?: Date | string;
  url?: string;
}): string {
  const start = typeof options.start === 'string' ? new Date(options.start) : options.start;
  const end = options.end ? (typeof options.end === 'string' ? new Date(options.end) : options.end) : new Date(start.getTime() + 60 * 60 * 1000);

  const toICSDate = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}Z$/, 'Z');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CIES IITJ//Activities//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@cies.iitj.ac.in`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${escapeICS(options.title)}`,
    options.description ? `DESCRIPTION:${escapeICS(options.description)}` : undefined,
    options.location ? `LOCATION:${escapeICS(options.location)}` : undefined,
    options.url ? `URL:${options.url}` : undefined,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean) as string[];

  return lines.join('\r\n');
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}
