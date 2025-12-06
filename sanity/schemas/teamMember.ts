import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'HOD', value: 'HOD' },
          { title: 'Faculty Coordinator', value: 'Faculty Coordinator' },
          { title: 'Secretary', value: 'Secretary' },
          { title: 'Joint Secretary', value: 'Joint Secretary' },
          { title: 'PG Representative', value: 'PG Representative' },
          { title: 'Executive', value: 'Executive' },
          { title: 'Mentor', value: 'Mentor' },
          { title: 'Member', value: 'Member' },
        ],
      },
    }),
    defineField({
      name: 'committee',
      title: 'Committee',
      type: 'string',
      options: {
        list: [
          { title: 'Faculty Leadership', value: 'Faculty Leadership' },
          { title: 'Coordination Committee', value: 'Coordination Committee' },
          { title: 'Events & Community Engagement Committee', value: 'Events & Community Engagement Committee' },
          { title: 'Technical Committee', value: 'Technical Committee' },
          { title: 'Seminars & Academic Engagement Committee', value: 'Seminars & Academic Engagement Committee' },
          { title: 'Media & Design Committee', value: 'Media & Design Committee' },
          { title: 'Outreach & Publicity Committee', value: 'Outreach & Publicity Committee' },
        ],
      },
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      description: 'e.g., UG 2024, PG 2024',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'isHOD',
      title: 'Is HOD',
      type: 'boolean',
      description: 'Head of Department',
      initialValue: false,
    }),
    defineField({
      name: 'isFaculty',
      title: 'Is Faculty',
      type: 'boolean',
      description: 'Faculty member',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Currently active member',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in team listing (lower = first)',
      initialValue: 0,
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'twitter', title: 'Twitter URL', type: 'url' },
        { name: 'github', title: 'GitHub URL', type: 'url' },
        { name: 'website', title: 'Website URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})

