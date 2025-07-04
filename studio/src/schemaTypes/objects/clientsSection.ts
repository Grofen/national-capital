import {defineArrayMember, defineField, defineType} from 'sanity'

import {UsersIcon} from '@sanity/icons'

/**
 * Clients section schema object. This represents a section showcasing client logos
 * and company names with a customizable heading.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const clientsSection = defineType({
  name: 'clientsSection',
  title: 'Clients Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the clients section',
      initialValue: "We've worked with hundreds of amazing people",
    }),
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'client',
          type: 'reference',
          title: 'Client',
          to: [{type: 'client'}],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).error('At least one client is required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      clients: 'clients',
    },
    prepare({title, clients}) {
      const clientCount = clients?.length || 0
      return {
        title: title || 'Clients Section',
        subtitle: `${clientCount} client${clientCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
