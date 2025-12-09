import { NextResponse } from "next/server";
import { ConnectDB } from "@/app/config/db";
import ArticleModel from "@/app/modals/articleModel";
import InteractionsModel from "@/app/modals/interactionsModel";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string; commentId: string }> }
) {
  try {
    // Connect to database
    await ConnectDB();

    // Get the current user session
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { slug, commentId } = await params;

    // Validate IDs
    if (
      // !mongoose.Types.ObjectId.isValid(id) || // slug is string
      !mongoose.Types.ObjectId.isValid(commentId)
    ) {
      return NextResponse.json(
        { error: "Invalid comment ID" },
        { status: 400 }
      );
    }

    // Find the article
    const article = await ArticleModel.findOne({ slug });
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Find the comment
    const comment = article.comments.find(
      (c: any) => c._id.toString() === commentId
    );

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== userId && session.user.role !== "admin") {
      return NextResponse.json(
        { error: "You can only delete your own comments" },
        { status: 403 }
      );
    }

    // Delete the comment from the article
    // Using pull on the array and save() is one way, or findOneAndUpdate
    // Since we already have article, we can use findOneAndUpdate on the model with the article._id

    await ArticleModel.findByIdAndUpdate(article._id, {
      $pull: { comments: { _id: new mongoose.Types.ObjectId(commentId) } },
    });

    // Delete all interactions related to this comment (creation, likes, replies)
    await InteractionsModel.deleteMany({
      targetId: commentId,
    });

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
