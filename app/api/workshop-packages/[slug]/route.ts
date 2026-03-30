import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import WorkshopPackageModel, {
  IWorkshopPackage,
} from "@/app/modals/workshopPackageModel";
import WorkshopModel from "@/app/modals/workshopModel";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectToDatabase();
    const pkg = await WorkshopPackageModel.findOne({
      slug: await { params },
    }).lean<IWorkshopPackage | null>();
    if (!pkg) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    }

    let workshops: any[] = [];
    if (pkg.isAllWorkshopsIncluded) {
      workshops = await WorkshopModel.find({}).select("_id title slug").lean();
    } else if (
      Array.isArray(pkg.includedWorkshops) &&
      pkg.includedWorkshops.length
    ) {
      workshops = await WorkshopModel.find({
        _id: { $in: pkg.includedWorkshops },
      })
        .select("_id title slug")
        .lean();
    }

    return NextResponse.json({ success: true, data: { pkg, workshops } });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
