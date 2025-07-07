import * as demo from '../../lib/initialValues'

import {defineArrayMember, defineField, defineType} from 'sanity'

import {CogIcon} from '@sanity/icons'
import {toPlainText} from '@portabletext/react'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your blog.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      description: 'Used both for the <meta> description tag for SEO, and the blog subheader.',
      title: 'Description',
      type: 'array',
      initialValue: demo.description,
      of: [
        // Define a minified block content field for the description. https://www.sanity.io/docs/block-content
        defineArrayMember({
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                type: 'object',
                name: 'link',
                fields: [
                  {
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (rule) => rule.required(),
                  },
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      description:
        'Contact information for your business. This will be displayed in the footer or any other place you want to display it.',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'businessAddresses',
      title: 'Business Addresses',
      type: 'blockContent',
      description: 'Addresses for your business. This will be used throughout the website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address For Map',
      type: 'object',
      description: 'Address for your business. This is used for the map on the contact page.',
      fields: [
        defineField({
          name: 'addressLine',
          title: 'Address Line',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'latitude',
          title: 'Latitude',
          type: 'number',
        }),
        defineField({
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      description:
        'Opening hours for your business. This will be displayed in the contact page or any other place you want to display it.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'isOpen',
              title: 'Is Open',
              type: 'boolean',
              initialValue: true,
              hidden: ({parent}) => parent.open && parent.close,
            }),
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'open',
              title: 'Open',
              type: 'string',
              hidden: ({parent}) => !parent.isOpen,
            }),
            defineField({
              name: 'close',
              title: 'Close',
              type: 'string',
              hidden: ({parent}) => !parent.isOpen,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'tracking',
      title: 'Tracking',
      type: 'array',
      description:
        'Tracking information for your business. This will be used to track events and conversions on your website.',
      of: [
        defineArrayMember({
          name: 'googleMapsAPIKey',
          title: 'Google Maps API Key',
          type: 'string',
          description:
            'Google Maps API key. This will be used to display the map on the contact page.',
        }),
        defineArrayMember({
          name: 'googleTagManagerID',
          title: 'Google Tag Manager ID',
          type: 'string',
          description:
            'Google Tag Manager ID. This will be used to track events and conversions on your website. This is used for the Google Tag Manager property.',
        }),
        defineArrayMember({
          name: 'googleAnalyticsID',
          title: 'Google Analytics ID',
          type: 'string',
          description:
            'Google Analytics ID. This will be used to track events and conversions on your website. This is used for the Google Analytics 4 property.',
        }),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'array',
      description:
        'Social media links for your business. These will be displayed in the footer or any other place you want to display them.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  'facebook',
                  'instagram',
                  'twitter',
                  'linkedin',
                  'youtube',
                  'tiktok',
                  'pinterest',
                  'reddit',
                  'snapchat',
                  'twitch',
                  'discord',
                  'telegram',
                  'mastodon',
                  'threads',
                  'x',
                  'website',
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
