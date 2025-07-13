import {blockContent} from './objects/blockContent'
import {callToAction} from './objects/callToAction'
import {client} from './documents/client'
import {clientsSection} from './objects/clientsSection'
import {contactSection} from './objects/contactSection'
import {cultureSection} from './objects/cultureSection'
import {footer} from './singletons/footer'
import {header} from './singletons/header'
import {imageText} from './objects/imageText'
import {infoSection} from './objects/infoSection'
import {languageField} from './objects/languageField'
import {languageSlug} from './objects/languageSlug'
import {link} from './objects/link'
import {media} from './objects/media'
import {page} from './documents/page'
import {pageIntro} from './objects/pageIntro'
import {seo} from './objects/seo'
import {service} from './documents/service'
import {servicesSection} from './objects/servicesSection'
import {settings} from './singletons/settings'
import {statsList} from './objects/statsList'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  footer,
  header,
  settings,

  // Documents
  page,
  service,

  // References
  client,

  // Objects
  blockContent,
  callToAction,
  clientsSection,
  contactSection,
  cultureSection,
  imageText,
  infoSection,
  languageField,
  languageSlug,
  link,
  media,
  pageIntro,
  seo,
  servicesSection,
  statsList,
]
