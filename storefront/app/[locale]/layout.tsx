import { NextIntlClientProvider, hasLocale } from "next-intl";
import { VisualEditing, toPlainText } from "next-sanity";
import {
  description as defaultDescription,
  title as defaultTitle,
} from "@/sanity/lib/demo";

import DraftModeToast from "@/app/components/DraftModeToast";
import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { cn } from "@/app/utils/cn";
import { draftMode } from "next/headers";
import { handleError } from "@/app/client-utils";
import { notFound } from "next/navigation";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { routing } from "@/i18n/routing";
import { sanityFetch } from "@/sanity/lib/live";
import { setRequestLocale } from "next-intl/server";
import { settingsQuery } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Set the locale for static rendering
  setRequestLocale(locale);

  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });

  const title = settings?.title || defaultTitle;
  const description = settings?.description || defaultDescription;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png" }],
    },
    manifest: "/site.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Manually set direction based on locale (Arabic is RTL)
  const direction = locale === "ar" ? "rtl" : "ltr";

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const { isEnabled: isDraftMode } = await draftMode();

  // Fetch header and footer data in parallel
  const [
    { data: header },
    // { data: footer }, { data: settings }
  ] = await Promise.all([
    //   sanityFetch({
    //     query: headerQuery,
    //     params: { language: locale },
    //   }),
    //   sanityFetch({
    //     query: footerQuery,
    //     params: { language: locale },
    //   }),
    sanityFetch({
      query: settingsQuery,
      params: { language: locale },
    }),
  ]);

  return (
    <html
      lang={locale}
      className={cn("h-full bg-neutral-950 text-base antialiased", direction)}
      dir={direction}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider locale={locale}>
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}
          <SanityLive onError={handleError} />
          <main className="flex-grow flex flex-col">{children}</main>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
