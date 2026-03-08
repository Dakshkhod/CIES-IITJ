import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'developer',
  title: 'Developer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      description: 'e.g., Y22 UG, Y21 UG, Tech Lead',
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
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order on Developers page (lower = first)',
      initialValue: 0,
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'string', description: 'e.g. linkedin.com/in/username or https://linkedin.com/in/username' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'instagram', title: 'Instagram URL', type: 'string', description: 'e.g. instagram.com/username or https://instagram.com/username' },
        { name: 'github', title: 'GitHub URL', type: 'string', description: 'e.g. github.com/username or https://github.com/username' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'designation',
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
