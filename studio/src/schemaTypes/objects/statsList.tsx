import {defineArrayMember, defineField, defineType} from 'sanity'

import {BarChartIcon} from '@sanity/icons'

export const statsList = defineType({
  name: 'statsList',
  title: 'Stats List',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      description: 'List of stats to display',
      validation: (Rule) => Rule.min(3).max(3).error('Must have 3 stats'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          title: 'Stat',
          icon: BarChartIcon,
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'Number to display',
              validation: (Rule) => Rule.required().error('Number is required'),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Label to display',
              validation: (Rule) => Rule.required().error('Label is required'),
            }),
          ],
          preview: {
            select: {
              number: 'number',
              label: 'label',
            },
            prepare({number, label}) {
              return {
                title: number && label ? `${number} ${label}` : 'Stat',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      stats: 'stats',
    },
    prepare({stats}) {
      return {
        title: 'Stats List',
        subtitle: stats.length > 0 ? `${stats.length} stats` : 'No stats',
      }
    },
  },
})
