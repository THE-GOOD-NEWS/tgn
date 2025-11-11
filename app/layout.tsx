import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ThemeScript } from "@/components/theme-script";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "THE GOOD NEWS",
  description:
    "Discover stories that matter, insights that inspire. Join our community of readers sharing positive stories.",
  keywords:
    "news, article, articles, community, subscription, exclusive content",
  authors: [{ name: "THE GOOD NEWS Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "THE GOOD NEWS",
    description: "Discover stories that matter, insights that inspire",
    type: "website",
    locale: "en_US",
  },
};

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Extract locale from middleware header
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const isRTL = locale === "ar";
  const fontClass = locale === "ar" ? "font-arabic" : "font-english";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={fontClass} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
