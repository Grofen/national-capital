import type { Metadata } from "next";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery } from "@/sanity/lib/queries";
import { GetPageQueryResult } from "@/sanity.types";
import { notFound } from "next/navigation";
import { Container } from "@/app/components/Container";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { FadeIn, FadeInStagger } from "../components/FadeIn";
import { CaseStudy, MDXEntry } from "@/lib/mdx";
import Image from "next/image";
import { SectionIntro } from "@/app/components/SectionIntro";
import { Link } from "@/i18n/navigation";
import { Testimonial } from "@/app/components/Testimonial";
import ServicesSection from "@/app/components/sections/ServicesSection";
import Clients from "@/app/components/sections/ClientsSection";

type Props = {
  params: Promise<{ locale: string }>;
};

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>;
}) {
  return (
    <>
      <SectionIntro
        title="Harnessing technology for a brighter future"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We believe technology is the answer to the world’s greatest
          challenges. It’s also the cause, so we find ourselves in bit of a
          catch 22 situation.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split("-")[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split("-")[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
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

      <CaseStudies caseStudies={[]} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: "Phobia", logo: "" }}
      >
        The team at Studio went above and beyond with our onboarding, even
        finding a way to access the user’s microphone without triggering one of
        those annoying permission dialogs.
      </Testimonial>

      <ServicesSection />

      <PageBuilderPage page={page as GetPageQueryResult} />
    </>
  );
}
