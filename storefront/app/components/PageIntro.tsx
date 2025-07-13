import { Container } from "@/app/components/Container";
import { FadeIn } from "@/app/components/FadeIn";
import { type PageIntro } from "@/sanity.types";
import { cn } from "@/app/utils/cn";
import { PortableTextBlock } from "@portabletext/react";
import PortableText from "@/app/components/PortableText";

interface Props {
  block: PageIntro;
  className?: string;
}

export function PageIntro({ block }: Props) {
  return (
    <Container
      className={cn("mt-24 sm:mt-32 lg:mt-40", block.centered && "text-center")}
    >
      <FadeIn>
        {/* <h1>
          {block.eyebrow && (
            <span className="block font-display text-base font-semibold text-neutral-950">
              {block.eyebrow}
            </span>
          )}
          <span className="sr-only"> - </span>
          <span
            className={cn(
              "mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl",
              centered && "mx-auto"
            )}
          >
            {title}
          </span>
        </h1>
        <div
          className={cn(
            "mt-6 max-w-3xl text-xl text-neutral-600",
            centered && "mx-auto"
          )}
        >
          {children}
        </div> */}
        <PortableText
          value={block.heading as PortableTextBlock[]}
          eyebrowClassName="block font-display text-base font-semibold text-neutral-950"
          headingClassName="mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl"
          paragraphClassName="mt-6 max-w-3xl text-xl text-neutral-600"
        />
      </FadeIn>
    </Container>
  );
}
