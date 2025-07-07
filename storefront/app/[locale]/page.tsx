import type { Metadata } from "next";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery } from "@/sanity/lib/queries";
import { GetPageQueryResult } from "@/sanity.types";
import { notFound } from "next/navigation";
import { Container } from "@/app/components/Container";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { FadeIn } from "@/app/components/FadeIn";

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
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            Award-winning development studio based in Denmark.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            We are a development studio working at the intersection of design
            and technology. It’s a really busy intersection though — a lot of
            our staff have been involved in hit and runs.
          </p>
        </FadeIn>
      </Container>

      {/* <Clients /> */}

      {/* <Testimonials /> */}

      {/* <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: "Phobia", logo: "" }}
      >
        The team at Studio went above and beyond with our onboarding, even
        finding a way to access the user’s microphone without triggering one of
        those annoying permission dialogs.
      </Testimonial> */}

      <PageBuilderPage page={page as GetPageQueryResult} />
    </>
  );
}
