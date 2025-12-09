import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ArticleModel from "@/app/modals/articleModel";
import UserModel from "@/app/modals/userModel";
import InteractionsModel from "@/app/modals/interactionsModel";
import { ConnectDB } from "@/app/config/db";
import mongoose from "mongoose";

// POST - Add a reply to a comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; commentId: string }> }
) {
  try {
    await ConnectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { slug, commentId } = await params;
    const { text, parentId, parentType } = await request.json();

    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "Reply text is required" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // if (!user.isSubscribed) {
    //   return NextResponse.json(
    //     { error: "Subscription required to reply" },
    //     { status: 403 }
    //   );
    // }

    // Find the article
    const article = await ArticleModel.findOne({ slug });
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Find the comment in the article
    if (!article.comments) {
      return NextResponse.json({ error: "No comments found" }, { status: 404 });
    }

    const comment = article.comments.id
      ? article.comments.id(commentId)
      : article.comments.find(
          (c: any) => c._id && c._id.toString() === commentId
        );
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Create the reply object
    const newReply = {
      _id: new mongoose.Types.ObjectId(),
      userId: user._id,
      username: user.username || user.firstName,
      text: text,
      likes: [],
      createdAt: new Date(),
    };

    // Add reply to the comment
    if (!comment.replies) {
      comment.replies = [];
    }
    comment.replies.push(newReply);

    // Save the updated article
    await article.save();

    // Create interaction
    if (comment.userId.toString() !== user._id.toString()) {
      await InteractionsModel.create({
        userId: user._id,
        notifyUserId: comment.userId,
        broadcast: false,
        targetId: commentId,
        targetType: "comment",
        link: `/articles/${slug}#comment-${commentId}`,
        actionType: "reply",
        content: text,
        read: false,
        parentId: article._id,
        parentType: "article",
        replyId: newReply._id,
      });
    }

    return NextResponse.json({
      success: true,
      reply: newReply,
    });
  } catch (error: any) {
    console.error("Error adding reply:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
