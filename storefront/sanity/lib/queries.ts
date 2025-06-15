import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
  }
`;

const linkFields = /* groq */ `
  link {
    ...,
    ${linkReference}
  }
`;

const pageFields = /* groq */ `
  _id,
  _type,
  language,
  name,
  slug,
  heading,
  subheading,
  "pageBuilder": pageBuilder[]{
    ...,
    _type == "callToAction" => {
      ${linkFields},
    },
    _type == "infoSection" => {
      content[]{
        ...,
        markDefs[]{
          ...,
          ${linkReference}
        }
      }
    },
  }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug && language == $language][0]{
    ${pageFields},
    "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      ${pageFields}
    }
  }
`);

// Updated query to work with document-internationalization
export const sitemapData = defineQuery(`
  *[_type == "translation.metadata" && "page" in schemaTypes] {
    _id,
    "translations": translations[]{
      "_key": _key,
      "page": value->{
        _id,
        _type,
        "slug": slug.current,
        language,
        _updatedAt
      }
    }[defined(page.slug)]
  }[count(translations) > 0]
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

// Updated query for static generation to work with translation metadata
export const pagesSlugsForStaticGeneration = defineQuery(`
  *[_type == "page"]{
    "slug": slug.current,
    language
  }
`);
