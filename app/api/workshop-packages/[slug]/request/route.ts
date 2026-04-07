import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import WorkshopPackageModel, {
  IWorkshopPackage,
} from "@/app/modals/workshopPackageModel";
import WorkshopPackageRequestModel from "@/app/modals/workshopPackageRequestModel";
import mongoose from "mongoose";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const pkg = await WorkshopPackageModel.findOne({
      slug: slug,
    }).lean<IWorkshopPackage | null>();
    if (!pkg) {
      return NextResponse.json({ success: false, error: "Package not found" }, { status: 404 });
    }

    const body = await req.json();
    const {
      selectedWorkshops = [],
      name,
      phone,
      email,
      instapayImage,
      notes,
    } = body || {};

    if (!Array.isArray(selectedWorkshops) || selectedWorkshops.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please select at least one workshop" },
        { status: 400 }
      );
    }
    if (pkg.maxWorkshops && selectedWorkshops.length > pkg.maxWorkshops) {
      return NextResponse.json(
        { success: false, error: "Selected workshops exceed package limit" },
        { status: 400 }
      );
    }
    if (!name || !phone || !email || !instapayImage) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const created = await WorkshopPackageRequestModel.create({
      packageId: new mongoose.Types.ObjectId(pkg._id as any),
      selectedWorkshops: selectedWorkshops.map((id: string) => new mongoose.Types.ObjectId(id)),
      name,
      phone,
      email,
      instapayImage,
      notes,
    });

    return NextResponse.json({ success: true, id: created._id });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

