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

const imageFields = /* groq */ `
  "url": asset->url,
`;

const blockContentFields = /* groq */ `
  ...,
  _type == "cta" => {
    ...,
    link {
      ...,
      "page": page->slug.current,
    }
  },
  markDefs[]{
    ...,
    ${linkReference}
  }
`;

const contactSectionFields = /* groq */ `
  _type == "contactSection" => {
    heading[]{
      ${blockContentFields}
    },
    address[]{
      ${blockContentFields}
    }
  }
`;

const clientsSectionFields = /* groq */ `
  _type == "clientsSection" => {
    heading,
    clients[]-> {
      _id,
      name,
      logo {
        ...,
        ${imageFields}
      }
    }
  }
`;

const servicesSectionFields = /* groq */ `
  _type == "servicesSection" => {
    eyebrow,
    heading[]{
      ${blockContentFields}
    },
    services[]-> {
      _id,
      title,
      description,
      page {
        ...,
        ${linkReference}
      },
      media {
        ...,
        ${imageFields}
        "metadata": asset->metadata,
        "dimensions": asset->metadata.dimensions
      }
    }
  }
`;

const pageFields = /* groq */ `
  _id,
  _type,
  language,
  title,
  slug,
  "pageBuilder": pageBuilder[]{
    ...,
    ${contactSectionFields},
    ${clientsSectionFields},
    ${servicesSectionFields},
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
  },
  seo
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
  *[_type == "page" && defined(slug.current) && slug.current != "/"]{
    "slug": slug.current,
    language
  }
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

// Updated query for static generation to work with translation metadata
export const pagesSlugsForStaticGeneration = defineQuery(`
  *[_type == "page" && defined(slug.current) && slug.current != "/"]{
    "slug": slug.current,
    language
  }
`);
