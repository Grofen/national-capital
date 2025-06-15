import {defineField, defineType} from 'sanity'

import {DocumentIcon} from '@sanity/icons'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'language',
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().error(
          'Title is required, it will be used to identify the page in the studio and used as a fallback for the SEO title',
        ),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'languageSlug',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: [{type: 'callToAction'}, {type: 'infoSection'}],
      options: {
        insertMenu: {
          // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'SEO settings for the page, if not set, the global settings will be used',
    }),
  ],
})
