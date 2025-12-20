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
  cvUploader: f({ pdf: { maxFileSize: "8MB", maxFileCount: 1 }, text: { maxFileSize: "2MB", maxFileCount: 1 }, blob: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async () => {
      // Public upload for now, or you can add auth check if needed
      return { uploadedBy: "guest" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("CV Uploaded by", metadata.uploadedBy, file.url);
      return { url: file.url };
    }),
  newsMedia: f({ image: { maxFileSize: "16MB", maxFileCount: 5 }, video: { maxFileSize: "64MB", maxFileCount: 1 } })
    .middleware(async () => {
      return { uploadedBy: "guest" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("News Media Uploaded by", metadata.uploadedBy, file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type FileRouterType = typeof fileRouter;
