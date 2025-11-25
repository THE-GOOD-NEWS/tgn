import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ConnectDB } from "@/app/config/db";
import UserModel from "@/app/modals/userModel";
import ArticleModel from "@/app/modals/articleModel";

// GET: Return the user's recently read articles
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    await ConnectDB();
    const user = await UserModel.findById(session.user.id, {
      recentlyReadArticles: 1,
      _id: 0,
    });

    const list = (user?.recentlyReadArticles || []).sort(
      (a: any, b: any) =>
        new Date(b.readAt).getTime() - new Date(a.readAt).getTime()
    );

    const ids = list.map((i: any) => i.articleId).filter(Boolean);
    const articles = await ArticleModel.find({ _id: { $in: ids } })
      .populate("author", "firstName lastName username email")
      .populate("categories", "titleEn titleAr slug")
      .select(
        "title titleAR excerpt excerptAR slug featuredImage author categories publishedAt"
      )
      .lean();

    const byId = new Map<string, any>();
    for (const a of articles) {
      byId.set(String(a._id), a);
    }

    const items = list.map((entry: any) => {
      const a = byId.get(String(entry.articleId));
      return {
        readAt: entry.readAt,
        article: a
          ? {
              id: String(a._id),
              title: { en: a.title, ar: a.titleAR || a.title },
              slug: a.slug,
              excerpt: { en: a.excerpt, ar: a.excerptAR || a.excerpt },
              category: {
                en: a.categories?.[0]?.titleEn || "",
                ar: a.categories?.[0]?.titleAr || "",
              },
              author: a.author
                ? {
                    firstName: a.author.firstName,
                    lastName: a.author.lastName,
                    username: a.author.username,
                    email: a.author.email,
                  }
                : undefined,
              publishedAt: a.publishedAt
                ? new Date(a.publishedAt).toISOString()
                : new Date(entry.readAt).toISOString(),
              featuredImage: a.featuredImage,
              isExclusive: false,
              readTime: { en: "", ar: "" },
            }
          : {
              id: String(entry.articleId),
              title: { en: entry.title, ar: entry.title },
              slug: entry.slug,
              excerpt: { en: entry.excerpt || "", ar: entry.excerpt || "" },
              category: { en: "", ar: "" },
              author: undefined,
              publishedAt: new Date(entry.readAt).toISOString(),
              featuredImage: entry.featuredImage,
              isExclusive: false,
              readTime: { en: "", ar: "" },
            },
      };
    });

    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

// POST: Add the current article to the user's recently read list
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { slug } = await req.json();
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "invalid_slug" }, { status: 400 });
    }

    await ConnectDB();
    const article = await ArticleModel.findOne({
      slug,
      status: "published",
    }).lean();
    if (!article) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const user = await UserModel.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "user_not_found" }, { status: 404 });
    }

    const newItem = {
      articleId: article._id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      featuredImage: article.featuredImage,
      readAt: new Date(),
    } as any;

    // Remove any existing entry for this slug
    const existing = (user.recentlyReadArticles || []).filter(
      (x: any) => x.slug !== newItem.slug
    );

    // Prepend and cap at 20 items
    user.recentlyReadArticles = [newItem, ...existing].slice(0, 20) as any;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
