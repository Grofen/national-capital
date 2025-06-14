import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import { sanityFetch } from "@/sanity/lib/live";
import { sitemapData } from "@/sanity/lib/queries";

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const sitemap: MetadataRoute.Sitemap = [];
  const host = headersList.get("host") as string;
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const baseUrl = `${protocol}://${host}`;

  // Generate sitemap entries for each enabled locale
  for (const locale of routing.locales) {
    const allPages = await sanityFetch({
      query: sitemapData,
      params: { language: locale },
    });

    // Add homepage for this locale
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "monthly",
    });

    // Add pages for this locale
    if (allPages != null && allPages.data.length != 0) {
      for (const p of allPages.data) {
        switch (p._type) {
          case "page":
            const priority = 0.8;
            const changeFrequency = "monthly";
            const url = `${baseUrl}/${locale}/${p.slug}`;
            sitemap.push({
              lastModified: p._updatedAt || new Date(),
              priority,
              changeFrequency,
              url,
            });
            break;
        }
      }
    }
  }

  return sitemap;
}
