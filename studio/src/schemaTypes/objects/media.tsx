import {defineField, defineType} from 'sanity'

export const media = defineType({
  name: 'media',
  title: 'Media',
  type: 'image',
  description: 'Pick an image from the media library',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt',
      type: 'string',
      description: 'Alt text for the image',
    }),
  ],
})
