import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import ArticleCategoryModel from "@/app/modals/articleCategoryModel";

export async function GET() {
  try {
    await connectToDatabase();

    const categories = await ArticleCategoryModel.find({ status: "active" })
      .select("slug titleEn titleAr")
      // .sort({ titleEn: 1 })
      .lean();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Failed to fetch article categories:", error);
    return NextResponse.json(
      { error: "Failed to load categories" },
      { status: 500 }
    );
  }
}
