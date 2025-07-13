import { cn } from "@/app/utils/cn";
import { type ImageText } from "@/sanity.types";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";
import PortableText from "@/app/components/PortableText";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { MediaImage } from "@/types/media";

interface Props {
  block: ImageText & {
    image: MediaImage;
  };
  className?: string;
}

const ImageText = ({ block, className }: Props) => {
  const imageUrl = block.image ? urlForImage(block.image) : null;

  return (
    <Container className={cn(className, "mt-24 sm:mt-32 lg:mt-40")}>
      <FadeIn className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            block.swap ? "lg:order-2" : "lg:order-1"
          )}
        >
          {block.heading && (
            <PortableText
              value={block.heading as PortableTextBlock[]}
              headingClassName="text-4xl font-medium sm:text-5xl mb-6"
              paragraphClassName="text-lg text-neutral-600"
            />
          )}
        </div>
        <div
          className={cn(
            "flex items-center justify-center overflow-hidden rounded-4xl",
            block.swap ? "lg:order-1" : "lg:order-2"
          )}
        >
          {block.image && imageUrl && (
            <Image
              src={imageUrl?.url() || ""}
              alt={block.image.alt}
              width={block.image.dimensions?.width}
              height={block.image.dimensions?.height}
              unoptimized
            />
          )}
        </div>
      </FadeIn>
    </Container>
  );
};

export default ImageText;
