import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ArticleModel from "@/app/modals/articleModel";
import UserModel from "@/app/modals/userModel";
import InteractionsModel from "@/app/modals/interactionsModel";
import { ConnectDB } from "@/app/config/db"; // Corrected path based on project structure

// GET - Get all comments for an article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await ConnectDB();

    // Find the article with populated user data
    const article = await ArticleModel.findOne({ slug })
      .populate({
        path: "comments.userId",
        model: "users", // Model name string matching UserModel definition
        select: "username firstName lastName imageURL", // matched fields from User interface
        options: { strictPopulate: false },
      })
      .populate({
        path: "comments.likes",
        model: "users",
        select: "username firstName lastName imageURL",
        options: { strictPopulate: false },
      })
      .populate({
        path: "comments.replies.userId",
        model: "users",
        select: "username firstName lastName imageURL",
        options: { strictPopulate: false },
      })
      .populate({
        path: "comments.replies.likes",
        model: "users",
        select: "username firstName lastName imageURL",
        options: { strictPopulate: false },
      })
      .lean();

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Transform populated data to maintain API compatibility
    const articleData = article as any; // Type assertion to access comments
    // First map comments to add user details
    const mappedComments = (articleData.comments || []).map((comment: any) => {
      const userData = comment.userId || {};

      // Process replies to add user details and sort by createdAt
      const repliesWithUserDetails = (comment.replies || [])
        .map((reply: any) => {
          const replyUserData = reply.userId || {};
          return {
            ...reply,
            userImage: replyUserData.imageURL || "", // Changed from profilePicture to imageURL
            firstName: replyUserData.firstName || "",
            lastName: replyUserData.lastName || "",
            // Keep userId as a string reference for backward compatibility
            userId: reply.userId?._id?.toString() || reply.userId,
          };
        })
        // Sort replies by createdAt date (newest first)
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      return {
        ...comment,
        userImage: userData.imageURL || "", // Changed from profilePicture to imageURL
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        // Keep userId as a string reference for backward compatibility
        userId: comment.userId?._id?.toString() || comment.userId,
        // Replace replies with the processed and sorted ones
        replies: repliesWithUserDetails,
      };
    });

    // Then sort the comments by createdAt date (newest first)
    const commentsWithUserDetails = mappedComments.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      comments: commentsWithUserDetails || [],
    });
  } catch (error: any) {
    console.error("Error getting article comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST - Add a new comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
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

    const { slug } = await params;
    const { text, parentId, parentType } = await request.json();

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: "Comment text is required" },
        { status: 400 }
      );
    }

    // Check if user is subscribed (optional based on requirements, commented out in original)
    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the article
    const article = await ArticleModel.findOne({ slug });
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const newComment = {
      userId: user._id,
      username: user.username || user.firstName || "User",
      text: text.trim(),
      likes: [],
      replies: [],
      createdAt: new Date(),
    };

    // Add comment to article
    if (!article.comments) {
      article.comments = [];
    }
    article.comments.push(newComment);
    await article.save();

    const savedCommentId = article.comments[article.comments.length - 1]._id;

    // Create interaction
    if (article.author && article.author.toString() !== user._id.toString()) {
      await InteractionsModel.create({
        userId: user._id,
        notifyUserId: article.author,
        broadcast: false,
        targetId: savedCommentId,
        targetType: "comment",
        link: `/articles/${slug}#comment-${savedCommentId}`,
        actionType: "comment",
        content: text.trim(),
        read: false,
        parentId: article._id,
        parentType: "article",
      });
    }

    // Return the new comment with user details
    const responseComment = {
      ...newComment,
      _id: savedCommentId,
      userImage: user.imageURL || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      userId: user._id.toString(),
    };

    return NextResponse.json({
      success: true,
      comment: responseComment,
      message: "Comment added successfully",
    });
  } catch (error: any) {
    console.error("Error posting comment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
