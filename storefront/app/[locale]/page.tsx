import type { Metadata } from "next";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery } from "@/sanity/lib/queries";
import { GetPageQueryResult } from "@/sanity.types";
import { notFound } from "next/navigation";
import { Container } from "@/app/components/Container";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: { language: params.locale, slug: "/" },
    // Metadata should never contain stega
    stega: false,
  });

  const ogImage = resolveOpenGraphImage(page?.seo?.ogImage);

  return {
    title: page?.seo?.metaTitle || page?.title,
    description: page?.seo?.metaDescription,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([
    sanityFetch({
      query: getPageQuery,
      params: { language: params.locale, slug: "/" },
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
