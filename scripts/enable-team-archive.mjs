import { createClient } from '@sanity/client';
import fs from 'node:fs';

if (!process.env.SANITY_API_TOKEN && fs.existsSync('.env.local')) {
  const content = fs.readFileSync('.env.local', 'utf8');
  const match = content.match(/SANITY_API_TOKEN\s*=\s*["']?([^\s"']+)["']?/);
  if (match) process.env.SANITY_API_TOKEN = match[1].trim();
}

if (!process.env.SANITY_API_TOKEN) {
  throw new Error('SANITY_API_TOKEN is required to enable the team archive.');
}

const client = createClient({
  projectId: 'py29aahl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const memberIds = await client.fetch(`*[_type == "teamMember"]._id`);
let transaction = client.transaction().createIfNotExists({
  _id: 'teamSettings',
  _type: 'teamSettings',
  currentYear: 2025,
});

memberIds.forEach(id => {
  transaction = transaction.patch(id, patch => patch.setIfMissing({ teamYear: 2025 }));
});

await transaction.commit();
console.log(`Assigned ${memberIds.length} existing team members to Team 2025.`);
console.log('Created Team Management settings with 2025 as the current year.');
