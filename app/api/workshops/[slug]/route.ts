import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import WorkshopModel from "@/app/modals/workshopModel";

type Props = {
  params: Promise<{ slug: string }>;
};
export async function GET(req: Request, { params }: Props) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    // ensure slug exists
    if (!slug) {
       return NextResponse.json(
         { success: false, message: "Missing slug" },
         { status: 400 }
       );
    }
    const workshop = await WorkshopModel.findOne({ slug: slug });
    if (!workshop) {
      return NextResponse.json(
        { success: false, message: "Workshop not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: workshop });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
