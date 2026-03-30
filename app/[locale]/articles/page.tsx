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
import UserModel from "@/app/modals/userModel";
import { ArticlesPagination } from "@/components/articles-pagination";
import categoriesModel from "@/app/modals/bannersModel";

export default async function ArticlesPage({ params, searchParams }: any) {
  const locale = params.locale;
  const t = await getTranslations("articles");
  const isRTL = locale === "ar";
  const categoryParam = searchParams?.category || null;
  const page = Number(searchParams?.page) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;

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

  const query = {
    status: "published",
    ...(categoryFilterId ? { categories: categoryFilterId } : {}),
  };

  const totalArticles = await ArticleModel.countDocuments(query);
  const totalPages = Math.ceil(totalArticles / limit);
  console.log("registering" + UserModel + ArticleCategoryModel);
  const articlesFromDb = await ArticleModel.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("categories", "titleEn titleAr slug")
    .populate("author", "firstName lastName username email")
    .lean({ virtuals: true });

  const articles: Article[] = (articlesFromDb || []).map((a: any) => {
    const firstCategory =
      Array.isArray(a.categories) && a.categories.length > 0
        ? a.categories[0]
        : null;
    const categoryEn = firstCategory ? firstCategory.titleEn : "General";
    const categoryAr = firstCategory ? firstCategory.titleAr : "عام";
    const readTimeNum = a.readingTime || 1;
    const authorObj = a.author
      ? {
          firstName: a.author.firstName || "",
          lastName: a.author.lastName || "",
          username: a.author.username || "",
          email: a.author.email || "",
        }
      : undefined;
    return {
      id: a._id?.toString?.() || a._id,
      title: { en: a.title, ar: a.titleAR || a.title },
      slug: a.slug,
      excerpt: { en: a.excerpt || "", ar: a.excerptAR || a.excerpt || "" },
      category: { en: categoryEn, ar: categoryAr },
      author: authorObj,
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
      <Navigation />

      <main className="min-h-screen pt-20">
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

        <section className="">
          <div className="container mx-auto px-4">
            <ArticlesGrid articles={articles} />
          </div>
        </section>

        {totalPages > 1 && (
          <section className="py-8 bg-mint-green">
            <div className="container mx-auto px-4">
              <ArticlesPagination
                currentPage={page}
                totalPages={totalPages}
                category={categoryParam}
                locale={locale}
                isRTL={isRTL}
                prevLabel={t("prevPage")}
                nextLabel={t("nextPage")}
              />
            </div>
          </section>
        )}
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
