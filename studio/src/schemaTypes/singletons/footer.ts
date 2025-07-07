import {defineArrayMember, defineField, defineType} from 'sanity'

import {ComponentIcon} from '@sanity/icons'

/**
 * Footer schema Singleton. This manages the footer navigation, social links, and newsletter settings.
 * Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'language',
    }),

    defineField({
      name: 'navigationSections',
      title: 'Navigation Sections',
      type: 'array',
      description: 'Footer navigation sections with their respective links.',
      validation: (rule) =>
        rule.max(4).warning('Consider keeping navigation sections to 4 or fewer for better layout'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navigationSection',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'The title of this navigation section (e.g., "Work", "Company")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              description: 'Links within this navigation section',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Link Label',
                      type: 'string',
                      description: 'The text displayed for this link',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'link',
                      description: 'Where this link should go',
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'link.href',
                      subtitlePage: 'link.page.title',
                    },
                    prepare({title, subtitle, subtitlePage}) {
                      return {
                        title: title || 'Untitled',
                        subtitle: subtitle || subtitlePage || 'No link configured',
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              linksCount: 'links',
            },
            prepare({title, linksCount}) {
              return {
                title: title || 'Untitled Section',
                subtitle: linksCount ? `${linksCount.length} links` : 'No links',
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'blockContent',
      description: 'Contact information for the footer',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Configuration',
        subtitle: 'Navigation, social links, and footer settings',
      }
    },
  },
})
