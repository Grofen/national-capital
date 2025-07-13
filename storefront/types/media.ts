import { SanityImageAsset, SanityImageMetadata } from "@/sanity.types";

export interface MediaImage {
  alt: string;
  url: string;
  metadata: SanityImageMetadata;
  dimensions: SanityImageMetadata["dimensions"];
  asset: SanityImageAsset;
  media: unknown;
}
