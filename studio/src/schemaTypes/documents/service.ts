import {defineField, defineType} from 'sanity'

import {ComposeIcon} from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title of the service',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) =>
        Rule.required()
          .max(200)
          .error('Description is required and must be less than 200 characters'),
      description: 'Brief description of the service (max 200 characters)',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'media',
      description: 'Media for the service',
      validation: (Rule) => Rule.required().error('Media is required'),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'link',
      description: 'Page to link to',
      validation: (Rule) => Rule.required().error('Page is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'media',
      description: 'description',
    },
    prepare({title, media, description}) {
      return {
        title,
        subtitle: description,
        media,
      }
    },
  },
})
