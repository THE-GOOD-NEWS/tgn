import { NextResponse } from "next/server";
import ArticleModel from "@/app/modals/articleModel";
import UserModel from "@/app/modals/userModel";
import InteractionsModel from "@/app/modals/interactionsModel";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ConnectDB } from "@/app/config/db";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string; commentId: string; replyId: string }>;
  }
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
    const userRole = session.user.role;
    const { slug, commentId, replyId } = await params;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(commentId) ||
      !mongoose.Types.ObjectId.isValid(replyId)
    ) {
      return NextResponse.json(
        { error: "Invalid comment or reply ID" },
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

    // Find the reply
    const reply = comment.replies.find(
      (r: any) => r._id.toString() === replyId
    );

    if (!reply) {
      return NextResponse.json({ error: "Reply not found" }, { status: 404 });
    }

    // Check if the user is the owner of the reply or has admin role
    if (reply.userId.toString() !== userId && userRole !== "admin") {
      return NextResponse.json(
        { error: "You can only delete your own replies" },
        { status: 403 }
      );
    }

    // Delete the reply from the comment
    await ArticleModel.updateOne(
      {
        _id: article._id,
        "comments._id": new mongoose.Types.ObjectId(commentId),
      },
      {
        $pull: {
          "comments.$.replies": { _id: new mongoose.Types.ObjectId(replyId) },
        },
      }
    );

    // Delete the interaction record
    await InteractionsModel.deleteMany({
      targetType: "comment", // The original interaction was "comment" target with "reply" action
      actionType: "reply",
      targetId: commentId,
      userId: userId,
      replyId: replyId,
    });

    // Or more simply delete by replyId if it was stored as targetId in some context,
    // but based on reply creation code:
    /*
      await InteractionsModel.create({
        ...
        targetId: commentId,
        targetType: "comment",
        actionType: "reply",
        replyId: newReply._id,
        ...
      });
    */
    // So deleting by replyId field is correct.

    // Also delete any interactions related to this reply (likes on the reply)
    await InteractionsModel.deleteMany({
      targetType: "reply",
      targetId: replyId,
    });

    return NextResponse.json(
      { message: "Reply deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting reply:", error);
    return NextResponse.json(
      { error: "Failed to delete reply" },
      { status: 500 }
    );
  }
}
