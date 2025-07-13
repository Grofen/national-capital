import { FadeIn, FadeInStagger } from "@/app/components/FadeIn";

import { Border } from "@/app/components/Border";
import { type StatsList } from "@/sanity.types";
import { cn } from "@/app/utils/cn";
import { Container } from "@/app/components/Container";

interface Props {
  block: StatsList;
  className?: string;
}

export function StatList({
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof FadeInStagger>, "children"> & {
  children: React.ReactNode;
}) {
  return (
    <FadeInStagger {...props}>
      <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        {children}
      </dl>
    </FadeInStagger>
  );
}

export function StatListItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Border as={FadeIn} position="left" className="flex flex-col-reverse pl-8">
      <dt className="mt-2 text-base text-neutral-600">{label}</dt>
      <dd className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
        {value}
      </dd>
    </Border>
  );
}

export default function Stats({ block, className }: Props) {
  if (!block.stats) return null;

  return (
    <Container className={cn(className, "mt-16")}>
      <StatList className={className}>
        {block.stats.map((stat) => (
          <StatListItem
            key={stat._key}
            label={stat.label}
            value={stat.number}
          />
        ))}
      </StatList>
    </Container>
  );
}
