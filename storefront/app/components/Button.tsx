import { Link } from "@/i18n/navigation";
import { Link as LinkType } from "@/sanity.types";
import ResolvedLink from "./ResolvedLink";
import clsx from "clsx";

type ButtonProps = {
  invert?: boolean;
  link?: LinkType;
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<"button"> & { href?: undefined })
);

export function Button({
  invert = false,
  className,
  children,
  link,
  ...props
}: ButtonProps) {
  className = clsx(
    className,
    "inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition",
    invert
      ? "bg-white text-primary-900 hover:bg-primary-100"
      : "bg-primary-900 text-white hover:bg-primary-700"
  );

  let inner = <span className="relative top-px">{children}</span>;

  if (typeof props.href === "undefined" && !link) {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    );
  }

  return (
    <ResolvedLink link={link} className={className} {...props}>
      {inner}
    </ResolvedLink>
  );
}
