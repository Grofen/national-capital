import {PortableTextBlock, defineArrayMember, defineField} from 'sanity'

import {HeartIcon} from '@sanity/icons'
import {toPlainText} from '@portabletext/react'

export const cultureSection = {
  name: 'cultureSection',
  title: 'Culture Section',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (optional)',
      type: 'string',
      description: 'Small text above the main title',
      initialValue: 'Culture',
    }),
    defineField({
      name: 'heading',
      title: 'Heading (required)',
      type: 'blockContent',
      description: 'Heading for the culture section',
      validation: (Rule) => Rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'values',
      title: 'Values (3 values are required)',
      description: 'Here you can add the company values',
      type: 'array',
      validation: (Rule) => Rule.min(3).max(3).error('You must add 3 values'),
      of: [
        defineArrayMember({
          name: 'value',
          title: 'Value',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'blockContent',
              description:
                'You can add something like "Loyalty. Our team has been with us since the beginning because none of them are allowed to have LinkedIn profiles."',
              validation: (Rule) => Rule.required().error('Value is required'),
            }),
          ],
          preview: {
            select: {
              title: 'text',
            },
            prepare: ({title}) => ({title: title ? toPlainText(title) : 'No title'}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'values',
    },
    prepare: ({title, subtitle}: {title: PortableTextBlock[]; subtitle: any}) => ({
      title: title ? toPlainText(title) : 'No heading',
      subtitle: subtitle ? `${subtitle.length} values` : 'No values',
    }),
  },
}
