import { FadeIn, FadeInStagger } from "@/app/components/FadeIn";

import { ClientsSection as ClientsSectionType } from "@/sanity.types";
import { Container } from "@/app/components/Container";
import Image from "next/image";
import { cn } from "@/app/utils/cn";
import { urlForImage } from "@/sanity/lib/utils";

interface Props {
  block: ClientsSectionType;
  className?: string;
}

const ClientLogo = ({
  client,
}: {
  client: ClientsSectionType["clients"][number];
}) => {
  const image = urlForImage(client.logo)?.width(100).height(100).url();

  if (!image) return null;

  return (
    <Image
      alt={client.name}
      src={image}
      width={100}
      height={100}
      className="h-10 w-auto"
    />
  );
};

const Clients = ({ block, className }: Props) => {
  return (
    <div
      className={cn(
        "mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56",
        className
      )}
    >
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            {block.heading}
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {block.clients.map((client) => (
              <li key={client._key}>
                <FadeIn>
                  <ClientLogo client={client} />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  );
};

export default Clients;
