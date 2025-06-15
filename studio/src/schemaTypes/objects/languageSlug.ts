import {SlugValidationContext, defineType} from 'sanity'

// This checks that there are no other documents
// With this published, draft or version _id
// Or this schema type
// With the same slug and language
const isUniqueOtherThanLanguage = async (slug: string, context: SlugValidationContext) => {
  const {document, getClient} = context
  if (!document?.language) {
    return true
  }
  const client = getClient({apiVersion: '2023-04-24'})
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    id,
    language: document.language,
    slug,
  }
  const query = `!defined(*[
    !(sanity::versionOf($id)) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`
  const result = await client.fetch(query, params)
  return result
}

export const languageSlug = defineType({
  name: 'languageSlug',
  title: 'Language Slug',
  type: 'slug',
  description:
    'The slug is the page url, it must be unique for each page for example if you have a page with the slug "about" and the language is "en", the slug must be "en/about"',
  options: {
    isUnique: isUniqueOtherThanLanguage,
  },
})
