import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'For multi-day events',
    }),
    defineField({
      name: 'timeStart',
      title: 'Start Time',
      type: 'string',
      description: 'e.g., 10:00 AM',
    }),
    defineField({
      name: 'timeEnd',
      title: 'End Time',
      type: 'string',
      description: 'e.g., 5:00 PM',
    }),
    defineField({
      name: 'eventCategory',
      title: 'Event Category',
      type: 'string',
      options: {
        list: [
          { title: 'Event', value: 'event' },
          { title: 'Activity', value: 'activity' },
          { title: 'Roadmap', value: 'roadmap' },
        ],
      },
      initialValue: 'event',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'workshop' },
          { title: 'Seminar', value: 'seminar' },
          { title: 'Site Visit', value: 'site-visit' },
          { title: 'Competition', value: 'competition' },
          { title: 'Edificio', value: 'edificio' },
          { title: 'Guest Lecture', value: 'guest-lecture' },
          { title: 'Technical Talk', value: 'technical-talk' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'other',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'upcoming',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'attendeesCount',
      title: 'Attendees Count',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Featured events appear on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'speakerName',
      title: 'Speaker Name',
      type: 'string',
    }),
    defineField({
      name: 'speakerInfo',
      title: 'Speaker Info',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'coverImage',
    },
  },
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date (Oldest)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
})

