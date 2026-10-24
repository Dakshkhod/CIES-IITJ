import { createClient } from '@sanity/client';
import fs from 'node:fs';

if (!process.env.SANITY_API_TOKEN && fs.existsSync('.env.local')) {
  const content = fs.readFileSync('.env.local', 'utf8');
  const match = content.match(/SANITY_API_TOKEN\s*=\s*["']?([^\s"']+)["']?/);
  if (match) process.env.SANITY_API_TOKEN = match[1].trim();
}

if (!process.env.SANITY_API_TOKEN) {
  throw new Error('SANITY_API_TOKEN is required to sync homepage announcements.');
}

const client = createClient({
  projectId: 'py29aahl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const activities = await client.fetch(`*[_type == "activity"] | order(date desc) [0...5] {
  _id,
  title,
  date,
  description,
  coverImage
}`);

if (activities.length !== 5 || activities.some(activity => !activity.coverImage?.asset?._ref)) {
  throw new Error('Expected five recent activities with cover images. No changes were made.');
}

let transaction = client.transaction();

activities.forEach((activity, index) => {
  const id = `homepageRecent-${activity._id}`.replace(/[^A-Za-z0-9_-]/g, '-');
  transaction = transaction.createOrReplace({
    _id: id,
    _type: 'announcement',
    title: activity.title,
    content: activity.description || 'Details coming soon.',
    image: activity.coverImage,
    isActive: true,
    isPinned: false,
    priority: 100 - index,
    publishDate: `${activity.date}T12:00:00.000Z`,
    linkUrl: `https://cies.iitj.ac.in/activities#${activity._id}`,
  });
});

await transaction.commit();

console.log(`Synced ${activities.length} homepage announcements:`);
activities.forEach(activity => console.log(`- ${activity.title}`));
