import Image, { type ImageProps } from "next/image";
import clsx from "clsx";

import { Container } from "@/app/components/Container";
import { FadeIn } from "@/app/components/FadeIn";
import { GridPattern } from "@/app/components/GridPattern";

export function Testimonial({
  children,
  client,
  className,
}: {
  children: React.ReactNode;
  client: { logo: ImageProps["src"]; name: string };
  className?: string;
}) {
  return (
    <Container className="py-16 sm:py-28 md:py-32 relative isolate">
      <FadeIn>
        <figure className="mx-auto max-w-4xl">
          <blockquote className="relative font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
            <p className="before:content-['“'] after:content-['”'] sm:before:absolute sm:before:right-full">
              {children}
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <Image src={""} alt={client.name} unoptimized />
          </figcaption>
        </figure>
      </FadeIn>
    </Container>
  );
}
