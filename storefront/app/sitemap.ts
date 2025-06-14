import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { sanityFetch } from "@/sanity/lib/live";
import { sitemapData } from "@/sanity/lib/queries";

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPages = await sanityFetch({
    query: sitemapData,
  });
  const headersList = await headers();
  const sitemap: MetadataRoute.Sitemap = [];
  const domain: String = headersList.get("host") as string;
  sitemap.push({
    url: domain as string,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: "monthly",
  });

  if (allPages != null && allPages.data.length != 0) {
    for (const p of allPages.data) {
      switch (p._type) {
        case "page":
          const priority = 0.8;
          const changeFrequency = "monthly";
          const url = `${domain}/${p.slug}`;
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

  return sitemap;
}
