import {defineAssetAspect, defineField} from 'sanity'

import pluralize from 'pluralize-esm'
import {supportedLanguages} from '../src/lib/i18n'

export default defineAssetAspect({
  name: 'copyright',
  title: 'Copyright',
  type: 'object',
  fields: [
    defineField({
      name: 'copyrightHolder',
      title: 'Copyright Holder',
      type: 'string',
      description: 'The name of the person or organization that holds the copyright',
    }),
    defineField({
      name: 'copyrightDate',
      title: 'Copyright Date',
      type: 'date',
      description: 'The year the copyright was granted',
    }),
    ...supportedLanguages.map((language) =>
      defineField({
        name: `altText${pluralize(language.id)}`,
        title: `Alt Text ${language.icon}`,
        type: 'string',
        description: 'The alt text for the image',
        validation: (Rule) =>
          language.id === 'en' ? Rule.required().error('Alt text is required for English') : Rule,
      }),
    ),
  ],
})
