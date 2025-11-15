import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { connectToDatabase } from "@/utils/mongodb";
import ArticleModel from "@/app/modals/articleModel";

interface PopulatedArticle {
  _id: string;
  title: string;
  titleAR?: string;
  slug: string;
  content?: string;
  blocks?: Array<{
    type: "text" | "image" | "imageText";
    textHtml?: string;
    imageUrl?: string;
    caption?: string;
    alt?: string;
    layout?: "img-left" | "img-block";
    arabicContent?: string;
  }>;
  excerpt: string;
  excerptAR?: string;
  featuredImage?: string;
  author?: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
  categories: Array<{
    titleEn: string;
    titleAr: string;
    slug: string;
  }>;
  publishedAt?: Date;
  viewCount: number;
  featured: boolean;
  readingTime?: number;
}

async function getArticle(slug: string): Promise<PopulatedArticle | null> {
  try {
    await connectToDatabase();

    const article = await ArticleModel.findOne({
      slug,
      status: "published",
    })
      .populate("categories", "titleEn titleAr slug")
      .populate("author", "firstName lastName username");
    // .lean({ virtuals: true });

    if (!article) {
      return null;
    }
    return article as PopulatedArticle;
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return null;
  }
}

function renderContentBlocks(
  blocks: PopulatedArticle["blocks"],
  locale: string
) {
  if (!blocks || blocks.length === 0) return null;

  return blocks.map((block, index) => {
    const content =
      locale === "ar" && block.arabicContent
        ? block.arabicContent
        : block.textHtml || "";

    switch (block.type) {
      case "text":
        return (
          <div
            key={index}
            className="prose prose-lg max-w-none text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      case "image":
        return (
          <div key={index} className="my-8">
            {block.imageUrl && (
              <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
                <Image
                  src={block.imageUrl}
                  alt={block.alt || "Article image"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {block.caption && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                {block.caption}
              </p>
            )}
          </div>
        );
      case "imageText":
        const isRtl = locale === "ar";
        const layout = block.layout === "img-left" ? "img-left" : "img-block";

        if (layout === "img-left" && block.imageUrl) {
          return (
            <div
              dir={isRtl ? "rtl" : "ltr"}
              key={index}
              className={`flex flex-col-reverse md:flex-row gap-6 my-8 ${
                isRtl ? "" : ""
              }`}
            >
              <div
                className="md:w-1/2 prose prose-lg text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <div className="md:w-1/2">
                {block.caption && (
                  <p
                    className={`text-sm w-full ${
                      isRtl ? "text-right" : "text-left"
                    } text-muted-foreground mt-2`}
                  >
                    {block.caption}
                  </p>
                )}

                <div className="relative w-full h-64 rounded-xl overflow-hidden">
                  <Image
                    src={block.imageUrl}
                    alt={block.alt || "Article image"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          );
        }

        // img-block layout
        return (
          <div key={index} className="my-8">
            {block.imageUrl && (
              <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-4">
                <Image
                  src={block.imageUrl}
                  alt={block.alt || "Article image"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {block.caption && (
              <p className="text-sm text-muted-foreground text-center mb-4">
                {block.caption}
              </p>
            )}
            {/* <div
              className="prose prose-lg max-w-none text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            /> */}
          </div>
        );
      default:
        return null;
    }
  });
}

export default async function ArticlePage({ params }: any) {
  const { locale, slug } = params;
  const t = await getTranslations("common");

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const isArabic = locale === "ar";
  const title = isArabic && article.titleAR ? article.titleAR : article.title;
  const excerpt =
    isArabic && article.excerptAR ? article.excerptAR : article.excerpt;

  return (
    <div
      className="min-h-screen pt-28 bg-gradient-to-br from-cream/20 to-hot-pink/10"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href={`/${locale}/articles`}
          className="inline-flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className={`h-4 w-4 ${isArabic ? "rotate-180" : ""}`} />
          <span>{t("back")}</span>
        </Link>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
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
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Calendar className="h-4 w-4" />
                <span>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not published"}
                </span>
              </div>
              {/* <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Clock className="h-4 w-4" />
                <span>{article.readingTime} min read</span>
              </div> */}
              {/* <button className="flex items-center space-x-2 rtl:space-x-reverse hover:text-hot-pink transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button> */}
            </div>
          </div>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
              <Image
                src={article.featuredImage}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {excerpt}
            </div>

            {/* Article Body (blocks only) */}
            <div className="space-y-6">
              {article.blocks && article.blocks.length > 0 ? (
                renderContentBlocks(article.blocks, locale)
              ) : (
                <p className="text-muted-foreground">
                  {isArabic ? "لا يوجد محتوى متاح." : "No content available."}
                </p>
              )}
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm text-muted-foreground">
                  {isArabic ? "الفئة:" : "Category:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {article.categories.map((category) => (
                    <span
                      key={category.slug}
                      className="px-3 py-1 bg-hot-pink/10 text-hot-pink rounded-full text-sm font-medium"
                    >
                      {isArabic ? category.titleAr : category.titleEn}
                    </span>
                  ))}
                </div>
              </div>

              {/* <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button className="text-sm text-muted-foreground hover:text-hot-pink transition-colors">
                  {isArabic ? "إعجاب" : "Like"}
                </button>
                <button className="text-sm text-muted-foreground hover:text-hot-pink transition-colors">
                  {isArabic ? "تعليق" : "Comment"}
                </button>
                <button className="text-sm text-muted-foreground hover:text-hot-pink transition-colors">
                  {isArabic ? "مشاركة" : "Share"}
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
