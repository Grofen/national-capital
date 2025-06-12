import {defineType} from 'sanity'

export const languageField = defineType({
  name: 'language',
  type: 'string',
  readOnly: true,
  hidden: true,
})
