import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ArticleModel from "@/app/modals/articleModel";
import UserModel from "@/app/modals/userModel";
import { ConnectDB } from "@/app/config/db";

// GET - Get users who liked an article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await ConnectDB();
    const session = await getServerSession(authOptions);

    // if (!session?.user?.email) {
    //   return NextResponse.json(
    //     { error: "Authentication required" },
    //     { status: 401 }
    //   );
    // }

    const { slug } = await params;

    // Find the article
    const article = await ArticleModel.findOne({ slug });
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Get the user IDs who liked the article
    const likeUserIds = article.likes || [];

    if (likeUserIds.length === 0) {
      return NextResponse.json({
        success: true,
        users: [],
      });
    }

    // Find the users who liked the article
    const users = await UserModel.find(
      { _id: { $in: likeUserIds } },
      "username firstName lastName imageURL"
    );

    return NextResponse.json({
      success: true,
      users: users.map((user) => ({
        _id: user._id,
        username: user.username,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userImage: user.imageURL || "",
      })),
    });
  } catch (error: any) {
    console.error("Error getting users who liked article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}