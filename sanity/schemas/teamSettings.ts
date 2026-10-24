import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'teamSettings',
  title: 'Team Management',
  type: 'document',
  description:
    'Controls which team year appears on the main Team page. Older years remain available under Past Teams.',
  fields: [
    defineField({
      name: 'currentYear',
      title: 'Current Team Year',
      type: 'number',
      description:
        'Add the new-year members first, then change this value and publish. The previous team automatically moves to Past Teams.',
      initialValue: 2025,
      validation: Rule => Rule.required().integer().min(2025).max(2100),
    }),
  ],
  preview: {
    select: { currentYear: 'currentYear' },
    prepare({ currentYear }) {
      return {
        title: 'Team Management',
        subtitle: `Current team: ${currentYear || 2025}`,
      };
    },
  },
});
