import { ContactSection as ContactSectionType } from "@/sanity.types";
import { Container } from "@/app/components/Container";
import { FadeIn } from "@/app/components/FadeIn";
import PortableText from "@/app/components/PortableText";
import { PortableTextBlock } from "next-sanity";
import { cn } from "@/app/utils/cn";

interface Props {
  block: ContactSectionType;
  className?: string;
}

const ContactSection = ({ block, className }: Props) => {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn
        className={cn(
          "-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12",
          className
        )}
      >
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <PortableText
              invert
              value={block.heading as PortableTextBlock[]}
              headingClassName="mb-6"
            />
            <div className="mt-10 border-t border-white/10 pt-10">
              <PortableText
                boldClassName="text-white"
                headingClassName="mb-6"
                invert
                paragraphClassName="text-sm not-italic"
                value={block.address as PortableTextBlock[]}
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
};

export default ContactSection;
