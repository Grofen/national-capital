import { Container } from "@/app/components/Container";
import { FadeIn } from "@/app/components/FadeIn";
import { Footer as FooterType } from "@/sanity.types";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/app/components/Logo";
import PortableText from "@/app/components/PortableText";
import { PortableTextBlock } from "next-sanity";
import ResolvedLink from "./ResolvedLink";
import { socialMediaProfiles } from "@/app/components/SocialMedia";

function Navigation({ footer }: { footer: FooterType }) {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {footer.navigationSections?.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links?.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <ResolvedLink
                    link={link.link}
                    className="transition hover:text-neutral-950"
                  >
                    {link.label}
                  </ResolvedLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// function ArrowIcon(props: React.ComponentPropsWithoutRef<"svg">) {
//   return (
//     <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
//       <path
//         fill="currentColor"
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M16 3 10 .5v2H0v1h10v2L16 3Z"
//       />
//     </svg>
//   );
// }

// function NewsletterForm() {
//   return (
//     <form className="max-w-sm">
//       <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
//         Sign up for our newsletter
//       </h2>
//       <p className="mt-4 text-sm text-neutral-700">
//         Subscribe to get the latest design news, articles, resources and
//         inspiration.
//       </p>
//       <div className="relative mt-6">
//         <input
//           type="email"
//           placeholder="Email address"
//           autoComplete="email"
//           aria-label="Email address"
//           className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pr-20 pl-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-primary-900 focus:ring-primary-700/5 focus:outline-hidden"
//         />
//         <div className="absolute inset-y-1 right-1 flex justify-end">
//           <button
//             type="submit"
//             aria-label="Submit"
//             className="flex aspect-square h-full items-center justify-center rounded-xl bg-primary-900 text-white transition hover:bg-primary-700"
//           >
//             <ArrowIcon className="w-4" />
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

export function Footer({ footer }: { footer: FooterType }) {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation footer={footer} />
          <div className="flex">
            <PortableText
              value={footer.contactSection as PortableTextBlock[]}
              headingClassName="mb-4"
              paragraphClassName="mb-4"
              linkClassName="text-primary-900 hover:underline hover:text-primary-700 transition-all duration-300 mb-0"
              ctaClassName="mb-4"
            />
          </div>
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-primary-700/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <p className="text-sm text-neutral-700">
            © National Capital {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  );
}
