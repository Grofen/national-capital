import {CogIcon, InsertBelowIcon, MenuIcon} from '@sanity/icons'
import type {ListItemBuilder, StructureBuilder, StructureResolver} from 'sanity/structure'

import {DISABLED_TYPES} from '../lib/constants'
import {DocumentIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import {supportedLanguages} from '../lib/i18n'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const INTERNATIONALIZED_TYPES = ['page']

const TRANSLATED_NAVIGATIONS = [
  {
    id: 'header',
    title: 'Navigation Bar',
    type: 'header',
    icon: MenuIcon,
  },
  {
    id: 'footer',
    title: 'Footer',
    type: 'footer',
    icon: InsertBelowIcon,
  },
]

export const structure: StructureResolver = (S: StructureBuilder) => {
  return S.list()
    .title('Website Content')
    .items([
      // Pages section with language organization
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages by Language')
            .items([
              // All pages with language-specific templates only
              S.listItem()
                .title('All Pages')
                .child(
                  S.documentList()
                    .title('All Pages')
                    .schemaType('page')
                    .filter('_type == "page"')
                    .initialValueTemplates([
                      ...supportedLanguages.map((language) =>
                        S.initialValueTemplateItem(`page-${language.id}`, {language: language.id}),
                      ),
                    ]),
                ),
              S.divider(),
              // Pages grouped by language with initial value templates
              ...supportedLanguages.map((language) =>
                S.listItem()
                  .title(`${language.title} Pages ${language.icon}`)
                  .child(
                    S.documentList()
                      .title(`${language.title} Pages`)
                      .schemaType('page')
                      .filter('_type == "page" && language == $language')
                      .params({language: language.id})
                      .initialValueTemplates([
                        S.initialValueTemplateItem(`page-${language.id}`, {language: language.id}),
                      ]),
                  ),
              ),
            ]),
        ),

      S.divider(),

      // Regular document types (pluralized and filtered)
      ...S.documentTypeListItems()
        .filter((listItem: ListItemBuilder) => {
          const id = listItem.getId()
          return id && !DISABLED_TYPES.includes(id) && !INTERNATIONALIZED_TYPES.includes(id)
        })
        .map((listItem: ListItemBuilder) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),

      S.divider(),

      // Translated Singletons
      ...TRANSLATED_NAVIGATIONS.map((navigation) =>
        S.listItem()
          .title(navigation.title)
          .icon(navigation.icon)
          .id(navigation.id)
          .child(
            S.list()
              .title(navigation.title)
              .id(navigation.id)
              .items([
                ...supportedLanguages.map((language) =>
                  S.documentListItem()
                    .schemaType(navigation.type)
                    .title(`${language.title} ${navigation.title}`)
                    .id(`${navigation.id}-${language.id}`),
                ),
              ]),
          ),
      ),

      S.divider(),

      // Settings Singleton in order to view/edit the one particular document for Settings.
      // Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
}
