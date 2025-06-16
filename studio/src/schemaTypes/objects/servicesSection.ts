import {defineArrayMember, defineField, defineType} from 'sanity'

import {CogIcon} from '@sanity/icons'
import {toPlainText} from '@portabletext/react'

/**
 * Services section schema object. This represents a section showcasing services
 * with a customizable heading, description, image, and list of services.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Small text above the main title',
      initialValue: 'Services',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the services section',
    }),
    defineField({
      name: 'image',
      title: 'Section Image',
      type: 'image',
      description: 'Image displayed alongside the services list',
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'service',
          type: 'object',
          title: 'Service',
          fields: [
            defineField({
              name: 'description',
              title: 'Service Description',
              type: 'blockContent',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'description',
            },
            prepare({title}) {
              return {
                title: title ? toPlainText(title).slice(0, 50) + '...' : 'Untitled Service',
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).error('At least one service is required'),
      description: 'List of services to display',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      services: 'services',
    },
    prepare({title, services}) {
      const serviceCount = services?.length || 0

      return {
        title: title ? toPlainText(title).slice(0, 50) + '...' : 'Services Section',
        subtitle: `${serviceCount} service${serviceCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
