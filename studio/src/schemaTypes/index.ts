import {blockContent} from './objects/blockContent'
import {callToAction} from './objects/callToAction'
import {clientsSection} from './objects/clientsSection'
import {contactSection} from './objects/contactSection'
import {infoSection} from './objects/infoSection'
import {languageField} from './objects/languageField'
import {languageSlug} from './objects/languageSlug'
import {link} from './objects/link'
import {page} from './documents/page'
import {seo} from './objects/seo'
import {servicesSection} from './objects/servicesSection'
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
  clientsSection,
  contactSection,
  infoSection,
  languageField,
  languageSlug,
  link,
  seo,
  servicesSection,
]
