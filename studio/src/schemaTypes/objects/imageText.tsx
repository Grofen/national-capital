import {defineField, defineType} from 'sanity'

import {toPlainText} from '@portabletext/react'

export const imageText = defineType({
  name: 'imageText',
  title: 'Image Text',
  type: 'object',
  fields: [
    defineField({
      name: 'swap',
      title: 'Swap Image and Text',
      type: 'boolean',
      description: 'This will swap the image and text positions',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'blockContent',
      validation: (Rule) => Rule.required().error('Heading is required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'image.alt',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title ? toPlainText(title) : 'Untitled Image Text',
        subtitle: subtitle ? subtitle : 'No alt text',
        media: media,
      }
    },
  },
})
