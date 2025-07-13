import { type PortableTextBlock } from "next-sanity";

import PortableText from "@/app/components/PortableText";
import { type InfoSection } from "@/sanity.types";
import { Container } from "@/app/components/Container";
import { cn } from "@/app/utils/cn";
import { FadeIn } from "./FadeIn";

type InfoProps = {
  block: InfoSection;
  index: number;
};

export default function InfoSection({ block }: InfoProps) {
  return (
    <Container className={cn("mt-24 sm:mt-32 lg:mt-40 mx-auto")}>
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
          eyebrowClassName="max-w-5xl mx-auto"
          headingClassName="mt-6 block max-w-5xl font-display mx-auto"
          paragraphClassName="mt-6 max-w-5xl lg:text-xl mx-auto"
        />
      </FadeIn>
      {/* {block?.heading && (
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {block.heading}
          </h2>
        )}
        {block?.subheading && (
          <span className="block mt-4 mb-8 text-lg uppercase font-light text-gray-900/70">
            {block.subheading}
          </span>
        )}
        <div className="mt-4">
          {block?.content?.length && (
            <PortableText
              className=""
              value={block.content as PortableTextBlock[]}
            />
          )}
        </div> */}
    </Container>
  );
}
