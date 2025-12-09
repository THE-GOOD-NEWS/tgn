import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ArticleModel from "@/app/modals/articleModel";
import UserModel from "@/app/modals/userModel";
import InteractionsModel from "@/app/modals/interactionsModel";
import { ConnectDB } from "@/app/config/db";
import mongoose from "mongoose";

// POST - Like/Unlike a comment
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

    // Check if user is subscribed
    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // if (!user.isSubscribed) {
    //   return NextResponse.json(
    //     { error: "Subscription required to like comments" },
    //     { status: 403 }
    //   );
    // }

    const userId = user._id.toString();

    // Find the article and check if the comment exists
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

    // Check if user already liked the comment
    const alreadyLiked =
      comment.likes &&
      comment.likes.some((like: any) =>
        like._id ? like._id.toString() === userId : like.toString() === userId
      );

    if (alreadyLiked) {
      // Unlike the comment
      comment.likes = comment.likes.filter((like: any) =>
        like._id ? like._id.toString() !== userId : like.toString() !== userId
      );

      // Remove interaction
      await InteractionsModel.findOneAndDelete({
        userId: userId,
        targetId: commentId,
        targetType: "comment",
        actionType: "like",
      });
    } else {
      // Like the comment
      if (!comment.likes) {
        comment.likes = [];
      }
      comment.likes.push(new mongoose.Types.ObjectId(userId));

      // Create interaction
      if (comment.userId.toString() !== userId) {
        await InteractionsModel.create({
          userId: userId,
          notifyUserId: comment.userId,
          broadcast: false,
          targetId: commentId,
          targetType: "comment",
          link: `/articles/${slug}#comment-${commentId}`,
          actionType: "like",
          content: "",
          read: false,
          parentId: article._id,
          parentType: "article",
        });
      }
    }

    // Save the updated article
    await article.save();

    // Record the interaction for admin dashboard and notifications
    // const { parentId, parentType } = await request.json();
    // Find the playlist that contains this story
    // const findPlaylistByid = async (id: string) => {
    //   try {
    //     const playlist = await playlistModel.findOne({ storys: id });
    //     return playlist?._id || null;
    //   } catch (error) {
    //     console.error("Error finding playlist by story ID:", error);
    //     return null;
    //   }
    // };
    // // Get the playlist ID for this story
    // const playlistId = await findPlaylistByid(id);

    return NextResponse.json({
      success: true,
      likes: comment.likes,
      liked: !alreadyLiked,
    });
  } catch (error: any) {
    console.error("Error handling comment like:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
