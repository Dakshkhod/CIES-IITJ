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
          { title: 'President', value: 'President' },
          { title: 'Vice President', value: 'Vice President' },
          { title: 'General Secretary', value: 'General Secretary' },
          { title: 'Technical Head', value: 'Technical Head' },
          { title: 'Design Head', value: 'Design Head' },
          { title: 'Content Head', value: 'Content Head' },
          { title: 'PR Head', value: 'PR Head' },
          { title: 'Events Head', value: 'Events Head' },
          { title: 'PG Lead', value: 'PG Lead' },
          { title: 'Executive', value: 'Executive' },
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
          { title: 'Core Team', value: 'Core Team' },
          { title: 'Technical', value: 'Technical' },
          { title: 'Design', value: 'Design' },
          { title: 'Content', value: 'Content' },
          { title: 'PR & Outreach', value: 'PR & Outreach' },
          { title: 'Events', value: 'Events' },
          { title: 'Faculty', value: 'Faculty' },
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

