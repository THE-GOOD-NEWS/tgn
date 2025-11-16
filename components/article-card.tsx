"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Article } from "@/lib/articles-data";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, User } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const locale = useLocale();
  const t = useTranslations("articles");
  const isRTL = locale === "ar";

  // Get locale-specific content
  const title =
    typeof article.title === "string"
      ? article.title
      : article.title[locale as "en" | "ar"];
  const excerpt =
    typeof article.excerpt === "string"
      ? article.excerpt
      : article.excerpt[locale as "en" | "ar"];
  const category =
    typeof article.category === "string"
      ? article.category
      : article.category[locale as "en" | "ar"];
  // const author =
  //   typeof article.author === "string"
  //     ? article.author
  //     : article.author[locale as "en" | "ar"];
  const readTime =
    typeof article.readTime === "string"
      ? article.readTime
      : article.readTime[locale as "en" | "ar"];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link href={`/${locale}/articles/${article.slug}`} className="block group">
      <article className="h-[400px] md:h-[350px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
          {/* Left: Image and Branding */}
          <div className="relative bg-[#F7EEDB] min-h-[200px] md:min-h-full">
            {article.featuredImage ? (
              <Image
                src={article.featuredImage}
                alt={title}
                fill
                className="object-cover md:object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full min-h-[220px] md:min-h-[200px] bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
                <span className="text-5xl text-white/80">📰</span>
              </div>
            )}
            {/* {article.isExclusive && (
              <div className="md:hidden absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full border-0 shadow">
                  {t("exclusive")}
                </Badge>
              </div>
            )} */}

            {/* Soft divider to mimic the central split */}
            <div className="absolute inset-y-0 right-0 w-1 bg-white/60" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full border-0 shadow">
                {category}
              </Badge>
            </div>
          </div>

          {/* Right: Title, excerpt, meta, CTA */}
          <div className="relative bg-white max-md:py-2 max-md:px-4 md:p-8 flex flex-col justify-between">
            <div className="flex-1">
              {/* Date + Read time */}
              <div className="flex items-center gap-1 md:gap-3 text-xs text-gray-500">
                <time className="font-medium">
                  {formatDate(article.publishedAt)}
                </time>
                <span className="w-px h-3 bg-gray-300" />
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User className="h-4 w-4" />
                  <span>
                    {[article.author?.firstName, article.author?.lastName]
                      .filter(Boolean)
                      .join(" ") ||
                      article.author?.username ||
                      "Unknown Author"}
                  </span>
                </div>
                {/* <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{readTime}</span>
                </div> */}
              </div>

              {/* Big title styling akin to the attachment */}
              <h3
                className={`max-md:mt-1 mt-3 text-lg md:text-xl font-extrabold leading-tight tracking-tight h-12 md:h-14 overflow-hidden ${
                  isRTL
                    ? "font-header-ar text-right"
                    : "font-header-en text-left"
                }`}
              >
                {title}
              </h3>

              {/* Sub message/excerpt */}
              <p
                className={` text-xs md:text-sm line-clamp-3 md:line-clamp-5 leading-relaxed ${
                  isRTL ? "font-body-ar text-right" : "font-body-en text-left"
                } text-purple-600`}
              >
                {excerpt}
              </p>
            </div>

            {/* Body copy (optional long text cut) */}
            {/* <p
              className={`mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3 ${
                isRTL ? "font-body-ar text-right" : "font-body-en text-left"
              }`}
            >
              {excerpt}
            </p> */}

            {/* Author */}
            {/* <div className="mt-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-sm font-bold text-white">
                  {author.charAt(0).toUpperCase()}
                </span>
              </div>
              <p
                className={`text-sm font-semibold text-gray-900 ${
                  isRTL ? "font-body-ar text-right" : "font-body-en text-left"
                }`}
              >
                {author}
              </p>
            </div> */}

            {/* Exclusive badge top-right */}
            {/* {article.isExclusive && (
              <div className="max-md:hidden absolute top-6 right-6">
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full border-0 shadow">
                  {t("exclusive")}
                </Badge>
              </div>
            )} */}
          </div>
        </div>

        {/* Bottom section with logo and CTA */}
        <div className="bg-gray-50 border-t border-gray-100 px-6  md:py-3 flex items-center justify-between flex-shrink-0">
          {/* Logo section */}
          <div className="flex items-center gap-2">
            <Image
              src="/logos/TGN_LOGOS_PNG-03.png"
              alt="TGN"
              width={64}
              height={24}
              className="object-contain"
            />
          </div>

          {/* CTA section */}
          <div className="flex items-center gap-2 text-gray-900 group-hover:text-purple-600 transition-colors">
            <span className="text-sm font-semibold">{t("readMore")}</span>
            <ArrowRight
              className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${
                isRTL ? "rotate-180 group-hover:-translate-x-1" : ""
              }`}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
