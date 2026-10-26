export const TEAM_FALLBACK_PHOTOS: Record<string, string> = {
  // Coordination & core
  'Mayank Tiwari': '/Team images/Mayank.jpeg',
  Shashank: '/Team images/Shashank.jpeg',

  // Events & community
  Saurabh: '/Team images/Saurabh.jpeg',
  Vikas: '/Team images/Vikas.jpeg',
  Manish: '/Team images/Manish.jpg',

  // Technical
  'Keshav Saini': '/Team images/Keshav.jpeg',
  Daksh: '/Other images/1759265474674~3.jpg',

  // Seminars & academic
  'Falak Khan': '/Team images/Falak.jpeg',
  'Faizah Wani': '/Team images/Faizah.jpeg',
  'Sri Raghava': '/Team images/Sri Raghava.jpeg',

  // Media & design
  Deepali: '/Team images/Deepali.jpeg',
  Nitesh: '/Team images/Nitesh.jpeg',
  'Simran Sehgal': '/Team images/Simran Sehgal.jpeg',
  'Simranjit Kaur': '/Team images/Simranjit Kaur.jpeg',

  // Outreach & publicity
  'Ram Kunwar': '/Team images/Ram.jpeg',
  'Ram Kunawar': '/Team images/Ram.jpeg',
  Nishant: '/Team images/Nishant.jpeg',
};

export function getTeamPhoto(name: string, studioPhoto?: string) {
  return studioPhoto || TEAM_FALLBACK_PHOTOS[name.trim()];
}
