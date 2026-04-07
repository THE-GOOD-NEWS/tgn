import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import WorkshopPackageModel, {
  IWorkshopPackage,
} from "@/app/modals/workshopPackageModel";
import WorkshopModel from "@/app/modals/workshopModel";
import WorkshopAttendanceRequestModel from "@/app/modals/workshopAttendanceRequestModel";
import WorkshopPackageRequestModel from "@/app/modals/workshopPackageRequestModel";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectToDatabase();
    const paramsData = await params;
    const pkg = await WorkshopPackageModel.findOne({
      slug: paramsData.slug,
    }).lean<IWorkshopPackage | null>();
    if (!pkg) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    }

    let workshops: any[] = [];
    if (pkg.isAllWorkshopsIncluded) {
      workshops = await WorkshopModel.find({}).select("_id title slug images instructors availableSessions description startDate endDate price slots attendance").lean();
    } else if (
      Array.isArray(pkg.includedWorkshops) &&
      pkg.includedWorkshops.length
    ) {
      workshops = await WorkshopModel.find({
        _id: { $in: pkg.includedWorkshops },
      })
        .select("_id title slug images instructors availableSessions description startDate endDate price slots attendance")
        .lean();
    }

    const workshopsWithCounts = await Promise.all(
      workshops.map(async (w: any) => {
        const attendanceCount = Array.isArray(w.attendance) ? w.attendance.length : 0;
        
        // Count pending individual requests
        const pendingIndividual = await WorkshopAttendanceRequestModel.countDocuments({
          workshopId: w._id,
          status: "pending"
        });

        // Count pending package requests that include this workshop
        const pendingPackageWithWorkshop = await WorkshopPackageRequestModel.countDocuments({
          selectedWorkshops: w._id,
          status: "pending"
        });

        return {
          ...w,
          attendanceCount,
          pendingCount: pendingIndividual + pendingPackageWithWorkshop,
          // We don't need to send the full attendance array to the client
          attendance: undefined 
        };
      })
    );

    return NextResponse.json({ success: true, data: { pkg, workshops: workshopsWithCounts } });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
