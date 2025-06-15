import { FadeIn, FadeInStagger } from "@/app/components/FadeIn";

import { Container } from "@/app/components/Container";
import { Logo } from "@/app/components/Logo";

const clients = [
  ["Phobia"],
  ["Family Fund"],
  ["Unseal"],
  ["Mail Smirk"],
  ["Home Work"],
  ["Green Life"],
  ["Bright Path"],
  ["North Adventures"],
];

const Clients = () => {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            We’ve worked with hundreds of amazing people
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map(([client]) => (
              <li key={client}>
                <FadeIn>
                  <Logo />
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
