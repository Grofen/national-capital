import {defineField, defineType} from 'sanity'

import {toPlainText} from '@portabletext/react'

export const pageIntro = defineType({
  name: 'pageIntro',
  title: 'Page Intro',
  type: 'object',
  fields: [
    defineField({
      name: 'centered',
      title: 'Centered (optional)',
      type: 'boolean',
      description: 'Whether the page intro is centered',
    }),
    defineField({
      name: 'heading',
      title: 'Heading (required)',
      type: 'blockContent',
      description: 'Heading for the info section',
      validation: (Rule) => Rule.required().error('Heading is required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'centered',
    },
    prepare({title, subtitle}) {
      return {
        title: title ? toPlainText(title) : 'Untitled Page Intro',
        subtitle: `Page Intro ${subtitle ? '(Centered)' : '(Not centered)'}`,
      }
    },
  },
})
