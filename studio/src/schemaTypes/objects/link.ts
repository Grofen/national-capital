import {defineField, defineType} from 'sanity'

import {LinkIcon} from '@sanity/icons'
import LinkInput from '../../components/link/LinkInput'
import LinkTypeInput from '../../components/link/LinkTypeInput'

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  components: {
    input: LinkInput,
  },
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      description: 'Select the type of link you want to create',
      options: {
        list: [
          {title: 'URL', value: 'href'},
          {title: 'Internal Page', value: 'page'},
        ],
        layout: 'radio',
      },
      components: {
        input: LinkTypeInput,
      },
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'href',
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }).custom((value, context: any) => {
          if (context.parent?.linkType === 'href' && !value) {
            return 'URL is required when Link Type is URL'
          }
          return true
        }),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.linkType !== 'page',
      validation: (Rule) =>
        // Custom validation to ensure page reference is provided if the link type is 'page'
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'page' && !value) {
            return 'Internal Page reference is required when Link Type is Internal Page'
          }
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
