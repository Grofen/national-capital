import {defineType} from 'sanity'

export const client = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'testimonial',
      title: 'Testimonial',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'url',
      media: 'logo',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
