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
}: {
  className?: string;
  headingClassName?: string;
  invert?: boolean;
  paragraphClassName?: string;
  value: PortableTextBlock[];
  boldClassName?: string;
  ctaClassName?: string;
}) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children, value }) => (
        // Add an anchor to the h1
        <h1 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
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
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>;
      },
      strong: ({ children, value }) => {
        return <b className={cn(boldClassName)}>{children}</b>;
      },
    },
    types: {
      cta: ({ value }: { value: CallToAction }) => {
        const { buttonText, link } = value;

        return (
          <Button link={link} className={ctaClassName} invert={invert}>
            {buttonText}
          </Button>
        );
      },
    },
  };

  return (
    <div
      className={["prose prose-a:text-red-500", className]
        .filter(Boolean)
        .join(" ")}
    >
      <PortableText components={components} value={value} />
    </div>
  );
}
