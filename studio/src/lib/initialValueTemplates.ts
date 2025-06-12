import {Template} from 'sanity'
import {supportedLanguages} from './i18n'

export const pageTemplates: Template[] = supportedLanguages.map((language) => ({
  id: `page-${language.id}`,
  title: `${language.title} Page`,
  description: `Create a new page in ${language.title}`,
  schemaType: 'page',
  parameters: [{name: 'language', type: 'string'}],
  value: (params: {language: string}) => ({
    language: params.language,
  }),
}))

export const initialValueTemplates = [...pageTemplates]
