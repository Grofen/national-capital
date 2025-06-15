import type { Metadata } from "next";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getPageQuery,
  pagesSlugsForStaticGeneration,
} from "@/sanity/lib/queries";
import { GetPageQueryResult } from "@/sanity.types";
import { notFound } from "next/navigation";
import { Container } from "@/app/components/Container";

type Props = {
  params: Promise<{ locale: string; slug: string[] }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugsForStaticGeneration,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });

  return (
    data
      ?.filter((page) => page && page.slug && page.language) // Filter out home page
      .map((page) => ({
        locale: page!.language!,
        slug: page!.slug.split("/").filter(Boolean), // Convert slug to array format expected by [...slug]
      })) || []
  );
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: { language: params.locale, slug: params.slug.join("/") },
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: page?.title,
    // description: page?.description,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([
    sanityFetch({
      query: getPageQuery,
      params: { language: params.locale, slug: params.slug.join("/") },
    }),
  ]);

  if (!page?._id) {
    return notFound();
  }

  return (
    <Container>
      <PageBuilderPage page={page as GetPageQueryResult} />
    </Container>
  );
}
