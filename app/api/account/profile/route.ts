import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ConnectDB } from "@/app/config/db";
import UserModel from "@/app/modals/userModel";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const updates: Record<string, any> = {};

    if (typeof body.firstName === "string") updates.firstName = body.firstName.trim();
    if (typeof body.lastName === "string") updates.lastName = body.lastName.trim();
    if (typeof body.imageURL === "string") updates.imageURL = body.imageURL.trim();

    if (!Object.keys(updates).length) {
      return NextResponse.json({ error: "no_updates" }, { status: 400 });
    }

    await ConnectDB();
    await UserModel.findByIdAndUpdate(session.user.id, { $set: updates });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
