import { Container } from "@/app/components/Container";
import { FadeIn } from "@/app/components/FadeIn";
import clsx from "clsx";

export function SectionIntro({
  title,
  eyebrow,
  children,
  smaller = false,
  invert = false,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof Container>,
  "title" | "children"
> & {
  title: string | React.ReactNode;
  eyebrow?: string;
  children?: React.ReactNode;
  smaller?: boolean;
  invert?: boolean;
}) {
  return (
    <Container {...props}>
      <FadeIn className="max-w-2xl">
        <h2>
          {eyebrow && (
            <>
              <span
                className={clsx(
                  "mb-6 block font-display text-base font-semibold",
                  invert ? "text-white" : "text-neutral-950"
                )}
              >
                {eyebrow}
              </span>
              <span className="sr-only"> - </span>
            </>
          )}
          {typeof title === "string" && (
            <span
              className={clsx(
                "block font-display tracking-tight text-balance",
                smaller
                  ? "text-2xl font-semibold"
                  : "text-4xl font-medium sm:text-5xl",
                invert ? "text-white" : "text-neutral-950"
              )}
            >
              {title}
            </span>
          )}
          {typeof title !== "string" && title}
        </h2>
        {children && (
          <div
            className={clsx(
              "mt-6 text-xl",
              invert ? "text-neutral-300" : "text-neutral-600"
            )}
          >
            {children}
          </div>
        )}
      </FadeIn>
    </Container>
  );
}
