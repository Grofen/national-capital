/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {initialValueTemplates} from './src/lib/initialValueTemplates'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'
import {documentInternationalization} from '@sanity/document-internationalization'
import {supportedLanguages} from './src/lib/i18n'
import {DISABLED_TYPES} from './src/lib/constants'
import {NAME} from '../constants/branding'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string, language?: string): string | undefined {
  switch (documentType) {
    case 'page':
      return slug ? `/${language}/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

// Main Sanity configuration
export default defineConfig({
  name: 'default',
  title: NAME,

  projectId,
  dataset,

  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: '/:language',
            filter: `_type == "page" && slug.current == '/'`,
          },
          {
            route: '/:language/:slug',
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
          page: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
              language: 'language',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('page', doc?.slug, doc?.language)!,
                },
              ],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),

    // Document Internationalization plugin for multi-language support
    documentInternationalization({
      // Required configuration
      supportedLanguages,
      schemaTypes: ['page'],
    }),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },

  // Add initial value templates and filter out default page template
  initialValueTemplates,

  // Document configuration to control new document creation
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      // Filter out the default "page" template, only allow our language-specific templates
      if (creationContext?.type === 'global') {
        return prev.filter((template) => {
          // Remove the default page template, keep our custom language-specific ones
          const isDefaultPageTemplate =
            template.templateId === 'page' && !template.templateId?.startsWith('page-')
          // Remove AI context and Translation metadata from the create menu
          const isDisabledType = DISABLED_TYPES.includes(template.templateId)

          return !isDefaultPageTemplate && !isDisabledType
        })
      }
      return prev
    },
    actions: (prev, {schemaType}) => prev,
  },
})
