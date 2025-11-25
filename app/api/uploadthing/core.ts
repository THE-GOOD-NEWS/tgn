import { createUploadthing, type FileRouter } from "uploadthing/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ConnectDB } from "@/app/config/db";
import UserModel from "@/app/modals/userModel";

const f = createUploadthing();

export const fileRouter = {
  avatar: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) throw new Error("unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await ConnectDB();
      await UserModel.findByIdAndUpdate(metadata.userId, { imageURL: file.url });
    }),
} satisfies FileRouter;

export type FileRouterType = typeof fileRouter;
