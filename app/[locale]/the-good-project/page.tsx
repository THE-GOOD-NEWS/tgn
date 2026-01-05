"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Counter } from "@/components/ui/counter";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const arabicToEnglishMap: Record<string, string> = {
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
};

function parseLocalizedStat(str: string) {
  const normalized = str.replace(
    /[٠-٩]/g,
    (char) => arabicToEnglishMap[char] || char
  );
  const match = normalized.match(/(\d+)/);
  if (!match) return { value: 0, prefix: "", suffix: str };

  const value = parseInt(match[0], 10);
  const index = normalized.indexOf(match[0]);

  // Assuming 1-to-1 mapping length, indices are safe.
  const prefix = str.substring(0, index);
  const suffix = str.substring(index + match[0].length);

  return { value, prefix, suffix };
}

function getInstagramEmbedUrl(src: string): string {
  try {
    const url = new URL(src);
    const parts = url.pathname.split("/").filter(Boolean);
    const pIndex = parts.indexOf("p");
    const reelIndex = parts.indexOf("reel");
    const reelsIndex = parts.indexOf("reels");

    let type: "p" | "reel" | undefined;
    let shortcode: string | undefined;

    if (pIndex !== -1 && parts[pIndex + 1]) {
      type = "p";
      shortcode = parts[pIndex + 1];
    } else if (reelIndex !== -1 && parts[reelIndex + 1]) {
      type = "reel";
      shortcode = parts[reelIndex + 1];
    } else if (reelsIndex !== -1 && parts[reelsIndex + 1]) {
      // Map plural path to the singular embed endpoint
      type = "reel";
      shortcode = parts[reelsIndex + 1];
    }

    return type && shortcode
      ? `https://www.instagram.com/${type}/${shortcode}/embed/`
      : src;
  } catch {
    return src;
  }
}

export default function TheGoodProjectPage() {
  const t = useTranslations("nav.theGoodProject");
  const tJoin = useTranslations("joinTheGoodProject");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const instagramUrl = "https://www.instagram.com/p/C4_VE9Msk5K/";

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="container mx-auto px-4 py-12 pt-20 md:pt-28"
    >
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start mt-8">
        {/* Left Column: Content & Stats */}
        <div className="flex-1 w-full space-y-12">
          {/* Header Section */}
          <section className="text-center  space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-black font-header-en uppercase tracking-wider">
              {t("title")}
            </h1>
            <p
              className={`text-xl md:text-2xl leading-relaxed text-muted-foreground ${
                isRTL ? "font-body-ar" : "font-body-en"
              }`}
            >
              {t("description")}
            </p>
          </section>

          {/* Stats Section */}
          <section>
            <h2
              className={`text-4xl font-bold text-center md:text-start mb-10 ${
                isRTL ? "font-header-ar" : "font-header-en"
              }`}
            >
              {t("stats.title")}
            </h2>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <StatCard
                valueStr={t("stats.audienceVal")}
                label={t("stats.audienceLabel")}
                isRTL={isRTL}
                locale={locale}
              />
              <StatCard
                valueStr={t("stats.projectsVal")}
                label={t("stats.projectsLabel")}
                isRTL={isRTL}
                locale={locale}
              />
              <StatCard
                valueStr={t("stats.universitiesVal")}
                label={t("stats.universitiesLabel")}
                isRTL={isRTL}
                locale={locale}
              />
              <StatCard
                valueStr={t("stats.studentsVal")}
                label={t("stats.studentsLabel")}
                isRTL={isRTL}
                locale={locale}
              />
            </div>
          </section>
        </div>

        {/* Right Column: Instagram Embed */}
        <div className="w-full md:w-[300px] lg:w-[350px] sticky top-24 flex justify-center md:block">
          <iframe
            src={getInstagramEmbedUrl(instagramUrl)}
            className="w-full h-[500px] border rounded-xl shadow-2xl bg-white"
            frameBorder="0"
            scrolling="no"
            // @ts-expect-error: allowtransparency is required for instagram embed but not typed in React
            allowtransparency="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>

      {/* Join CTA */}
      <div className="mt-16 text-center">
        <Link href={`/${locale}/the-good-project/join`}>
          <Button className="bg-hot-pink hover:bg-hot-pink/90 text-white font-bold py-6 px-12 text-xl rounded-full transition-transform hover:scale-105 shadow-lg">
            {tJoin("title")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  valueStr,
  label,
  isRTL,
  locale,
}: {
  valueStr: string;
  label: string;
  isRTL?: boolean;
  locale: string;
}) {
  const { value, prefix, suffix } = parseLocalizedStat(valueStr);

  return (
    <Card className="text-center hover:shadow-xl transition-all duration-300 bg-card border-none shadow-md">
      <CardContent className="pt-6 pb-6 px-2 flex flex-col items-center justify-center h-full">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-hot-pink mb-4 font-header-en flex items-center justify-center flex-wrap gap-1">
          <Counter
            value={value}
            prefix={prefix}
            suffix={suffix}
            locale={locale}
          />
        </div>
        <div
          className={`text-lg sm:text-xl font-medium text-foreground ${
            isRTL ? "font-body-ar" : "font-body-en"
          }`}
        >
          {label}
        </div>
      </CardContent>
    </Card>
  );
}
