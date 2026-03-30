import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import WorkshopModel from "@/app/modals/workshopModel";
import WorkshopAttendanceRequestModel from "@/app/modals/workshopAttendanceRequestModel";

type Props = {
  params: Promise<{ slug: string }>;
};
export async function GET(req: Request, { params }: Props) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    if (!slug) {
       return NextResponse.json(
         { success: false, message: "Missing slug" },
         { status: 400 }
       );
    }
    const workshop = (await WorkshopModel.findOne({ slug: slug }).lean()) as any;
    if (!workshop) {
      return NextResponse.json(
        { success: false, message: "Workshop not found" },
        { status: 404 }
      );
    }

    // Fetch counts of pending "available" requests for this workshop
    const pendingCount = await WorkshopAttendanceRequestModel.countDocuments({
      workshopId: workshop._id,
      status: "pending",
      type: "available"
    });

    return NextResponse.json({ 
      success: true, 
      data: { ...workshop, pendingRequests: pendingCount } 
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: Props) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ success: false, message: "Missing slug" }, { status: 400 });
    }

    const workshop = await WorkshopModel.findOneAndUpdate(
      { slug: slug },
      { $inc: { visits: 1 } },
      { new: true }
    );

    if (!workshop) {
      return NextResponse.json({ success: false, message: "Workshop not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { visits: workshop.visits } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
