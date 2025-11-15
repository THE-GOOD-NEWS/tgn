import React from "react";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArticlesGrid } from "@/components/articles-grid";
import { Article } from "@/lib/articles-data";
import { connectToDatabase } from "@/utils/mongodb";
import ArticleModel from "@/app/modals/articleModel";
import ArticleCategoryModel from "@/app/modals/articleCategoryModel";
import mongoose from "mongoose";

export default async function ArticlesPage({ params, searchParams }: any) {
  const locale = params.locale;
  const t = await getTranslations("articles");
  const isRTL = locale === "ar";
  const categoryParam = searchParams?.category || null;

  await connectToDatabase();
  let categoryDisplay: string | null = null;
  let categoryFilterId: mongoose.Types.ObjectId | null = null;
  if (categoryParam && categoryParam !== "all") {
    const normalized = slugify(categoryParam);
    let categoryDoc: any = null;
    if (mongoose.Types.ObjectId.isValid(categoryParam)) {
      categoryDoc = await ArticleCategoryModel.findById(categoryParam).lean();
    }
    if (!categoryDoc) {
      categoryDoc = await ArticleCategoryModel.findOne({
        slug: normalized,
      }).lean();
    }
    if (categoryDoc) {
      categoryFilterId = categoryDoc._id as mongoose.Types.ObjectId;
      categoryDisplay =
        locale === "ar" ? categoryDoc.titleAr : categoryDoc.titleEn;
    } else {
      categoryDisplay = humanizeSlug(categoryParam);
    }
  }

  const articlesFromDb = await ArticleModel.find({
    status: "published",
    ...(categoryFilterId ? { categories: categoryFilterId } : {}),
  })
    .sort({ publishedAt: -1 })
    .populate("categories", "titleEn titleAr slug")
    .populate("author", "firstName lastName userName email")
    .lean({ virtuals: true });

  const articles: Article[] = (articlesFromDb || []).map((a: any) => {
    const firstCategory =
      Array.isArray(a.categories) && a.categories.length > 0
        ? a.categories[0]
        : null;
    const categoryEn = firstCategory ? firstCategory.titleEn : "General";
    const categoryAr = firstCategory ? firstCategory.titleAr : "عام";
    const authorName = a.author?.firstName || "Unknown";
    const readTimeNum = a.readingTime || 1;
    return {
      id: a._id?.toString?.() || a._id,
      title: { en: a.title, ar: a.titleAR || a.title },
      slug: a.slug,
      excerpt: { en: a.excerpt || "", ar: a.excerptAR || a.excerpt || "" },
      category: { en: categoryEn, ar: categoryAr },
      author: { en: authorName, ar: authorName },
      publishedAt:
        (a.publishedAt || a.createdAt)?.toISOString?.() ||
        new Date().toISOString(),
      featuredImage: a.featuredImage,
      isExclusive: !!a.featured,
      readTime: {
        en: `${readTimeNum} min read`,
        ar: `${readTimeNum} دقائق قراءة`,
      },
    };
  });

  return (
    <div className="bg-cream">
      <Navigation isLoggedIn={false} userRole={"user"} />

      <main className="min-h-screen pt-20">
        {/* Page Header */}
        <section className="pt-16 pb-8 bg-mint-green">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1
                className={`text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 ${
                  isRTL ? "font-header-ar" : "font-header-en"
                }`}
              >
                {categoryDisplay ?? t("title")}
              </h1>
              <p
                className={`text-gray-600 text-xl max-w-3xl mx-auto ${
                  isRTL ? "font-arabic-subheading" : "font-english-subheading"
                }`}
              >
                {t("headerSubtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid (filtered by category via searchParams) */}
        <section className="">
          <div className="container mx-auto px-4">
            <ArticlesGrid articles={articles} />
          </div>
        </section>

        {/* Load More Section */}
        <section className="py-8 bg-mint-green">
          <div className="container mx-auto px-4 text-center">
            <div>
              <p
                className={`text-gray-600 text-lg mb-4 ${
                  isRTL ? "font-body-ar" : "font-body-en"
                }`}
              >
                {t("moreComing")}
              </p>
              <div className="w-16 h-1 bg-black mx-auto"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function slugify(text: string) {
  return text.toString().trim().toLowerCase().replace(/\s+/g, "-");
}

function humanizeSlug(slug: string) {
  return slug
    .toString()
    .trim()
    .replace(/[-_]+/g, " ")
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

// Client-side filtered sample articles removed; now using DB-backed fetch above
