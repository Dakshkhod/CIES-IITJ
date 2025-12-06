import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  // Singleton - only one document of this type
  fields: [
    defineField({
      name: 'departmentName',
      title: 'Department Name',
      type: 'string',
      initialValue: 'Civil & Infrastructure Engineering Society',
    }),
    defineField({
      name: 'institutionName',
      title: 'Institution Name',
      type: 'string',
      initialValue: 'Indian Institute of Technology Jodhpur',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      initialValue: 'NH 62, Nagaur Road, Karwar, Jodhpur, Rajasthan 342030',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      initialValue: 'cies@iitj.ac.in',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'twitter', title: 'Twitter URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'website', title: 'Website URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Information',
        subtitle: 'Site-wide contact details',
      }
    },
  },
})

