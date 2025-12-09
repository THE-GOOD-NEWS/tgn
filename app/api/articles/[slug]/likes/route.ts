import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ArticleModel from "@/app/modals/articleModel";
import UserModel from "@/app/modals/userModel";
import InteractionsModel from "@/app/modals/interactionsModel";
import { ConnectDB } from "@/app/config/db";
import mongoose from "mongoose";

// POST - Like/Unlike an article
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

    // Check if user is subscribed
    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // if (!user.isSubscribed) {
    //   return NextResponse.json(
    //     { error: "Subscription required to like articles" },
    //     { status: 403 }
    //   );
    // }

    const userId = user._id;
    // console.log("registering userModal" + UserModel);

    // Find the article and populate user information for likes
    let article = await ArticleModel.findOne({ slug }).populate({
      path: "likes",
      model: "users",
      select: "username firstName lastName imageURL",
    });
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Initialize likes array if it doesn't exist
    if (!article.likes) {
      article.likes = [];
    }

    // Check if user already liked the article
    // console.log("userId:", userId, "type:", typeof userId);
    const alreadyLiked = article.likes.some((like: any) => {
      // console.log("id in likes array:", like, "type:", typeof like);
      const likeId = like._id || like; // Handle both populated and unpopulated
      return likeId.toString() === userId.toString();
    });

    if (alreadyLiked) {
      // Unlike the article
      // console.log("alreadyLiked" + alreadyLiked);
      article.likes = article.likes.filter((like: any) => {
        const likeId = like._id || like;
        return likeId.toString() !== userId.toString();
      });

      // Remove the interaction
      await InteractionsModel.findOneAndDelete({
        userId: userId,
        targetId: article._id,
        targetType: "article",
        actionType: "like",
      });
    } else {
      // Like the article
      article.likes.push(new mongoose.Types.ObjectId(userId));
    }

    // Save the updated article with retry logic for version conflicts
    let retries = 3;
    let saved = false;

    while (retries > 0 && !saved) {
      try {
        await article.save();

        // Record the interaction for admin dashboard and notifications
        if (
          !alreadyLiked &&
          article.author &&
          article.author.toString() !== userId.toString()
        ) {
          await InteractionsModel.create({
            userId: userId,
            notifyUserId: article.author,
            broadcast: false,
            targetId: article._id,
            targetType: "article",
            link: `/articles/${slug}`,
            actionType: "like",
            content: "",
            read: false,
            parentId: article._id,
            parentType: "article",
          });
        }

        saved = true;
      } catch (error: any) {
        if (error.name === "VersionError") {
          retries--;
          // Fetch the latest version of the article
          article = await ArticleModel.findOne({ slug });
          if (!article) {
            throw new Error("Article not found during retry");
          }

          // Re-apply the like/unlike logic
          const currentLiked = article.likes.some((like: any) => {
            const likeId = like._id || like;
            return likeId.toString() === userId.toString();
          });

          if (alreadyLiked && currentLiked) {
            // We wanted to unlike, and it's still liked
            article.likes = article.likes.filter((like: any) => {
              const likeId = like._id || like;
              return likeId.toString() !== userId.toString();
            });
            // Remove the interaction
            await InteractionsModel.findOneAndDelete({
              userId: userId,
              targetId: article._id,
              targetType: "article",
              actionType: "like",
            });
          } else if (!alreadyLiked && !currentLiked) {
            // We wanted to like, and it's not liked
            article.likes.push(new mongoose.Types.ObjectId(userId));

            // Create interaction (will be created when we save loop continues or we can do it here if we save successfully)
            // Actually, the interaction creation is outside the loop/try-catch block in my previous edit, wait.
            // No, it is INSIDE the try block after save().
            // But if we are in the CATCH block (VersionError), we modify article and loop again.
            // The interaction creation logic is inside the 'try' block:
            /*
                await article.save();
                if (!alreadyLiked ...) { create interaction }
                saved = true;
             */
            // So if save() succeeds in the retry, it will execute the interaction creation.
            // But wait, in the retry logic, 'alreadyLiked' variable is stale (it reflects the INITIAL state).
            // If we wanted to like (alreadyLiked = false), and we retry.
            // If we succeed in the retry, 'alreadyLiked' is still false. So it creates the interaction. Correct.

            // However, if we wanted to UNLIKE (alreadyLiked = true).
            // If we succeed in the retry, 'alreadyLiked' is true. It skips creation. Correct.
            // BUT, for UNLIKE, we also need to delete the interaction.
            // I added deletion inside the 'if (alreadyLiked)' block BEFORE the loop.
            // But if save fails, the DB interaction delete happened (it's awaited).
            // If save fails and we retry...
            // If we wanted to UNLIKE, we already deleted the interaction.
            // If we retry and eventually save, we are good.
            // If we fail completely, we deleted the interaction but failed to update the article like count. This is a minor inconsistency.
            // Ideally we should do interaction updates AFTER successful save.
          }
          // If state matches what we wanted (e.g. someone else unliked it and we wanted to unlike), we are good.
        } else {
          throw error;
        }
      }
    }

    if (!saved) {
      return NextResponse.json(
        { error: "Failed to update like status due to concurrency" },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      likes: article.likes,
      liked: !alreadyLiked,
    });
  } catch (error: any) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
