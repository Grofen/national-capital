import {defineArrayMember, defineField, defineType} from 'sanity'

import {MenuIcon} from '@sanity/icons'

/**
 * Header schema Singleton. This manages the header navigation and CTA button.
 * Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'language',
    }),

    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      description: 'Main navigation menu items displayed in the header.',
      validation: (rule) =>
        rule.max(6).warning('Consider keeping navigation items to 6 or fewer for better UX'),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'The text displayed for this navigation item',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
              description: 'Where this navigation item should link to',
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
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      description: 'The call-to-action button displayed in the header (e.g., "Contact us")',
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          description: 'The text displayed on the CTA button',
          initialValue: 'Contact us',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'link',
          description: 'Where the CTA button should link to',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Configuration',
        subtitle: 'Navigation and CTA settings',
      }
    },
  },
})
