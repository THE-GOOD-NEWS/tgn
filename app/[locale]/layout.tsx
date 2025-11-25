import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales } from "@/i18n";
import { Metadata, Viewport } from "next";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { AuthProvider } from "../providers/AuthProvider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === "ar";

  return {
    title: "THE GOOD NEWS",
    description: "Discover stories that matter, insights that inspire",
    other: {
      dir: isRTL ? "rtl" : "ltr",
    },
  };
}

// Define viewport separately as required by Next.js 15
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";
  const isLoggedIn = false;
  const userRole = "user" as const;

  // Apply appropriate font based on locale
  const fontClass = locale === "ar" ? "font-arabic" : "font-english";

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider messages={messages}>
        <AuthProvider>
          <Navigation />
          <div className="overflow-x-hidden">{children}</div>
          <Footer />
        </AuthProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
