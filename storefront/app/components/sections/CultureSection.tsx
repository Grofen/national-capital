import { GridList, GridListItem } from "@/app/components/GridList";

import { Container } from "@/app/components/Container";
import PortableText from "../PortableText";
import { SectionIntro } from "@/app/components/SectionIntro";
import { cn } from "@/app/utils/cn";

interface Props {
  block: any;
  className?: string;
}

const CultureSection = ({ block, className }: Props) => {
  const { heading, values } = block;

  return (
    <div
      className={cn(
        "mt-24 rounded-4xl bg-primary-900 py-24 sm:mt-32 lg:mt-40 lg:py-32",
        className
      )}
    >
      <SectionIntro
        eyebrow={block.eyebrow}
        title={
          <PortableText
            value={heading}
            headingClassName={
              "block font-display tracking-tight text-balance text-4xl font-medium sm:text-5xl mb-6"
            }
            paragraphClassName="text-xl"
            invert
          />
        }
        invert
      />
      <Container className="mt-16">
        <GridList>
          {values.map((value: any) => (
            <GridListItem key={value._key} invert>
              <PortableText
                value={value.text}
                paragraphClassName="text-neutral-200"
                boldClassName="text-xl text-white"
              />
            </GridListItem>
          ))}
        </GridList>
      </Container>
    </div>
  );
};

export default CultureSection;
