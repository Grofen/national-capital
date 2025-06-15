import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description:
        'Title used for search engines and browsers. Should be between 16-60 characters.',
      validation: (Rule) =>
        Rule.max(60)
          .warning('Meta title should be under 60 characters')
          .required()
          .error('Meta title is required'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: '⚡️ Description for search engines. Should be between 120-160 characters.',
      validation: (Rule) =>
        Rule.max(160)
          .warning('Meta description should be under 160 characters')
          .required()
          .error('Meta description is required'),
    }),
    defineField({
      name: 'ogTitle',
      title: 'Social Share Title',
      type: 'string',
      description: 'Title used when sharing on social media. If not set, meta title will be used.',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Social Share Description',
      type: 'text',
      rows: 3,
      description:
        'Description used when sharing on social media. If not set, meta description will be used.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image used when sharing on social media. Recommended size: 1200x630 pixels.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          {title: 'Summary', value: 'summary'},
          {title: 'Summary Large Image', value: 'summary_large_image'},
        ],
      },
      initialValue: 'summary_large_image',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'If enabled, this page will not be indexed by search engines.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      subtitle: 'metaDescription',
    },
  },
})
