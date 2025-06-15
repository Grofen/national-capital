import {defineField, defineType} from 'sanity'

import {EnvelopeIcon} from '@sanity/icons'
import {toPlainText} from '@portabletext/react'

/**
 * Contact section schema object. This represents a contact section with heading,
 * call-to-action button, and offices information.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
      description: 'Heading for the contact section',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: title ? toPlainText(title) : 'Untitled Contact Section',
        subtitle: 'Contact Section',
      }
    },
  },
})
