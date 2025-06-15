import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { sanityFetch } from "@/sanity/lib/live";
import { sitemapData } from "@/sanity/lib/queries";

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Add homepage for each locale
  for (const locale of routing.locales) {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "monthly",
    });
  }

  // Fetch all pages from Sanity
  try {
    const pagesData = await sanityFetch({
      query: sitemapData,
    });

    // Process pages and create sitemap entries
    if (pagesData?.data && pagesData.data.length > 0) {
      for (const page of pagesData.data) {
        if (page?.slug && page.language) {
          const priority = 0.8;
          const changeFrequency = "monthly";
          const url = `${baseUrl}/${page.language}/${page.slug}`;
          sitemap.push({
            lastModified: new Date(),
            priority,
            changeFrequency,
            url,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error fetching sitemap data from Sanity:", error);
    // Continue with homepage if Sanity fetch fails
  }

  return sitemap;
}
