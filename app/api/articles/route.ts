import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import ArticleModel from "@/app/modals/articleModel";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const featuredParam = searchParams.get("featured");
    const limitParam = searchParams.get("limit");

    const limit = Math.max(1, Math.min(50, parseInt(limitParam || "4", 10)));

    const query: any = { status: "published" };
    if (featuredParam === "true") {
      query.featured = true;
    }

    const articles = await ArticleModel.find(query)
      .populate("categories", "titleEn titleAr slug")
      .populate("author", "firstName lastName username email")
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit);

    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load articles" }, { status: 500 });
  }
}