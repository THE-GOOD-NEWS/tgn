import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import WorkshopModel from "@/app/modals/workshopModel";
import WorkshopAttendanceRequestModel from "@/app/modals/workshopAttendanceRequestModel";

export async function GET() {
  try {
    await connectToDatabase();
    const workshops = await WorkshopModel.find({}).sort({ startDate: 1 }).lean();
    
    // Fetch counts of pending "available" requests for each workshop
    const workshopsWithPending = await Promise.all(
      workshops.map(async (ws: any) => {
        const pendingCount = await WorkshopAttendanceRequestModel.countDocuments({
          workshopId: ws._id,
          status: "pending",
          type: "available"
        });
        return { ...ws, pendingRequests: pendingCount };
      })
    );

    return NextResponse.json({ success: true, data: workshopsWithPending });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
