/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import { cn } from "@/app/utils/cn";

import ResolvedLink from "@/app/components/ResolvedLink";
import { Button } from "./Button";
import { CallToAction } from "@/sanity.types";

export default function CustomPortableText({
  className,
  headingClassName,
  invert = false,
  paragraphClassName,
  value,
  boldClassName,
  ctaClassName,
  linkClassName,
  eyebrowClassName,
}: {
  className?: string;
  headingClassName?: string;
  invert?: boolean;
  paragraphClassName?: string;
  value: PortableTextBlock[];
  boldClassName?: string;
  ctaClassName?: string;
  linkClassName?: string;
  eyebrowClassName?: string;
}) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children, value }) => (
        // Add an anchor to the h1
        <h1
          className={cn(
            "font-display text-5xl font-medium tracking-tight text-balance sm:text-6xl",
            invert ? "text-white" : "text-neutral-950",
            headingClassName
          )}
        >
          {children}
        </h1>
      ),
      h2: ({ children, value }) => {
        return (
          <h2
            className={cn(
              "font-display text-3xl font-medium text-balance sm:text-4xl",
              invert ? "text-white" : "text-neutral-950",
              headingClassName
            )}
          >
            {children}
          </h2>
        );
      },
      h3: ({ children, value }) => {
        return (
          <h3
            className={cn(
              "font-display text-base font-semibold",
              invert ? "text-white" : "text-neutral-950",
              headingClassName
            )}
          >
            {children}
          </h3>
        );
      },
      normal: ({ children, value }) => {
        return (
          <p
            className={cn(
              invert ? "text-neutral-300" : "text-neutral-600",
              paragraphClassName
            )}
          >
            {children}
          </p>
        );
      },
      p: ({ children, value }) => {
        return (
          <p
            className={cn(
              invert ? "text-neutral-300" : "text-neutral-600",
              paragraphClassName
            )}
          >
            {children}
          </p>
        );
      },
      eyebrow: ({ children, value }) => {
        return (
          <span
            className={cn(
              "block font-display text-base font-semibold",
              invert ? "text-white" : "text-neutral-950",
              eyebrowClassName
            )}
          >
            {children}
          </span>
        );
      },
    },
    marks: {
      link: ({ children, value: link }) => {
        return (
          <ResolvedLink link={link} className={linkClassName}>
            {children}
          </ResolvedLink>
        );
      },
      strong: ({ children, value }) => {
        return <b className={cn(boldClassName)}>{children}</b>;
      },
      em: ({ children, value }) => {
        return <em className="italic">{children}</em>;
      },
      left: ({ children, value }) => {
        return <span className="block text-left">{children}</span>;
      },
      center: ({ children, value }) => {
        return <span className="block text-center">{children}</span>;
      },
      right: ({ children, value }) => {
        return <span className="block text-right">{children}</span>;
      },
    },
    types: {
      cta: ({ value }: { value: CallToAction }) => {
        const { buttonText, link } = value;

        return (
          <Button
            link={link}
            className={cn(ctaClassName, "mr-2")}
            invert={invert}
          >
            {buttonText}
          </Button>
        );
      },
    },
  };

  return (
    <div className={cn(className)}>
      <PortableText components={components} value={value} />
    </div>
  );
}
