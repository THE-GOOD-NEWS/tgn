"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { ArticleCard } from "@/components/article-card";
import { Article } from "@/lib/articles-data";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const ArticlesSection = () => {
  const t = useTranslations("articles");
  const locale = useLocale();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const isRTL = locale === "ar";

  const [featuredArticles, setFeaturedArticles] = React.useState<Article[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`/api/articles?featured=true&limit=4`, {
          cache: "no-store",
        });
        const data = await res.json();
        const mapped: Article[] = (data.articles || []).map((a: any) => {
          const published = a?.publishedAt || a?.createdAt;
          const rt = a?.readingTime || 5;
          const firstCategory =
            Array.isArray(a?.categories) && a.categories.length > 0
              ? a.categories[0]
              : null;
          return {
            id: (a?._id?.toString?.() as string) || a?.id || a?.slug,
            title: { en: a?.title || "", ar: a?.titleAR || a?.title || "" },
            slug: a?.slug || "",
            excerpt: {
              en: a?.excerpt || "",
              ar: a?.excerptAR || a?.excerpt || "",
            },
            category: {
              en: firstCategory?.titleEn || "",
              ar: firstCategory?.titleAr || "",
            },
            author: a?.author ?? {},
            publishedAt: published,
            featuredImage: a?.featuredImage || undefined,
            isExclusive: !!a?.featured,
            readTime: { en: `${rt} min read`, ar: `${rt} دقائق قراءة` },
          } as Article;
        });
        setFeaturedArticles(mapped);
      } catch (e) {
        setFeaturedArticles([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-16 bg-mint-green">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 ${
              isRTL ? "font-header-ar" : "font-header-en"
            }`}
          >
            {t("featured")}
          </h2>
          <p
            className={`text-gray-600 text-lg max-w-2xl mx-auto ${
              isRTL ? "font-body-ar" : "font-body-en"
            }`}
          >
            {t("subFeatured")}
          </p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          dir={isRTL ? "rtl" : "ltr"}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 mb-12"
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                >
                  <div className="h-[400px] w-full md:h-[350px] rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative bg-[#F7EEDB] min-h-[200px] md:min-h-full">
                        <Skeleton className="absolute inset-0" />
                        <div className="absolute top-4 left-4">
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <div className="absolute inset-y-0 right-0 w-1 bg-white/60" />
                      </div>
                      <div className="bg-white max-md:py-2 max-md:px-4 md:p-8 flex flex-col justify-between">
                        <div className="space-y-3">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-8 w-3/4" />
                          <Skeleton className="h-16 w-full" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 border-t border-gray-100 px-6 md:py-3 flex items-center justify-between">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </motion.div>
              ))
            : featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                >
                  <ArticleCard article={article} index={index} />
                </motion.div>
              ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button
            asChild
            className={`bg-hot-pink text-white hover:bg-hot-pink-dark transition-all duration-300 px-8 py-3 rounded-full text-lg font-medium ${
              isRTL ? "font-arabic-subheading" : "font-english-subheading"
            }`}
          >
            <Link href={`/${locale}/articles`}>{t("viewAll")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;
