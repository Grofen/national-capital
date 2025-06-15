import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { sanityFetch } from "@/sanity/lib/live";
import { sitemapData } from "@/sanity/lib/queries";

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const sitemap: MetadataRoute.Sitemap = [];
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // // Fetch all translation metadata documents
  // const allTranslationMetadata = await sanityFetch({
  //   query: sitemapData,
  // });

  // // Add homepage for each locale
  // for (const locale of routing.locales) {
  //   sitemap.push({
  //     url: `${baseUrl}/${locale}`,
  //     lastModified: new Date(),
  //     priority: 1,
  //     changeFrequency: "monthly",
  //   });
  // }

  // // Process translation metadata and create sitemap entries
  // if (allTranslationMetadata?.data && allTranslationMetadata.data.length > 0) {
  //   for (const translationMetadata of allTranslationMetadata.data) {
  //     if (
  //       translationMetadata.translations &&
  //       translationMetadata.translations.length > 0
  //     ) {
  //       for (const translation of translationMetadata.translations) {
  //         if (
  //           translation?.page &&
  //           translation.page.slug &&
  //           translation.page.language
  //         ) {
  //           const priority = 0.8;
  //           const changeFrequency = "monthly";
  //           const url = `${baseUrl}/${translation.page.language}/${translation.page.slug}`;
  //           sitemap.push({
  //             lastModified: translation.page._updatedAt || new Date(),
  //             priority,
  //             changeFrequency,
  //             url,
  //           });
  //         }
  //       }
  //     }
  //   }
  // }

  // return sitemap;

  return [];
}
