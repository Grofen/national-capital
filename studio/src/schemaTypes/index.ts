import {blockContent} from './objects/blockContent'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {languageField} from './objects/languageField'
import {languageSlug} from './objects/languageSlug'
import {link} from './objects/link'
import {page} from './documents/page'
import {seo} from './objects/seo'
import {settings} from './singletons/settings'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,

  // Documents
  page,

  // Objects
  blockContent,
  callToAction,
  infoSection,
  languageField,
  languageSlug,
  link,
  seo,
]
