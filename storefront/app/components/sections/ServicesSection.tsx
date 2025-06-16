import { List, ListItem } from "@/app/components/List";

import { Container } from "@/app/components/Container";
import { FadeIn } from "@/app/components/FadeIn";
import PortableText from "@/app/components/PortableText";
import { PortableTextBlock } from "next-sanity";
import { SectionIntro } from "@/app/components/SectionIntro";
import { ServicesSection as ServicesSectionType } from "@/sanity.types";
import { StylizedImage } from "@/app/components/StylizedImage";
import { cn } from "@/app/utils/cn";
import { urlForImage } from "@/sanity/lib/utils";

interface Props {
  block: ServicesSectionType;
  className?: string;
}

const ServicesSection = ({ block, className }: Props) => {
  const image = urlForImage(block.image)?.url();
  const imageDimensions = (block.image as any)?.dimensions;

  if (!image) return null;

  return (
    <>
      <SectionIntro
        eyebrow={block.eyebrow}
        title={
          <PortableText
            value={block.heading as PortableTextBlock[]}
            headingClassName={cn(
              "block font-display tracking-tight text-balance text-neutral-950 text-4xl font-medium sm:text-5xl mb-6"
            )}
            paragraphClassName="text-xl text-neutral-600"
          />
        }
        className="mt-24 sm:mt-32 lg:mt-40"
      />
      <Container className={cn("mt-16", className)}>
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-135 flex-none lg:w-180">
              <StylizedImage
                src={image}
                width={imageDimensions?.width || 800}
                height={imageDimensions?.height || 600}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-132 lg:pl-4">
            {block.services.map((service) => (
              <ListItem key={service._key}>
                <PortableText
                  value={service.description as PortableTextBlock[]}
                  boldClassName="text-neutral-950"
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Container>
    </>
  );
};

export default ServicesSection;
