import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import ArticleModel from "@/app/modals/articleModel";

export async function GET(
  request: any,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const article = await ArticleModel.findOne({
      slug: slug,
      status: "published",
    })
      .populate("categories", "titleEn titleAr slug")
      .populate("author", "firstName lastName username email")
      .lean();

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return NextResponse.json(
      { error: "Failed to load article" },
      { status: 500 }
    );
  }
}
